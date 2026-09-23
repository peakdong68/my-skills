---
title: 按用户选定上下文隔离 Agent Notes 目录
status: implemented
created: 2026-09-15
updated: 2026-09-23
approval: 本任务会话用户确认上下文布局与记录范围分别选择，并要求按照方案执行
verification: 双轴审查与修正复审完成，隔离目录回归及索引检查通过，见正文
---


# Agent Note：按用户选定上下文隔离 Agent Notes 目录

## 问题

多上下文布局与哪些上下文启用 Agent Notes 是两个不同选择，发现项目目录不能替用户决定记录范围。

## 决定

上下文布局与 Notes 启用范围分别由用户选择，复用已有明确选择。发现多个项目不自动初始化 CONTEXT-MAP.md，也不为所有上下文安装记录系统。在同一次配置说明中确认未定边界、名称、路径，以及需要记录的上下文和公共区。

该实现阶段使用了生成索引；索引现已由[后续实现决定](./2026-09-23-directory-navigation-without-index.md)替代，按目录只读导航继续保留。

本决定补充[按需配置](../skill-design/2026-09-14-setup-targeted-configuration.md)的多上下文处理：仅保持根目录统一或增加分类视图不足以隔离各项目记录。根级 config.json 通过 contextMap 与 recordRoots 将已选上下文映射到 `.agents/notes/` 内独立目录，每个目录拥有生命周期/分类树。该实现最初为各目录生成索引；后续决定以只读命令导航取代生成索引。公共和跨上下文决定保留一个选定属主，其他位置引用。分类与上下文独立。

[部署说明](../../../../skills/user-invoked/setup-matt-pocock-skills/decision-records.md)、[管理规则](../../README.md)、[脚本](../../../../scripts/decisions/lib.mjs)及通用副本已同步。README 说明用户配置方式。

## 兼容与边界

旧版配置和原有生命周期/分类路径继续有效；配置目录尚不存在时仅登记，不生成空目录。历史记录不自动迁移。本仓库保持原分类和路径，没有替用户推断上下文或配置新的记录范围。启用范围及上下文标识与映射的一致性由实际配置审阅核实，脚本不解析任意 Markdown 来猜测用户授权。

## 验证

本文的索引生成和新鲜度检查记录描述本决定首次交付时的行为，后续已由只读目录导航取代。

Standards 审查发现链接目录可能使索引写到 Notes 之外，已修正为拒绝 recordRoots 中的链接/非目录，并拒绝记录树内符号链接。修正复审无剩余发现。Spec 审查无实质发现。

`node scripts/decisions/self-test.mjs` 在隔离临时仓库验证：旧配置和历史记录保留；两个上下文及公共区分别生成索引；根索引导航；未来目录不自动创建；目录索引过期被检测；（以上为本记录创建时的历史验证结果，当前导航已由后续决定改为只读命令。）非法路径、重复上下文、缺失映射及未登记目录被拒绝；指向外部目录的 junction/symlink 阻止生成，外部 INDEX 保持不变。重复维护不修改配置、定制脚本或历史正文。

`node scripts/decisions/update-index.mjs`、`node scripts/decisions/check.mjs` 和 `git diff --check` 通过。技能格式、本地文档链接与通用/部署副本一致性检查通过。验证覆盖脚本运行和指令内容，未对真实外部项目执行 setup，也未声称模型在所有会话中均遵守选择边界。

<!-- agent-note-format: alternatives-not-recorded (pre-format Agent Note) -->

## 后果

上下文映射和记录范围分别显式配置；旧目录继续保留，新增配置不自动迁移历史记录。
