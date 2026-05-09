# 检查维度

## 检查清单详细定义

```json
{
  "check_list": {
    "setting_dimensions": [
      {
        "dimension": "时代背景一致性",
        "check_items": [
          "语言是否符合时代特征（如古风/现代）",
          "物品是否符合时代（如无手机出现）",
          "技术是否符合时代水平",
          "文化习俗是否符合时代"
        ],
        "severity_threshold": "时代不符"
      },
      {
        "dimension": "地点设定一致性",
        "check_items": [
          "地点名称是否与设定一致",
          "地理环境描述是否一致（气候、地形）",
          "地点结构是否一致（如空间站布局）",
          "关键场景是否存在"
        ],
        "severity_threshold": "地点描述矛盾"
      },
      {
        "dimension": "世界观规则一致性",
        "check_items": [
          "特殊机制是否遵守规则（如时间回环规则）",
          "限制是否遵守（如魔法限制）",
          "规则应用是否自洽",
          "规则是否被违反"
        ],
        "severity_threshold": "违反世界观规则"
      },
      {
        "dimension": "社会体系一致性",
        "check_items": [
          "政治制度是否体现",
          "经济体系是否一致",
          "社会阶层是否合理",
          "文化习俗是否遵守"
        ],
        "severity_threshold": "社会制度不符"
      },
      {
        "dimension": "科技水平一致性",
        "check_items": [
          "科技设备是否符合科技水平",
          "技术能力是否一致",
          "科技术语是否准确",
          "未出现的科技是否被提及"
        ],
        "severity_threshold": "科技水平不符"
      },
      {
        "dimension": "魔法体系一致性（如有）",
        "check_items": [
          "魔法规则是否遵守",
          "魔法限制是否遵守",
          "魔法能力是否符合设定",
          "魔法术语是否统一"
        ],
        "severity_threshold": "违反魔法规则"
      }
    ]
  }
}
```