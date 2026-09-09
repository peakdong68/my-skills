---
title: 明确实施工作项与提案归属
status: implemented
created: 2026-09-08
updated: 2026-09-08
approval: 用户在本任务会话对齐 Proposal 与实施 Ticket 边界后明确输入可以执行实现方案
verification: 见正文验收与验证及本任务检查结果
---

# 明确实施工作项与提案归属

## 问题与决定

原规则用“权威工作”统称工作项、需求与设计，没有明确本次实施对象；Plan Review 不清楚更新哪个对象；Proposal 与变更记录共享默认路径却采用不同状态语义，未配置时的本地回退又绕过了跟踪约定。

每次实施明确一个 Proposal 或既有工作项的 ID、URL 或路径，选定本次范围，核对验收、必要设计与评审批准、阻塞及范围内执行授权。需求和设计可以被引用，独立 PRD/Spec/RFC 按需创建；不是缺少独立文档就缺少实施依据。

Proposal 是规划工作的主入口，创建或更新前必须有明确的跟踪配置，包括位置、工作状态和评审批准依据。可配置远程平台或本地 Markdown；缺少配置时先提示用户配置，讨论及会话草稿仍可继续。变更记录可以引用 Proposal 保存长期理由，默认不复制正文或工作状态。历史兼任文件沿用注册映射，不自动迁移。

Plan Review 结论写回本次 Proposal 或既有工作项，取得所需批准后才更新准备实施状态，不能以评审通过替代批准或执行授权。实施 Ticket 在进入 Implement 后按需拆分，引用父工作项并继承范围和有效授权；不是首次开工门禁的前置工件。Ticket 执行检查自身验收及依赖，重大新决定返回规划。

## 范围与替代关系

交付覆盖两种工程流程、Plan/Proposal/Review、Implement/Ticket、setup 工件与跟踪器样板、技能 README 以及决策管理通用资源与本仓库副本。没有新增平台集成、安装配置、迁移历史工件或修改记录脚本。

部分替代 [工件注册](../decision-records/2026-09-08-artifact-location-registration.md) 中 Proposal 默认直接作为变更记录和未配置存储回退的约定，以及 [分类与生命周期](../decision-records/2026-09-08-project-configured-record-lifecycle.md) 中提案本身默认使用记录生命周期的约定；历史属主、项目分类及防覆盖规则保留。

补充 [实施交接](./2026-09-08-ready-execution-handoff.md) 的具体依据，不扩大执行权限。Proposal 跟踪配置前置条件是用户明确要求的保障，不泛化为讨论、普通文档维护或所有工件的配置门禁。

## 验收与验证

- 有明确既有工作项且依据齐全时无需新建 Proposal 或独立 PRD/Spec/RFC。
- 新建或更新 Proposal 缺少跟踪配置时不自行选址，已配置本地 Markdown 可正常使用。
- 评审通过但所需批准或执行授权缺失时，不启动实施；record 的 proposed 路径不能替代这些依据。
- 同一范围可直接实施或进入实施后拆单，Ticket 不触发重复授权；总体交付完成需最终验证。
- 历史兼任 Proposal/record 保持属主与状态映射，新样板分别管理工作状态和记录交付生命周期。

检查包含技能格式、变更空白、决策记录/索引、通用源与部署副本一致性，并逐项对照上述情境审阅文义。情境审阅不是运行时自动化门禁测试。

## 依据与关联

2026-09-08 本任务会话中，用户列明七项歧义，认可统一方案，补充 Ticket 由 implement 进入实施后按需拆分，并授权执行；无独立会话链接。

实现见 [工程流程](../../../../engineering.md)、[方法论版本](../../../../engineering-v2.md)、[Plan](../../../../skills/model-invoked/plan/SKILL.md)、[Proposal](../../../../skills/model-invoked/plan/proposal.md)、[Review](../../../../skills/model-invoked/plan/review.md)、[Implement](../../../../skills/model-invoked/implement/SKILL.md)、[工件注册](../../../../skills/user-invoked/setup-matt-pocock-skills/artifact-registration.md) 与 [记录规则](../../README.md)。
