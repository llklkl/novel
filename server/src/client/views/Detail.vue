<template>
  <div class="detail">
    <router-link to="/">← 返回列表</router-link>
    <h1>小说详情</h1>
    <p>小说 ID: {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const id = computed(() => route.params.id)
</script>

<style scoped>
.detail {
  max-width: 800px;
  margin: 0 auto;
}
</style>