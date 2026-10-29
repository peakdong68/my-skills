# Agent Note: 明确实施工作项与提案归属

Status: implemented

## 问题

工作项、需求、设计和变更记录的归属及实施对象不清，导致评审结论和进度无处回写。

## 决定

原规则用“权威工作”统称工作项、需求与设计，没有明确本次实施对象；Plan Review 不清楚更新哪个对象；Proposal 与变更记录共享默认路径却采用不同状态语义，未配置时的本地回退又绕过了跟踪约定。

每次实施明确本次工作项，选定范围并核对验收、必要设计与评审批准、阻塞及范围内执行授权。工作项可以是跟踪器中的 Proposal、既有 Issue 或当前任务/对话；没有 Issue tracker 时当前任务承载范围、验收、评审和批准事实。需求和设计可以被引用，独立 PRD/Spec/RFC 按需创建；不是缺少独立文档就缺少实施依据。

Proposal 是有需要时使用的规划工作项。Issue tracker 为可选；未配置时不要求另建 Proposal 文件或 Issue，直接在当前任务记录本次规划。已配置跟踪器时沿用其位置、工作状态和评审批准约定。Agent Note 保存长期理由，不复制工作状态。历史兼任文件沿用注册映射，迁移须在明确授权范围内。

Plan Review 结论写回本次 Proposal 或既有工作项，取得所需批准后才更新准备实施状态，不能以评审通过替代批准或执行授权。实施 Ticket 在进入 Implement 后按需拆分，引用父工作项并继承范围和有效授权；不是首次开工门禁的前置工件。Ticket 执行检查自身验收及依赖，重大新决定返回规划。

## 范围与替代关系

交付覆盖两种工程流程、Plan/Proposal/Review、Implement/Ticket、setup 工件与跟踪器样板、技能 README 以及决策管理通用资源与本仓库副本。没有新增平台集成、安装配置、迁移历史工件或修改记录脚本。

本决定关于 Issue tracker 必须配置后才能创建 Proposal 的要求已由 [DSH 统一 Notes 决定](./2026-10-29-setup-planning-dsh-notes.md) 替代。工作项拥有本次范围与验收、Note 拥有长期设计理由、评审批准和执行授权分离等边界继续有效。

补充 [实施交接](./2026-09-08-ready-execution-handoff.md) 的具体依据，不扩大执行权限。工作项身份与执行授权是独立问题；没有 Issue tracker 不改变项目阶段门槛。

## 验证

- 有明确既有工作项且依据齐全时无需新建 Proposal 或独立 PRD/Spec/RFC。
- 没有 tracker 时当前任务可以作为工作项，不需创建本地 Proposal；选择 tracker 后才按其配置位置维护工作状态。
- 评审通过但所需批准或执行授权缺失时，不启动实施；record 的 proposed 路径不能替代这些依据。
- 同一范围可直接实施或进入实施后拆单，Ticket 不触发重复授权；总体交付完成需最终验证。
- 历史兼任 Proposal/record 保持属主与状态映射，新样板分别管理工作状态和记录交付生命周期。

检查包含技能格式、变更空白、决策记录/索引、通用源与部署副本一致性，并逐项对照上述情境审阅文义。情境审阅不是运行时自动化门禁测试。

## 依据与关联

2026-09-08 本任务会话中，用户列明七项歧义，认可统一方案，补充 Ticket 由 implement 进入实施后按需拆分，并授权执行；无独立会话链接。

实现见 [工程流程](https://github.com/peakdong68/my-skills/blob/e995fb367530cebcce62f1485b3085d93fcb1a26/test-skills/engineering.md)、[方法论版本](../../../../engineering-v2.md)、[Plan](../../../../skills/model-invoked/planning/SKILL.md)、[Proposal](../../../../skills/model-invoked/planning/proposal.md)、[Review](../../../../skills/model-invoked/planning/review.md)、[Implement](../../../../skills/model-invoked/implement/SKILL.md)、[工件注册](../../../../skills/user-invoked/setup-agent-skills/artifact-registration.md) 与 [记录规则](../../README.md)。


## 备选方案

原始记录未记载可确认的真实备选方案；不补造。

## 后果

跟踪器（如有）或当前任务承载工作状态，Agent Note 保存独有理由与交付事实；实施 Ticket 只在实施中按需拆分。
