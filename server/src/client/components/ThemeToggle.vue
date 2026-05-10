<template>
  <button class="theme-toggle" @click="themeStore.toggle()">
    {{ themeStore.theme === 'light' ? '🌙' : '☀️' }}
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--bg-hover);
}
</style>