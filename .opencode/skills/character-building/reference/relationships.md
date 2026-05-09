# 角色关系网络

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