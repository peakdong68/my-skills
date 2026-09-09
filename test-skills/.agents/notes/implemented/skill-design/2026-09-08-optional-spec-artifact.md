---
title: Spec 是可选工件，生成不代表批准
status: implemented
created: 2026-09-08
updated: 2026-09-08
approval: 用户在本任务会话中已确认，日期与依据见正文
verification: 对照正文引用的已交付文件及本任务检查结果核对；见依据与关联
---

# Spec 是可选工件，生成不代表批准

## 背景

通用流程需要兼容已有合同体系，用户主动生成 Spec 的需求不应成为每次实施的必经文档步骤。

## 决定

to-spec 保持用户主动调用，优先更新已有 Spec，引用其他权威工件。内容就绪、项目批准和执行授权分开判断。格式优先复用项目规范及既有 Spec；内置模板作为独立资源按需读取。

## 理由与替代方案

强制把所有合同重新整理成 Spec 会制造重复权威；完全删除技能又会失去明确需要 Spec 时的专项入口。因此保留可选技能并收紧权威与发布边界。

## 影响

项目可使用 Proposal、Issue、RFC 等已有工件，只要合同充分明确。新增 Spec 的替代关系必须清楚，发布状态不能代替批准或执行授权。

## 依据与关联

2026-09-08 本任务会话中，用户要求修正 to-spec，继而要求优先使用已有文件风格并拆分模板；无独立会话链接。

参见 [to-spec](../../../../skills/user-invoked/to-spec/SKILL.md)、[模板](../../../../skills/user-invoked/to-spec/spec-template.md)、[Planning 约定](../../../../engineering-v2.md)。
