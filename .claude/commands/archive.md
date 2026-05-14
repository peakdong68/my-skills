---
description: 将已完成的功能目录归档至 docs/spec/archive/，更新全局 Spec 索引并提交
---

将已完成验证的功能 spec 目录归档。归档前应先执行调用`my-agent-skills:documentation-and-adrs`技能记录决策与文档.

## 参数

- 功能目录路径（必选），例如 `docs/spec/feature_2026-01-15_F001_user-auth/`
- 如未指定路径，列出 `docs/spec/` 下所有 `feature_*` 目录供用户选择

## 步骤

### 步骤 1：定位源目录

确认传入的目录存在且包含以下文件：
- `spec-design.md` — 设计文档
- `plan.md`（或 `plan-<N>.md`）— 实现计划
- `verify-report.md` — 验证报告

如目录不存在或缺少关键文件，报告错误并由用户决定是否继续。

### 步骤 2：移动目录至 archive

```bash
mkdir -p docs/spec/archive
git mv <源目录> docs/spec/archive/<目录名>/
```

### 步骤 3：更新全局 Spec 索引

读取 `docs/spec/global/index.md`（第一次没有则新建），执行三项更新：

**3.1 追加归档行至 `## 已归档 Feature` 表格**

在表格开头新增一行：
```
| [<目录名>](../archive/<目录名>/) | <一句话摘要> | <领域> | <今日日期> |
```
- 摘要：从 `spec-design.md` 标题/概述 或 `plan.md` 目标字段提取，一句话
- 领域：从 Feature ID 主题段推断（如 `tool-search` → tool-search）
- 日期：当天 ISO 格式

如不存在 `## 已归档 Feature` 章节，在 `## 领域索引` 之前创建该章节和表格。

**3.2 更新领域索引计数**

在 `## 领域索引` 的列表中，找到匹配领域的行，将其 feature 计数 +1。
如无匹配行，新增一行：
```
- [<领域>](./domains/<领域>.md) — <描述> — 1 features
```

**3.3 更新页脚时间戳**

找到或创建 `*最后更新:*` 行，更新为：
```
*最后更新: YYYY-MM-DD — 由 <目录名> 归档时更新*
```

### 步骤 4：更新 ADR 索引

读取 `docs/decisions/index.md`（第一次没有则新建），将与归档功能相关的 ADR 记录到索引中。

**4.1 查找相关 ADR**

在 `docs/decisions/` 目录下搜索文件名或内容中引用了该功能目录名或 Feature ID 的 ADR 文件：

```bash
grep -rl "<目录名>\|<Feature ID>" docs/decisions/ADR-*.md 2>/dev/null || true
```

如未匹配到任何 ADR，输出提示"未找到关联 ADR，跳过索引更新"，直接进入步骤 5。

**4.2 追加归档行至 `## 已归档 Feature 关联 ADR` 表格**

读取 `docs/decisions/index.md`，在表格中为每个匹配的 ADR 新增一行：

```
| [<目录名>](../archive/<目录名>/) | [<ADR文件名>](./<ADR文件名>) | <ADR标题> | <今日日期> |
```

- ADR 标题：从 ADR 文件的 `# ADR-XXX：<标题>` 行提取
- 如不存在 `## 已归档 Feature 关联 ADR` 章节，在 `## ADR 列表` 之后（或文件末尾）创建该章节和表格

**4.3 更新页脚时间戳**

找到或创建 `*最后更新:*` 行，更新为：

```
*最后更新: YYYY-MM-DD — 由 <目录名> 归档时更新*
```

### 步骤 5：提交

```bash
git add docs/spec/archive/ docs/spec/global/index.md docs/decisions/index.md
git commit -m "chore: 归档 <目录名> — 全部验证通过"
```

### 步骤 6：验证

- [ ] 源目录不再存在于 `docs/spec/<目录名>/`
- [ ] 目录已移至 `docs/spec/archive/<目录名>/`
- [ ] `docs/spec/global/index.md` 已归档表中新增一行
- [ ] `docs/spec/global/index.md` 领域计数已更新
- [ ] `docs/spec/global/index.md` 页脚时间戳为当前日期
- [ ] `docs/decisions/index.md` 已归档 ADR 表中新增关联行（如有关联 ADR）
- [ ] `docs/decisions/index.md` 页脚时间戳为当前日期（如有关联 ADR）
- [ ] 已创建提交

完成后输出：提交 hash、归档路径、索引变更摘要。
