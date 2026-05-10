<template>
  <div class="home">
    <h1>小说阅读器</h1>
    <p class="subtitle">选择一本小说开始阅读</p>
    <div class="novel-grid">
      <NovelCard
        v-for="novel in novels"
        :key="novel.id"
        :novel="novel"
        @click="goToNovel(novel.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NovelCard from '@/components/NovelCard.vue'

interface Novel {
  id: string
  name: string
  genre: string
  target_words: number
  chapters_count: number
}

const router = useRouter()
const novels = ref<Novel[]>([])

async function fetchNovels() {
  const res = await fetch('/api/novels')
  const data = await res.json()
  novels.value = data.novels
}

function goToNovel(id: string) {
  router.push(`/novel/${id}`)
}

onMounted(fetchNovels)
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.novel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
</style>