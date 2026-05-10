<template>
  <div class="home">
    <h1>小说列表</h1>
    <div class="novel-list">
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.novel-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>