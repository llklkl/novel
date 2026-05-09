# 输出格式

## 标准化输出格式

```yaml
outline_design:
  structure:
    type: "three_act/four_act/hero_journey/custom"
    reason: "选择原因（根据故事特性）"
  
  plot_curve:
    setup:
      opening: "开篇引入"
      inciting_incident: "激励事件"
      first_turning_point: "第一转折"
    confrontation:
      rising_action: "冲突升级"
      midpoint: "中点转折"
      low_point: "低点"
    resolution:
      climax: "高潮"
    conclusion:
      falling_action: "后果"
      ending: "结局"
  
  chapters:
    - number: 1
      title: "章节标题"
      purpose: "本章目的"
      plot_points: ["情节点"]
      key_scenes:
        - scene: "场景"
          characters: ["角色"]
          location: "地点"
          conflict: "冲突"
      conflicts:
        - type: "冲突类型"
          participants: ["角色"]
          escalation: "升级方式"
      character_appearances:
        - character: "角色"
          arc_progress: "弧线进展"
      foreshadowing:
        - hint: "伏笔"
          payoff_chapter: "揭示章节"
          type: "类型"
      tension_level: "张力等级"
      status: "planned"
  
  conflict_escalation:
    - level: 1
      type: "冲突类型"
      example: "示例"
  
  tension_curve:
    - chapter_range: "章节范围"
      tension_level: "张力等级"
      curve_type: "曲线类型"
      description: "描述"
  
  foreshadowing_design:
    - hint_id: 1
      hint_content: "伏笔内容"
      hint_type: "类型"
      hint_chapter: "埋下章节"
      payoff_content: "揭示内容"
      payoff_chapter: "揭示章节"
      hint_technique: "技巧"
  
  status: "completed"
```