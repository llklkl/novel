<template>
  <aside class="chapter-sidebar">
    <div class="sidebar-header">
      <h3>章节目录</h3>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>
    <ul class="chapter-list">
      <li
        v-for="ch in chapters"
        :key="ch.number"
        :class="{ active: ch.number === currentChapter }"
        @click="$emit('select', ch.number)"
      >
        <span class="chapter-num">第{{ ch.number }}章</span>
        <span class="chapter-title">{{ ch.title }}</span>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  novelId: string
  currentChapter: number
  chapters: Array<{ number: number; title: string }>
}>()

defineEmits<{
  select: [num: number]
  close: []
}>()
</script>

<style scoped>
.chapter-sidebar {
  width: 280px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  max-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-tertiary);
}

.sidebar-header h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: var(--text-primary);
}

.chapter-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex: 1;
}

.chapter-list li {
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: background 0.15s;
}

.chapter-list li:hover {
  background: var(--bg-tertiary);
}

.chapter-list li.active {
  background: var(--accent-light);
  border-left: 3px solid var(--accent);
}

.chapter-list li.active .chapter-num {
  color: var(--accent);
}

.chapter-num {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.chapter-title {
  font-size: 13px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>