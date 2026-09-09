---
title: Agent Notes 迁移至 .agents/notes
status: implemented
created: 2026-09-09
updated: 2026-09-09
approval: 用户在本任务会话确认 .agents/notes 路径并要求执行实现
verification: 原有十条记录内容校验一致，新路径记录检查、资源部署回归和源副本一致性检查通过
---

# Agent Notes 迁移至 .agents/notes

## 决定与范围

本套工程决定与交付依据记录定位为 Agent Notes，默认位置从 `docs/decisions/` 改为 `.agents/notes/`。本仓库实际记录及 setup 通用资源目录一并迁移，保留文件名、分类、生命周期、批准与验证依据。新旧目录深度一致，记录内相对引用继续有效。

同步项目指令、README、工件注册样板和脚本根路径；管理命令仍位于 `scripts/decisions/`。Proposal 继续由已配置的跟踪机制管理，独立 RFC/Spec 位置不变。

其他项目继续遵循已注册的历史位置；重复 setup 或使用新默认值不授权迁移、复制旧记录或覆盖脚本。明确升级且保留旧位置时，脚本根路径适配注册位置。

## 依据与验证

2026-09-09 本任务会话中用户明确目录名带点，随后授权实施。无独立会话链接。

迁移前后核对文件清单与内容校验值：原有十条记录、分类配置和模板保持一致，管理 README 与生成索引按新定位更新。本记录为迁移完成后新增。

验证命令：`node scripts/decisions/check.mjs`、`node scripts/decisions/self-test.mjs`、`git diff --check`；另核对通用资源与部署副本一致，以及旧路径只在历史说明中保留。

参见 [Agent Notes 规则](../../README.md)、[setup 配置](../../../../.agents/skills/setup-matt-pocock-skills/decision-records.md)、[工件位置样板](../../../../.agents/skills/setup-matt-pocock-skills/artifacts.md)。本次更新默认物理位置，沿用 [工件注册方法](./2026-09-08-artifact-location-registration.md) 中保留历史归属和显式迁移的原则。
