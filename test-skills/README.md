# 工程技能库

本仓库的核心技能源自 [Matt Pocock 的 skills 仓库](https://github.com/mattpocock/skills)，维护可组合的工程技能、项目配置样板与 Agent Notes 工具。

## 工程推进

当前入口是 [AGENTS.md](./AGENTS.md) 的“工程推进”。默认 Discuss，由模型提出下一步建议，由用户明确发出命令：

| 命令 | 作用 | 结束位置 |
| --- | --- | --- |
| `/planning` | 加载 planning，按需整理 Proposal、Spec、RFC 等必要合同与设计，并完成规划评审 | 回到 Discuss，等待下一条命令 |
| `/implement` | 工作充分定义后加载 implement，完成实施、code-review 和 verify | 已授权范围验证完成，或明确阻塞 |

“确认”“可以”“同意”不是推进命令。命令出现在引用、示例或文档中不构成授权。`/implement` 遇到关键合同缺口时报告 blocker 并建议 `/planning`，不能自动规划。实施中改变范围、合同或重大设计时暂停受影响工作，回到 Discuss，由用户重新决定如何推进。

这些命令是用户授权约定，不是本仓库提供的命令解析器。安装环境负责发现技能和接收用户输入；Harness Plan Mode 只是运行模式，不能替代命令授权，也不能绕过其自身读写限制。

不再需要复制 ./docs/engineering.md 或维护单独的 Implementation Gate 文档。模型仍需判断合同是否充分，命令不会填补缺失需求。旧 [engineering-v2.md](./docs/engineering-v2.md) 仅保留为独立方法论参考，不是本仓库当前入口，也不与上述命令规则叠加。

## 接入项目

1. 从 [技能目录](./skills/README.md) 选择完整技能目录，安装到使用环境支持的位置，保留支持文件。跨技能调用使用技能名，不绑定本仓库路径。
2. 在目标项目 AGENTS.md 或 CLAUDE.md 中采用本仓库“工程推进”的授权规则，保留已有适用规则；不需要另建工程流程文件。
3. 按需调用 [setup-matt-pocock-skills](./skills/user-invoked/setup-matt-pocock-skills/SKILL.md)，配置跟踪器、工件归属和领域资料。已有配置优先复用，setup 不授予规划或实施权限。

技能仍按 user-invoked 与 model-invoked 分组存储；目录分组不授予执行权限。planning 和 implement 保留现有目录位置，其调用策略设置为显式选择，具体阶段授权仍由 AGENTS.md 的命令规则决定。

| 配置或工件 | 默认位置与用途 |
| --- | --- |
| 推进授权 | 根级 AGENTS.md 或 CLAUDE.md |
| 跟踪器 | docs/agents/issue-tracker.md，登记工作项位置、状态和操作 |
| 文档归属 | 目标项目既有文档入口（通常 docs/AGENTS.md），写清当前位置和历史属主 |
| 领域资料 | 根 CONTEXT-MAP.md 或 CONTEXT.md，各上下文资料按映射定位 |
| Agent Notes（可选） | 根 .agents/notes/ 内按已选上下文分目录；只读命令导航目录树 |

多项目配置时，setup 先提出上下文边界、名称和路径，由用户选择需要建立的范围；再分别选择哪些上下文启用 Notes、是否需要公共记录区。已有选择直接复用，新发现项目不会自动加入。记录目录按需创建，原有记录保持原路径。

遵循“一个事实一个家”：Spec 拥有已接受的产品行为合同与验收条件；RFC 拥有实现设计；ADR 拥有需要长期保留的决定及其理由；Proposal 或 Ticket 跟踪本次范围、状态和评审/批准事实。小改动可由工作项直接承载行为与验收，不必另建 Spec。沿用项目既有属主，历史位置不自动迁移。详见 [注册规则](./skills/user-invoked/setup-matt-pocock-skills/artifact-registration.md) 和 [记录部署](./skills/user-invoked/setup-matt-pocock-skills/decision-records.md)。

## 使用示例

讨论时可以提出“比较这两种方案，指出需要我决定的差异”。想正式规划时发出：

```text
/planning 将已选方向整理为必要的合同与验收条件，并完成规划评审。
```

规划完成后不会自动实施。准备实施时，另行发出：

```text
/implement 按已确认工作项实现导出功能，完成审查与验证。
```

需求已充分定义时可以从 Discuss 直接 `/implement`，无需先创建规划产物。只想验收交付物时选择 to-verify；要修复实现缺陷时，先明确修复范围，再用 `/implement` 授权，可同时指定 fix-bug 的专项方法。普通文档治理依 AGENTS.md 的例外处理。

## 选配与依赖

| 技能 | 关联职责 |
| --- | --- |
| planning | 使用自带规划资料与 Plan Review；必要时使用 domain-modeling；交付后回 Discuss |
| implement | code-review 负责实现审查，verify 负责最终验收；一次授权覆盖范围内修正与重验 |
| verify | 合同或重大设计变化回 Discuss，不自动调用 planning |
| tdd | 测试优先执行方式，关联 codebase-design 与 code-review，不另行授予实施权限 |
| playwright-e2e | 按需为浏览器项目配置 Playwright、项目测试规则和首个 E2E spec |
| fix-bug | 使用 diagnosing-bugs 与 code-review，仍遵循项目实施授权 |
| to-verify | 用户手动发起的交付验收；报告结果，不自动修复或切换到实施 |

只选择所需能力，保留相应依赖及支持资源。[技能目录](./skills/README.md) 提供各技能场景和用法。

## 文档维护

AGENTS.md 拥有推进权限；技能拥有实际工作方法及完成条件；本 README 说明接入与使用方式。历史决定与验证依据见 [记录规则](./.agents/notes/README.md)。setup 的 resources/decision-records 保存通用资源，不复制本仓库项目历史。
