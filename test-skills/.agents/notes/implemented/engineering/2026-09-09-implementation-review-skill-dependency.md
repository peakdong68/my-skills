---
title: 技能编排版本复用 code-review
status: implemented
created: 2026-09-09
updated: 2026-09-09
approval: 用户在本任务会话要求 implement 引用 code-review 并保留 ownership，engineering-v2.md 保持不变
verification: 技能格式、引用、差异及决策索引检查；核对 engineering-v2.md 与 code-review 未修改
---

# 技能编排版本复用 code-review

## 决定与理由

engineering.md 通过仓库技能编排工程工作，因此 implement 的 Implementation Review 直接使用 code-review 的审查方法和报告，避免重复定义两套审查规则。implement 提供审查基线、范围和需求设计依据，并保留发现归属、范围内修正以及最终验证前的完成责任。独立审查请求同样使用 code-review，仍不自动修正或推进实施状态。

engineering-v2.md 是独立方法论，保留其内置审查规则。采用 v2 可不安装 code-review；但若仍使用共享 implement 技能，则必须保留该依赖或先调整项目副本。README 同步说明这一差异。

## 影响与关联

本决定调整技能依赖，不扩大执行权限。补充 [两种工程流程](./2026-09-08-engineering-workflow-variants.md) 的审查实现方式；本次不修改 code-review 技能或 engineering-v2.md。

实现见 [implement](../../../../skills/model-invoked/implement/SKILL.md)、[code-review](../../../../skills/model-invoked/code-review/SKILL.md) 和 [技能选配说明](../../../../skills/README.md)。依据为 2026-09-09 本任务会话，无独立会话链接。
