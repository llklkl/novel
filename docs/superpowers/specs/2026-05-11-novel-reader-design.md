# 小说阅读工具设计文档

## 概述

构建一个小说阅读工具，用于阅读本项目下的小说，查看小说元数据信息（世界观、角色、大纲进度等）。

## 需求

1. 阅读本项目下的小说章节内容
2. 查看小说信息：世界观设定、角色档案、人物关系图、大纲进度、创意构思
3. 所有代码写在 server 目录
4. 提供 Makefile，支持一键启动本地服务器
5. 尽量使用 TypeScript

## 技术栈

- **后端**: Express + TypeScript
- **前端**: Vue 3 + TypeScript SPA
- **构建**: Vite
- **人物关系图**: D3.js
- **主题**: CSS 变量实现双主题切换

## 项目结构

所有代码放在 `server/` 目录下，前后端在同一项目：

```
server/
├── src/
│   ├── server/           # Express 后端
│   │   ├── index.ts      # Express 入口
│   │   ├── routes/
│   │   │   ├── novels.ts # 小说 API
│   │   │   ├── chapters.ts # 章节 API
│   │   └── services/
│   │       └ novelService.ts # 小说数据服务
│   ├── client/           # Vue 前端
│   │   ├── App.vue       # 主应用
│   │   ├── components/
│   │   │   ├── Sidebar.vue
│   │   │   ├── NovelList.vue
│   │   │   ├── NovelDetail.vue
│   │   │   ├── ChapterReader.vue
│   │   │   ├── WorldView.vue
│   │   │   ├── Characters.vue
│   │   │   ├── RelationGraph.vue
│   │   │   ├── Outline.vue
│   │   │   ├── Ideation.vue
│   │   │   └── ThemeToggle.vue
│   │   ├── views/
│   │   │   ├── Home.vue
│   │   │   ├── Detail.vue
│   │   │   ├── Reader.vue
│   │   ├── stores/
│   │   │   └ theme.ts
│   │   ├── styles/
│   │   │   ├── variables.css
│   │   │   └ base.css
│   │   ├── router/
│   │   │   └ index.ts
│   │   └ main.ts
├── public/               # 构建后的静态文件
├── package.json
├── tsconfig.json
└── vite.config.ts

Makefile
```
server/
├── src/
│   ├── index.ts          # Express 入口
│   ├── routes/
│   │   ├── novels.ts     # 小说 API
│   │   └── chapters.ts   # 章节 API
│   └── services/
│       └── novelService.ts  # 小说数据服务
├── package.json
├── tsconfig.json
└── vite.config.ts        # 前端构建配置

client/
├── src/
│   ├── App.vue           # 主应用
│   ├── components/
│   │   ├── Sidebar.vue   # 侧边栏导航
│   │   ├── NovelList.vue # 小说列表
│   │   ├── NovelDetail.vue # 小说详情页
│   │   ├── ChapterReader.vue # 章节阅读器
│   │   ├── WorldView.vue # 世界观展示
│   │   ├── Characters.vue # 角色档案
│   │   ├── RelationGraph.vue # 人物关系图(D3.js)
│   │   ├── Outline.vue   # 大纲进度
│   │   ├── Ideation.vue  # 创意构思
│   │   └── ThemeToggle.vue # 主题切换按钮
│   ├── views/
│   │   ├── Home.vue      # 首页(小说列表)
│   │   ├── Detail.vue    # 详情页
│   │   └── Reader.vue    # 阅读页
│   ├── stores/
│   │   └── theme.ts      # 主题状态管理
│   ├── styles/
│   │   ├── variables.css # CSS 变量(双主题)
│   │   └── base.css      # 基础样式
│   └── router/
│   │   └── index.ts      # Vue Router
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts

Makefile
```

## 页面结构

### 侧边栏导航布局

页面采用左侧固定侧边栏 + 右侧内容区的布局结构：

- **侧边栏**: 小说列表，固定宽度 200px
- **内容区**: 根据路由显示详情页或阅读页

### 路由设计

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 小说列表首页 |
| `/novel/:id` | Detail | 小说详情页，带标签页切换 |
| `/novel/:id/chapter/:num` | Reader | 章节阅读页 |

## 详情页模块

详情页使用标签页导航，包含以下模块：

1. **世界观** - 展示时间背景、地点、规则设定
2. **角色档案** - 展示所有角色信息（外观、性格、背景、动机）
3. **人物关系图** - D3.js 网络关系图，节点可点击查看详情
4. **大纲进度** - 章节列表 + 编写状态（planned/drafted/reviewed/polished）
5. **创意构思** - 核心创意、主题、关键词、pitch

## 阅读器功能

### 基础功能

- 章节切换（上一章/下一章按钮）
- 字体大小调节（+/- 按钮）
- 阅读进度显示（当前章节/总章节）
- 侧边栏目录（点击"目录"按钮弹出）

### 目录展示

点击目录按钮时，右侧弹出侧边栏显示章节列表：
- 显示章节标题和编号
- 当前章节高亮
- 点击跳转到对应章节

## 界面风格

### 双主题设计

使用 CSS 变量实现浅色/深色主题切换：

**浅色模式变量**:
```css
:root {
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --border: #e2e8f0;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
}
```

**深色模式变量**:
```css
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --border: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent: #3b82f6;
  --accent-hover: #60a5fa;
}
```

### 设计细节

- **字体**: 系统字体栈（-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif）
- **圆角**: 统一 6px，按钮 6px，卡片 8px
- **间距**: 8px 基准间距系统（8, 16, 24, 32）
- **阴影**: 轻阴影或无阴影，扁平化风格
- **交互**: hover 状态使用背景色变化而非阴影

## API 设计

### 后端 API

| 端点 | 方法 | 功能 | 返回 |
|------|------|------|------|
| `/api/novels` | GET | 获取小说列表 | `{ novels: [{ id, name, genre, chapters }] }` |
| `/api/novels/:id` | GET | 获取小说详情 | `{ project, ideation, world_building, outline, chapters, character_building, progress }` |
| `/api/novels/:id/chapters/:num` | GET | 获取章节内容 | `{ number, title, content }` |

### 数据来源

API 读取 `novels/` 目录下的数据：
- `novel-project.json` - 项目配置、创意构思、世界观、大纲、角色构建
- `progress.json` - 写作进度
- `chapters/*.md` - 章节内容

## Makefile 命令

```makefile
server:
	cd server && npm install && npm run build
	cd client && npm install && npm run build
	node server/dist/index.js

build:
	cd client && npm run build

dev:
	cd server && npm run dev &
	cd client && npm run dev

install:
	cd server && npm install
	cd client && npm install
```

默认端口: 3000
访问地址: http://localhost:3000

## 人物关系图实现

使用 D3.js force simulation 实现网络关系图：

1. **节点**: 每个角色为一个节点，颜色根据角色类型区分（主角/配角/对立面）
2. **连线**: 根据 relationships 数组创建连线，线的粗细表示关系强度
3. **交互**: 
   - 点击节点显示角色详情卡片
   - 悬停显示角色名称
   - 可拖拽节点调整位置

## 错误处理

- 404: 小说不存在或章节不存在时返回 404
- 500: 文件读取失败时返回 500
- 前端: 路由守卫处理无效路径，显示错误提示

## 测试

- 手动测试: 启动服务器，验证各页面功能
- 验证: 确保能正确读取 JSON 和 Markdown 文件
- 验证: 确保人物关系图正确渲染