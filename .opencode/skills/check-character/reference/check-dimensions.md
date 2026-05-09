# 检查维度

## 检查清单详细定义

```yaml
check_list:
  character_dimensions:
    - dimension: "性格一致性"
      check_items:
        - "外在行为是否符合 personality 特征"
        - "内心独白是否符合 personality 特征"
        - "决策是否符合 personality 特征"
        - "对压力反应是否符合 personality 特征"
      severity_threshold: "明显偏离设定"
    
    - dimension: "对话风格一致性"
      check_items:
        - "语气是否符合 tone 特征"
        - "节奏是否符合 rhythm 特征"
        - "是否使用 catchphrase（口头禅）"
        - "词汇是否符合 vocabulary 特征"
        - "情绪表达是否符合 emotional_expression 特征"
        - "对不同人的风格是否有差异（differences）"
      severity_threshold: "缺少口头禅或风格偏离"
    
    - dimension: "行为动机一致性"
      check_items:
        - "行为是否符合 motivation（核心动机）"
        - "决策是否符合 internal_conflict（内心冲突）"
        - "关键行为是否符合 role_in_story（故事作用）"
        - "行为是否符合 weakness（性格缺陷）"
      severity_threshold: "行为与动机矛盾"
    
    - dimension: "关系一致性"
      check_items:
        - "角色间互动是否符合 relationships 定义"
        - "称呼是否统一（全名/昵称）"
        - "情感表达是否符合 relationship_type"
        - "权力动态是否符合关系设定"
      severity_threshold: "关系表现与设定矛盾"
    
    - dimension: "状态检查"
      check_items:
        - "已死亡角色是否错误出现"
        - "已离开角色是否错误出现"
        - "角色状态是否符合当前情节位置"
      severity_threshold: "角色状态错误"
    
    - dimension: "弧线进展一致性"
      check_items:
        - "角色行为是否符合当前弧线阶段（starting_point/midpoint/ending_point）"
        - "角色成长是否符合 arc 定义"
        - "关键转折是否符合 turning_point"
      severity_threshold: "弧线进展不合理"
```