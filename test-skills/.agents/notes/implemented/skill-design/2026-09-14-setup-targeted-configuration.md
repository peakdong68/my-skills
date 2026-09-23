---
title: Setup 按需配置并验证实际入口与工件归属
status: implemented
created: 2026-09-14
updated: 2026-09-23
approval: 本任务会话用户接受 setup 改进建议并明确要求先改进
verification: 2026-09-15 两轴审查无实质发现，技能格式、本地链接和记录检查通过；范围与限制见正文
---


# Agent Note：Setup 按需配置并验证实际入口与工件归属

## 问题

Setup 若不读取项目现有配置和实际入口，会重复创建文档、重复询问或误判远程能力。

## 决定

本任务会话为工作项及验收依据。调整 [setup](../../../../skills/user-invoked/setup-matt-pocock-skills/SKILL.md) 和三种跟踪器模板，不运行目标项目初始化或远程写入。

Setup 不再是使用其他技能前的必经步骤。检查现状后给出一次必要差异说明，仅询问尚未确定的重要选择，复用既有授权。依目标环境实际读取的入口和已有引用选取 AGENTS 或 CLAUDE，不按文件名强行优先；上下文布局依据已有映射和领域边界，不以大型 monorepo 或 JS workspace 配置为必要条件。

保留根级注册、Agent Notes 可选、重复运行保留差异及历史迁移保护。Setup 不创建另一套工程推进规则，配置或工作状态不代替规划、实施和发布授权。完成时区分本地配置检查与实际远程访问能力，不用试建工件来验证连接。

[GitHub](../../../../skills/user-invoked/setup-matt-pocock-skills/issue-tracker-github.md)、[GitLab](../../../../skills/user-invoked/setup-matt-pocock-skills/issue-tracker-gitlab.md)、[本地 Markdown](../../../../skills/user-invoked/setup-matt-pocock-skills/issue-tracker-local.md) 的 publish 操作先定位原工作项与授权；已有工作更新原属主，新工作才创建。跟踪器不再指定独立 Spec 的竞争存放位置。

## 验证

2026-09-15，Standards 与 Spec 独立审查本轮 setup 及三种跟踪器模板，均无实质发现；Spec 首次因配额中断，重试后完成。本轮排除此前已审的本地 readiness 状态调整及其他工作区变更。

核对交付文本确认：配置入口按所选范围检查，已有配置充分可跳过 setup，领域配置不强制跟踪器；差异说明复用已有选择与授权，仅询问重要未决事项，重复运行和覆盖限制保留；入口按实际消费关系选择，多上下文按领域边界选择，根级注册与记录共享规则保留；三个发布模板均先定位已有工作项、核对发布权限，并保留独立 Spec 的注册属主；完成条件核对工具与访问能力并如实报告限制，不授权安装工具或通过试写验证连接。

技能基础格式检查通过；现有 `disable-model-invocation: true` 单独核对，临时校验副本仅去掉校验器未支持的该字段，源文件保留。四份文档的 11 个本地 Markdown 链接检查通过。记录索引重新生成并通过 `node scripts/decisions/check.mjs`，`git diff --check` 通过。

这是技能文本与模板的交付验证，未运行真实目标项目初始化、CLI 身份检查或远程写入，也未据此声称运行时行为或远程连接已经验证。

多上下文的目录隔离与分别选择规则由[后续决定](../decision-records/2026-09-15-context-record-directories.md)补充；沿用按需配置及历史归属保护。

记录脚本与文档归属的后续调整见[无生成索引决定](../decision-records/2026-09-23-directory-navigation-without-index.md)。

<!-- agent-note-format: alternatives-not-recorded (pre-format Agent Note) -->

## 后果

Setup 只处理用户选定且未解决的配置，并如实区分文件配置与真实远程访问验证。
