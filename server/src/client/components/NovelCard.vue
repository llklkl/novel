<template>
  <div class="novel-card">
    <div class="card-header">
      <h3>{{ novel.name }}</h3>
      <span class="genre">{{ novel.genre }}</span>
    </div>
    <div class="card-body">
      <div class="stat">
        <span class="label">章节</span>
        <span class="value">{{ novel.chapters_count }}</span>
      </div>
      <div class="stat">
        <span class="label">目标</span>
        <span class="value">{{ formatWords(novel.target_words) }}</span>
      </div>
    </div>
    <button class="read-btn">查看详情 →</button>
  </div>
</template>

<script setup lang="ts">
interface Novel {
  id: string
  name: string
  genre: string
  target_words: number
  chapters_count: number
}

defineProps<{ novel: Novel }>()

function formatWords(num: number): string {
  return `${(num / 1000).toFixed(0)}k字`
}
</script>

<style scoped>
.novel-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.novel-card:hover {
  border-color: var(--accent);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-header h3 {
  font-size: 16px;
}

.genre {
  background: var(--accent-light);
  color: var(--accent);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.card-body {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.stat {
  display: flex;
  gap: 8px;
}

.label {
  color: var(--text-muted);
  font-size: 13px;
}

.value {
  font-weight: 500;
}

.read-btn {
  background: var(--accent);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  width: 100%;
}
</style>