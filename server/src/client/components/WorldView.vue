<template>
  <div class="world-view">
    <section class="setting-section">
      <h3>时间背景</h3>
      <p>{{ data?.setting?.time_period || '未设定' }}</p>
    </section>
    
    <section class="setting-section">
      <h3>地点设定</h3>
      <p>{{ data?.setting?.location || '未设定' }}</p>
    </section>
    
    <section class="setting-section">
      <h3>世界规则</h3>
      <ul v-if="data?.setting?.rules?.length" class="rules-list">
        <li v-for="(rule, index) in data.setting.rules" :key="index">{{ rule }}</li>
      </ul>
      <p v-else class="empty">未设定规则</p>
    </section>
    
    <section class="characters-overview">
      <h3>角色概览</h3>
      <div v-if="data?.characters?.length" class="character-cards">
        <div v-for="char in data.characters" :key="char.name" class="character-card">
          <div class="char-header">
            <span class="char-name">{{ char.name }}</span>
            <span :class="['char-role', char.role]">{{ roleLabel(char.role) }}</span>
          </div>
          <p class="char-traits">{{ char.traits?.join('、') || '无特征' }}</p>
          <p class="char-background">{{ char.background }}</p>
        </div>
      </div>
      <p v-else class="empty">无角色信息</p>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: any }>()

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
</script>

<style scoped>
.world-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-section h3 {
  font-size: 15px;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.setting-section p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.rules-list {
  list-style: none;
  padding: 0;
}

.rules-list li {
  padding: 8px 0;
  padding-left: 16px;
  position: relative;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.rules-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 14px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.characters-overview h3 {
  font-size: 15px;
  margin-bottom: 12px;
}

.character-cards {
  display: grid;
  gap: 12px;
}

.character-card {
  background: var(--bg-tertiary);
  padding: 12px;
  border-radius: 6px;
}

.char-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.char-name {
  font-weight: 500;
  font-size: 14px;
}

.char-role {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.char-role.protagonist {
  background: #dbeafe;
  color: #1e40af;
}

.char-role.supporting {
  background: #dcfce7;
  color: #166534;
}

.char-role.antagonist {
  background: #fee2e2;
  color: #991b1b;
}

.char-role.complex_ally {
  background: #fef3c7;
  color: #92400e;
}

.char-role.catalyst {
  background: #f3e8ff;
  color: #6b21a8;
}

.char-traits {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.char-background {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.empty {
  color: var(--text-muted);
  font-size: 14px;
}
</style>