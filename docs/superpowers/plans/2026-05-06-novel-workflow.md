# 小说写作工作流Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建novel-workflow skill统筹整个写作流程，并为每个项目添加progress.yaml进度记录文件。

**Architecture:** novel-workflow skill负责加载项目、显示进度、调度各阶段skill、更新进度文件。进度独立记录在progress.yaml中。

**Tech Stack:** OpenCode skills (SKILL.md with YAML frontmatter), YAML进度文件

---

### Task 1: 创建工作流Skill (novel-workflow)

**Files:**
- Create: `.opencode/skills/novel-workflow/SKILL.md`

- [ ] **Step 1: 创建novel-workflow SKILL.md**

创建文件 `.opencode/skills/novel-workflow/SKILL.md`:

```markdown
---
name: novel-workflow
description: 统筹小说写作全流程，引导用户逐步完成各阶段
---

# 小说写作工作流Skill

## 职责
统筹整个写作流程，引导用户按顺序完成各阶段，记录并更新进度。

## 工作流程

1. **加载项目**
   - 读取novel-project.yaml
   - 读取progress.yaml（如无则初始化）
   - 完成标准: 成功加载项目和进度

2. **显示进度**
   - 展示各阶段完成状态
   - 高亮当前进行中的阶段
   - 推荐下一步操作
   - 完成标准: 用户确认继续

3. **执行当前阶段**
   - 调用对应阶段的skill
   - 等待skill执行完成
   - 完成标准: 阶段skill执行完成

4. **更新进度**
   - 标记当前阶段为completed
   - 标记下一阶段为in_progress
   - 记录时间戳
   - 完成标准: progress.yaml更新成功

5. **循环或结束**
   - 如所有阶段完成，显示完成消息
   - 否则返回步骤2继续
   - 完成标准: 用户选择继续或退出

## 阶段顺序
1. novel-project → 2. novel-ideation → 3. world-building → 4. outline-design → 5. chapter-writing → 6. review-revision → 7. polish-style

## 输出
- 更新后的progress.yaml
- 进度报告（文本格式）

## 错误处理
- **项目不存在**: 引导用户创建新项目
- **进度文件损坏**: 重新初始化进度
- **skill调用失败**: 提示用户手动执行或跳过
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/novel-workflow/SKILL.md
git commit -m "feat: add novel-workflow skill for workflow orchestration"
```

---

### Task 2: 更新novel-project skill以初始化progress.yaml

**Files:**
- Modify: `.opencode/skills/novel-project/SKILL.md`

- [ ] **Step 1: 更新novel-project SKILL.md**

在novel-project SKILL.md的"创建新项目"工作流程中，添加初始化progress.yaml的步骤。

找到"创建新项目"部分，在"创建chapters/和assets/子目录"后添加：

```markdown
5. **初始化进度文件**
   - 创建progress.yaml
   - 使用以下模板初始化：

```yaml
current_stage: novel-project
stages:
  novel-project: { status: in_progress }
  novel-ideation: { status: pending }
  world-building: { status: pending }
  outline-design: { status: pending }
  chapter-writing: { status: pending }
  review-revision: { status: pending }
  polish-style: { status: pending }
```
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/novel-project/SKILL.md
git commit -m "feat: initialize progress.yaml when creating new project"
```

---

### Task 3: 更新示例项目添加progress.yaml

**Files:**
- Create: `novels/example-novel/progress.yaml`

- [ ] **Step 1: 创建progress.yaml**

创建文件 `novels/example-novel/progress.yaml`:

```yaml
current_stage: novel-project
stages:
  novel-project: { status: pending }
  novel-ideation: { status: pending }
  world-building: { status: pending }
  outline-design: { status: pending }
  chapter-writing: { status: pending }
  review-revision: { status: pending }
  polish-style: { status: pending }
```

- [ ] **Step 2: 提交**

```bash
git add novels/example-novel/progress.yaml
git commit -m "feat: add progress.yaml to example project"
```

---

### Task 4: 更新README文档

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 更新README**

修改 `README.md`：

**更新1:** 在目录结构部分添加novel-workflow：

将：
```
├── .opencode/skills/          # 共享skills
```

改为：
```
├── .opencode/skills/          # 共享skills
│   ├── novel-workflow/        # 写作工作流
```

**更新2:** 在快速开始部分添加工作流选项：

在"1. 创建新项目"前添加：
```
0. 使用工作流: `/skill novel-workflow` → 自动引导完成全流程
```

**更新3:** 在Skills说明表格中添加novel-workflow：

在表格第一行添加：
```markdown
| novel-workflow | 写作工作流（统筹全流程） | 无 |
```

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "docs: update README with novel-workflow skill"
```
