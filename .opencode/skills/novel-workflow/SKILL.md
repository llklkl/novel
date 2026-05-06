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
