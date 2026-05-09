# novel-project Reference

## 标准目录结构

```
novels/
└── <项目名称>/
    ├── novel-project.yaml  # 配置文件（必须）
    ├── progress.yaml       # 进度文件（必须）
    ├── chapters/           # 章节目录（必须）
    ├── assets/             # 资源目录（必须）
    ├── character_profile.yaml  # 角色设定（可选）
    └── world_building.yaml     # 世界观设定（可选）
```

## 配置文件模板

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
  status: "pending"

world_building:
  setting:
    time_period: ""
    location: ""
    rules: []
  characters: []
  status: "pending"

character_building:
  characters: []
  status: "pending"

outline:
  structure: ""
  chapters: []
  status: "pending"

chapters:
  current: 1
  drafted: []
  reviewed: []
  polished: []
  status: "pending"
```

## 进度文件模板

```yaml
current_stage: "novel-ideation"
stages:
  novel-project:
    status: "completed"
    started: "<YYYY-MM-DD HH:MM:SS>"
    completed: "<YYYY-MM-DD HH:MM:SS>"
  novel-ideation:
    status: "in_progress"
    started: "<YYYY-MM-DD HH:MM:SS>"
  world-building:
    status: "pending"
  character-building:
    status: "pending"
  outline-design:
    status: "pending"
  chapter-cycle:
    status: "pending"
  polish-style:
    status: "pending"
```