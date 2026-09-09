# 工程工作流与技能库

本仓库的核心技能源自 [Matt Pocock 的 skills 仓库](https://github.com/mattpocock/skills)，并在此基础上结合 GPT-6 Astra 的提示实践，调整工程流程、技能职责与项目配置方式。

面向 GPT-6 Astra 等编码模型的可组合工程工作流、专项技能和项目配置样板。按目标项目选择工程入口和所需技能，支持从讨论、规划推进到实施审查与最终验证。

本仓库提供 Markdown 指令和资源；具体的技能发现、工具调用、任务跟踪和代理执行由使用它的 agent / harness 承担。Agent Notes 附带独立的 Node.js 索引与检查脚本。

- [技能目录](./skills/README.md)：按用户调用、模型调用查找技能。
- [技能编排流程](./engineering.md) / [独立工程方法论](./engineering-v2.md)：二选一作为项目工程入口。
- [Agent Notes](./.agents/notes/README.md) / [记录索引](./.agents/notes/INDEX.md)：本仓库的工程决定与交付依据。

## 面向 GPT-6 Astra 提示最佳实践的设计取舍


| 原则 | 本仓库的做法 |
| --- | --- |
| 只加载任务需要的指令 | 按项目选用技能，主技能在需要时读取模板和支持材料；手动入口由用户选择。 |
| 清楚定义决定边界 | 项目指令规定批准与执行授权，常规细节由模型结合已有合同和仓库证据处理。 |
| 让工作持续到约定终点 | 范围内有效授权覆盖实施、审查、修正和验证；限定阶段的请求在该阶段完成后结束。 |
| 保留可验证的结果标准 | 门禁检查具体工作范围、验收、必要决定、批准与授权；验证使用与变更相关的证据。 |
| 减少固定文档流水线 | 复用已有工作项和需求设计依据；Proposal、PRD、Spec、RFC 按信息归属需要创建。 |
| 将工程历史与初始化资源分开 | `.agents/notes/` 属于本仓库历史；setup 只向目标项目部署选定的规则、配置和工具。 |

仓库保留了不同使用偏好的技能。例如 `code-review` 使用固定双代理审查，访谈类技能有专门的交互方式。它们适合特定需求，因此选配比整库加载更重要。采用较强模型也不自动取消项目批准要求、技能依赖或验收责任。

## 选择一种工程入口

共同流程是：

```text
Discuss → Plan → Implement → Verify
```

| | engineering.md | engineering-v2.md |
| --- | --- | --- |
| 定位 | 精简的技能编排入口 | 独立的工程方法论 |
| 执行方式 | 路由到 plan、implement、verify；implement 调用 code-review | 文档直接定义规划、实施、审查与验证，模型按语义选用专项技能 |
| 适用情况 | 希望复用阶段技能及其具体流程 | 希望工程方法完整、技能可独立选配 |
| 主要取舍 | 主文件短，但必须保留被调用技能及资源 | 不必安装同名阶段技能，但项目需维护方法论副本 |
| 审查方式 | code-review 负责审查方法与报告，implement 负责发现归属和修正 | 内置 Standards / Spec 审查及范围完整性，方法由模型按情境选择 |

两个版本用于不同项目，不在同一项目叠加执行。推荐将选定文件维护为目标项目的 `docs/agents/engineering.md`，由项目 AGENTS.md 或 CLAUDE.md 引用。

## 如何接入项目

技能源码按调用方式存放：

```text
skills/
├── README.md
├── user-invoked/     # 用户主动选择的技能
└── model-invoked/    # 模型可按需选用的技能，也可显式调用
```

这两层分组用于仓库组织。接入时从组内选择完整的技能目录，安装到目标环境支持的位置；分组目录不改变技能名或调用配置。

1. 选择工程入口和所需技能，按所用 agent / harness 的机制安装或复制完整技能目录，保留支持文件。跨技能调用按技能名解析，安装位置由使用环境决定。
2. 在目标项目主动调用 [setup-matt-pocock-skills](./skills/user-invoked/setup-matt-pocock-skills/SKILL.md)，配置技能需要的跟踪器、工件归属及领域文档。已有约定优先复用。
3. 将选择的工程流程接入项目指令，并确定执行授权约定。setup 负责项目配置，不自动选择或安装工程流程。
4. 带着具体目标或已有工作项开展工作；需要专项能力时再选择技能。只使用独立专项技能时，按该技能所需配置接入。

技能调用语法由使用环境提供。手动调用的含义是用户主动选择该技能；普通模型调用技能也可以由用户显式指定。

### 初始化配置放在哪里

| 配置或工件 | 默认位置与用途 |
| --- | --- |
| 工程入口 | `docs/agents/engineering.md`，保存选定的方法 |
| 跟踪器配置 | `docs/agents/issue-tracker.md`，配置 GitHub、GitLab、本地 Markdown 或其他跟踪方式，以及 Proposal 的位置和状态操作 |
| 工件注册 | `docs/agents/artifacts.md`，登记当前与历史归属、位置及迁移约定 |
| 领域文档配置 | `docs/agents/domain.md`，登记上下文文档与 ADR 的位置和使用规则 |
| 分诊标签 | 安装 triage 时配置 `docs/agents/triage-labels.md` |
| Agent Notes（可选） | `.agents/notes/`，保存工程决定与交付理由；分类由目标项目配置 |

创建或更新 Proposal 前需要已配置的跟踪机制；本地 Markdown 也是可选方式。Proposal 与 Agent Notes 可以互相引用，工作状态和记录交付生命周期分别维护。独立 RFC / Spec 的默认位置为 `docs/rfcs/`、`docs/specs/`，已有位置按注册约定保留。

setup 先检查现状，再将需要的配置选择与草案交给用户审阅。重复运行默认复用配置、补齐兼容的缺失内容，保留差异和定制；升级、覆盖及历史迁移需要对应授权。详见 [工件注册方法](./skills/user-invoked/setup-matt-pocock-skills/artifact-registration.md) 和 [Agent Notes 配置](./skills/user-invoked/setup-matt-pocock-skills/decision-records.md)。

### 项目指令示例

下面沿用本仓库的执行授权方式，工程路径已改成目标项目的建议位置。已有项目应在原入口中合并适用规则。

```markdown
## 工程工作流

工程任务按 `docs/agents/engineering.md` 执行：Discuss → Plan → Implement → Verify。

当前范围准备就绪且尚未获得执行授权时，提示用户输入“执行实现”；收到后开始实施。
“确认”“可以”“同意”等仅表示审批。

执行授权在已确定的工作范围内持续有效，覆盖实施、审查、范围内修正和验证；阶段切换不要求重复授权。
新增范围或尚未授权的重大决策仍由用户决定。

端到端请求在满足相应门禁后持续推进至验证完成。
限定阶段的请求在该阶段交付完成后结束。
```

## 按场景组合使用

下表是组合示例，不是每项工作都必须执行的技能顺序。已有目标与依据充分时直接复用；访谈、研究、原型和 TDD 都由实际需要触发。

| 场景 | 组合 | 使用方式 |
| --- | --- | --- |
| 采用阶段技能完成工程任务 | engineering.md + plan + implement + code-review + verify | 必要时规划，满足门禁后实施，审查发现按归属修正，再最终验证；同时保留阶段技能实际调用的支持技能。 |
| 采用独立方法论开发 | engineering-v2.md；按需加入 diagnosing-bugs、research 等 | 模型依据阶段目标与完成标准推进，遇到专项问题时使用相应技能。 |
| 需求或技术方向尚不清楚 | 所选流程 + research / prototype；需要访谈时选 grilling | 先解决影响方案的事实或设计问题，再明确工作范围和验收；访谈不是所有 Discuss 的默认动作。 |
| 模块拆分或复杂领域设计 | 所选流程 + architect + domain-modeling + codebase-design | 分析职责、接口和领域约束，将需要长期保留的决定写入项目已有记录。 |
| 明确采用测试优先开发 | 所选流程 + tdd + codebase-design；保留 tdd 的审查依赖 | 使用红—绿循环建立行为反馈，仍完成项目要求的审查与验收。 |
| 排查缺陷与回归 | diagnosing-bugs；用户可选 fix-bug | 诊断问题后在授权范围内修复；fix-bug 使用 code-review，交付后可主动用 to-verify 验收。 |
| 整理团队工作与交接 | 用户选择 triage、to-spec、handoff 或 wayfinder | 按需分诊、整理明确要求的 Spec、交接上下文或探索大型方案，不强制串联成流水线。 |

例如，采用 v2 时可以提出“依据已有 Issue 分析实现范围和验收，列出需要我决定的问题”；就绪后按项目规则给予执行授权，模型继续到审查和验证。若只想研究某个方案，可以限定为“研究并保存带来源的结论”，交付即止于研究结果。

## 选配与依赖

采用 v2 可以不安装 plan、implement、verify、code-review，由方法论直接承担阶段职责，包括审查与验收。如果同时选用 implement，建议保留 code-review；也可以在项目副本中将其审查调用调整为 v2 的 Implementation Review。

| 选用的技能 | 需要检查的关联 |
| --- | --- |
| implement | 实施及独立审查均使用 code-review；重大未决问题返回项目 Planning 阶段。 |
| plan / verify | plan 在领域知识或持久决定变化时使用 domain-modeling；verify 的合同歧义分支仍引用 plan。裁剪时适配项目副本。 |
| tdd | 接口设计使用 codebase-design，重构审查引用 code-review。 |
| fix-bug | 排错使用 diagnosing-bugs，审查使用 code-review。 |
| grill-me / grill-with-docs | 前者调用 grilling；后者还使用 domain-modeling。 |
| triage / wayfinder | 使用 grilling、domain-modeling；wayfinder 按分支使用 research、prototype。 |
| improve-codebase-architecture | 使用 codebase-design、grilling、domain-modeling。 |

`code-review` 的固定双代理、代码异味参考与报告格式属于该技能的执行方式。采用 v2 且不通过 implement 执行时，可以仅在需要这种审查方式时选择它；v2 自身的审查与验收要求继续有效。

只裁剪目标项目所需的能力，保留所选技能的模板、脚本和引用资源。完整的调用分类及每个技能的用途见 [技能目录](./skills/README.md)。

## 维护与文档分工

- 本 README：仓库定位、工程入口比较、初始化、组合用法及选配依赖。
- [技能目录](./skills/README.md)：用户调用 / 模型调用分类和逐项简介。
- 各技能的 `SKILL.md` 与支持材料：具体执行规则与条件性资源。
- [Agent Notes](./.agents/notes/README.md)：本仓库历史；setup 的 `resources/decision-records/` 保存可复用初始化资源。

维护时先明确规则属于哪一层，再更新对应来源。重复确认、首次实现后提前结束或重复验证等问题，应回到造成行为的具体指令修正；手动入口与项目明确批准要求按其设计保留。
