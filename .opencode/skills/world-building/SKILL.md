---
name: world-building
description: 构建小说世界观，包括角色设定、世界观规则和背景设定
---

# 世界观构建Skill

## 职责
构建小说的世界观、人物、设定，为后续创作提供基础。

## 前置条件
- 项目已通过novel-project skill初始化
- ideation.status为"completed"

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 确认ideation已完成
   - 检查world_building部分的状态
   - 完成标准: 成功读取配置并确认前置条件满足

2. **询问时代背景**
   - 故事发生的时代
   - 现实世界还是虚构世界
   - 完成标准: 明确故事时代背景

3. **定义地点设定**
   - 主要故事发生地
   - 地理环境、气候等
   - 完成标准: 确定主要地点及其特征

4. **定义世界观规则**
   - 魔法体系（如有）
   - 科技水平
   - 社会制度
   - 其他特殊规则
   - 完成标准: 规则列表完整且自洽

5. **创建角色档案和关系网络**
   对每个角色收集以下信息：
   - name: 角色名称
   - role: protagonist/antagonist/supporting
   - traits: 性格特征列表
   - background: 背景故事
   - relationships: 与其他角色的关系
   同时定义：
   - 角色之间的关系纽带
   - 权力结构
   - 情感纽带
   - 完成标准: 主要角色档案和关系网络完整

6. **一致性检查**
   - 角色特征是否与主题契合
   - 世界观规则是否自洽
   - 完成标准: 无矛盾发现

7. **更新配置**
   - 将以上内容写入novel-project.yaml的world_building部分
   - 设置world_building.status为"completed"
   - 完成标准: 配置文件成功更新

## AI角色
协作伙伴模式 - 建议设定、提醒矛盾

## 输出
更新后的novel-project.yaml中world_building部分：

```yaml
world_building:
  setting:
    time_period: "时代背景"
    location: "地点设定"
    rules: ["规则1", "规则2"]
  characters:
    - name: "角色名"
      role: "protagonist/antagonist/supporting"
      traits: ["特征1", "特征2"]
      background: "背景故事"
      relationships: ["关系"]
  status: "completed"  # 可能值: pending, in_progress, completed
```

## 注意事项
- 角色设定要具体，避免模糊描述
- 世界观规则要自洽，不能有矛盾
- 提醒用户角色特征与主题的关联
- 如需修改已完成的world_building，可将status改为"in_progress"后重新执行此skill
- 如需回退world_building阶段，将status改为"in_progress"，重新执行此skill会覆盖现有数据

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **前置条件不满足**: 如果ideation.status不是completed，提示用户先完成创意构思阶段
- **角色设定冲突**: 发现角色特征矛盾时，提醒用户澄清
