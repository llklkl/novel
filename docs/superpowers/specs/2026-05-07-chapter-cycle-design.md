# 章节生命周期编排Skill设计文档

## 项目概述

**目标:** 创建chapter-cycle skill编排单章节的完整生命周期：撰写、审核、VCS提交。

**核心设计:** 新增chapter-cycle skill负责调度chapter-writing和review-revision，审核通过后自动git commit。

## 整体架构

### 新增文件

```
.opencode/skills/
└── chapter-cycle/           # 单章节生命周期编排skill（新增）
    └── SKILL.md
```

### 修改文件

```
.opencode/skills/
├── novel-workflow/SKILL.md  # 更新章节撰写阶段描述
└── chapter-writing/SKILL.md # 可选：移除保存步骤，由chapter-cycle接管
```

### 新流程

```
novel-workflow (进入章节撰写阶段)
  ↓
chapter-cycle (编排单章节)
  ↓
  ├── chapter-writing (生成初稿)
  ├── review-revision (审核该章)
  └── git commit (提交章节+配置)
  ↓
chapter-cycle (询问是否继续下一章)
  ↓
novel-workflow (所有章节完成后进入下一阶段)
```

## chapter-cycle skill详细设计

### SKILL.md结构

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

## 与现有系统的关系

**新增：**
- chapter-cycle skill

**修改：**
- novel-workflow阶段顺序中，chapter-writing阶段改为调用chapter-cycle
- chapter-writing可移除保存步骤（由chapter-cycle接管）

**保持不变：**
- novel-project.yaml配置结构不变
- review-revision skill不变
- 章节文件格式不变

## 成功标准

1. chapter-cycle skill实现，能正确调度chapter-writing和review-revision
2. 审核通过后自动git commit章节文件+配置文件
3. 支持逐章循环撰写
4. 错误处理完善
