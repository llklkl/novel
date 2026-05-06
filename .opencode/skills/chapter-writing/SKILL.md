---
name: chapter-writing
description: 执行小说章节内容创作，生成初稿
---

# 章节撰写Skill

## 职责
执行具体章节内容创作，生成章节初稿。

## 前置条件
- 项目已通过novel-project skill初始化
- outline.status为"completed"

## 工作流程

1. **加载项目配置**
   - 读取novel-project.yaml
   - 确认outline已完成
   - 读取chapters部分状态
   - 完成标准: 成功读取配置并确认前置条件满足

2. **选择要撰写的章节**
   - 列出所有planned状态的章节
   - 用户选择要撰写的章节
   - 完成标准: 用户选择一个章节

3. **加载相关设定**
   - 读取章节目的和情节点
   - 读取相关角色设定
   - 读取世界观规则
   - 完成标准: 相关设定加载完成

4. **生成初稿**
   - AI根据设定生成章节内容
   - 或用户主导写作，AI辅助
   - 完成标准: 章节初稿完成

5. **一致性检查**
   - 人物行为是否符合设定
   - 世界观规则是否遵守
   - 情节是否符合大纲
   - 完成标准: 无矛盾发现或用户确认接受

6. **保存章节**
   - 保存到chapters/chapter-XX.md（两位数字格式，如chapter-01）
   - 更新chapters.drafted列表
   - 更新章节状态
   - 完成标准: 文件保存成功且配置更新

## 章节文件格式

```markdown
# 第X章: 章节标题

**状态:** drafted
**创建时间:** YYYY-MM-DD
**最后修改:** YYYY-MM-DD

---

[章节内容...]

---

**审阅记录:**
- YYYY-MM-DD: 初始草稿完成
```

## AI角色
内容生成器模式 - 生成文本供用户修改

## 输出
- 章节文件: chapters/chapter-XX.md
- 更新后的chapters.drafted列表

## 注意事项
- 自动加载相关设定避免遗忘
- 草稿与配置分离
- 章节文件使用两位数字格式（chapter-01, chapter-02）
- 如需重新撰写已完成的章节，可将其从chapters.drafted中移除后重新执行

## 错误处理
- **配置文件不存在**: 提示用户先运行novel-project skill创建项目
- **前置条件不满足**: 如果outline.status不是completed，提示用户先完成大纲设计阶段
- **章节文件写入失败**: 提示用户检查目录权限或手动创建chapters目录
