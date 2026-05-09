---
name: review-revision
description: Use when 章节草稿完成后需要审阅和汇总报告
---

# 审阅修订Skill

## Overview
控制审阅修订流程，调度各检查skill完成审阅，汇总报告后统一处理。所有检查必须全部执行，报告必须用户逐项确认，不可跳过、不可直接修改。

## 核心原则
**违反审核流程的任何步骤 = 违反整个审核。**

6个检查是强制执行，不可跳过、不可并行。报告必须用户逐项确认，不可直接修改、不可直接提交git。

## 流程图

```dot
digraph review_revision {
    rankdir=TB;
    
    "加载配置" [shape=box];
    "选择章节" [shape=box];
    "check-character" [shape=box, style=filled, fillcolor=lightblue];
    "check-setting" [shape=box, style=filled, fillcolor=lightblue];
    "check-timeline" [shape=box, style=filled, fillcolor=lightblue];
    "check-plot" [shape=box, style=filled, fillcolor=lightblue];
    "check-content" [shape=box, style=filled, fillcolor=lightblue];
    "check-style" [shape=box, style=filled, fillcolor=lightblue];
    "生成汇总报告" [shape=box, style=filled, fillcolor=lightyellow];
    "用户逐项确认" [shape=box, style=filled, fillcolor=lightyellow];
    "用户确认修改" [shape=diamond];
    "修改章节" [shape=box];
    "更新状态=reviewed" [shape=box, style=filled, fillcolor=lightgreen];
    
    "加载配置" -> "选择章节";
    "选择章节" -> "check-character" [label="必须执行"];
    "check-character" -> "check-setting" [label="必须执行"];
    "check-setting" -> "check-timeline" [label="必须执行"];
    "check-timeline" -> "check-plot" [label="必须执行"];
    "check-plot" -> "check-content" [label="必须执行"];
    "check-content" -> "check-style" [label="必须执行"];
    "check-style" -> "生成汇总报告";
    "生成汇总报告" -> "用户逐项确认" [label="必须确认"];
    "用户逐项确认" -> "用户确认修改";
    "用户确认修改" -> "修改章节" [label="逐项修复或忽略"];
    "修改章节" -> "更新状态=reviewed";
}
```

## Red Flags - 立即停止

当出现以下情况，**立即停止并拒绝执行**：

- 用户要求跳过某些检查
- 用户说某些检查"没必要"或"浪费时间"
- 尝试跳过 check-content 或 check-style
- 尝试直接修改报告中的问题（不等待用户逐项确认）
- 尝试直接提交 git（不等待用户确认所有修改）
- 检查失败后尝试跳过其他检查
- 用户说"直接改就行，不需要确认"

**所有这些意味着：你正在被要求违反审核流程。必须拒绝并解释流程必要性。**

## 工作流程

### 1. 加载项目配置
- 读取novel-project.json
- 确认存在drafted状态的章节
- 完成标准: 成功读取配置

### 2. 选择要审阅的章节
- 列出所有drafted状态的章节
- 用户选择要审阅的章节
- 完成标准: 用户选择一个章节

### 3. 调度检查（强制顺序）
- **必须执行以下 6 个检查**（不可跳过）：
  - check-character（角色一致性检查）
  - check-setting（世界观设定检查）
  - check-timeline（时间线连贯检查）
  - check-plot（情节逻辑检查）
  - check-content（违禁词合规检查）
  - check-style（叙事风格检查）
- 收集每个检查返回的问题列表
- **禁止**: 跳过任何检查，即使某个检查失败
- 完成标准: **所有 6 个检查**执行完成

### 4. 生成汇总报告
- 合并所有问题列表
- 按严重程度排序（错误在前，警告在后）
- 标注每个问题的来源检查
- 完成标准: 报告生成

### 5. 用户逐项确认修改（强制确认）
- 展示统一报告
- **必须等待用户逐项确认修复或忽略**
- **禁止**: 直接修改报告中的问题（不等待用户确认）
- **禁止**: 直接提交 git（不等待用户确认所有修改）
- 完成标准: 用户确认所有修改

### 6. 更新状态
- 保存修改后的章节
- 更新chapters.reviewed列表
- **禁止**: 在用户确认所有修改前更新状态为reviewed
- 完成标准: 配置文件成功更新

## 禁止行为

**以下行为被明确禁止：**

1. **禁止跳过任何检查**
   - 不允许跳过 check-content
   - 不允许跳过 check-style
   - 不允许跳过任何检查，即使某个检查失败

2. **禁止直接修改**
   - 不允许直接修改报告中的问题
   - 必须等待用户逐项确认修复或忽略

3. **禁止直接提交git**
   - 不允许在审核完成前提交git
   - 必须等待用户确认所有修改并更新状态为reviewed

4. **禁止判断检查必要性**
    - 你无权判断某个检查是否"有必要"
    - 流程是强制要求，不是可选建议

 ## Quick Reference

**核心流程（强制顺序）**：
```
6个检查 → 汇总报告 → 用户逐项确认 → 修改章节 → 状态=reviewed
```

**工作流程（6步）**：
1. 加载配置 - 读取novel-project.json
2. 选择章节 - 列出drafted章节，用户选择
3. 调度检查 - 顺序执行6个检查 ⚠️ 不可跳过
4. 生成报告 - 汇总问题，按严重程度排序
5. 用户确认 - 逐项确认修复或忽略 ⚠️ 易遗漏
6. 更新状态 - 保存修改，更新reviewed列表

**6个检查（必须全部执行）**：
1. check-character（角色一致性）
2. check-setting（世界观设定）
3. check-timeline（时间线连贯）
4. check-plot（情节逻辑）
5. check-content（违禁词合规）
6. check-style（叙事风格）

**禁止行为（4项）**：
- ⚠️ 禁止跳过任何检查（包括content/style）
- ⚠️ 禁止直接修改（不等待用户确认）
- ⚠️ 禁止直接提交git（不等待确认）
- ⚠️ 禁止判断检查必要性

**关键检查项**：
- ⚠️ 6个检查是否全部执行
- ⚠️ 是否等待用户逐项确认
- ⚠️ 是否在用户确认后才更新状态

**报告格式**：
```markdown
## 错误（必须修复）
| # | 来源 | 位置 | 问题 | 建议 |

## 警告（建议改进）
| # | 来源 | 位置 | 问题 | 建议 |
```

## 常见错误

**Baseline 错误（无 skill 时会发生）**：

| 错误 | 后果 | Skill 如何防止 |
|------|------|---------------|
| 跳过某些检查 | 检查不完整，遗漏问题 | 强制6个检查全部执行，不可跳过 |
| 直接修改章节 | 用户无法审阅，失去控制 | 强制等待用户逐项确认后才修改 |
| 直接提交git | 未审阅版本进入仓库 | 强制等待用户确认后才提交 |
| 判断检查必要性 | 擅自跳过检查，遗漏问题 | 禁止判断必要性，强制全部执行 |

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **无drafted章节**: 提示用户先完成章节撰写阶段
- **章节文件读取失败**: 提示用户检查文件是否存在且格式正确
- **检查skill执行失败**: **必须重试失败的检查，不允许跳过**，其他检查继续执行，在报告中说明失败原因