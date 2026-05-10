<template>
  <div class="characters">
    <div v-if="data?.characters?.length" class="character-list">
      <div v-for="char in data.characters" :key="char.name" class="character-profile">
        <header class="profile-header">
          <h3>{{ char.name }}</h3>
          <span :class="['role-badge', char.role]">{{ roleLabel(char.role) }}</span>
        </header>
        
        <section class="profile-section">
          <h4>外观</h4>
          <p>{{ char.appearance || '未设定' }}</p>
        </section>
        
        <section class="profile-section">
          <h4>性格</h4>
          <div v-if="char.personality?.length" class="traits">
            <span v-for="(trait, i) in char.personality" :key="i" class="trait-tag">{{ trait }}</span>
          </div>
          <p v-else>未设定</p>
        </section>
        
        <section class="profile-section">
          <h4>背景</h4>
          <p>{{ char.background || '未设定' }}</p>
        </section>
        
        <section class="profile-section">
          <h4>动机</h4>
          <p>{{ char.motivation || '未设定' }}</p>
        </section>
        
        <section v-if="char.arc" class="profile-section">
          <h4>角色弧线</h4>
          <div class="arc-stages">
            <div class="arc-stage">
              <span class="stage-label">起点</span>
              <p>{{ char.arc.start }}</p>
            </div>
            <div class="arc-stage">
              <span class="stage-label">转折</span>
              <p>{{ char.arc.turning_point }}</p>
            </div>
            <div class="arc-stage">
              <span class="stage-label">终点</span>
              <p>{{ char.arc.end }}</p>
            </div>
          </div>
        </section>
        
        <section v-if="char.dialogue_style" class="profile-section">
          <h4>对话风格</h4>
          <div class="dialogue-style">
            <p><strong>语调:</strong> {{ char.dialogue_style.tone }}</p>
            <p v-if="char.dialogue_style.catchphrase"><strong>口头禅:</strong> "{{ char.dialogue_style.catchphrase }}"</p>
            <p v-if="char.dialogue_style.rhythm"><strong>节奏:</strong> {{ char.dialogue_style.rhythm }}</p>
          </div>
        </section>
        
        <section v-if="char.relationships?.length" class="profile-section">
          <h4>人物关系</h4>
          <div class="relationships">
            <div v-for="(rel, i) in char.relationships" :key="i" class="relationship">
              <span class="rel-with">{{ rel.with }}</span>
              <span class="rel-type">{{ rel.type }}</span>
              <p class="rel-desc">{{ rel.description }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <p v-else class="empty">无角色信息</p>
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
.characters {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.character-profile {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.profile-header h3 {
  font-size: 18px;
}

.role-badge {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
}

.role-badge.protagonist {
  background: #dbeafe;
  color: #1e40af;
}

.role-badge.supporting {
  background: #dcfce7;
  color: #166534;
}

.role-badge.antagonist {
  background: #fee2e2;
  color: #991b1b;
}

.role-badge.complex_ally {
  background: #fef3c7;
  color: #92400e;
}

.role-badge.catalyst {
  background: #f3e8ff;
  color: #6b21a8;
}

.profile-section {
  margin-bottom: 16px;
}

.profile-section:last-child {
  margin-bottom: 0;
}

.profile-section h4 {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-section p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.traits {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.trait-tag {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
}

.arc-stages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.arc-stage {
  padding-left: 12px;
  border-left: 2px solid var(--accent);
}

.stage-label {
  font-size: 12px;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 4px;
  display: block;
}

.arc-stage p {
  margin-top: 4px;
}

.dialogue-style p {
  margin-bottom: 6px;
}

.dialogue-style strong {
  color: var(--text-primary);
  font-weight: 500;
}

.relationships {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.relationship {
  background: var(--bg-tertiary);
  padding: 10px;
  border-radius: 6px;
}

.rel-with {
  font-weight: 500;
  color: var(--text-primary);
}

.rel-type {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: 8px;
}

.rel-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 6px;
  line-height: 1.5;
}

.empty {
  color: var(--text-muted);
  font-size: 14px;
}
</style>