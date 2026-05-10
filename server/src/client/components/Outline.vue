<template>
  <div class="outline">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      <span class="progress-text">{{ progressPercent }}% 完成</span>
    </div>
    
    <div class="chapters-list">
      <div
        v-for="chapter in outline?.chapters || []"
        :key="chapter.number"
        class="chapter-item"
        :class="{ clickable: true }"
        @click="goToChapter(chapter.number)"
      >
        <div class="chapter-header">
          <span class="chapter-num">第{{ chapter.number }}章</span>
          <span :class="['status-badge', chapter.status]">{{ statusLabel(chapter.status) }}</span>
        </div>
        <h4 class="chapter-title">{{ chapter.title }}</h4>
        <p class="chapter-purpose">{{ chapter.purpose }}</p>
        <ul v-if="chapter.plot_points?.length" class="plot-points">
          <li v-for="(point, i) in chapter.plot_points" :key="i">{{ point }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  outline: any
  chapters: any
  novelId: string
}>()

const router = useRouter()

const progressPercent = computed(() => {
  if (!props.chapters) return 0
  const polished = props.chapters.polished?.length || 0
  const total = props.chapters.current || 1
  return Math.round((polished / total) * 100)
})

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    planned: '计划中',
    drafted: '草稿',
    reviewed: '审阅中',
    polished: '完成'
  }
  return labels[status] || status
}

function goToChapter(num: number) {
  router.push(`/novel/${props.novelId}/chapter/${num}`)
}
</script>

<style scoped>
.outline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.progress-bar {
  height: 24px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #60a5fa);
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chapter-item {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.chapter-item.clickable {
  cursor: pointer;
}

.chapter-item.clickable:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.chapter-num {
  font-size: 13px;
  color: var(--text-muted);
}

.status-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-badge.planned {
  background: #f3f4f6;
  color: #6b7280;
}

.status-badge.drafted {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.reviewed {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.polished {
  background: #dcfce7;
  color: #166534;
}

.chapter-title {
  font-size: 15px;
  margin-bottom: 6px;
}

.chapter-purpose {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.plot-points {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plot-points li {
  font-size: 12px;
  color: var(--text-muted);
  padding: 4px 0;
  padding-left: 12px;
  position: relative;
}

.plot-points li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent);
}
</style>