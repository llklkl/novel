# 章节生命周期编排Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建chapter-cycle skill编排单章节的撰写、审核、VCS提交流程。

**Architecture:** 新增chapter-cycle skill作为编排器，调度chapter-writing和review-revision，审核通过后自动git commit。

**Tech Stack:** OpenCode skills (SKILL.md with YAML frontmatter), Git VCS

---

### Task 1: 创建章节生命周期编排Skill (chapter-cycle)

**Files:**
- Create: `.opencode/skills/chapter-cycle/SKILL.md`

- [ ] **Step 1: 创建chapter-cycle SKILL.md**

创建文件 `.opencode/skills/chapter-cycle/SKILL.md`:

```markdown
---
name: chapter-cycle
description: 编排单章节的完整生命周期：撰写、审核、提交
---

# 章节生命周期编排Skill

## 职责
编排单章节从撰写到审核到VCS提交的完整流程。

## 前置条件
- 项目已通过novel-project skill初始化
- outline-design.status为"completed"

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 读取outline.chapters，找到下一个planned状态的章节
   - 完成标准: 成功加载配置并确定待撰写章节

2. **执行章节撰写**
   - 调用chapter-writing skill
   - 等待章节初稿生成
   - 完成标准: chapter-writing执行完成

3. **执行章节审核**
   - 调用review-revision skill审核刚完成的章节
   - 等待审核完成
   - 完成标准: review-revision执行完成，章节状态为reviewed

4. **提交到VCS**
   - git add章节文件、novel-project.yaml、progress.yaml
   - git commit -m "feat: add chapter XX (drafted & reviewed)"
   - 完成标准: commit成功

5. **循环或结束**
   - 如还有planned状态的章节，询问用户是否继续
   - 如所有章节已完成，显示完成消息
   - 完成标准: 用户选择继续或退出

## AI角色
协调者模式 - 调度chapter-writing和review-revision，管理VCS提交

## 输出
- 更新后的章节文件（reviewed状态）
- git commit记录
- 更新后的novel-project.yaml和progress.yaml

## 注意事项
- 每章必须审核通过后才提交
- 如审核发现问题较多，可退回修改后重新审核
- VCS提交信息包含章节编号和状态

## 错误处理
- **无待撰写章节**: 提示用户所有章节已完成
- **chapter-writing失败**: 提示用户手动完成或跳过
- **review-revision失败**: 提示用户手动审核或跳过
- **git commit失败**: 提示用户检查git状态
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/chapter-cycle/SKILL.md
git commit -m "feat: add chapter-cycle skill for chapter lifecycle orchestration"
```

---

### Task 2: 更新novel-workflow阶段描述

**Files:**
- Modify: `.opencode/skills/novel-workflow/SKILL.md`

- [ ] **Step 1: 更新阶段顺序和描述**

修改 `.opencode/skills/novel-workflow/SKILL.md` 中的"阶段顺序"部分。

找到：
```
## 阶段顺序
1. novel-project → 2. novel-ideation → 3. world-building → 4. character-building → 5. outline-design → 6. chapter-writing → 7. review-revision → 8. polish-style
```

替换为：
```
## 阶段顺序
1. novel-project → 2. novel-ideation → 3. world-building → 4. character-building → 5. outline-design → 6. chapter-cycle → 7. polish-style
```

注意：chapter-cycle已包含review-revision，所以review-revision不再作为独立阶段列出。

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/novel-workflow/SKILL.md
git commit -m "feat: replace chapter-writing with chapter-cycle in workflow"
```

---

### Task 3: 更新README文档

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 更新README**

修改 `README.md`：

**更新1:** 在目录结构部分添加chapter-cycle：

找到：
```
│   ├── outline-design/        # 大纲设计
│   ├── chapter-writing/       # 章节撰写
```

替换为：
```
│   ├── outline-design/        # 大纲设计
│   ├── chapter-cycle/         # 章节生命周期编排
│   ├── chapter-writing/       # 章节撰写
```

**更新2:** 在快速开始部分更新章节撰写描述：

找到：
```
6. 章节撰写: `/skill chapter-writing`
7. 审阅修订: `/skill review-revision`
```

替换为：
```
6. 章节撰写: `/skill chapter-cycle` → 自动完成撰写、审核、提交
```

并重新编号后续步骤为7。

**更新3:** 在Skills说明表格中添加chapter-cycle：

在表格中找到outline-design行，在其后添加：
```markdown
| chapter-cycle | 章节生命周期编排（撰写+审核+提交） | outline完成 |
```

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "docs: update README with chapter-cycle skill"
```
