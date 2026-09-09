# 技能目录

项目定位、工程流程选择、初始化和组合用法见 [根目录使用指南](../README.md)。本页只维护调用分类和技能简介；具体执行规则以各技能的 `SKILL.md` 为准。

用户调用类设置 `disable-model-invocation: true`，由用户主动选择；模型调用类可由模型依据任务语义选用，也可显式调用。实际调用语法与技能发现方式由使用环境提供。选择技能不替代项目的执行授权。

## 用户调用（user-invoked）

- **[architecture-security-review](./user-invoked/architecture-security-review/SKILL.md)**：综合评审技术路线、架构、安全与实现，报告有证据且值得修复的问题。
- **[fix-bug](./user-invoked/fix-bug/SKILL.md)**：修复用户明确要求纠正的交付后实现缺陷，依据既定合同或诊断进行最小修正、回归验证和审查。
- **[grill-me](./user-invoked/grill-me/SKILL.md)**：通过 grilling 访谈推敲计划或设计，不附带领域文档记录。
- **[grill-with-docs](./user-invoked/grill-with-docs/SKILL.md)**：结合 grilling 与 domain-modeling，在访谈中同步记录领域术语和架构决策。
- **[handoff](./user-invoked/handoff/SKILL.md)**：将当前会话整理成供另一代理继续工作的交接文档，保存到操作系统临时目录。
- **[improve-codebase-architecture](./user-invoked/improve-codebase-architecture/SKILL.md)**：寻找模块深化机会，生成 HTML 报告，再围绕用户选择的方向深入讨论。
- **[setup-matt-pocock-skills](./user-invoked/setup-matt-pocock-skills/SKILL.md)**：配置技能使用的问题跟踪器、分诊标签与领域文档布局。
- **[teach](./user-invoked/teach/SKILL.md)**：围绕用户的学习目标，在工作区中持续组织课程、练习、参考资料和学习记录。
- **[to-questionnaire](./user-invoked/to-questionnaire/SKILL.md)**：将需要第三方回答的问题整理为 Markdown 问卷，明确收件人、背景与所需信息。
- **[to-spec](./user-invoked/to-spec/SKILL.md)**：将已确定的产品和设计决策整理为可实施、可验收的规范，标明尚未解决的阻塞事项。
- **[to-verify](./user-invoked/to-verify/SKILL.md)**：对交付结果进行独立验收，依据批准的要求报告通过、失败或阻塞，不修改交付物。
- **[triage](./user-invoked/triage/SKILL.md)**：对问题及外部 PR 分类、核实和澄清，维护分诊状态并准备可供代理执行的任务说明。
- **[wait-what](./user-invoked/wait-what/SKILL.md)**：补充上下文并用简明语言重新解释上一条未被理解的回答。
- **[wayfinder](./user-invoked/wayfinder/SKILL.md)**：将大型、尚不清晰的工作组织为共享决策地图，逐步解决决策工单，明确后续方向。

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
