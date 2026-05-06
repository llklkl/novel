# 小说写作工作流Skill设计文档

## 项目概述

**目标:** 创建一个工作流skill统筹整个小说写作流程，引导用户逐步完成各阶段，并将进度记录到独立的YAML文件中。

**核心设计:** 一个工作流skill负责加载项目、显示进度、调度各阶段skill、更新进度文件。

## 整体架构

### 目录结构

```
.opencode/skills/
└── novel-workflow/          # 工作流skill
    └── SKILL.md

novels/my-novel/
├── novel-project.yaml       # 项目配置
├── progress.yaml            # 进度记录（新增）
├── chapters/
└── assets/
```

### progress.yaml结构

```yaml
current_stage: outline-design
stages:
  novel-project: { status: completed, completed_at: 2026-05-06 }
  novel-ideation: { status: completed, completed_at: 2026-05-06 }
  world-building: { status: completed, completed_at: 2026-05-06 }
  outline-design: { status: in_progress, started_at: 2026-05-06 }
  chapter-writing: { status: pending }
  review-revision: { status: pending }
  polish-style: { status: pending }
```

### 状态值定义

- `pending`: 未开始
- `in_progress`: 进行中
- `completed`: 已完成

## 工作流skill详细设计

### novel-workflow SKILL.md结构

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
- 项目不存在: 引导用户创建新项目
- 进度文件损坏: 重新初始化进度
- skill调用失败: 提示用户手动执行或跳过
```

## 进度显示格式

```
📖 小说写作进度 - 《示例小说》

✅ novel-project      - 已完成 (2026-05-06)
✅ novel-ideation     - 已完成 (2026-05-06)
✅ world-building     - 已完成 (2026-05-06)
🔄 outline-design     - 进行中 (开始于 2026-05-06)
⏳ chapter-writing    - 未开始
⏳ review-revision    - 未开始
⏳ polish-style       - 未开始

下一步: 执行大纲设计阶段
是否现在开始执行？(是/否)
```

## 进度文件初始化模板

当项目首次创建时，progress.yaml初始化为：

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

## 与现有系统的关系

**新增：**
- novel-workflow skill
- 每个项目的progress.yaml文件

**保持不变：**
- novel-project.yaml配置结构不变
- 各阶段skill不变
- 章节文件格式不变

## 成功标准

1. novel-workflow skill实现，能正确调度各阶段
2. progress.yaml格式清晰，能准确反映进度
3. 进度显示美观易读
4. 错误处理完善
5. 支持中断后恢复进度
