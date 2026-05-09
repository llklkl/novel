# 检查维度

## 检查清单详细定义

```json
{
  "check_list": {
    "timeline_dimensions": [
      {
        "dimension": "事件顺序合理性",
        "check_items": [
          "事件A是否应在事件B之前",
          "因果关系是否合理",
          "事件顺序是否自洽",
          "是否有事件顺序矛盾"
        ],
        "severity_threshold": "事件顺序矛盾"
      },
      {
        "dimension": "时间跨度合理性",
        "check_items": [
          "时间跨度（如'三天后'）是否与事件复杂度匹配",
          "时间跨度是否合理",
          "是否有时间跨度过长或过短",
          "季节变化是否合理"
        ],
        "severity_threshold": "时间跨度不合理"
      },
      {
        "dimension": "年龄一致性",
        "check_items": [
          "人物年龄是否符合设定",
          "成长时间是否一致",
          "年龄变化是否合理",
          "是否有年龄矛盾"
        ],
        "severity_threshold": "年龄不一致"
      },
      {
        "dimension": "章节衔接时间",
        "check_items": [
          "前章结尾时间是否与本章开头衔接",
          "章节间时间跨度是否合理",
          "是否有章节间时间跳跃未说明",
          "季节变化是否衔接"
        ],
        "severity_threshold": "章节间时间矛盾"
      },
      {
        "dimension": "时间跳跃处理",
        "check_items": [
          "时间跳跃是否有过渡说明",
          "跳跃是否合理",
          "跳跃后是否有背景交代",
          "跳跃是否影响连贯性"
        ],
        "severity_threshold": "时间跳跃处理不当"
      }
    ]
  }
}
```