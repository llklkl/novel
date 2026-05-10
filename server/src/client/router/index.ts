import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Detail from '@/views/Detail.vue'
import Reader from '@/views/Reader.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/novel/:id', name: 'detail', component: Detail },
    { path: '/novel/:id/chapter/:num', name: 'reader', component: Reader }
  ]
})

export default router