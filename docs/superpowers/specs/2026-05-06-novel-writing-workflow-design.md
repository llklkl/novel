# 小说写作工作流设计文档

## 项目概述

**目标:** 创建一套阶段式的小说写作技能（skills），支持大纲驱动型创作，通过配置文件统一管理项目状态，实现自动一致性检查。

**写作类型:** 大纲驱动型（先规划大纲，再填充内容）

**AI角色:** 综合型（多角色切换）- 在不同阶段切换为协作伙伴、内容生成器等角色

## 核心设计

### 整体架构

```
.opencode/skills/
├── novel-ideation/
│   └── SKILL.md              # 创意构思
├── world-building/
│   └── SKILL.md              # 世界观构建
├── outline-design/
│   └── SKILL.md              # 大纲设计
├── chapter-writing/
│   └── SKILL.md              # 章节撰写
├── review-revision/
│   └── SKILL.md              # 审阅修订
├── polish-style/
│   └── SKILL.md              # 文本润色
└── novel-project/
    └── SKILL.md              # 项目管理（辅助）

项目根目录/
├── novel-project.yaml        # 项目配置文件
├── chapters/                 # 章节文件
│   ├── chapter-01.md
│   ├── chapter-02.md
│   └── ...
└── assets/                   # 资源文件（可选）
```

**Skill命名规范:**
- 仅包含小写字母和数字，可用单个连字符分隔
- 不以 `-` 开头或结尾，不包含连续的 `--`
- 正则表达式: `^[a-z0-9]+(-[a-z0-9]+)*$`
- 目录名称与 `SKILL.md` 中的 `name` 字段一致

### 设计原则

1. **阶段式工作流**: 6个独立skill按创作流程顺序协作
2. **配置驱动**: 通过`novel-project.yaml`统一管理所有设定和状态
3. **自动一致性**: 每个skill读取配置，检查并维护一致性
4. **渐进式完善**: 从抽象到具体，每个阶段产出供后续使用

### Skill调用模式

- 用户按需调用: `/skill novel-ideation`
- 项目管理skill负责初始化配置文件
- 每个skill自动读取当前项目状态

### Skill依赖关系

**推荐执行顺序:**
1. 初始化项目 → novel-project
2. novel-project → novel-ideation
3. novel-ideation → world-building
4. world-building → outline-design
5. outline-design → chapter-writing
6. chapter-writing → review-revision
7. review-revision → polish-style

**前置条件检查:**
- Skill 02-06在启动时会检查前置配置是否完成
- 若前置配置未完成，提示用户先完成相应阶段
- 用户可选择跳过检查（高级模式）

**独立使用:**
- 用户可单独使用任意skill，但需要手动准备好所需配置
- 例如：单独使用章节撰写时，需确保`outline`和`world_building`配置已填写

## 配置文件设计

### novel-project.yaml 结构

```yaml
project:
  name: "小说名称"
  genre: "类型"
  target_words: 100000
  created: "2026-05-06"
  updated: "2026-05-06"

ideation:
  core_idea: "一句话核心理念"
  theme: "主题"
  keywords: ["关键词1", "关键词2"]
  pitch: "电梯演讲（100字内）"
  status: "completed"

world_building:
  setting:
    time_period: "时代背景"
    location: "地点设定"
    rules: "世界观规则"
  characters:
    - name: "角色名"
      role: "protagonist/antagonist/supporting"
      traits: ["特征1", "特征2"]
      background: "背景故事"
      relationships: ["关系"]
  status: "in_progress"

outline:
  structure: "three_act/four_act/hero_journey"
  chapters:
    - number: 1
      title: "章节标题"
      purpose: "本章目的"
      plot_points: ["情节点1"]
      status: "planned"
  status: "planned"

chapters:
  current: 1
  drafted: []
  reviewed: []
  polished: []

consistency_rules:
  - "人物特征不能矛盾"
  - "世界观规则保持一致"
```

### 关键特性

- 每个阶段有独立配置区域
- `status`字段追踪各阶段进度
- 章节状态细粒度管理(drafted/reviewed/polished)
- 一致性规则集中管理

## 各Skill详细设计

### Skill 1: 创意构思 (novel-ideation)

**职责:** 帮助用户从模糊想法到清晰创意概念

**工作流程:**
1. 询问创作动机和初步想法
2. 协助提炼核心理念(一句话)
3. 探索主题和关键词
4. 生成电梯演讲(100字内简洁描述，用于快速推销作品概念)
5. 更新`ideation`配置并标记`status: completed`

**AI角色:** 协作伙伴模式 - 提问、建议、帮助决策

**输入:** 用户创意描述（可选）

**输出:** 更新后的`ideation`配置部分

### Skill 2: 世界观构建 (world-building)

**职责:** 构建小说的世界观、人物、设定

**工作流程:**
1. 读取`ideation`配置，确保创意已确定
2. 询问时代背景、地点设定
3. 定义世界观规则(魔法体系、科技水平等)
4. 创建角色档案(主角、反派、配角)
5. 定义人物关系网络
6. 一致性检查:角色特征是否与主题契合
7. 更新`world_building`配置

**AI角色:** 协作伙伴模式 - 建议设定、提醒矛盾

**输入:** `novel-project.yaml`中的`ideation`部分

**输出:** 更新后的`world_building`配置部分

### Skill 3: 大纲设计 (outline-design)

**职责:** 从世界观到章节级规划

**工作流程:**
1. 读取`world_building`，确保世界观已完成
2. 选择结构类型(三幕/四幕/英雄之旅等)
3. 规划整体情节曲线
4. 拆分为章节，定义每章目的
5. 为每章标记情节点
6. 一致性检查:情节是否利用了角色特征、是否符合世界观
7. 更新`outline`配置，标记每章`status: planned`

**AI角色:** 协作伙伴模式 - 建议结构、质疑逻辑漏洞

**输入:** `novel-project.yaml`中的`world_building`部分

**输出:** 更新后的`outline`配置部分

### Skill 4: 章节撰写 (chapter-writing)

**职责:** 执行具体章节内容创作

**工作流程:**
1. 读取`outline`，选择要撰写的章节
2. 读取章节目的、情节点、相关角色设定
3. AI生成初稿(或用户主导写作)
4. 一致性检查:人物行为是否符合设定、世界观规则
5. 更新章节状态: `drafted`
6. 将草稿保存到`chapters/chapter-XX.md`

**AI角色:** 内容生成器模式 - 生成文本供用户修改

**输入:** `novel-project.yaml`中的`outline`和`world_building`部分

**输出:** 
- 章节文件: `chapters/chapter-01.md` (使用两位数字格式，如chapter-01, chapter-02)
- 更新后的`chapters.drafted`列表

**关键特性:**
- 自动加载相关设定避免遗忘
- 草稿与配置分离，章节文件独立管理

### Skill 5: 审阅修订 (review-revision)

**职责:** 检查一致性、逻辑、情节漏洞

**工作流程:**
1. 选择要审阅的章节
2. 一致性检查:
   - 人物特征是否矛盾
   - 世界观规则是否违反
   - 情节前后是否连贯
3. 逻辑检查:情节合理性
4. 生成审阅报告:问题列表+建议修改
5. 用户确认修改
6. 更新章节状态: `reviewed`

**AI角色:** 协作伙伴模式 - 批评、建议、质疑

**输入:** 章节文件 + `novel-project.yaml`完整配置

**输出:** 
- 审阅报告
- 更新后的章节文件
- 更新后的`chapters.reviewed`列表

### Skill 6: 文本润色 (polish-style)

**职责:** 文字润色、风格统一

**工作流程:**
1. 选择要润色的章节
2. 读取风格指南(或协助创建)
3. 执行润色:
   - 句式优化
   - 节奏调整
   - 风格统一
4. 生成润色版本对比
5. 用户确认
6. 更新章节状态: `polished`

**AI角色:** 内容生成器模式 - 提供改进版本

**输入:** 章节文件 + 风格指南

**输出:** 
- 润色后的章节文件
- 更新后的`chapters.polished`列表

## 一致性检查机制

### 实现方式

**内置于各skill中:** 每个skill在执行关键操作时自动调用一致性检查逻辑

**检查流程:**
1. 加载`novel-project.yaml`
2. 提取`consistency_rules`
3. 检查当前工作是否违反规则
4. 发现问题立即提示用户

### 内置一致性规则

1. **人物一致性**: 角色特征在所有章节中保持一致
2. **世界观一致性**: 不违反已定义的世界观规则
3. **时间线连贯**: 事件顺序符合逻辑
4. **设定引用**: 引用的人物、地点、物品必须存在于世界观设定中

### 错误处理

- 发现一致性问题时，skill暂停执行
- 生成详细的问题报告，包含位置和建议修复方案
- 用户选择: 忽略、修复、或修改设定

## 项目管理Skill (novel-project)

### 项目初始化

**功能:**
- 创建新项目: 初始化`novel-project.yaml`
- 加载现有项目: 读取配置并验证完整性
- 项目状态查看: 显示各阶段完成状态

**使用方式:**
- `/skill novel-project` 后选择操作类型
- 支持创建、加载、查看状态三种模式

## 文件组织结构

### 项目根目录

```
my-novel/
├── novel-project.yaml      # 项目配置
├── chapters/                # 章节文件
│   ├── chapter-01.md       # 使用两位数字格式
│   ├── chapter-02.md
│   └── ...
├── assets/                  # 资源文件（可选）
│   ├── images/
│   └── notes/
└── exports/                 # 导出文件（可选）
```

### 章节文件格式

```markdown
# 第一章: 章节标题

**状态:** drafted
**字数:** 3500
**创建时间:** 2026-05-06
**最后修改:** 2026-05-06

---

[章节内容...]

---

**审阅记录:**
- 2026-05-06: 初始草稿完成
```

## 技术实现要点

### Skill元数据

每个skill的 `SKILL.md` 必须包含 YAML frontmatter:

```yaml
---
name: novel-ideation
description: 协助完成小说创意构思，提炼核心理念、主题和关键词
---
```

**必填字段:**
- `name`: 技能名称（符合命名规范）
- `description`: 技能描述（1-1024字符）

**可选字段:**
- `license`: 许可证
- `compatibility`: 兼容性声明
- `metadata`: 自定义元数据映射

### 配置文件读写

- 使用YAML格式存储配置
- skill读取时验证必需字段
- 写入时保留注释和格式

### 错误处理

- 缺少前置阶段时提示用户
- 配置文件损坏时提供修复建议
- 一致性冲突时暂停并提供选项

## 使用示例

### 完整工作流

```bash
# 1. 初始化项目
/skill novel-project
# 选择创建新项目，填写基本信息

# 2. 创意构思
/skill novel-ideation
# AI协助提炼核心理念、主题、关键词

# 3. 世界观构建
/skill world-building
# AI协助定义世界设定、角色档案

# 4. 大纲设计
/skill outline-design
# AI协助规划章节结构、情节点

# 5. 章节撰写
/skill chapter-writing
# AI生成第一章草稿

# 6. 审阅修订
/skill review-revision
# AI检查一致性、逻辑问题

# 7. 文本润色
/skill polish-style
# AI优化文字风格

# 8. 查看项目状态
/skill novel-project
# 选择查看项目状态
```

### 单独使用某个阶段

```bash
# 只使用章节撰写
/skill chapter-writing
# 需要手动准备好 outline 和 world_building 配置

# 只使用审阅功能
/skill review-revision
# 需要有已完成 draft 的章节
```

## 成功标准

1. **阶段独立性**: 每个skill可独立使用，不强制按顺序
2. **配置完整性**: 配置文件清晰记录所有创作状态
3. **一致性保障**: 自动检测并提示一致性问题
4. **易用性**: 用户可通过简单命令完成创作流程
5. **可扩展性**: 易于添加新的阶段或检查规则

## 风险与缓解

### 风险1: 配置文件过于复杂

**缓解:** 
- 提供模板和自动初始化
- skill自动填充默认值
- 分阶段逐步完善配置

### 风险2: 一致性检查过于严格

**缓解:**
- 提供"忽略"选项
- 允许用户修改一致性规则
- 区分警告和错误级别

### 风险3: AI生成质量不稳定

**缓解:**
- 提供多种生成选项
- 支持用户主导写作
- 审阅阶段人工介入

## 未来扩展

1. **协作模式**: 支持多人协作，角色分工
2. **版本管理**: 集成git，追踪修改历史
3. **导出功能**: 支持多种格式导出(EPUB, PDF等)
4. **AI模型选择**: 允许用户选择不同AI模型
5. **风格库**: 预设多种写作风格模板