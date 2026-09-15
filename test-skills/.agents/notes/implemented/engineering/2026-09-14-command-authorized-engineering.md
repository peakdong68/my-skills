---
title: 用用户命令授权规划与实施，移除集中工程编排
status: implemented
created: 2026-09-14
updated: 2026-09-14
approval: 本任务用户明确要求按照其命令授权设计改进现有体系；这是本次迁移授权，不将所引用的命令当作运行指令
verification: 两轴审查发现已修正并定向复核通过，技能格式与调用策略、本地链接锚点、源副本及记录索引检查通过；未做代理运行时权限测试
---

# 用用户命令授权规划与实施，移除集中工程编排

## 决定与范围

本任务会话为工作项及验收依据。用户指出旧规则渐变为过重的软状态机，要求默认 Discuss，由 /planning 与 /implement 明确授权推进，删除 engineering.md。

[AGENTS.md](../../../../AGENTS.md) 只保留讨论、命令与权限边界。planning 成文并完成必要评审后回 Discuss，不自动进入实施；implement 检查合同充分性，关键缺口不自行进入规划。一次实施授权覆盖 code-review、verify 及范围内修正；重大范围、合同或设计变化停止受影响实施，讨论后等待新命令。

按用户后续提供的入口文本，AGENTS 将讨论条件展开为列表，并明确实施中采用测试优先时加载 tdd、实现后报告完成或提交前加载 code-review、审查通过后声称交付前加载 verify。保留引用命令不授权、规划后回 Discuss、未就绪实施不自动规划及运行模式边界。

planning 已是当前技能名，本次修复旧 plan 路径而非再重命名。两个入口通过调用策略禁用隐式选用，保留现有目录位置；命令授权不依赖目录名或 Harness Plan Mode。文档中的命令例子不构成授权。普通文档治理的既有例外保留。

删除根 engineering.md，README 不再推荐部署它。[engineering-v2.md](../../../../engineering-v2.md) 仅保留为旧方法论参考，不参与当前授权规则。原编排中的两类审查五轮上限各自移至技能，保留收敛约束而不再维护中央流程文档。代价是实施充分性依靠技能判断与证据，命令并不保证条件具备。

同步 implement、planning、verify、Ticket、to-spec、fix-bug 及本地跟踪器样板的返回路径。记录 README 的通用源与本仓库副本同步移除固定阶段序列。历史决定内容保留，指向已删除文件的链接固定到删除前 Git 版本；旧 plan 路径修复为实际 planning 路径。

## 替代关系

本决定替代下列记录中当前工程入口、旧执行口令或自动阶段衔接部分，其余职责、历史依据和范围内审查验证责任保留：

- [旧授权口令](./2026-09-08-ready-execution-handoff.md)
- [两种流程入口](./2026-09-08-engineering-workflow-variants.md)
- [Discuss 与规划衔接](./2026-09-10-discuss-planning-transition.md)
- [阶段完成与继续](./2026-09-10-stage-completion-continuation.md)
- [授权与审批分离](./2026-09-08-separate-approval-and-execution.md)

## 验收条件

- 普通认可和引用中的命令不启动规划或实施；默认 Discuss。
- /planning 完成后回 Discuss，/implement 关键合同缺失时报阻塞并建议规划，不自行进入规划。
- 范围内修正、审查和验收持续完成；重大变化等待新命令，独立已授权工作可继续。
- planning 与 implement 不隐式选用；verify 由 implement 显式加载执行。
- 当前接入说明不依赖 engineering.md，历史链接可追溯，记录资源副本一致。

## 交付与验证

上述范围已交付。Standards 审查指出就绪失效应同步撤销工作项 readiness，已修正并定向复核；Spec 审查指出遗漏原非实质问题不阻塞审查的过滤，已补入两类审查并定向复核。两轴均无剩余发现。

planning、implement、verify、to-spec、fix-bug 格式检查通过；既有手动调用扩展字段单独核验，原校验器不支持的字段仅在临时副本排除。planning、implement 的显式调用策略与 UI 字段校验通过；活动文档本地链接和锚点检查通过。Agent Notes 通用 README 与本仓库副本逐字节一致。

按验收条件逐项核对普通认可、引用命令、规划后等待、未就绪实施、范围内修正、重大变化返回及历史路由的文义。未执行代理运行时权限测试，也未提供 Harness 命令解析器；实际授权约定由读取项目指令的代理执行。记录索引生成、检查及 git diff --check 通过。
