<template>
  <div class="relation-graph">
    <div ref="container" class="graph-container"></div>
    <div v-if="selectedChar" class="character-detail" @click="selectedChar = null">
      <div class="detail-content" @click.stop>
        <header>
          <h3>{{ selectedChar.name }}</h3>
          <button class="close-btn" @click="selectedChar = null">×</button>
        </header>
        <p class="role">{{ roleLabel(selectedChar.role) }}</p>
        <p class="background">{{ selectedChar.background }}</p>
        <div v-if="selectedChar.relationships?.length" class="detail-relations">
          <h4>关系</h4>
          <div v-for="(rel, i) in selectedChar.relationships" :key="i" class="rel-item">
            <span class="rel-with">{{ rel.with }}</span>
            <span class="rel-type">{{ rel.type }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as d3 from 'd3'

const props = defineProps<{ characters: any[] }>()
const container = ref<HTMLElement | null>(null)
const selectedChar = ref<any>(null)

function roleLabel(role: string): string {
  const labels: Record<string, string> = {
    protagonist: '主角',
    supporting: '配角',
    antagonist: '对立面',
    complex_ally: '复杂盟友',
    catalyst: '关键人物'
  }
  return labels[role] || role
}

function roleColor(role: string): string {
  const colors: Record<string, string> = {
    protagonist: '#3b82f6',
    supporting: '#22c55e',
    antagonist: '#ef4444',
    complex_ally: '#f59e0b',
    catalyst: '#a855f7'
  }
  return colors[role] || '#6b7280'
}

function buildGraph() {
  if (!container.value || !props.characters?.length) return

  container.value.innerHTML = ''

  const width = container.value.clientWidth || 600
  const height = 400

  const nodes = props.characters.map((c, i) => ({
    id: c.name,
    index: i,
    role: c.role,
    data: c
  }))

  const nameToIndex = new Map(nodes.map((n, i) => [n.id, i]))
  const links: any[] = []

  props.characters.forEach((char) => {
    char.relationships?.forEach((rel: any) => {
      const targetIndex = nameToIndex.get(rel.with)
      if (targetIndex !== undefined && targetIndex !== nameToIndex.get(char.name)) {
        links.push({
          source: nameToIndex.get(char.name)!,
          target: targetIndex,
          type: rel.type
        })
      }
    })
  })

  const svg = d3.select(container.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])

  const simulation = d3.forceSimulation(nodes as any)
    .force('link', d3.forceLink(links).id((d: any) => d.index).distance(100))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))

  const link = svg.append('g')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .attr('stroke-width', 1.5)

  const node = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 20)
    .attr('fill', (d) => roleColor(d.role))
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .call(drag(simulation) as any)

  node.on('click', (_event: any, d: any) => {
    selectedChar.value = d.data
  })

  node.append('title').text((d) => d.id)

  const labels = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .text((d) => d.id)
    .attr('font-size', 12)
    .attr('dx', 24)
    .attr('dy', 4)
    .attr('fill', 'var(--text-secondary)')

  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)

    node
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)

    labels
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y)
  })
}

function drag(simulation: d3.Simulation<any, any>) {
  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event: any) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
}

onMounted(buildGraph)
watch(() => props.characters, buildGraph, { deep: true })
</script>

<style scoped>
.relation-graph {
  position: relative;
}

.graph-container {
  width: 100%;
  height: 400px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  overflow: hidden;
}

.graph-container :deep(svg) {
  display: block;
}

.character-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.detail-content {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.detail-content header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.detail-content h3 {
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-muted);
  line-height: 1;
}

.close-btn:hover {
  color: var(--text-primary);
}

.role {
  font-size: 13px;
  color: var(--accent);
  margin-bottom: 12px;
}

.background {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.detail-relations h4 {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.rel-item {
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
}

.rel-item:last-child {
  border-bottom: none;
}

.rel-with {
  font-weight: 500;
}

.rel-type {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: 8px;
}
</style>