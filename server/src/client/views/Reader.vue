<template>
  <div class="reader" v-if="chapter">
    <header class="reader-header">
      <router-link :to="`/novel/${novelId}`" class="back-link">← 返回详情</router-link>
      <div class="header-actions">
        <div class="font-controls">
          <button @click="decreaseFontSize" :disabled="fontSize <= 14">A-</button>
          <span class="font-size">{{ fontSize }}px</span>
          <button @click="increaseFontSize" :disabled="fontSize >= 28">A+</button>
        </div>
        <button class="sidebar-toggle" @click="showSidebar = !showSidebar">
          {{ showSidebar ? '隐藏目录' : '目录' }}
        </button>
      </div>
    </header>

    <div class="reader-content">
      <article class="chapter-content" :style="{ fontSize: fontSize + 'px' }">
        <h1 class="chapter-title">第{{ chapter.number }}章：{{ chapter.title }}</h1>
        <div class="chapter-body" v-html="renderedContent"></div>
      </article>

      <ChapterSidebar
        v-if="showSidebar"
        :novel-id="novelId"
        :current-chapter="chapterNum"
        :chapters="chapterList"
        @select="goToChapter"
      />
    </div>

    <footer class="reader-footer">
      <div class="progress">
        <span>{{ chapter.number }} / {{ totalChapters }}</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>
      <div class="nav-buttons">
        <button
          class="nav-btn"
          :disabled="chapterNum <= 1"
          @click="prevChapter"
        >
          ← 上一章
        </button>
        <button
          class="nav-btn"
          :disabled="chapterNum >= totalChapters"
          @click="nextChapter"
        >
          下一章 →
        </button>
      </div>
    </footer>
  </div>
  <div v-else class="loading">加载中...</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import ChapterSidebar from '@/components/ChapterSidebar.vue'

const route = useRoute()
const router = useRouter()

const novelId = computed(() => route.params.id as string)
const chapterNum = computed(() => parseInt(route.params.num as string, 10))

const chapter = ref<{ number: number; title: string; content: string } | null>(null)
const chapterList = ref<Array<{ number: number; title: string }>>([])
const totalChapters = ref(0)
const fontSize = ref(18)
const showSidebar = ref(false)

const renderedContent = computed(() => {
  if (!chapter.value) return ''
  return marked(chapter.value.content)
})

const progressPercent = computed(() => {
  if (totalChapters.value === 0) return 0
  return Math.round((chapterNum.value / totalChapters.value) * 100)
})

async function fetchChapter() {
  chapter.value = null
  const res = await fetch(`/api/novels/${novelId.value}/chapters/${chapterNum.value}`)
  if (res.ok) {
    chapter.value = await res.json()
  }
}

async function fetchNovelInfo() {
  const res = await fetch(`/api/novels/${novelId.value}`)
  if (res.ok) {
    const data = await res.json()
    totalChapters.value = data.chapters?.current || 0
    if (data.outline?.chapters) {
      chapterList.value = data.outline.chapters.map((c: any) => ({
        number: c.number,
        title: c.title
      }))
    }
  }
}

function increaseFontSize() {
  if (fontSize.value < 28) fontSize.value++
}

function decreaseFontSize() {
  if (fontSize.value > 14) fontSize.value--
}

function prevChapter() {
  if (chapterNum.value > 1) {
    router.push(`/novel/${novelId.value}/chapter/${chapterNum.value - 1}`)
  }
}

function nextChapter() {
  if (chapterNum.value < totalChapters.value) {
    router.push(`/novel/${novelId.value}/chapter/${chapterNum.value + 1}`)
  }
}

function goToChapter(num: number) {
  router.push(`/novel/${novelId.value}/chapter/${num}`)
}

watch([novelId, chapterNum], () => {
  fetchChapter()
})

onMounted(() => {
  fetchChapter()
  fetchNovelInfo()
})
</script>

<style scoped>
.reader {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
}

.reader-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
}

.back-link {
  color: var(--accent);
  text-decoration: none;
  font-size: 14px;
}

.back-link:hover {
  text-decoration: underline;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.font-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.font-controls button {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 12px;
}

.font-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.font-controls button:hover:not(:disabled) {
  background: var(--accent);
  color: white;
}

.font-size {
  font-size: 12px;
  color: var(--text-secondary);
  min-width: 40px;
  text-align: center;
}

.sidebar-toggle {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 13px;
}

.sidebar-toggle:hover {
  background: var(--accent);
  color: white;
}

.reader-content {
  display: flex;
  flex: 1;
  gap: 20px;
}

.chapter-content {
  flex: 1;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 32px 40px;
  line-height: 1.8;
}

.chapter-title {
  font-size: 1.5em;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.chapter-body {
  color: var(--text-primary);
}

.chapter-body :deep(p) {
  margin: 1em 0;
  text-indent: 2em;
}

.chapter-body :deep(h2),
.chapter-body :deep(h3) {
  margin: 1.5em 0 0.5em;
}

.chapter-body :deep(blockquote) {
  border-left: 3px solid var(--accent);
  margin: 1em 0;
  padding-left: 16px;
  color: var(--text-secondary);
}

.reader-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.progress {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.progress span {
  font-size: 13px;
  color: var(--text-secondary);
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: var(--bg-tertiary);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.3s ease;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
}

.nav-btn {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px 24px;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 14px;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn:hover:not(:disabled) {
  background: var(--accent);
  color: white;
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
}
</style>