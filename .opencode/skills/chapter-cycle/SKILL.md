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
   - 更新章节状态为drafted
   - 完成标准: chapter-writing执行完成，章节状态更新

3. **执行章节审核**
   - 调用review-revision skill审核刚完成的章节
   - 等待审核完成
   - 更新章节状态为reviewed
   - 完成标准: review-revision执行完成，章节状态为reviewed

4. **提交到VCS**
   - git add章节文件（chapters/chapter-XX.md格式）、novel-project.yaml、progress.yaml
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
- **chapter-writing失败**: 提供选项：重试、跳过该章节、或手动完成
- **review-revision失败**: 提供选项：重新审核、跳过审核直接提交、或手动修改
- **git commit失败**: 提示用户检查git状态，提供手动提交指导
