---
title: 多上下文共用仓库级工件注册与 Agent Notes
status: implemented
created: 2026-09-10
updated: 2026-09-10
approval: 本任务会话确认根级注册与记录系统、多上下文分布式领域资料，并要求执行实现
verification: 两轴审查及文义核对、技能兼容校验、源与部署副本一致性、根与子目录运行记录检查通过
---

# 多上下文共用仓库级工件注册与 Agent Notes

## 决定与范围

本任务会话为工作项及验收依据，无独立会话链接；建档日期为 2026-09-10。补充 [工件归属注册](../decision-records/2026-09-08-artifact-location-registration.md) 和 [Agent Notes 位置](../decision-records/2026-09-09-agent-notes-location.md)。

同一仓库管理范围共用一个根级注册入口及新部署的根级 .agents/notes/。管理根按项目指令和既有注册确定，Git 顶层仅为回退依据；不能因切入子项目改变管理范围，也不能将已有显式边界自动上移到包含它的 Git 仓库根。既有历史分散属主继续登记，整合迁移需要授权。

根 CONTEXT-MAP.md 索引领域上下文，CONTEXT.md、ADR、Spec 等可分布在项目目录并由统一注册表路由。注册的位置相对管理根，Markdown 链接仍相对所在文件。上下文与记录分类分别管理，已由 ADR 承载的决定不复制为 Agent Notes。

修改涉及 setup 的注册、部署和领域消费规则，domain-modeling 的上下文选择与 ADR 定位，以及 Agent Notes 通用 README 和本仓库同步副本。既有脚本通过自身位置定位记录根，无需改变；不新增实际注册表、分类或多上下文产物，不迁移历史记录。

## 验收条件

- 子项目执行与根目录执行定位同一注册入口和记录系统。
- 上下文资料仍可分布，ADR 编号在所选目录内解析，不依赖当前工作目录。
- 分类与上下文独立、同一决定不复制、历史属主不自动迁移。
- 通用记录 README 与部署副本同步，既有脚本可从子目录读取同一记录集。
- setup 不因单上下文跳过必要的工件注册。

## 关联实现

[注册规则](../../../../skills/user-invoked/setup-matt-pocock-skills/artifact-registration.md)、[注册样板](../../../../skills/user-invoked/setup-matt-pocock-skills/artifacts.md)、[初始化](../../../../skills/user-invoked/setup-matt-pocock-skills/SKILL.md)、[记录部署](../../../../skills/user-invoked/setup-matt-pocock-skills/decision-records.md)、[领域消费](../../../../skills/user-invoked/setup-matt-pocock-skills/domain.md)、[领域建模](../../../../skills/model-invoked/domain-modeling/SKILL.md)、[记录规则](../../README.md)。

## 交付与验证

已交付上述规则。Standards 与 Spec 对八份 setup/domain 文件的实施审查无实质发现；记录 README 同步加入相同根级归属和分类边界，通用源与本仓库副本逐字节一致，三份既有脚本也保持一致且未修改。

两个受影响 SKILL.md 完成格式兼容校验：保留并单独检查 setup 的手动调用字段，仅在临时副本排除原校验器不支持的扩展字段后校验其余格式。记录索引生成和检查通过；同一检查脚本分别从管理根与 skills/model-invoked/domain-modeling 子目录执行，均读到相同的 16 条记录并通过检查。git diff --check 通过。工件路由规则为文义核对，未进行代理运行时路由测试。

用户在本任务进行期间提交了已修改的 setup/domain 文件并另行更新工程流程 Discuss 部分。后者仅按新请求复审，不属于本记录的实施范围，本任务未改写其讨论阶段规则。
