# 小说写作工作流 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一套7个OpenCode skills，支持大纲驱动型小说写作的完整工作流，包括项目管理、创意构思、世界观构建、大纲设计、章节撰写、审阅修订和文本润色。

**Architecture:** 阶段式skill架构，每个skill独立负责一个创作阶段，通过共享的novel-project.yaml配置文件传递状态，内置一致性检查机制。

**Tech Stack:** OpenCode skills (SKILL.md with YAML frontmatter), YAML配置文件, Markdown章节文件

---

### Task 1: 创建目录结构和项目管理Skill (novel-project)

**Files:**
- Create: `.opencode/skills/novel-project/SKILL.md`
- Create: `novels/README.md`

- [ ] **Step 1: 创建skill目录结构**

```bash
mkdir -p .opencode/skills/novel-project
mkdir -p novels
```

- [ ] **Step 2: 创建novel-project SKILL.md**

创建文件 `.opencode/skills/novel-project/SKILL.md`:

```markdown
---
name: novel-project
description: 管理小说项目生命周期，包括创建、切换、加载项目和查看状态
---

# 项目管理Skill

## 职责
管理多小说项目生命周期，提供项目创建、切换、加载和状态查看功能。

## 使用方式
用户调用此skill后，询问用户想要执行的操作：
1. 创建新项目
2. 切换到已有项目
3. 查看当前项目状态
4. 列出所有项目

## 工作流程

### 创建新项目
1. 询问用户项目名称和类型
2. 在novels/目录下创建项目文件夹
3. 初始化novel-project.yaml配置文件
4. 创建chapters/和assets/子目录

### 切换到已有项目
1. 扫描novels/目录下所有包含novel-project.yaml的子目录
2. 列出所有项目供用户选择
3. 加载选中项目的配置

### 查看项目状态
1. 读取当前项目的novel-project.yaml
2. 显示各阶段完成状态
3. 显示章节统计信息

### 列出所有项目
1. 扫描novels/目录
2. 列出每个项目的名称、类型、创建时间

## 配置文件模板

当创建新项目时，使用以下模板初始化novel-project.yaml：

```yaml
project:
  name: "<项目名称>"
  genre: "<类型>"
  target_words: 100000
  created: "<YYYY-MM-DD>"
  updated: "<YYYY-MM-DD>"

ideation:
  core_idea: ""
  theme: ""
  keywords: []
  pitch: ""
  status: "pending"

world_building:
  setting:
    time_period: ""
    location: ""
    rules: ""
  characters: []
  status: "pending"

outline:
  structure: ""
  chapters: []
  status: "pending"

chapters:
  current: 1
  drafted: []
  reviewed: []
  polished: []

consistency_rules:
  - "人物特征不能矛盾"
  - "世界观规则保持一致"
```

## 文件组织结构

每个项目目录结构：
```
novels/<project-name>/
├── novel-project.yaml
├── chapters/
└── assets/
```

## 注意事项
- 所有项目都位于novels/目录下
- Skills位于.opencode/skills/目录，所有项目共享
- 配置文件使用YAML格式
- 状态字段：pending, in_progress, completed
```

- [ ] **Step 3: 创建novels/README.md**

创建文件 `novels/README.md`:

```markdown
# 小说项目目录

此目录包含所有小说项目，每个项目一个子目录。

## 项目结构

每个项目目录包含：
- `novel-project.yaml` - 项目配置文件
- `chapters/` - 章节文件
- `assets/` - 资源文件（可选）

## 共享Skills

所有项目共享 `.opencode/skills/` 目录中的skills。
```

- [ ] **Step 4: 提交**

```bash
git add .opencode/skills/novel-project/SKILL.md novels/README.md
git commit -m "feat: add novel-project skill and directory structure"
```

---

### Task 2: 创建创意构思Skill (novel-ideation)

**Files:**
- Create: `.opencode/skills/novel-ideation/SKILL.md`

- [ ] **Step 1: 创建novel-ideation SKILL.md**

创建文件 `.opencode/skills/novel-ideation/SKILL.md`:

```markdown
---
name: novel-ideation
description: 协助完成小说创意构思，提炼核心理念、主题和关键词
---

# 创意构思Skill

## 职责
帮助用户从模糊想法到清晰创意概念，完成小说的创意构思阶段。

## 前置条件
- 项目已通过novel-project skill初始化
- 当前项目的ideation.status为pending或in_progress

## 工作流程

1. **加载项目配置**
   - 读取当前目录的novel-project.yaml
   - 检查ideation部分的状态

2. **询问创作动机**
   - 询问用户想要写什么类型的故事
   - 了解初步想法和灵感来源

3. **提炼核心理念**
   - 协助用户用一句话概括故事核心
   - 格式："[主角]在[情境]中必须[目标]，否则[后果]"

4. **探索主题**
   - 讨论故事想要表达的主题
   - 常见主题：爱情、成长、复仇、救赎等

5. **生成关键词**
   - 提取3-5个关键词描述故事
   - 用于后续创作的方向指引

6. **撰写电梯演讲**
   - 100字内简洁描述故事
   - 用于快速推销作品概念

7. **更新配置**
   - 将以上内容写入novel-project.yaml的ideation部分
   - 设置ideation.status为"completed"

## AI角色
协作伙伴模式 - 提问、建议、帮助决策

## 输出
更新后的novel-project.yaml中ideation部分：

```yaml
ideation:
  core_idea: "一句话核心理念"
  theme: "主题"
  keywords: ["关键词1", "关键词2"]
  pitch: "电梯演讲（100字内）"
  status: "completed"
```

## 注意事项
- 保持提问的节奏，不要一次性问太多
- 如果用户已有明确想法，可以直接跳过某些步骤
- 电梯演讲要简洁有力，控制在100字以内
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/novel-ideation/SKILL.md
git commit -m "feat: add novel-ideation skill for creative brainstorming"
```

---

### Task 3: 创建世界观构建Skill (world-building)

**Files:**
- Create: `.opencode/skills/world-building/SKILL.md`

- [ ] **Step 1: 创建world-building SKILL.md**

创建文件 `.opencode/skills/world-building/SKILL.md`:

```markdown
---
name: world-building
description: 构建小说世界观，包括角色设定、世界观规则和背景设定
---

# 世界观构建Skill

## 职责
构建小说的世界观、人物、设定，为后续创作提供基础。

## 前置条件
- 项目已通过novel-project skill初始化
- ideation.status为"completed"

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 确认ideation已完成
   - 检查world_building部分的状态

2. **询问时代背景**
   - 故事发生的时代
   - 现实世界还是虚构世界

3. **定义地点设定**
   - 主要故事发生地
   - 地理环境、气候等

4. **定义世界观规则**
   - 魔法体系（如有）
   - 科技水平
   - 社会制度
   - 其他特殊规则

5. **创建角色档案**
   对每个角色收集以下信息：
   - name: 角色名称
   - role: protagonist/antagonist/supporting
   - traits: 性格特征列表
   - background: 背景故事
   - relationships: 与其他角色的关系

6. **定义人物关系网络**
   - 角色之间的关系
   - 权力结构
   - 情感纽带

7. **一致性检查**
   - 角色特征是否与主题契合
   - 世界观规则是否自洽

8. **更新配置**
   - 将以上内容写入novel-project.yaml的world_building部分
   - 设置world_building.status为"completed"

## AI角色
协作伙伴模式 - 建议设定、提醒矛盾

## 输出
更新后的novel-project.yaml中world_building部分：

```yaml
world_building:
  setting:
    time_period: "时代背景"
    location: "地点设定"
    rules: "世界观规则"
  characters:
    - name: "角色名"
      role: "protagonist/antagonist/supporting"
      traits: ["特征1", "特征2"]
      background: "背景故事"
      relationships: ["关系"]
  status: "completed"
```

## 注意事项
- 角色设定要具体，避免模糊描述
- 世界观规则要自洽，不能有矛盾
- 提醒用户角色特征与主题的关联
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/world-building/SKILL.md
git commit -m "feat: add world-building skill for setting creation"
```

---

### Task 4: 创建大纲设计Skill (outline-design)

**Files:**
- Create: `.opencode/skills/outline-design/SKILL.md`

- [ ] **Step 1: 创建outline-design SKILL.md**

创建文件 `.opencode/skills/outline-design/SKILL.md`:

```markdown
---
name: outline-design
description: 设计小说大纲，规划章节结构和情节点
---

# 大纲设计Skill

## 职责
从世界观到章节级规划，创建完整的小说大纲。

## 前置条件
- 项目已通过novel-project skill初始化
- world_building.status为"completed"

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 确认world_building已完成
   - 检查outline部分的状态

2. **选择结构类型**
   提供以下选项：
   - three_act: 三幕结构
   - four_act: 四幕结构
   - hero_journey: 英雄之旅
   - custom: 自定义结构

3. **规划整体情节曲线**
   - 开端：引入角色和世界
   - 发展：冲突升级
   - 高潮：关键转折
   - 结局：问题解决

4. **拆分为章节**
   对每个章节定义：
   - number: 章节编号
   - title: 章节标题
   - purpose: 本章目的
   - plot_points: 情节点列表
   - status: planned

5. **一致性检查**
   - 情节是否利用了角色特征
   - 是否符合世界观规则
   - 情节点之间是否连贯

6. **更新配置**
   - 将以上内容写入novel-project.yaml的outline部分
   - 设置outline.status为"completed"

## AI角色
协作伙伴模式 - 建议结构、质疑逻辑漏洞

## 输出
更新后的novel-project.yaml中outline部分：

```yaml
outline:
  structure: "three_act/four_act/hero_journey"
  chapters:
    - number: 1
      title: "章节标题"
      purpose: "本章目的"
      plot_points: ["情节点1"]
      status: "planned"
  status: "completed"
```

## 注意事项
- 章节数量根据目标字数和每章字数估算
- 每章应有明确的目的
- 情节点要具体，不能模糊
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/outline-design/SKILL.md
git commit -m "feat: add outline-design skill for chapter planning"
```

---

### Task 5: 创建章节撰写Skill (chapter-writing)

**Files:**
- Create: `.opencode/skills/chapter-writing/SKILL.md`

- [ ] **Step 1: 创建chapter-writing SKILL.md**

创建文件 `.opencode/skills/chapter-writing/SKILL.md`:

```markdown
---
name: chapter-writing
description: 执行小说章节内容创作，生成初稿
---

# 章节撰写Skill

## 职责
执行具体章节内容创作，生成章节初稿。

## 前置条件
- 项目已通过novel-project skill初始化
- outline.status为"completed"

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 确认outline已完成
   - 读取chapters部分状态

2. **选择要撰写的章节**
   - 列出所有planned状态的章节
   - 用户选择要撰写的章节

3. **加载相关设定**
   - 读取章节目的和情节点
   - 读取相关角色设定
   - 读取世界观规则

4. **生成初稿**
   - AI根据设定生成章节内容
   - 或用户主导写作，AI辅助

5. **一致性检查**
   - 人物行为是否符合设定
   - 世界观规则是否遵守
   - 情节是否符合大纲

6. **保存章节**
   - 保存到chapters/chapter-XX.md（两位数字格式）
   - 更新chapters.drafted列表
   - 更新章节状态

## 章节文件格式

```markdown
# 第X章: 章节标题

**状态:** drafted
**创建时间:** YYYY-MM-DD
**最后修改:** YYYY-MM-DD

---

[章节内容...]

---

**审阅记录:**
- YYYY-MM-DD: 初始草稿完成
```

## AI角色
内容生成器模式 - 生成文本供用户修改

## 输出
- 章节文件: chapters/chapter-XX.md
- 更新后的chapters.drafted列表

## 注意事项
- 自动加载相关设定避免遗忘
- 草稿与配置分离
- 章节文件使用两位数字格式（chapter-01, chapter-02）
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/chapter-writing/SKILL.md
git commit -m "feat: add chapter-writing skill for content creation"
```

---

### Task 6: 创建审阅修订Skill (review-revision)

**Files:**
- Create: `.opencode/skills/review-revision/SKILL.md`

- [ ] **Step 1: 创建review-revision SKILL.md**

创建文件 `.opencode/skills/review-revision/SKILL.md`:

```markdown
---
name: review-revision
description: 审阅小说章节，检查一致性、逻辑和情节漏洞
---

# 审阅修订Skill

## 职责
检查章节的一致性、逻辑、情节漏洞，生成审阅报告。

## 前置条件
- 项目已通过novel-project skill初始化
- 存在drafted状态的章节

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 读取完整配置用于一致性检查

2. **选择要审阅的章节**
   - 列出所有drafted状态的章节
   - 用户选择要审阅的章节

3. **一致性检查**
   - 人物特征是否矛盾
   - 世界观规则是否违反
   - 情节前后是否连贯

4. **逻辑检查**
   - 情节合理性
   - 因果关系是否成立
   - 时间线是否连贯

5. **生成审阅报告**
   - 问题列表
   - 建议修改方案
   - 严重程度分级

6. **用户确认修改**
   - 展示问题和建议
   - 用户选择接受或忽略

7. **更新状态**
   - 更新章节状态
   - 更新chapters.reviewed列表

## AI角色
协作伙伴模式 - 批评、建议、质疑

## 输出
- 审阅报告
- 更新后的章节文件
- 更新后的chapters.reviewed列表

## 注意事项
- 发现问题时提供具体位置
- 建议修改要具体可行
- 区分警告和错误级别
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/review-revision/SKILL.md
git commit -m "feat: add review-revision skill for consistency checking"
```

---

### Task 7: 创建文本润色Skill (polish-style)

**Files:**
- Create: `.opencode/skills/polish-style/SKILL.md`

- [ ] **Step 1: 创建polish-style SKILL.md**

创建文件 `.opencode/skills/polish-style/SKILL.md`:

```markdown
---
name: polish-style
description: 润色小说文本，优化句式和统一风格
---

# 文本润色Skill

## 职责
文字润色、风格统一，提升章节文本质量。

## 前置条件
- 项目已通过novel-project skill初始化
- 存在reviewed状态的章节

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 读取章节文件

2. **选择要润色的章节**
   - 列出所有reviewed状态的章节
   - 用户选择要润色的章节

3. **读取风格指南**
   - 如已有风格指南则加载
   - 如无则协助用户创建

4. **执行润色**
   - 句式优化
   - 节奏调整
   - 风格统一
   - 用词改进

5. **生成润色版本对比**
   - 显示修改前后对比
   - 说明修改原因

6. **用户确认**
   - 用户审阅修改
   - 确认接受或回退

7. **更新状态**
   - 保存润色后版本
   - 更新chapters.polished列表

## AI角色
内容生成器模式 - 提供改进版本

## 输出
- 润色后的章节文件
- 更新后的chapters.polished列表

## 注意事项
- 保留原文风格
- 修改要有理由
- 用户有最终决定权
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/polish-style/SKILL.md
git commit -m "feat: add polish-style skill for text refinement"
```

---

### Task 8: 创建示例项目并验证工作流

**Files:**
- Create: `novels/example-novel/novel-project.yaml`
- Create: `novels/example-novel/chapters/.gitkeep`
- Create: `novels/example-novel/assets/.gitkeep`

- [ ] **Step 1: 创建示例项目目录结构**

```bash
mkdir -p novels/example-novel/chapters
mkdir -p novels/example-novel/assets
```

- [ ] **Step 2: 创建示例项目配置文件**

创建文件 `novels/example-novel/novel-project.yaml`:

```yaml
project:
  name: "示例小说"
  genre: "奇幻"
  target_words: 100000
  created: "2026-05-06"
  updated: "2026-05-06"

ideation:
  core_idea: ""
  theme: ""
  keywords: []
  pitch: ""
  status: "pending"

world_building:
  setting:
    time_period: ""
    location: ""
    rules: ""
  characters: []
  status: "pending"

outline:
  structure: ""
  chapters: []
  status: "pending"

chapters:
  current: 1
  drafted: []
  reviewed: []
  polished: []

consistency_rules:
  - "人物特征不能矛盾"
  - "世界观规则保持一致"
```

- [ ] **Step 3: 创建.gitkeep文件保持空目录**

```bash
touch novels/example-novel/chapters/.gitkeep
touch novels/example-novel/assets/.gitkeep
```

- [ ] **Step 4: 提交**

```bash
git add novels/example-novel/
git commit -m "feat: add example project for workflow testing"
```

---

### Task 9: 更新项目README文档

**Files:**
- Create: `README.md`

- [ ] **Step 1: 创建README.md**

创建文件 `README.md`:

```markdown
# 小说写作工作流

一套基于OpenCode skills的小说写作工作流，支持大纲驱动型创作。

## 功能特点

- **阶段式工作流**: 7个独立skills按创作流程协作
- **配置驱动**: 通过novel-project.yaml统一管理项目状态
- **自动一致性**: 每个skill自动检查并维护一致性
- **多项目支持**: 在novels/目录下管理多个小说项目

## 目录结构

```
.
├── .opencode/skills/          # 共享skills
│   ├── novel-project/         # 项目管理
│   ├── novel-ideation/        # 创意构思
│   ├── world-building/        # 世界观构建
│   ├── outline-design/        # 大纲设计
│   ├── chapter-writing/       # 章节撰写
│   ├── review-revision/       # 审阅修订
│   └── polish-style/          # 文本润色
└── novels/                    # 小说项目目录
    └── example-novel/         # 示例项目
        ├── novel-project.yaml
        ├── chapters/
        └── assets/
```

## 快速开始

1. 创建新项目: `/skill novel-project` → 选择"创建新项目"
2. 创意构思: `/skill novel-ideation`
3. 世界观构建: `/skill world-building`
4. 大纲设计: `/skill outline-design`
5. 章节撰写: `/skill chapter-writing`
6. 审阅修订: `/skill review-revision`
7. 文本润色: `/skill polish-style`

## Skills说明

| Skill | 描述 | 前置条件 |
|-------|------|----------|
| novel-project | 管理项目生命周期 | 无 |
| novel-ideation | 创意构思 | 项目已初始化 |
| world-building | 世界观构建 | ideation完成 |
| outline-design | 大纲设计 | world_building完成 |
| chapter-writing | 章节撰写 | outline完成 |
| review-revision | 审阅修订 | 存在drafted章节 |
| polish-style | 文本润色 | 存在reviewed章节 |

## 配置文件

每个项目包含novel-project.yaml，记录：
- 项目基本信息
- 各阶段状态
- 世界观设定
- 大纲结构
- 章节进度
- 一致性规则

## 一致性检查

每个skill内置一致性检查：
- 人物一致性
- 世界观一致性
- 时间线连贯
- 设定引用验证
```

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "docs: add project README with usage instructions"
```
