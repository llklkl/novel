# 小说写作工作流

一套基于OpenCode skills的小说写作工作流，支持大纲驱动型创作。

## 功能特点

- **阶段式工作流**: 8个创作skills + 6个检查skills按创作流程协作
- **配置驱动**: 通过novel-project.yaml统一管理项目状态
- **自动一致性**: 每个skill自动检查并维护一致性
- **多项目支持**: 在novels/目录下管理多个小说项目

## 目录结构

```
.
├── .opencode/skills/          # 共享skills
│   ├── novel-workflow/        # 写作工作流
│   ├── novel-project/         # 项目管理
│   ├── novel-ideation/        # 创意构思
│   ├── world-building/        # 世界观构建
│   ├── character-building/    # 角色构建
│   ├── outline-design/        # 大纲设计
│   ├── chapter-cycle/         # 章节生命周期编排
│   ├── chapter-writing/       # 章节撰写
│   ├── check-character/       # 角色一致性检查
│   ├── check-setting/         # 世界观设定检查
│   ├── check-timeline/        # 时间线连贯检查
│   ├── check-plot/            # 情节逻辑检查
│   ├── check-content/         # 违禁词合规检查
│   ├── check-style/           # 叙事风格检查
│   └── polish-style/          # 文本润色
└── novels/                    # 小说项目目录
    └── <project-name>/        # 你的小说项目
        ├── novel-project.yaml
        ├── progress.yaml
        ├── chapters/
        └── assets/
```

## 快速开始

0. 使用工作流: `/skill novel-workflow` → 自动引导完成全流程
1. 创建新项目: `/skill novel-project` → 选择"创建新项目"
2. 创意构思: `/skill novel-ideation`
3. 世界观构建: `/skill world-building`
4. 角色构建: `/skill character-building`
5. 大纲设计: `/skill outline-design`
6. 章节撰写: `/skill chapter-cycle` → 自动完成撰写、审核、提交
7. 文本润色: `/skill polish-style`

## Skills说明

| Skill | 描述 | 前置条件 |
|-------|------|----------|
| novel-workflow | 写作工作流（统筹全流程） | 无 |
| novel-project | 管理项目生命周期 | 无 |
| novel-ideation | 创意构思 | 项目已初始化 |
| world-building | 世界观构建 | ideation完成 |
| character-building | 角色构建 | world_building完成 |
| outline-design | 大纲设计 | world_building完成 |
| chapter-cycle | 章节生命周期编排（撰写+审核+提交） | outline完成 |
| check-character | 角色一致性检查 | 可独立调用 |
| check-setting | 世界观设定检查 | 可独立调用 |
| check-timeline | 时间线连贯检查 | 可独立调用 |
| check-plot | 情节逻辑检查 | 可独立调用 |
| check-content | 违禁词合规检查 | 可独立调用 |
| check-style | 叙事风格检查 | 可独立调用 |
| polish-style | 文本润色 | 存在reviewed章节 |

## 配置文件

每个项目包含novel-project.yaml，记录：
- 项目基本信息
- 各阶段状态
- 世界观设定
- 大纲结构
- 章节进度
- 一致性规则

## 一致性检查

每个skill内置一致性检查：
- 人物一致性（check-character）
- 世界观一致性（check-setting）
- 时间线连贯（check-timeline）
- 情节逻辑（check-plot）
- 违禁词合规（check-content）
- 叙事风格（check-style）
