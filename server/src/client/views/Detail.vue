<template>
  <div class="detail" v-if="novel">
    <header class="detail-header">
      <h1>{{ novel.project.name }}</h1>
      <div class="meta">
        <span>{{ novel.project.genre }}</span>
        <span>{{ novel.chapters.current }}章</span>
        <span>进度: {{ progressPercent }}%</span>
      </div>
    </header>
    
    <nav class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </nav>
    
    <div class="tab-content">
      <WorldView v-if="activeTab === 'world'" :data="novel.world_building" />
      <Characters v-if="activeTab === 'characters'" :data="novel.character_building" />
      <RelationGraph v-if="activeTab === 'relations'" :characters="novel.character_building.characters" />
      <Outline v-if="activeTab === 'outline'" :outline="novel.outline" :chapters="novel.chapters" :novelId="novelId" />
      <Ideation v-if="activeTab === 'ideation'" :data="novel.ideation" />
    </div>
  </div>
  <div v-else class="loading">加载中...</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import WorldView from '@/components/WorldView.vue'
import Characters from '@/components/Characters.vue'
import RelationGraph from '@/components/RelationGraph.vue'
import Outline from '@/components/Outline.vue'
import Ideation from '@/components/Ideation.vue'

const route = useRoute()
const novelId = computed(() => route.params.id as string)
const novel = ref<any>(null)
const activeTab = ref('world')

const tabs = [
  { key: 'world', label: '世界观' },
  { key: 'characters', label: '角色档案' },
  { key: 'relations', label: '人物关系' },
  { key: 'outline', label: '大纲进度' },
  { key: 'ideation', label: '创意构思' }
]

const progressPercent = computed(() => {
  if (!novel.value) return 0
  const polished = novel.value.chapters.polished.length
  return Math.round((polished / novel.value.chapters.current) * 100)
})

async function fetchNovel() {
  const res = await fetch(`/api/novels/${novelId.value}`)
  novel.value = await res.json()
}

onMounted(fetchNovel)
</script>

<style scoped>
.detail {
  max-width: 900px;
}

.detail-header {
  margin-bottom: 20px;
}

.detail-header h1 {
  font-size: 24px;
}

.meta {
  display: flex;
  gap: 16px;
  color: var(--text-secondary);
  font-size: 14px;
  margin-top: 8px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tabs button {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
}

.tabs button.active {
  background: var(--accent);
  color: white;
}

.tab-content {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
}
</style>