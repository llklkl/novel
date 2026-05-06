# 审阅修订系统重构 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有的review-revision skill拆分为1个主skill + 6个独立检查skill的模块化架构。

**Architecture:** 主skill(review-revision)控制审阅流程，依次调度6个检查skill执行检查，汇总问题列表生成统一报告，用户确认后更新状态。

**Tech Stack:** OpenCode skills (SKILL.md with YAML frontmatter), YAML配置文件, Markdown章节文件

---

### Task 1: 创建角色一致性检查Skill (check-character)

**Files:**
- Create: `.opencode/skills/check-character/SKILL.md`

- [ ] **Step 1: 创建check-character SKILL.md**

创建文件 `.opencode/skills/check-character/SKILL.md`:

```markdown
---
name: check-character
description: 检查小说章节中角色设定的一致性
---

# 角色一致性检查Skill

## 职责
检查章节中人物相关设定是否与项目配置一致。

## 输入
- 章节内容（Markdown格式）
- 项目配置（novel-project.yaml中的world_building.characters部分）

## 检查规则
1. **外貌一致性**: 人物外貌描述是否与设定一致（如眼睛颜色、身高、发型等）
2. **性格一致性**: 人物行为是否符合其性格特征
3. **关系一致性**: 人物之间的关系是否与设定一致
4. **称呼统一**: 人物称呼是否统一（全名、昵称、称号等）
5. **状态检查**: 已死亡或离开的角色是否错误出现

## 输出格式
问题列表，每项包含：
- 位置: 段落号或行号
- 类型: character
- 严重程度: 错误/警告
- 描述: 问题描述
- 建议: 建议修改方案

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **无角色设定**: 提示用户先完成world-building阶段
- **章节内容为空**: 提示用户先完成章节撰写
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/check-character/SKILL.md
git commit -m "feat: add check-character skill for character consistency"
```

---

### Task 2: 创建世界观设定检查Skill (check-setting)

**Files:**
- Create: `.opencode/skills/check-setting/SKILL.md`

- [ ] **Step 1: 创建check-setting SKILL.md**

创建文件 `.opencode/skills/check-setting/SKILL.md`:

```markdown
---
name: check-setting
description: 检查小说章节中世界观设定的一致性
---

# 世界观设定检查Skill

## 职责
检查章节中世界观设定是否被遵守。

## 输入
- 章节内容（Markdown格式）
- 项目配置（novel-project.yaml中的world_building.setting部分）

## 检查规则
1. **规则遵守**: 是否违反已定义的世界观规则（魔法体系、科技水平等）
2. **地点一致性**: 地点描述是否与设定一致
3. **时代背景**: 语言、物品、技术是否符合时代背景
4. **社会制度**: 社会制度、文化习俗是否被遵守

## 输出格式
问题列表，每项包含：
- 位置: 段落号或行号
- 类型: setting
- 严重程度: 错误/警告
- 描述: 问题描述
- 建议: 建议修改方案

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **无世界观设定**: 提示用户先完成world-building阶段
- **章节内容为空**: 提示用户先完成章节撰写
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/check-setting/SKILL.md
git commit -m "feat: add check-setting skill for world setting consistency"
```

---

### Task 3: 创建时间线连贯检查Skill (check-timeline)

**Files:**
- Create: `.opencode/skills/check-timeline/SKILL.md`

- [ ] **Step 1: 创建check-timeline SKILL.md**

创建文件 `.opencode/skills/check-timeline/SKILL.md`:

```markdown
---
name: check-timeline
description: 检查小说章节中时间线的连贯性
---

# 时间线连贯检查Skill

## 职责
检查章节中时间线是否连贯合理。

## 输入
- 章节内容（Markdown格式）
- 项目配置（novel-project.yaml中的outline.chapters和world_building部分）

## 检查规则
1. **事件顺序**: 事件顺序是否符合逻辑
2. **时间跨度**: 时间跨度是否合理（如"三天后"是否真的合理）
3. **年龄一致性**: 人物年龄、成长时间是否一致
4. **章节衔接**: 前后章节时间是否衔接

## 输出格式
问题列表，每项包含：
- 位置: 段落号或行号
- 类型: timeline
- 严重程度: 错误/警告
- 描述: 问题描述
- 建议: 建议修改方案

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **无大纲信息**: 提示用户先完成outline-design阶段
- **章节内容为空**: 提示用户先完成章节撰写
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/check-timeline/SKILL.md
git commit -m "feat: add check-timeline skill for timeline consistency"
```

---

### Task 4: 创建情节逻辑检查Skill (check-plot)

**Files:**
- Create: `.opencode/skills/check-plot/SKILL.md`

- [ ] **Step 1: 创建check-plot SKILL.md**

创建文件 `.opencode/skills/check-plot/SKILL.md`:

```markdown
---
name: check-plot
description: 检查小说章节中情节逻辑的合理性
---

# 情节逻辑检查Skill

## 职责
检查章节中情节逻辑是否合理。

## 输入
- 章节内容（Markdown格式）
- 项目配置（novel-project.yaml中的outline.chapters和world_building.characters部分）

## 检查规则
1. **因果关系**: 情节发展是否有合理的因果关系
2. **情节线完整性**: 是否存在未解决的情节线
3. **人物动机**: 人物动机是否充分
4. **情节漏洞**: 是否有情节漏洞或矛盾

## 输出格式
问题列表，每项包含：
- 位置: 段落号或行号
- 类型: plot
- 严重程度: 错误/警告
- 描述: 问题描述
- 建议: 建议修改方案

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **无大纲信息**: 提示用户先完成outline-design阶段
- **章节内容为空**: 提示用户先完成章节撰写
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/check-plot/SKILL.md
git commit -m "feat: add check-plot skill for plot logic checking"
```

---

### Task 5: 创建违禁词合规检查Skill (check-content)

**Files:**
- Create: `.opencode/skills/check-content/SKILL.md`

- [ ] **Step 1: 创建check-content SKILL.md**

创建文件 `.opencode/skills/check-content/SKILL.md`:

```markdown
---
name: check-content
description: 检查小说章节内容是否合规
---

# 违禁词合规检查Skill

## 职责
检查章节内容是否合规，包括违禁词和敏感内容。

## 输入
- 章节内容（Markdown格式）
- 项目配置（novel-project.yaml中的consistency_rules部分，可扩展违禁词列表）

## 检查规则
1. **违禁词**: 是否包含用户定义的违禁词
2. **敏感内容**: 是否包含敏感内容（暴力、色情等，按用户设定级别）
3. **平台规范**: 是否符合目标平台的发布规范
4. **政治宗教**: 是否有不当的政治/宗教内容

## 输出格式
问题列表，每项包含：
- 位置: 段落号或行号
- 类型: content
- 严重程度: 错误/警告
- 描述: 问题描述
- 建议: 建议修改方案

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **章节内容为空**: 提示用户先完成章节撰写
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/check-content/SKILL.md
git commit -m "feat: add check-content skill for content compliance checking"
```

---

### Task 6: 创建叙事风格检查Skill (check-style)

**Files:**
- Create: `.opencode/skills/check-style/SKILL.md`

- [ ] **Step 1: 创建check-style SKILL.md**

创建文件 `.opencode/skills/check-style/SKILL.md`:

```markdown
---
name: check-style
description: 检查小说章节叙事风格的一致性
---

# 叙事风格检查Skill

## 职责
检查章节叙事风格是否一致。

## 输入
- 章节内容（Markdown格式）
- 项目配置（可选，主要基于文本分析）

## 检查规则
1. **叙事视角**: 叙事视角是否一致
2. **文风语气**: 文风、语气是否统一
3. **对话风格**: 对话风格是否符合角色身份
4. **重复表达**: 是否有重复句式或冗余表达
5. **段落节奏**: 段落长度、节奏是否合理

## 输出格式
问题列表，每项包含：
- 位置: 段落号或行号
- 类型: style
- 严重程度: 错误/警告
- 描述: 问题描述
- 建议: 建议修改方案

## 错误处理
- **章节内容为空**: 提示用户先完成章节撰写
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/check-style/SKILL.md
git commit -m "feat: add check-style skill for narrative style checking"
```

---

### Task 7: 重写主审阅Skill (review-revision)

**Files:**
- Modify: `.opencode/skills/review-revision/SKILL.md`

- [ ] **Step 1: 替换review-revision SKILL.md**

替换文件 `.opencode/skills/review-revision/SKILL.md` 内容为：

```markdown
---
name: review-revision
description: 调度审阅修订流程，汇总各检查skill结果生成统一报告
---

# 审阅修订主Skill

## 职责
控制审阅修订流程，调度各检查skill完成审阅，汇总报告后统一处理。

## 前置条件
- 项目已通过novel-project skill初始化
- 存在drafted状态的章节

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 确认存在drafted状态的章节
   - 完成标准: 成功读取配置

2. **选择要审阅的章节**
   - 列出所有drafted状态的章节
   - 用户选择要审阅的章节
   - 完成标准: 用户选择一个章节

3. **调度检查**
   - 依次调用以下检查skill：
     - check-character（角色一致性检查）
     - check-setting（世界观设定检查）
     - check-timeline（时间线连贯检查）
     - check-plot（情节逻辑检查）
     - check-content（违禁词合规检查）
     - check-style（叙事风格检查）
   - 收集每个检查返回的问题列表
   - 完成标准: 所有检查执行完成

4. **生成汇总报告**
   - 合并所有问题列表
   - 按严重程度排序（错误在前，警告在后）
   - 标注每个问题的来源检查
   - 完成标准: 报告生成

5. **用户确认修改**
   - 展示统一报告
   - 用户逐项确认修复或忽略
   - 完成标准: 用户确认所有修改

6. **更新状态**
   - 保存修改后的章节
   - 更新chapters.reviewed列表
   - 完成标准: 配置文件成功更新

## AI角色
协作伙伴模式 - 批评、建议、质疑

## 输出
- 审阅报告（统一格式，按严重程度排序）
- 更新后的章节文件
- 更新后的chapters.reviewed列表

## 统一报告格式

```markdown
# 审阅报告 - 第X章

## 错误（必须修复）

| # | 来源 | 位置 | 问题 | 建议 |
|---|------|------|------|------|
| 1 | check-character | 第3段 | 张三眼睛颜色与设定不符 | 将"蓝色眼睛"改为"黑色眼睛" |
| 2 | check-timeline | 第7段 | 时间跳跃不合理 | 补充过渡说明 |

## 警告（建议改进）

| # | 来源 | 位置 | 问题 | 建议 |
|---|------|------|------|------|
| 1 | check-style | 第5段 | 对话风格与角色身份不符 | 调整用词更符合角色背景 |
```

## 注意事项
- 发现问题时提供具体位置
- 建议修改要具体可行
- 区分警告和错误级别
- 如需重新审阅已完成的章节，可将其从chapters.reviewed中移回chapters.drafted后重新执行

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **无drafted章节**: 提示用户先完成章节撰写阶段
- **章节文件读取失败**: 提示用户检查文件是否存在且格式正确
- **检查skill执行失败**: 跳过失败的检查，继续执行其他检查，并在报告中说明
```

- [ ] **Step 2: 提交**

```bash
git add .opencode/skills/review-revision/SKILL.md
git commit -m "feat: refactor review-revision to dispatch check skills"
```

---

### Task 8: 更新README文档

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 更新README中的Skills说明**

修改 `README.md` 中的Skills说明表格，将原来的review-revision替换为新的架构：

将原来的：
```markdown
| review-revision | 审阅修订 | 存在drafted章节 |
```

替换为：
```markdown
| review-revision | 审阅修订（主skill） | 存在drafted章节 |
| check-character | 角色一致性检查 | 可独立调用 |
| check-setting | 世界观设定检查 | 可独立调用 |
| check-timeline | 时间线连贯检查 | 可独立调用 |
| check-plot | 情节逻辑检查 | 可独立调用 |
| check-content | 违禁词合规检查 | 可独立调用 |
| check-style | 叙事风格检查 | 可独立调用 |
```

同时更新目录结构部分，将：
```
│   ├── review-revision/       # 审阅修订
```

替换为：
```
│   ├── review-revision/       # 审阅修订（主skill）
│   ├── check-character/       # 角色一致性检查
│   ├── check-setting/         # 世界观设定检查
│   ├── check-timeline/        # 时间线连贯检查
│   ├── check-plot/            # 情节逻辑检查
│   ├── check-content/         # 违禁词合规检查
│   └── check-style/           # 叙事风格检查
```

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "docs: update README with new review skill architecture"
```
