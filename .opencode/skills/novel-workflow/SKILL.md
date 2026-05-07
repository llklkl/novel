---
name: novel-workflow
description: 小说写作全流程编排器，按顺序引导用户完成从项目创建到最终润色的7个阶段
---

# 小说写作工作流Skill

## 职责
统筹整个写作流程，引导用户按顺序完成各阶段，记录并更新进度。

## 前置条件
- 项目已通过novel-project skill初始化（或正在初始化）

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
   - 根据current_stage调用对应skill（如current_stage为novel-ideation则调用/skill novel-ideation）
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
1. novel-project → 2. novel-ideation → 3. world-building → 4. character-building → 5. outline-design → 6. chapter-cycle → 7. polish-style

## AI角色
协调者模式 - 调度各阶段skill，跟踪进度，引导用户完成全流程

## 输出
- 更新后的progress.yaml
- 进度报告（文本格式）

## 注意事项
- 工作流skill按顺序引导用户完成各阶段，不可跳过
- 每个阶段完成后自动更新progress.yaml
- 如需返回某阶段重新执行，可手动修改progress.yaml中对应阶段状态为pending
- 各阶段skill也可独立调用，但通过工作流skill调用可自动记录进度

## 错误处理
- **项目不存在**: 引导用户创建新项目
- **进度文件损坏**: 重新初始化进度
- **skill调用失败**: 提示用户手动执行或跳过
