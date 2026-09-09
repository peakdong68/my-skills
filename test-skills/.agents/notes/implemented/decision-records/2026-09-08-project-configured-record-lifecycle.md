---
title: 按项目分类组织提案与交付记录
status: implemented
created: 2026-09-08
updated: 2026-09-08
approval: 本任务会话中用户确认完整方案并要求“可以落实”
verification: 见正文的验证命令及自动化场景
---

# 按项目分类组织提案与交付记录

## 背景

原先将 DSH 六类作为通用默认值，并采用批准状态组织文件，未能表达目标项目自身交付对象，也未覆盖提案到部分实施再到交付的生命周期。

## 决定

分类由目标项目 config.json 提供 id、name、scope，模板不预置类别。目录使用 proposed/implemented/rejected，再按项目类别组织。批准依据单独记录；总体提案链接阶段和模块工作项，未全部交付前保持 proposed。

正文沿用项目风格，工具检查元数据、路径、链接和索引，不强制章节。普通文档治理不另启工程循环，实质合同修改仍按工程工作流处理。

## 理由与替代方案

放弃硬编码 DSH 六类：它们来自特定项目语境，不能成为所有项目的必然分类。放弃只用 Draft/Accepted 等批准状态描述记录：已批准但未交付与已交付需要区分。保留可复用源与项目副本的边界，以及重复初始化不覆盖的规则。

## 影响

关于总体提案本身使用 proposed 生命周期的默认规则，已由 [明确实施工作项与提案归属](../engineering/2026-09-08-work-item-and-proposal-boundaries.md) 调整为跟踪器管理 Proposal 工作状态、变更记录管理交付生命周期。分类、记录生命周期及副本保护规则继续适用。

类别变动无需改脚本，初始化需要结合项目确定分类。生命周期迁移涉及文件移动和链接修复，索引生成前先检查源记录。本仓库旧记录保留，原先的分类和状态决定已被本记录替代。

## 依据与关联

2026-09-08 本任务会话中用户确认方案并要求落实；无独立会话链接。

部分替代 [可复用资源与项目历史分离](./2026-09-08-portable-decision-records.md) 中关于固定分类及旧生命周期的内容，其余副本归属和防覆盖规则继续适用。

实现见 [配置](../../config.json)、[规范](../../README.md)、[检查器](../../../../scripts/decisions/lib.mjs)、[setup](../../../../skills/user-invoked/setup-matt-pocock-skills/decision-records.md)。

验证命令：`node scripts/decisions/update-index.mjs`、`node scripts/decisions/check.mjs`、`node scripts/decisions/self-test.mjs`。自动化场景覆盖空资源部署、自定义分类、各生命周期与必填依据、失效链接及索引新鲜度；重复 setup 防覆盖仍是技能执行约束，不是安装器保证。
