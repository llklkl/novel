<template>
  <div class="reader">
    <router-link :to="`/novel/${id}`">← 返回详情</router-link>
    <h1>阅读器</h1>
    <p>小说 ID: {{ id }}</p>
    <p>章节: {{ num }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const id = computed(() => route.params.id)
const num = computed(() => route.params.num)
</script>

<style scoped>
.reader {
  max-width: 800px;
  margin: 0 auto;
}
</style>