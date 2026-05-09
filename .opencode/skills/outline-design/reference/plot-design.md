# 情节设计

## 情节曲线核心节点（起承转合）

```json
{
  "plot_curve": {
    "setup": {
      "opening": "开篇引入（主角日常、世界观）",
      "inciting_incident": "激励事件（打破平衡）",
      "first_turning_point": "第一转折点（进入新世界）"
    },
    "confrontation": {
      "rising_action": "冲突升级（一系列对抗）",
      "midpoint": "中点转折（真相揭示或方向改变）",
      "low_point": "低点（主角最大挫折）"
    },
    "resolution": {
      "climax": "高潮（关键决战或真相揭露）"
    },
    "conclusion": {
      "falling_action": "后果处理（高潮后的余波）",
      "ending": "结局（新平衡或开放式）"
    }
  }
}
```

**每个节点必须明确：**
- 节点位置（在第几章）
- 节点内容（具体事件）
- 节点作用（推动什么变化）

## 情节点设计维度

```json
{
  "plot_point_design": {
    "event": "具体事件",
    "type": "情节点类型（激励事件/转折点/高潮/伏笔揭示）",
    "impact": {
      "on_plot": "对情节的影响",
      "on_character": "对角色的影响",
      "on_world": "对世界观的影响"
    },
    "setup": {
      "prerequisites": "前置条件（需要先完成什么）",
      "foreshadowing": "伏笔设置（需要提前埋下什么）"
    },
    "conflict_level": "冲突强度（1-10）",
    "tension_curve": "张力曲线位置（上升/峰值/下降）"
  }
}
```

**情节点类型：**
- 激励事件：打破平衡，启动故事
- 转折点：改变方向，揭示真相
- 高潮：冲突爆发，关键决战
- 伏笔揭示：揭示提前埋下的线索
- 低点：主角最大挫折
- 结局：问题解决，新平衡

## 冲突升级设计

```json
{
  "conflict_escalation": [
    {
      "level": 1,
      "type": "潜在冲突（矛盾萌芽）",
      "example": "角色间的初步分歧"
    },
    {
      "level": 2,
      "type": "显性冲突（矛盾爆发）",
      "example": "公开对抗或争论"
    },
    {
      "level": 3,
      "type": "危机冲突（矛盾激化）",
      "example": "关键事件触发生死抉择"
    },
    {
      "level": 4,
      "type": "高潮冲突（矛盾决战）",
      "example": "最终对决或真相揭露"
    }
  ]
}
```

**冲突升级原则：**
- 每个章节至少有一个冲突事件
- 冲突强度逐步升级（level 1 → level 4）
- 冲突类型多样化（外部/内部/人际关系）

## 张力曲线设计

```json
{
  "tension_curve": [
    {
      "chapter_range": "第1-5章",
      "tension_level": "中",
      "curve_type": "上升",
      "description": "建立冲突，张力逐步上升"
    },
    {
      "chapter_range": "第6-10章",
      "tension_level": "高",
      "curve_type": "峰值",
      "description": "中点转折，张力达到峰值"
    },
    {
      "chapter_range": "第11-12章",
      "tension_level": "中",
      "curve_type": "下降",
      "description": "低点挫折，张力短暂下降"
    },
    {
      "chapter_range": "第13-15章",
      "tension_level": "极高",
      "curve_type": "峰值",
      "description": "高潮决战，张力最高峰"
    },
    {
      "chapter_range": "第15章结局",
      "tension_level": "低",
      "curve_type": "下降",
      "description": "问题解决，张力回落"
    }
  ]
}
```

**节奏控制原则：**
- 张力曲线应有起伏（不能一直高或一直低）
- 高潮前应有低点（营造反差）
- 结局张力回落（给读者喘息空间）

## 伏笔设计

```json
{
  "foreshadowing_design": [
    {
      "hint_id": 1,
      "hint_content": "伏笔内容（暗示线索）",
      "hint_type": "伏笔类型（情节/角色/世界观）",
      "hint_chapter": "埋下章节",
      "payoff_content": "揭示内容（真相揭露）",
      "payoff_chapter": "揭示章节",
      "hint_technique": "伏笔技巧（象征/对话/细节/重复）"
    }
  ]
}
```

**伏笔类型：**
- 情节伏笔：暗示后续情节发展
- 角色伏笔：暗示角色真实身份或动机
- 世界观伏笔：暗示世界观真相

**伏笔技巧：**
- 象征：用象征性物品暗示
- 对话：通过对话暗示
- 细节：通过细节描写暗示
- 重复：通过重复出现暗示