<template>
  <aside class="sidebar">
    <nav>
      <router-link to="/">首页</router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: var(--bg-secondary);
  padding: 20px;
  border-right: 1px solid var(--border-color);
}

nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

nav a {
  color: var(--text-primary);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
}

nav a:hover {
  background: var(--bg-hover);
}

nav a.router-link-active {
  background: var(--accent-color);
  color: white;
}
</style>