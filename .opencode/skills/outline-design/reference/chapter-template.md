# 章节模板

## 章节模板详细定义

```yaml
chapters:
  - number: 1
    title: "章节标题"
    purpose: "本章目的（明确功能）"
    plot_points:
      - "情节点1：具体事件"
      - "情节点2：具体事件"
    key_scenes:
      - scene: "关键场景1"
        characters: ["出场角色"]
        location: "场景地点"
        conflict: "场景冲突"
    conflicts:
      - type: "冲突类型（外部/内部/人际关系）"
        participants: ["参与角色"]
        escalation: "冲突升级方式"
    character_appearances:
      - character: "角色名"
        arc_progress: "本章弧线进展"
    foreshadowing:
      - hint: "伏笔内容"
        payoff_chapter: "揭示章节"
        type: "伏笔类型（情节/角色/世界观）"
    tension_level: "张力等级（低/中/高）"
    status: "planned"
```

**每个章节必须包含：**
- purpose（本章目的）
- plot_points（具体情节点）
- key_scenes（关键场景）
- conflicts（冲突设计）
- character_appearances（角色弧线进展）
- foreshadowing（伏笔设计，易遗漏！）
- tension_level（张力等级）