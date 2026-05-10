---

## Part 5: 整合和测试

### Task 5.1: 更新 Vite 配置支持后端构建

**Files:**
- Modify: `server/vite.config.ts`

- [ ] **Step 1: 更新 vite.config.ts 支持后端**

```typescript
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
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        server: resolve(__dirname, 'src/server/index.ts')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'server') {
            return 'server/index.js'
          }
          return '[name].js'
        }
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

- [ ] **Step 2: Commit**

```bash
git add server/vite.config.ts
git commit -m "fix: update Vite config for backend build"
```

### Task 5.2: 更新 package.json 脚本

**Files:**
- Modify: `server/package.json`

- [ ] **Step 1: 更新 package.json scripts**

```json
{
  "name": "novel-reader",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "node dist/server/index.js",
    "start": "npm run build && npm run server"
  },
  "dependencies": {
    "express": "^4.18.2",
    "vue": "^3.4.0",
    "vue-router": "^4.2.5",
    "pinia": "^2.1.7",
    "d3": "^7.8.5",
    "marked": "^12.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-vue": "^5.0.0",
    "vue-tsc": "^1.8.0"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add server/package.json
git commit -m "fix: update package.json scripts for production build"
```

### Task 5.3: 测试构建和运行

**Files:**
- None (验证步骤)

- [ ] **Step 1: 安装依赖并构建**

```bash
cd server && npm install && npm run build
```

Expected: 成功构建，生成 `public/` 目录

- [ ] **Step 2: 启动服务器**

```bash
make server
```

Expected: 服务器启动在 http://localhost:3000

- [ ] **Step 3: 验证 API**

```bash
curl http://localhost:3000/api/novels
```

Expected: 返回 JSON 格式的小说列表

- [ ] **Step 4: 验证前端**

打开浏览器访问 http://localhost:3000

Expected: 显示小说列表页面，侧边栏显示小说，点击可进入详情页

### Task 5.4: 添加 .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: 添加 server 目录忽略规则**

```
# Novel reader
server/node_modules/
server/public/
server/dist/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add gitignore rules for server build artifacts"
```

### Task 5.5: 最终验证和文档

**Files:**
- None (验证步骤)

- [ ] **Step 1: 验证所有功能]

- 小说列表显示 ✓
- 点击小说进入详情页 ✓
- 详情页标签切换 ✓
- 世界观展示 ✓
- 角色档案展示 ✓
- 人物关系图渲染 ✓
- 大纲进度显示 ✓
- 创意构思展示 ✓
- 点击章节进入阅读页 ✓
- 章节切换 ✓
- 字体调节 ✓
- 目录侧边栏 ✓
- 主题切换 ✓

- [ ] **Step 2: 最终 Commit]

```bash
git add -A
git commit -m "feat: complete novel reader tool implementation"
```