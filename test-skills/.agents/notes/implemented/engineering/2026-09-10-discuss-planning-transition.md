---
title: Discuss 支持已授权规划及规划限定请求
status: implemented
created: 2026-09-10
updated: 2026-09-23
approval: 本任务会话用户明确要求执行实现，修正 Discuss 问题
verification: Standards 与 Spec 复核均确认原发现已解决，情境文义核对、链接、差异和记录索引检查通过
---


# Agent Note：Discuss 支持已授权规划及规划限定请求

## 问题

Discuss 的探索留存条件与已授权规划入口重叠，且没有覆盖只规划不实施的请求。

## 决定

本任务会话为工作项和验收依据，无独立会话链接。复审发现两种工程流程的 Discuss 留存条件与已授权 Plan 入口重叠，且规划入口未明确覆盖只规划不实施的请求。

在 [engineering.md](https://github.com/peakdong68/my-skills/blob/e995fb367530cebcce62f1485b3085d93fcb1a26/test-skills/engineering.md) 和 [engineering-v2.md](../../../../engineering-v2.md) 中，将探索留存条件限定为用户尚未请求规划或授权端到端推进的情况。已授权规划可继续解决重大备选方案，不因存在未决选择回退 Discuss，也不因模型自行认为成熟而擅自推进。

仅规划请求进入对应 Plan 或 Planning，完成请求的规划交付和适用评审后结束。端到端任务需补齐重大合同时进入规划；已有工作满足就绪门禁才可跳过规划。规划授权不替代实施授权，既有授权和有效评审证据继续复用。

仅修改两个根级工程流程文件并维护本记录和索引，不更改研究目录副本、技能、执行口令或门禁要求。代价是转阶段时必须先识别请求范围，不能仅凭合同成熟度决定下一阶段。

## 验证

两份根级流程已同步修正 Discuss 留存条件、规划限定入口及跳过规划的适用范围，v2 使用其自身阶段名 Planning。Standards 与 Spec 独立复核均无新增实质发现，并确认原两项衔接问题已解决。

对上述五类情境逐项核对文义：探索、已授权但存在备选、规划限定、充分合同下的请求差异、授权分离均有明确路径。此为文档语义验证，未运行代理行为测试。文档本地链接和 git diff --check 通过，记录索引由 node scripts/decisions/update-index.mjs 生成并通过 node scripts/decisions/check.mjs 检查。

## 后续替代

本记录中的当前工程入口、旧执行口令或自动阶段衔接约定，由[命令授权方案](./2026-09-14-command-authorized-engineering.md)替代；历史依据及未冲突职责保留。

<!-- agent-note-format: alternatives-not-recorded (pre-format Agent Note) -->

## 后果

规划授权只完成规划阶段；充分合同可按门禁进入实施，规划限定请求不会自动进入实施。
