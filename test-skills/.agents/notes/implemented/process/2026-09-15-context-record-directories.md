# Agent Note: 按用户选定上下文隔离 Agent Notes 目录

Status: implemented

## 问题

多上下文布局与哪些上下文启用 Agent Notes 是两个不同选择，发现项目目录不能替用户决定记录范围。

## 决定

上下文布局与 Notes 启用范围分别由用户选择，复用已有明确选择。发现多个项目不自动初始化 CONTEXT-MAP.md，也不为所有上下文安装记录系统。在同一次配置说明中确认未定边界、名称、路径，以及需要记录的上下文和公共区。

该实现阶段使用了生成索引；索引现已由[后续实现决定](./2026-09-23-directory-navigation-without-index.md)替代，按目录只读导航继续保留。

本决定补充[按需配置](./2026-09-14-setup-targeted-configuration.md)的多上下文处理：Notes 启用范围由用户分别选择，不从发现的项目自动推断。原实现用根 `config.json` 的 `contextMap` 与 `recordRoots` 登记隔离路径；该配置机制已由 [DSH 统一 Notes 决定](./2026-10-29-setup-planning-dsh-notes.md) 取代。当前选定根写入项目 `.agents/notes/AGENTS.md`，每个 DSH 命令用 `--root <path>` 处理一个根。公共和跨上下文决定仍只有一个选定属主，其他位置引用；隔离范围与 Note 分类相互独立。

[部署说明](../../../../skills/user-invoked/setup-agent-skills/decision-records.md)、[本地范围入口](../../AGENTS.md)、[DSH Skill](../../../../.agents/skills/write-notes-like-deepseek/SKILL.md)共同说明当前用户选择、根路径和工具规则。

## 兼容与边界

本仓库旧配置 schema 不作为兼容方式保留；已授权迁移本仓库既有记录到 DSH 固定 class 路径，保留文件日期与决定事实。其他项目只有在用户授权迁移时才变更历史记录。Setup 仍不推断上下文，也不从项目布局推断 Notes 启用范围。

## 验证

本文的索引生成和新鲜度检查记录描述本决定首次交付时的行为，后续已由只读目录导航取代。

Standards 审查发现链接目录可能使索引写到 Notes 之外，已修正为拒绝 recordRoots 中的链接/非目录，并拒绝记录树内符号链接。修正复审无剩余发现。Spec 审查无实质发现。

历史验证曾在隔离临时仓库检查旧配置、上下文索引、路径安全与重复维护行为；当时索引生成已由无索引导航决定取代。当前 DSH 工具不读取旧配置；根隔离通过逐次传入 `--root` 实现。

旧脚本、自测和 checker 的历史验证在实现时通过；脚本已删除，当前规则与检查由 DSH Skill 接管。该历史测试未对真实外部项目执行 Setup，也未证明 Agent 每次都遵守选择边界。


## 备选方案

原始记录未记载可确认的真实备选方案；不补造。

## 后果

上下文映射和记录范围分别显式配置；旧目录继续保留，新增配置不自动迁移历史记录。
