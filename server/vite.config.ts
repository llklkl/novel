import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/client')
    }
  },
  build: {
    outDir: 'public',
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
})