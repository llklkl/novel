# 评分标准

## 评分标准详细定义

```yaml
coherence_score:
  - level: 5
    label: "完全连贯"
    criteria: "所有时间线完全合理，无矛盾"

  - level: 4
    label: "基本连贯"
    criteria: "个别细微跳跃，不影响整体连贯性"

  - level: 3
    label: "部分连贯"
    criteria: "有跳跃或跨度问题，但核心时间线保持"

  - level: 2
    label: "明显不连贯"
    criteria: "多项跳跃或跨度问题"

  - level: 1
    label: "严重不连贯"
    criteria: "时间线矛盾，需重写"
```

**权重分配：**
- 事件顺序：权重 30%
- 时间跨度：权重 25%
- 年龄一致性：权重 20%
- 章节衔接：权重 15%
- 时间跳跃处理：权重 10%