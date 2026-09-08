# 技能目录

按技能的调用配置与明确触发规则分类。用户调用类通常设置 `disable-model-invocation: true`；模型调用类允许模型依据任务语义按需选用，用户也可以显式调用。技能的具体适用范围与权限以各自的 `SKILL.md` 为准。

## 使用方式与项目选配

按项目需要选用技能，不必完整复制本目录。共享技能库保留不同工作方式；业务项目可以裁剪，并在项目指令中确定适用流程。

| 工程流程选择 | 使用方式 |
| --- | --- |
| `engineering.md` | 由流程路由到 plan、implement、verify，保留这些阶段技能及实际用到的支持材料。 |
| `engineering-v2.md` | 由文档直接定义工程方法论，模型依据任务语义按需选用独立技能；不要求每个阶段加载同名技能。 |

两个文件用于不同项目场景，选择适合的一版作为项目工程入口。

### 项目初始化

首次在业务项目使用这套工程技能时，先在目标项目中调用 **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.md)**，建立后续技能读取的项目配置：

```text
/setup-matt-pocock-skills
```

该技能先检查已有配置，再与你确认需要的选择和文件草案，最后写入：

| 配置 | 内容与产物 |
| --- | --- |
| 问题跟踪器 | 选择 GitHub、GitLab、本地 Markdown 或其他跟踪方式，记录到 `docs/agents/issue-tracker.md`。 |
| 分诊标签 | 安装了 triage 时配置标签映射，记录到 `docs/agents/triage-labels.md`；未安装则跳过。 |
| 领域文档布局 | 约定上下文文档和 ADR 的位置及使用规则，记录到 `docs/agents/domain.md`。 |
| 项目指令入口 | 在已有 CLAUDE.md 或 AGENTS.md 中创建或更新 `Agent skills` 配置引用；两者都不存在时由用户选择创建哪个。 |

已有配置的项目复用现有约定，不需要每次开发前重新初始化。后续可直接维护 `docs/agents/*.md`；切换跟踪器或重新初始化时再调用 setup。

初始化负责技能所需的项目配置，不自动选择或安装 engineering 流程。建议将选定的 `engineering.md` 或 `engineering-v2.md` 复制到业务项目的 `docs/agents/engineering.md`，作为该项目工程流程的统一维护位置，再按项目场景调整内容。

参考本仓库 AGENTS.md，在业务项目根目录的 AGENTS.md 中加入以下配置（工程入口已改为建议路径）：

```markdown
## 工程工作流

工程任务按 `docs/agents/engineering.md` 执行：
Discuss → Plan → Implement → Verify。

仅 `/implement` 或用户明确输入“执行实现”视为执行授权；
“确认”“可以”“同意”等仅表示审批。

执行授权在已确定的工作范围内持续有效，覆盖实施、审查、
范围内修正和验证；阶段切换不要求重复授权。
新增范围或尚未授权的重大决策仍由用户决定。

端到端请求在满足相应门禁后持续推进至验证完成。
限定阶段的请求在该阶段交付完成后结束。
```

已有工程入口时更新原有配置，避免重复添加。若项目移除了 implement 技能，将示例中的授权句改为“仅用户明确输入‘执行实现’视为执行授权；‘确认’‘可以’‘同意’等仅表示审批。”，不再依赖 `/implement` 技能入口。

### code-review：可选的固定审查流程

对于采用 GPT-6 Astra 等较强模型的业务项目，可以选择不安装或移除 `code-review`，让模型依据 implement 或 engineering-v2.md 中的审查要义完成工作。这是一种项目配置选择，不是仅凭模型名称就能保证审查质量；应以项目实际变更的审查表现判断是否适合。

这种配置保留 Standards、Spec、范围完整性和独立 PR／分支审查，代理数量、检查方法及报告形式由模型按情境判断。移除的是固定技能流程，不是实施审查和验收要求。

如果需要固定双代理、代码异味基线和统一报告方式，则保留 `code-review`。同时保留时，可在业务项目的 AGENTS.md 中约定：

> 实施过程中的审查使用工程流程内置的 Implementation Review；仅在用户明确指定 code-review 技能时使用其独立审查流程。

移除前检查业务项目中的调用引用，不能只删除目录。当前共享技能库有以下关联：

- `fix-bug/SKILL.md`：第 10 步要求调用 code-review。选配时改为执行项目内置的实施审查，继续保留缺陷修正和验证闭环。
- `tdd/SKILL.md`：将重构归入审查阶段，并引用 code-review。选配时将该引用改为项目的 Implementation Review，不改变 TDD 的适用方式。

这些调整针对业务项目中的副本；共享技能库可保留原有完整流程。

### engineering-v2.md 的技能选配

采用 v2 时，Planning、Implement、Verify 及实施审查由工程文档直接定义。以下建议针对业务项目副本，不要求删除共享技能库中的技能，也不改变项目批准要求。

| 选择 | 技能 | 原因与条件 |
| --- | --- | --- |
| 可优先移除 | plan、implement、verify | v2 已承载阶段职责、门禁、审阅和完成条件。移除后直接依据 v2 推进；如仍需要这些技能的独立入口、工件模板或任务分解细节，也可以保留。 |
| 可移除，或保留为显式选用 | code-review | v2 已包含双维度审查、范围完整性及独立 PR 审查；需要固定审查程序时再保留，依赖处理见上文。 |
| 建议保留 | diagnosing-bugs、research | 分别提供复杂故障的诊断方法和带来源的调查产物，补充工程流程没有展开的专项工作。 |
| 复杂领域或跨模块项目建议保留 | architect、domain-modeling、codebase-design | 提供架构取舍、领域记录和模块设计方法；v2 只定义这些决策的责任与边界。 |
| 按测试方式保留 | tdd | 适合需要明确测试优先流程的项目；常规测试和验收不依赖安装该技能。 |
| 按交付后工作方式保留 | fix-bug、to-verify | 提供用户主动触发的缺陷修复与只读验收入口，保留时处理其支持技能依赖。 |
| 按探索方式保留 | grilling、grill-me、grill-with-docs、prototype、wayfinder、to-questionnaire、improve-codebase-architecture | 用于访谈、原型、决策地图及架构探索；普通 Discuss 不要求启动这些流程。 |
| 按团队协作方式保留 | to-spec、 triage、handoff | 用于规范交付、跟踪器工单、分诊及跨会话交接；不需要相应产物或协作方式时可不安装。 |
| 按专项任务保留 | architecture-security-review、resolving-merge-conflicts、wizard、writing-for-agents、chinese-commit-conventions、teach | 分别支持综合评审、冲突处理、人工步骤、代理文档、中文提交约定及教学。 |
| 初始化时使用 | setup-matt-pocock-skills | 建立配置后无需每次调用；保留便于以后重新配置。移除技能不等于删除它生成的项目配置。 |
| 按导航和沟通需要保留 | wait-what | wait-what 是独立的解释入口。 |

可从「v2 + diagnosing-bugs + research」开始，再按领域复杂度、测试方式和团队协作需要增加技能。这是精简起点，不是每个项目的固定最小清单。

裁剪时还需检查以下关联：

- 移除 implement 后，不能再依赖 `/implement` 技能入口来启动工作。若项目沿用本仓库的授权规则，可继续使用“执行实现”；其他项目按自己的明确授权约定执行。
- 若保留 implement 或 verify 而移除 plan，将其中返回 `plan` 技能的引用改为返回 v2 的 Planning 阶段。独立保留的技能仍应服从项目工程入口。
- 保留 grill-with-docs、triage 或 wayfinder 时，保留它们调用的 grilling、domain-modeling；保留 wayfinder 的研究分支时还需 research。
- 保留 tdd 时，其接口设计分支会使用 codebase-design；improve-codebase-architecture 也依赖 codebase-design、domain-modeling 等支持技能。
- 保留 fix-bug 时，保留 diagnosing-bugs，并处理上文列出的 code-review 调用。
- 技能中的相对引用、模板和脚本与技能一起保留；不要只复制 SKILL.md。所需的领域知识、已接受决策和验收合同也不因移除技能而删除。

### 其他技能的选用

- **tdd**：需要测试优先的反馈循环时保留并选用。安装它不意味着所有开发任务都必须采用 TDD；实施中的测试与验收要求仍由项目合同决定。
- **verify / to-verify**：前者服务于实施后的验证闭环；后者供用户主动进行独立交付后验收，不修改交付物。按需要保留相应入口。
- **architecture-security-review**：用于综合架构与安全评审，不作为普通业务改动的默认审查步骤。
- **访谈、地图和配置技能**：按用户是否需要相应工作方式选择，不因采用四阶段工程流程就全部安装或调用。

## 用户调用

- **[architecture-security-review](./architecture-security-review/SKILL.md)**：综合评审技术路线、架构、安全与实现，报告有证据且值得修复的问题。
- **[chinese-commit-conventions](./chinese-commit-conventions/SKILL.md)**：提供中文 Conventional Commits、changelog 和提交工具配置参考；描述明确限定仅在用户显式调用时使用。
- **[fix-bug](./fix-bug/SKILL.md)**：修复用户明确要求纠正的交付后实现缺陷，依据既定合同或诊断进行最小修正、回归验证和审查。
- **[grill-me](./grill-me/SKILL.md)**：通过 grilling 访谈推敲计划或设计，不附带领域文档记录。
- **[grill-with-docs](./grill-with-docs/SKILL.md)**：结合 grilling 与 domain-modeling，在访谈中同步记录领域术语和架构决策。
- **[handoff](./handoff/SKILL.md)**：将当前会话整理成供另一代理继续工作的交接文档，保存到操作系统临时目录。
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)**：寻找模块深化机会，生成 HTML 报告，再围绕用户选择的方向深入讨论。
- **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.md)**：配置技能使用的问题跟踪器、分诊标签与领域文档布局。
- **[teach](./teach/SKILL.md)**：围绕用户的学习目标，在工作区中持续组织课程、练习、参考资料和学习记录。
- **[to-questionnaire](./to-questionnaire/SKILL.md)**：将需要第三方回答的问题整理为 Markdown 问卷，明确收件人、背景与所需信息。
- **[to-spec](./to-spec/SKILL.md)**：将已确定的产品和设计决策整理为可实施、可验收的规范，标明尚未解决的阻塞事项。
- **[to-verify](./to-verify/SKILL.md)**：对交付结果进行独立验收，依据批准的要求报告通过、失败或阻塞，不修改交付物。
- **[triage](./triage/SKILL.md)**：对问题及外部 PR 分类、核实和澄清，维护分诊状态并准备可供代理执行的任务说明。
- **[wait-what](./wait-what/SKILL.md)**：补充上下文并用简明语言重新解释上一条未被理解的回答。
- **[wayfinder](./wayfinder/SKILL.md)**：将大型、尚不清晰的工作组织为共享决策地图，逐步解决决策工单，明确后续方向。

## 模型调用

- **[architect](./architect/SKILL.md)**：分析跨模块职责、依赖、数据流和迁移影响，评估尚未解决的架构选择。
- **[code-review](./code-review/SKILL.md)**：从 Standards 和 Spec 两个维度并行审阅指定范围的变更，分别报告规范遵循与需求符合情况。
- **[codebase-design](./codebase-design/SKILL.md)**：提供深模块、接口和测试接缝的设计原则，用于改善模块边界、可测试性和代码可导航性。
- **[diagnosing-bugs](./diagnosing-bugs/SKILL.md)**：为故障和性能回归建立反馈循环，通过复现、假设验证和定向探测定位原因，并在授权范围内修复与验证。
- **[domain-modeling](./domain-modeling/SKILL.md)**：梳理领域术语与模型，将已确定的领域知识和持久架构决策记录到上下文文档或 ADR。
- **[grilling](./grilling/SKILL.md)**：在用户希望深入推敲想法时，按决策依赖分轮访谈，直到达成共同理解。
- **[implement](./implement/SKILL.md)**：实施已通过门禁且获得授权的工作，按需分解任务、测试并完成实施审阅；也支持独立 PR、分支或指定范围审查。
- **[plan](./plan/SKILL.md)**：复用权威工作项，解决必要的产品与技术决策，形成最小规划材料并完成规划审阅。
- **[prototype](./prototype/SKILL.md)**：构建用于回答特定设计问题的临时原型，探索逻辑、状态模型或界面方案。
- **[research](./research/SKILL.md)**：由后台代理依据高可信的一手资料调查问题，将带来源引用的结论保存为仓库中的 Markdown 文件。
- **[resolving-merge-conflicts](./resolving-merge-conflicts/SKILL.md)**：依据双方变更意图处理进行中的 Git 合并或变基冲突，检查结果并完成相应操作。
- **[tdd](./tdd/SKILL.md)**：通过红—绿循环实现行为，选择有效测试边界并编写有意义的回归测试。
- **[verify](./verify/SKILL.md)**：在实施与审阅完成后验证权威合同和验收条件，将失败交还责任环节修正后重新验证。
- **[wizard](./wizard/SKILL.md)**：为必须由人完成的配置、凭据或迁移步骤生成交互式 Bash 向导。
- **[writing-for-agents](./writing-for-agents/SKILL.md)**：指导技能、AGENTS.md 等代理文档的编写，组织触发条件、信息层级和完成标准。

## 通用工程工作流

```text
Discuss → Plan → Implement → Verify
```

下表是技能与阶段的适用关系，不是固定调用序列。工程方法论定义阶段目标与门禁；技能独立存在，依据任务和调用方式选用，不要求每个阶段使用全部列出的技能。

| 阶段 | 主要相关技能 | 按情境选用的支持技能 |
| --- | --- | --- |
| Discuss：理解目标、范围和未决问题 | grilling；用户可选 grill-me、grill-with-docs | research、domain-modeling、prototype；用户可选 triage、to-questionnaire、wayfinder |
| Plan：解决必要决策，明确合同与验收条件 | plan | architect、codebase-design、domain-modeling、research、prototype；用户可选 to-spec、improve-codebase-architecture、wayfinder |
| Implement：实施已授权范围并完成审阅 | implement（内置 Implementation Review） | tdd、diagnosing-bugs、resolving-merge-conflicts；按项目选择 code-review；用户可选 fix-bug |
| Verify：用证据判断验收条件是否成立 | verify | diagnosing-bugs；用户可选 to-verify 进行独立的交付后验收 |

`writing-for-agents` 适用于涉及代理文档的工作；`wizard` 适用于流程中必须由人完成的步骤。`handoff` 和 `wait-what` 支持跨阶段交接与沟通，`setup-matt-pocock-skills`、`chinese-commit-conventions` 和 `teach` 分别服务于配置、提交规范和学习场景。

调用技能不替代项目的执行授权。规划审阅通过表示准备就绪，实施仍须满足项目门禁；验收发现缺陷时，由工程流程返回责任阶段处理。
