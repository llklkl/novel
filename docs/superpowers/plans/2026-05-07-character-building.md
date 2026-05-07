# 角色构建Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建character-building skill作为独立阶段插入世界观构建之后，更新工作流为8阶段。

**Architecture:** 新增character-building skill，修改novel-workflow阶段顺序，更新novel-project的progress.yaml模板和README文档。

**Tech Stack:** OpenCode skills (SKILL.md with YAML frontmatter), YAML配置文件

---

### Task 1: 创建角色构建Skill (character-building)

**Files:**
- Create: `.opencode/skills/character-building/SKILL.md`

- [ ] **Step 1: 创建character-building SKILL.md**

创建文件 `.opencode/skills/character-building/SKILL.md`:

```markdown
---
name: character-building
description: 构建小说角色体系，包括角色档案、关系网络、角色弧线和对话风格
---

# 角色构建Skill

## 职责
深度开发小说角色，建立完整的角色体系。

## 前置条件
- 项目已通过novel-project skill初始化
- world-building.status为"completed"

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 确认world-building已完成
   - 完成标准: 成功加载配置

2. **创建角色档案**
   - 对每个主要角色定义：
     - 外貌特征
     - 性格特征
     - 背景故事
     - 核心动机
   - 完成标准: 主要角色档案完整

3. **定义关系网络**
   - 角色之间的关系
   - 权力结构
   - 情感纽带
   - 完成标准: 关系网络清晰

4. **设计角色弧线**
   - 角色起始状态
   - 关键转折点
   - 最终成长状态
   - 完成标准: 主要角色弧线完整

5. **定义对话风格**
   - 语言风格
   - 口头禅/习惯用语
   - 说话节奏
   - 完成标准: 主要角色对话风格定义完成

6. **一致性检查**
   - 角色特征是否与世界观契合
   - 角色之间是否有矛盾
   - 完成标准: 无矛盾发现

7. **更新配置**
   - 将角色信息写入novel-project.yaml的characters部分
   - 设置character-building.status为"completed"
   - 完成标准: 配置文件成功更新

## AI角色
协作伙伴模式 - 建议角色设定、提醒矛盾、帮助设计角色弧线

## 输出
- 更新后的novel-project.yaml中characters部分
- 角色关系图（文本格式）

## 注意事项
- 角色设定要具体，避免模糊描述
- 角色弧线要与故事主题呼应
- 对话风格要区分不同角色
- 如需修改已完成的角色构建，可将status改为"in_progress"后重新执行

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **前置条件不满足**: 如果world-building.status不是completed，提示用户先完成世界观构建阶段
- **角色设定冲突**: 发现角色特征矛盾时，提醒用户澄清
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/character-building/SKILL.md
git commit -m "feat: add character-building skill for character development"
```

---

### Task 2: 更新novel-workflow阶段顺序

**Files:**
- Modify: `.opencode/skills/novel-workflow/SKILL.md`

- [ ] **Step 1: 更新阶段顺序**

修改 `.opencode/skills/novel-workflow/SKILL.md` 中的"阶段顺序"部分。

找到：
```
## 阶段顺序
1. novel-project → 2. novel-ideation → 3. world-building → 4. outline-design → 5. chapter-writing → 6. review-revision → 7. polish-style
```

替换为：
```
## 阶段顺序
1. novel-project → 2. novel-ideation → 3. world-building → 4. character-building → 5. outline-design → 6. chapter-writing → 7. review-revision → 8. polish-style
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/novel-workflow/SKILL.md
git commit -m "feat: add character-building stage to workflow"
```

---

### Task 3: 更新novel-project的progress.yaml模板

**Files:**
- Modify: `.opencode/skills/novel-project/SKILL.md`

- [ ] **Step 1: 更新progress.yaml模板**

修改 `.opencode/skills/novel-project/SKILL.md` 中的进度文件模板。

找到progress.yaml模板部分，将：
```yaml
current_stage: novel-project
stages:
  novel-project:
    status: in_progress
    started_at: ""
  novel-ideation:
    status: pending
    started_at: ""
  world-building:
    status: pending
    started_at: ""
  outline-design:
    status: pending
    started_at: ""
  chapter-writing:
    status: pending
    started_at: ""
  review-revision:
    status: pending
    started_at: ""
  polish-style:
    status: pending
    started_at: ""
```

替换为：
```yaml
current_stage: novel-project
stages:
  novel-project:
    status: in_progress
    started_at: ""
  novel-ideation:
    status: pending
    started_at: ""
  world-building:
    status: pending
    started_at: ""
  character-building:
    status: pending
    started_at: ""
  outline-design:
    status: pending
    started_at: ""
  chapter-writing:
    status: pending
    started_at: ""
  review-revision:
    status: pending
    started_at: ""
  polish-style:
    status: pending
    started_at: ""
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/novel-project/SKILL.md
git commit -m "feat: add character-building to progress.yaml template"
```

---

### Task 4: 更新示例项目progress.yaml

**Files:**
- Modify: `novels/example-novel/progress.yaml`

- [ ] **Step 1: 更新progress.yaml**

修改 `novels/example-novel/progress.yaml`，在world-building和outline-design之间添加character-building阶段：

```yaml
current_stage: novel-project
stages:
  novel-project:
    status: pending
    started_at: ""
  novel-ideation:
    status: pending
    started_at: ""
  world-building:
    status: pending
    started_at: ""
  character-building:
    status: pending
    started_at: ""
  outline-design:
    status: pending
    started_at: ""
  chapter-writing:
    status: pending
    started_at: ""
  review-revision:
    status: pending
    started_at: ""
  polish-style:
    status: pending
    started_at: ""
```

- [ ] **Step 2: 提交**

```bash
git add novels/example-novel/progress.yaml
git commit -m "feat: add character-building stage to example project"
```

---

### Task 5: 更新README文档

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 更新README**

修改 `README.md`：

**更新1:** 在目录结构部分添加character-building：

找到：
```
│   ├── world-building/        # 世界观构建
│   ├── outline-design/        # 大纲设计
```

替换为：
```
│   ├── world-building/        # 世界观构建
│   ├── character-building/    # 角色构建
│   ├── outline-design/        # 大纲设计
```

**更新2:** 在快速开始部分添加character-building：

找到：
```
3. 世界观构建: `/skill world-building`
4. 大纲设计: `/skill outline-design`
```

替换为：
```
3. 世界观构建: `/skill world-building`
4. 角色构建: `/skill character-building`
5. 大纲设计: `/skill outline-design`
```

并重新编号后续步骤。

**更新3:** 在Skills说明表格中添加character-building：

在表格中找到world-building行，在其后添加：
```markdown
| character-building | 角色构建 | world_building完成 |
```

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "docs: update README with character-building skill"
```
