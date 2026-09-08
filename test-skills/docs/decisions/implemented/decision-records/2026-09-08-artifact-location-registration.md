---
title: 按项目注册工件归属及历史位置
status: implemented
created: 2026-09-08
updated: 2026-09-08
approval: 本任务会话中用户认可提供默认方法与三种注册模式
verification: 已核对资源链接、技能引用及本仓库记录检查
---

# 按项目注册工件归属及历史位置

## 背景

仅要求技能遵循“项目约定”不足以指导没有约定或希望变更约定的项目；也容易混淆当前技能库的位置和目标项目的业务工件位置。

## 决定

Setup 提供 artifacts.md 样板和注册方法，目标项目通常维护 `docs/agents/artifacts.md`，通过项目指令引用。支持保留现有、新工作采用新位置、已授权迁移三种模式。Proposal 可以直接是 proposed 变更记录，独立 RFC/Spec/ADR 保持各自属主和生命周期，跟踪器拥有工单进度。

## 理由与替代方案

不将全部工件强制搬入生命周期目录，也不在每个技能中维护相互独立的路径。注册同时保留历史查找与更新规则，避免切换约定时形成第二份合同。没有注册文件的项目仍可按现有约定工作。

## 影响

共享技能先读取项目注册，默认路径只作后备。重新注册不授权迁移；已有配置保留定制。此交付提供方法、样板及读取规则，不为本技能库虚构业务工件注册，也不实现自动文件迁移器。

## 依据与关联

2026-09-08 本任务会话中用户强调“提供一种方法约定”，认可默认方法、注册入口和历史衔接方案；无独立会话链接。

参见 [注册方法](../../../../.agents/skills/setup-matt-pocock-skills/artifact-registration.md)、[样板](../../../../.agents/skills/setup-matt-pocock-skills/artifacts.md)、[Plan](../../../../.agents/skills/plan/SKILL.md)。本记录补充 [项目分类及生命周期](./2026-09-08-project-configured-record-lifecycle.md)。
