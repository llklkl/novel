# 检查维度

## 检查清单详细定义

```yaml
check_list:
  plot_dimensions:
    - dimension: "因果关系合理性"
      check_items:
        - "情节发展是否有合理的因果关系"
        - "事件A是否合理导致事件B"
        - "因果关系是否自洽"
        - "是否有因果关系断裂"
      severity_threshold: "因果关系不合理"

    - dimension: "情节线完整性"
      check_items:
        - "情节线是否有开头、发展、结尾"
        - "是否存在未解决的情节线"
        - "情节线是否与大纲一致"
        - "是否有情节线遗漏"
      severity_threshold: "情节线不完整"

    - dimension: "人物动机充分性"
      check_items:
        - "人物行为是否符合动机设定"
        - "关键决策是否有充分动机"
        - "动机是否与角色档案一致"
        - "是否有动机缺失"
      severity_threshold: "人物动机不充分"

    - dimension: "情节漏洞检查"
      check_items:
        - "是否有情节漏洞（未解释的跳跃）"
        - "是否有情节矛盾"
        - "是否有逻辑矛盾"
        - "是否有信息缺失"
      severity_threshold: "情节漏洞"

    - dimension: "伏笔揭示检查"
      check_items:
        - "本章是否揭示大纲中的伏笔"
        - "伏笔揭示是否合理"
        - "是否有伏笔遗漏"
        - "伏笔是否与真相对应"
      severity_threshold: "伏笔揭示问题"
```