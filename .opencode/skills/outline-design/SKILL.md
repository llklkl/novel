---
name: outline-design
description: 当角色构建完成后需要规划小说整体结构、章节划分和情节点时使用
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
   - 完成标准: 成功读取配置并确认前置条件满足

2. **选择结构类型**
   提供以下选项：
   - three_act: 三幕结构
   - four_act: 四幕结构
   - hero_journey: 英雄之旅
   - custom: 自定义结构
   - 完成标准: 用户选择一种结构类型

3. **规划整体情节曲线**
   - 开端：引入角色和世界
   - 发展：冲突升级
   - 高潮：关键转折
   - 结局：问题解决
   - 完成标准: 用户认可整体情节曲线

4. **拆分为章节**
   对每个章节定义：
   - number: 章节编号
   - title: 章节标题
   - purpose: 本章目的
   - plot_points: 情节点列表
   - status: planned
   - 完成标准: 所有章节定义完整

5. **一致性检查**
   - 情节是否利用了角色特征
   - 是否符合世界观规则
   - 情节点之间是否连贯
   - 完成标准: 无矛盾发现

6. **更新配置**
   - 将以上内容写入novel-project.yaml的outline部分
   - 设置outline.status为"completed"
   - 完成标准: 配置文件成功更新

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
  status: "completed"  # 可能值: pending, in_progress, completed
```

## 注意事项
- 章节数量根据目标字数和每章字数估算
- 每章应有明确的目的
- 情节点要具体，不能模糊
- 如需修改已完成的outline，可将status改为"in_progress"后重新执行此skill
- 如需回退outline阶段，将status改为"in_progress"，重新执行此skill会覆盖现有数据

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **前置条件不满足**: 如果world_building.status不是completed，提示用户先完成世界观构建阶段
- **章节规划冲突**: 发现情节点矛盾时，提醒用户澄清
