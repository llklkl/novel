<template>
  <div class="ideation">
    <section class="ideation-section">
      <h3>核心创意</h3>
      <p class="core-idea">{{ data?.core_idea || '未设定' }}</p>
    </section>
    
    <section class="ideation-section">
      <h3>主题</h3>
      <p>{{ data?.theme || '未设定' }}</p>
    </section>
    
    <section class="ideation-section">
      <h3>关键词</h3>
      <div v-if="data?.keywords?.length" class="keywords">
        <span v-for="(keyword, i) in data.keywords" :key="i" class="keyword-tag">{{ keyword }}</span>
      </div>
      <p v-else>未设定</p>
    </section>
    
    <section class="ideation-section">
      <h3>Pitch</h3>
      <p class="pitch">{{ data?.pitch || '未设定' }}</p>
    </section>
    
    <section v-if="data?.status" class="ideation-section status">
      <span class="status-label">状态</span>
      <span :class="['status-value', data.status]">{{ statusLabel(data.status) }}</span>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: any }>()

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    in_progress: '进行中',
    completed: '已完成',
    pending: '待处理'
  }
  return labels[status] || status
}
</script>

<style scoped>
.ideation {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ideation-section h3 {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ideation-section p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.core-idea {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.keyword-tag {
  background: var(--bg-tertiary);
  color: var(--accent);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  border: 1px solid var(--border);
}

.pitch {
  font-style: italic;
  padding-left: 12px;
  border-left: 3px solid var(--accent);
}

.status {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.status-label {
  font-size: 14px;
  color: var(--text-muted);
}

.status-value {
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 4px;
}

.status-value.completed {
  background: #dcfce7;
  color: #166534;
}

.status-value.in_progress {
  background: #fef3c7;
  color: #92400e;
}

.status-value.pending {
  background: #f3f4f6;
  color: #6b7280;
}
</style>