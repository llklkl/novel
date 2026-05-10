<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <ThemeToggle />
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>