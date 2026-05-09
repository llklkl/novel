# 输出格式

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