# character-building Reference

## 角色档案模板详细定义

```yaml
characters:
  - name: "角色名称"
    role: "protagonist/antagonist/supporting"
    age: "年龄"
    gender: "性别"
    appearance: "外貌特征（具体描述）"
    personality:
      - "性格特征1"
      - "性格特征2"
      - "性格特征3"
    background: "背景故事（成长经历、重要事件）"
    motivation: "核心动机（表层动机 + 深层动机）"
    weakness: "性格缺陷/成长空间"
    expertise: "专业技能/特殊能力"
    family_status: "家庭状况"
    important_person: "重要人物（家人/爱人/导师）"
    internal_conflict: "内心冲突"
    external_conflict: "外部冲突"
    role_in_story: "在故事中的作用"
```

**每个主角必须有完整档案！**

**构建顺序：**
1. 主角（protagonist）
2. 反派（antagonist，如有）
3. 主要配角（supporting，2-3个关键配角）

## 角色弧线模板详细定义

```yaml
arc:
  starting_point:
    state: "起点状态（信念、能力、关系）"
    belief: "初始信念"
    ability: "初始能力"
    relationships: "初始关系"
  
  challenges:
    - "挑战1：外部事件触发变化"
    - "挑战2：内心冲突激化"
    - "挑战3：关键转折点"
  
  turning_point:
    event: "转折事件"
    realization: "角色顿悟/觉醒"
    decision: "角色做出关键决定"
  
  ending_point:
    state: "终点状态（信念、能力、关系）"
    belief: "最终信念"
    ability: "最终能力"
    relationships: "最终关系"
    growth: "角色成长总结"
```

## 对话风格模板详细定义

```yaml
dialogue_style:
  tone: "语言基调（正式/随意/冷漠/热情）"
  rhythm: "说话节奏（短句为主/长句为主/快节奏/慢节奏）"
  vocabulary:
    - "专属词汇1"
    - "专属词汇2"
    - "专属词汇3"
  catchphrase: "口头禅"
  emotional_expression: "情绪表达方式（含蓄/直白/幽默掩饰/防御性）"
  
  examples:
    - context: "场景1：紧张时"
      dialogue: "具体对话示例1"
    - context: "场景2：放松时"
      dialogue: "具体对话示例2"
    - context: "场景3：与亲近的人"
      dialogue: "具体对话示例3"
    - context: "场景4：与陌生人"
      dialogue: "具体对话示例4"
  
  differences:
    with_protagonist: "与主角对话时的风格差异"
    with_antagonist: "与反派对话时的风格差异"
    with_family: "与家人对话时的风格差异"
```

## 关系网络模板

```yaml
relationships:
  - character_a: "角色A"
    character_b: "角色B"
    relationship_type: "关系类型（师徒/战友/对立/暧昧/亲情）"
    intensity: "关系强度（强/中/弱）"
    description: "关系描述"
    evolution: "关系演变（开始→结束）"
```

**关系网络包括：**
- 权力关系（谁领导谁）
- 情感关系（爱/恨/友情/敌意）
- 利益关系（合作/竞争/冲突）

## 互动模式模板

```yaml
interaction_patterns:
  - characters: ["角色A", "角色B"]
    pattern: "互动模式（如：A主导，B顺从；或：A试探，B防御）"
    example: "具体互动示例"
  
  - characters: ["角色A", "角色C"]
    pattern: "互动模式"
    example: "具体互动示例"
```

**互动模式维度：**
- 权力动态（谁主导）
- 情感动态（信任/敌意）
- 沟通模式（直白/含蓄）
- 冲突模式（回避/对抗）

## 一致性检查详细定义

**角色内部一致性**：
- 角色特征是否自洽（性格、动机、缺陷）
- 角色弧线是否合理（起点→挑战→转折→终点）
- 对话风格是否符合角色特征

**角色间一致性**：
- 关系网络是否自洽（无矛盾）
- 互动模式是否符合关系定义
- 不同角色对话风格是否有区分度

**角色与世界一致性**：
- 角色专业是否符合时代背景
- 角色动机是否符合世界观
- 角色关系是否符合社会体系

## 标准化输出格式

```yaml
character_building:
  characters:
    - name: "角色名"
      role: "protagonist/antagonist/supporting"
      age: "年龄"
      gender: "性别"
      appearance: "外貌特征"
      personality: ["性格特征"]
      background: "背景故事"
      motivation: "核心动机"
      weakness: "性格缺陷"
      expertise: "专业技能"
      family_status: "家庭状况"
      important_person: "重要人物"
      internal_conflict: "内心冲突"
      external_conflict: "外部冲突"
      role_in_story: "故事作用"
      arc:
        starting_point:
          state: "起点状态"
          belief: "初始信念"
          ability: "初始能力"
          relationships: "初始关系"
        challenges:
          - "挑战1"
          - "挑战2"
          - "挑战3"
        turning_point:
          event: "转折事件"
          realization: "角色顿悟"
          decision: "关键决定"
        ending_point:
          state: "终点状态"
          belief: "最终信念"
          ability: "最终能力"
          relationships: "最终关系"
          growth: "成长总结"
      dialogue_style:
        tone: "语言基调"
        rhythm: "说话节奏"
        vocabulary: ["专属词汇"]
        catchphrase: "口头禅"
        emotional_expression: "情绪表达方式"
        examples:
          - context: "场景"
            dialogue: "示例"
        differences:
          with_protagonist: "风格差异"
          with_antagonist: "风格差异"
  
  relationships:
    - character_a: "角色A"
      character_b: "角色B"
      relationship_type: "关系类型"
      intensity: "关系强度"
      description: "关系描述"
      evolution: "关系演变"
  
  interaction_patterns:
    - characters: ["角色A", "角色B"]
      pattern: "互动模式"
      example: "互动示例"
  
  status: "completed"
```