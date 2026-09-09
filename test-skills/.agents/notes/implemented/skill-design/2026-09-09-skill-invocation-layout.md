---
title: 技能移至根目录并按调用方式分组
status: implemented
created: 2026-09-09
updated: 2026-09-09
approval: 用户在本任务会话要求将技能目录迁至根目录并按 user-invoked 与 model-invoked 分组
verification: 迁移文件完整性、调用配置分类、引用链接与 Agent Notes 资源部署检查通过
---

# 技能移至根目录并按调用方式分组

## 决定与范围

技能源码统一存放于根目录 skills，按已有调用配置分入 user-invoked 和 model-invoked。前者包含十四个用户主动调用的技能，后者包含十五个模型可按需选择的技能。技能名称、调用配置及支持文件保持原样；技能目录说明维护于 skills/README.md。

迁移同时修复根 README、项目指令、历史记录与目录链接，调整 Agent Notes 部署回归脚本中的资源位置。分组是源码组织方式，安装时仍选择完整技能目录并遵循目标环境的发现机制。Agent Notes 继续位于 .agents/notes，不随技能移动。

## 验证与依据

迁移前后核对全部九十九个技能目录文件，链接修复前内容完全一致。随后核对分组与技能元数据一致、目录覆盖所有技能，并运行记录检查与空资源部署回归。既有 README 调整随文件保留，其他工作目录不在本次迁移范围内。

依据为 2026-09-09 本任务会话的明确迁移请求，无独立会话链接。

参见 [技能目录](../../../../skills/README.md)、[项目使用指南](../../../../README.md)、[资源部署测试](../../../../scripts/decisions/self-test.mjs)。
