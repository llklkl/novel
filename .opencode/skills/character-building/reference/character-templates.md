# 角色档案模板

## 角色档案模板详细定义

```json
{
  "characters": [
    {
      "name": "角色名称",
      "role": "protagonist/antagonist/supporting",
      "age": "年龄",
      "gender": "性别",
      "appearance": "外貌特征（具体描述）",
      "personality": [
        "性格特征1",
        "性格特征2",
        "性格特征3"
      ],
      "background": "背景故事（成长经历、重要事件）",
      "motivation": "核心动机（表层动机 + 深层动机）",
      "weakness": "性格缺陷/成长空间",
      "expertise": "专业技能/特殊能力",
      "family_status": "家庭状况",
      "important_person": "重要人物（家人/爱人/导师）",
      "internal_conflict": "内心冲突",
      "external_conflict": "外部冲突",
      "role_in_story": "在故事中的作用"
    }
  ]
}
```

**每个主角必须有完整档案！**

**构建顺序：**
1. 主角（protagonist）
2. 反派（antagonist，如有）
3. 主要配角（supporting，2-3个关键配角）

## 角色弧线模板详细定义

```json
{
  "arc": {
    "starting_point": {
      "state": "起点状态（信念、能力、关系）",
      "belief": "初始信念",
      "ability": "初始能力",
      "relationships": "初始关系"
    },
    "challenges": [
      "挑战1：外部事件触发变化",
      "挑战2：内心冲突激化",
      "挑战3：关键转折点"
    ],
    "turning_point": {
      "event": "转折事件",
      "realization": "角色顿悟/觉醒",
      "decision": "角色做出关键决定"
    },
    "ending_point": {
      "state": "终点状态（信念、能力、关系）",
      "belief": "最终信念",
      "ability": "最终能力",
      "relationships": "最终关系",
      "growth": "角色成长总结"
    }
  }
}
```

## 对话风格模板详细定义

```json
{
  "dialogue_style": {
    "tone": "语言基调（正式/随意/冷漠/热情）",
    "rhythm": "说话节奏（短句为主/长句为主/快节奏/慢节奏）",
    "vocabulary": [
      "专属词汇1",
      "专属词汇2",
      "专属词汇3"
    ],
    "catchphrase": "口头禅",
    "emotional_expression": "情绪表达方式（含蓄/直白/幽默掩饰/防御性）",
    "examples": [
      {
        "context": "场景1：紧张时",
        "dialogue": "具体对话示例1"
      },
      {
        "context": "场景2：放松时",
        "dialogue": "具体对话示例2"
      },
      {
        "context": "场景3：与亲近的人",
        "dialogue": "具体对话示例3"
      },
      {
        "context": "场景4：与陌生人",
        "dialogue": "具体对话示例4"
      }
    ],
    "differences": {
      "with_protagonist": "与主角对话时的风格差异",
      "with_antagonist": "与反派对话时的风格差异",
      "with_family": "与家人对话时的风格差异"
    }
  }
}
```