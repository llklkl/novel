---
name: novel-project
description: 管理小说项目生命周期，包括创建、切换、加载项目和查看状态
---

# 项目管理Skill

## 职责
管理多小说项目生命周期，提供项目创建、切换、加载和状态查看功能。

## 使用方式
用户调用此skill后，询问用户想要执行的操作：
1. 创建新项目
2. 切换到已有项目
3. 查看当前项目状态
4. 列出所有项目

## 工作流程

### 创建新项目
1. 询问用户项目名称和类型
2. 在novels/目录下创建项目文件夹
3. 初始化novel-project.yaml配置文件
4. 创建chapters/和assets/子目录
5. 初始化progress.yaml进度文件（使用下方模板）

### 切换到已有项目
1. 扫描novels/目录下所有包含novel-project.yaml的子目录
2. 列出所有项目供用户选择
3. 加载选中项目的配置

### 查看项目状态
1. 读取当前项目的novel-project.yaml
2. 显示各阶段完成状态
3. 显示章节统计信息

### 列出所有项目
1. 扫描novels/目录
2. 列出每个项目的名称、类型、创建时间

## AI角色
工具模式 - 执行项目管理操作（创建目录、初始化配置、扫描项目）

## 输出
- 新项目目录（包含novel-project.yaml、chapters/、assets/）
- 或当前项目配置状态（查看模式）
- 或项目列表（列出模式）

## 错误处理

- **项目名冲突**: 创建项目时如果目录已存在，提示用户选择其他名称或覆盖
- **目录缺失**: 如果novels/目录不存在，自动创建
- **配置损坏**: 如果novel-project.yaml无法解析，提示用户检查文件格式或重新初始化

## 项目加载语义

- 所有skills通过读取当前工作目录下的novel-project.yaml获取项目状态
- 创建新项目后，自动切换到该项目目录
- 切换项目后，后续所有skill操作都作用于该项目

## 配置文件模板

当创建新项目时，使用以下模板初始化novel-project.yaml：

```yaml
project:
  name: "<项目名称>"
  genre: "<类型>"
  target_words: 100000
  created: "<YYYY-MM-DD>"
  updated: "<YYYY-MM-DD>"

ideation:
  core_idea: ""
  theme: ""
  keywords: []
  pitch: ""
  status: "pending"  # 可能值: pending, in_progress, completed

world_building:
  setting:
    time_period: ""
    location: ""
    rules: []
  characters: []
  status: "pending"  # 可能值: pending, in_progress, completed

outline:
  structure: ""
  chapters: []
  status: "pending"  # 可能值: pending, in_progress, completed

chapters:
  current: 1
  drafted: []
  reviewed: []
  polished: []

consistency_rules:
  - "人物特征不能矛盾"
  - "世界观规则保持一致"
```

## 进度文件模板

当创建新项目时，使用以下模板初始化progress.yaml：

```yaml
current_stage: novel-project
stages:
  novel-project:
    status: in_progress
    started_at: ""
  novel-ideation:
    status: pending
  world-building:
    status: pending
  outline-design:
    status: pending
  chapter-writing:
    status: pending
  review-revision:
    status: pending
  polish-style:
    status: pending
```

## 文件组织结构

每个项目目录结构：
```
novels/<project-name>/
├── novel-project.yaml
├── progress.yaml
├── chapters/
└── assets/
```

## 注意事项
- 所有项目都位于novels/目录下
- Skills位于.opencode/skills/目录，所有项目共享
- 配置文件使用YAML格式
- 状态字段：pending, in_progress, completed
