# 技能目录

项目定位、工程流程选择、初始化和组合用法见 [根目录使用指南](../README.md)。本页维护调用分类、技能简介及使用示例；具体执行规则以各技能的 `SKILL.md` 为准。

用户调用类设置 `disable-model-invocation: true`，由用户主动选择；模型调用类可由模型依据任务语义选用，也可显式调用。实际调用语法与技能发现方式由使用环境提供。选择技能不替代项目的执行授权。

## 用户调用（user-invoked）

- **[architecture-security-review](./user-invoked/architecture-security-review/SKILL.md)**：综合评审技术路线、架构、安全与实现，报告有证据且值得修复的问题。
- **[fix-bug](./user-invoked/fix-bug/SKILL.md)**：修复用户明确要求纠正的交付后实现缺陷，以既定合同为依据，复用有效诊断，完成最小修正、审查和重验。
- **[grill-me](./user-invoked/grill-me/SKILL.md)**：通过 grilling 访谈推敲计划或设计，不附带领域文档记录。
- **[grill-with-docs](./user-invoked/grill-with-docs/SKILL.md)**：结合 grilling 与 domain-modeling，在访谈中同步记录领域术语和架构决策。
- **[handoff](./user-invoked/handoff/SKILL.md)**：将当前会话整理成供另一代理继续工作的交接文档，保存到操作系统临时目录。
- **[improve-codebase-architecture](./user-invoked/improve-codebase-architecture/SKILL.md)**：寻找模块深化机会，生成 HTML 报告，再围绕用户选择的方向深入讨论。
- **[setup-matt-pocock-skills](./user-invoked/setup-matt-pocock-skills/SKILL.md)**：配置技能使用的问题跟踪器、分诊标签与领域文档布局。
- **[teach](./user-invoked/teach/SKILL.md)**：围绕用户的学习目标，在工作区中持续组织课程、练习、参考资料和学习记录。
- **[to-questionnaire](./user-invoked/to-questionnaire/SKILL.md)**：将需要第三方回答的问题整理为 Markdown 问卷，明确收件人、背景与所需信息。
- **[to-spec](./user-invoked/to-spec/SKILL.md)**：复用已有合同属主，或将访谈中已确定的决策整理为可验证规范；实际完成必要评审，报告内容就绪情况、评审结果及剩余阻塞，不自动授予实施批准。
- **[to-verify](./user-invoked/to-verify/SKILL.md)**：对交付结果进行独立验收，依据批准的要求报告通过、失败或阻塞，不修改交付物。
- **[triage](./user-invoked/triage/SKILL.md)**：对问题及外部 PR 分类、核实和澄清，维护分诊状态并准备可供代理执行的任务说明。
- **[wait-what](./user-invoked/wait-what/SKILL.md)**：补充上下文并用简明语言重新解释上一条未被理解的回答。
- **[wayfinder](./user-invoked/wayfinder/SKILL.md)**：将大型、尚不清晰的工作组织为共享决策地图，逐步解决决策工单，明确后续方向。

## 可选的规范整理：to-spec

[to-spec](./user-invoked/to-spec/SKILL.md) 适合将已经确定的产品和设计决策整理为可实施、可验收的规范，并完成必要评审。它不是 Plan 后的必经步骤，也不要求每次调用都新建 Spec 文件。

### 何时使用

| 场景 | 处理方式 |
| --- | --- |
| Plan 的 Proposal、Issue 等已包含充分的需求和验收条件 | 可以直接复用，无需额外调用；若调用，也先确认现有覆盖，不重复成文 |
| 同一范围已有 Spec，需要反映已确定的变化 | 更新原 Spec，保留需求标识、引用和归属 |
| 决策已定，但行为或验收表述还不清晰 | 在原内容属主中补充表达；重大决策尚未确定则标记阻塞 |
| 访谈已完成，但还没有正式产物 | 从已确定结论直接整理草稿，不必先补齐 PRD、RFC 或 Proposal；建议和未决问题不作为已批准需求 |
| 需要独立 Spec 交给其他团队或用于明确的交付要求 | 明确要求独立文档，并说明与既有合同的引用或迁移关系，避免两份竞争合同 |

尚需决定产品行为或技术方案时，由 [plan](./model-invoked/plan/SKILL.md) 解决相应决策；`to-spec` 负责整理已定内容，不通过补写规范替用户作出重大选择。

### 如何调用

提供选定工作范围、已有产物或访谈上下文，以及已知的项目规范格式、存放约定和评审依据。在支持 `$技能名` 的环境中，可参考以下示例；其他环境使用其技能选择方式。

已有规划产物，需要核对并补齐表达：

```text
$to-spec 整理当前已批准工作项中的导出功能规范。
先检查现有 Proposal 和 Spec；已有内容充分则复用，表达缺口在原属主补充。
保留既定决策和需求编号，完成必要评审，报告修改和剩余阻塞。
```

访谈后首次成文：

```text
$to-spec 根据本次访谈已经确定的结论，整理导出功能的 Spec 草稿。
区分确定决策、候选建议和未决问题，结合仓库事实写出可观察的验收条件。
完成规范评审；无法从既有依据解决的重大问题列为阻塞。
```

明确需要独立规范交付：

```text
$to-spec 为当前工作项生成供协作团队使用的独立 Spec。
沿用项目文档格式，引用现有需求与设计依据，说明文档的权威关系。
如需迁移详细合同，按项目接受流程处理归属，并完成必要评审。
```

### 交付与评审

交付应明确复用了或更新了哪个合同，或新增 Spec 的位置与归属，并提供内容就绪情况、实际评审结果、已解决发现、剩余阻塞及所需批准。已有有效评审证据可复用；首次成文和受影响的变更仍需审查，修正后复核。必要审阅者或证据不可用时，应明确说明评审阻塞。

独立调用可交付已评审的草稿及阻塞说明；工程流程中，评审证据交给整体 Plan Review 复用，不重复已覆盖的检查。内容完整、评审通过、用户批准和执行授权分别判断；生成或评审 Spec 不会自动开始实现。仅要求整理规范时，不必为了交付草稿先建立完整工程规划产物或发布配置。

## 交付后的手动验收与修复

| 场景 | 选择 | 提供的信息 | 交付结果 |
| --- | --- | --- | --- |
| 已有交付，需要确认是否满足批准的要求 | `to-verify` | 交付版本或环境、需求或工作项、验收条件及相关约束 | 当前验收结果、逐项证据、失败与阻塞、所需修正；不修改交付物 |
| 验收发现问题，决定修复其中的实现缺陷 | `fix-bug` | 验收报告、选定失败项、合同依据和已有诊断 | 选定缺陷的修正、审查、原场景重验及相关回归结果 |
| 使用中直接发现缺陷，尚无验收报告 | `fix-bug` | 复现步骤、预期与实际行为、版本或环境、相关需求依据 | 先核实技术归属；属于实现缺陷时完成修复闭环 |

### 调用示例

在支持 `$技能名` 的环境中，可以这样发起；其他环境使用其提供的技能选择方式。下面的版本、条件和问题编号仅为示例，替换为实际信息。

```text
$to-verify 验收当前交付的导出功能，依据已批准工作项中的验收条件。
验证空数据、中文字段和大文件导出，报告逐项结果与证据。
```

验收报告交付后，由用户选择要修复的问题，再单独发起：

```text
$fix-bug 修复上一份验收报告中的 F1：中文字段导出后乱码。
沿用报告引用的需求及诊断，范围仅限 F1，完成审查和原场景重验。
```

没有验收报告也可以直接描述问题：

```text
$fix-bug 当前版本导出包含中文字段的 CSV 后出现乱码。
复现：新建含中文名称的记录，然后导出并用项目约定的客户端打开。
预期依据：导出需求要求中文字段原样保留。请核实原因并修复。
```

执行仍遵循项目授权规则；在本仓库，范围就绪后按提示输入“执行实现”，同一范围内的修正、审查和重验无需重复授权。

### 两者如何衔接

`to-verify` 按需读取关联的 [DIAGNOSE.md](./user-invoked/to-verify/DIAGNOSE.md) 进行只读诊断，将结果纳入验收报告，无需用户单独调用该文件。报告不会自动启动 `fix-bug`。

用户提出修复请求后，`fix-bug` 根据证据判断问题归属，用户不必事先确认根因。如果实际是测试、合同、设计或环境问题，会说明归属和所需后续动作，不将其强行作为实现缺陷修复。

`fix-bug` 自行完成选定缺陷的修正、审查和重验，不要求用户再调用 `to-verify` 才能结束。若需要重新验收整个交付，可以再次手动调用 `to-verify`；修复一个问题不代表原报告中的其他失败或阻塞已经解决。

工程流程中的 [verify](./model-invoked/verify/SKILL.md) 则承担最终验收闭环，会在既有范围和授权内推动修正与重验，直到通过或明确无法继续的原因。

## 模型调用（model-invoked）

- **[architect](./model-invoked/architect/SKILL.md)**：分析跨模块职责、依赖、数据流和迁移影响，评估尚未解决的架构选择。
- **[code-review](./model-invoked/code-review/SKILL.md)**：从 Standards 和 Spec 两个维度并行审阅指定范围的变更，分别报告规范遵循与需求符合情况。
- **[codebase-design](./model-invoked/codebase-design/SKILL.md)**：提供深模块、接口和测试接缝的设计原则，用于改善模块边界、可测试性和代码可导航性。
- **[diagnosing-bugs](./model-invoked/diagnosing-bugs/SKILL.md)**：为故障和性能回归建立反馈循环，通过复现、假设验证和定向探测定位原因，并在授权范围内修复与验证。
- **[domain-modeling](./model-invoked/domain-modeling/SKILL.md)**：梳理领域术语与模型，将已确定的领域知识和持久架构决策记录到上下文文档或 ADR。
- **[grilling](./model-invoked/grilling/SKILL.md)**：在用户希望深入推敲想法时，按决策依赖分轮访谈，直到达成共同理解。
- **[implement](./model-invoked/implement/SKILL.md)**：实施已通过门禁且获得授权的工作，按需分解任务、测试并完成实施审阅；也支持独立 PR、分支或指定范围审查。
- **[plan](./model-invoked/plan/SKILL.md)**：复用权威工作项，解决必要的产品与技术决策，形成最小规划材料并完成规划审阅。
- **[prototype](./model-invoked/prototype/SKILL.md)**：构建用于回答特定设计问题的临时原型，探索逻辑、状态模型或界面方案。
- **[research](./model-invoked/research/SKILL.md)**：由后台代理依据高可信的一手资料调查问题，将带来源引用的结论保存为仓库中的 Markdown 文件。
- **[resolving-merge-conflicts](./model-invoked/resolving-merge-conflicts/SKILL.md)**：依据双方变更意图处理进行中的 Git 合并或变基冲突，检查结果并完成相应操作。
- **[tdd](./model-invoked/tdd/SKILL.md)**：通过红—绿循环实现行为，选择有效测试边界并编写有意义的回归测试。
- **[verify](./model-invoked/verify/SKILL.md)**：在实施与审阅完成后验证权威合同和验收条件，将失败交还责任环节修正后重新验证。
- **[wizard](./model-invoked/wizard/SKILL.md)**：为必须由人完成的配置、凭据或迁移步骤生成交互式 Bash 向导。
- **[writing-for-agents](./model-invoked/writing-for-agents/SKILL.md)**：指导技能、AGENTS.md 等代理文档的编写，组织触发条件、信息层级和完成标准。
