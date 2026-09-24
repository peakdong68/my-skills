---
title: 文档归属入口与无索引记录导航
status: implemented
created: 2026-09-23
updated: 2026-09-24
approval: 本任务会话用户确认参考 seeaihub-server-next 的说明与脚本、取消 setup 模板 artifacts.md 和生成 INDEX.md，随后发出 /implement
verification: 23 条记录格式检查、自测、技能格式兼容校验、部署副本一致性与差异空白检查通过；用户反馈后精简重写本地 README 并核对其引用。README 本轮独立审查代理因用量限制未能运行
---

# Agent Note：文档归属入口与无索引记录导航

## 问题

工件注册表和生成索引形成重复入口；多上下文记录还需要可发现性。Setup 资源只有文档位置表，缺少“一个事实一个家”、按位置写作、slop 检查和文档审查规则。记录规则同时有宽松旧格式、structured 新格式和独立模板，不能由单一检查边界约束。

## 决定

目标项目的文档入口（通常 `docs/AGENTS.md`）拥有文档分层、位置与写法；setup 提供可按项目实际路径调整的完整文档标准种子，涵盖一个事实一个家、写作规则、按位置补充什么、slop 清单、审查步骤与检查入口。文档分层只列常见文档及典型职责，作为辨认属主的参考，不照搬单一项目的完整清单，也不要求每种文档都存在。`## Agent skills` 内的文档约定改为索引：指向目标文档标准、领域规则，以及用户选用时的 Agent Notes 属主，不复制这些文档的规则。通用说明不携带特定仓库的工程/Git 命令。

Agent Notes README 是元数据、生命周期与章节格式的唯一来源。删除独立 `templates/record.md`，移除 `recordFormat` 双格式配置；检查器对所有新建和既有记录执行同一格式。现有 23 条记录迁移为结构化章节并更新 `updated`，保留原正文事实、引用、验收证据和历史验证；无法从材料确认的旧备选方案使用格式建立日前的专用注释，不补造讨论。新记录必须写实际考虑过的备选方案。

README 提供规范元数据字段、字段顺序与生命周期差异；实现记录需要 `verification`，被否决记录需要 `reason`。检查器校验字段集合与顺序、标题、首节、生命周期章节和历史豁免日期。通用资源中的相对路径按部署后的目标项目目录解析；本仓库 Notes 文档改为指向技能内的文档标准种子。

文档位置继续由目标项目现有入口承载，不恢复 `artifacts.md`。生命周期/分类目录继续作为清单，`list.mjs` 提供只读导航，不生成 `INDEX.md`。上下文映射与 Notes 记录范围仍分别由用户选择，多上下文共享同一管理根和工具。

## 备选方案

- **让新安装使用统一格式、本仓库保留旧格式**：不采用。两套规则使相邻记录无法复用，且检查器必须默许旧格式。
- **保留可复制模板**：不采用。README 已经拥有完整格式定义，独立模板会重复元数据和章节骨架。
- **保留工件注册表或生成索引**：不采用。文档属主由项目指令入口拥有，目录树和只读列表能承载记录导航。

## 后果

新部署文件共七个：Notes README、AGENTS、配置，脚本 README、`lib.mjs`、`check.mjs` 和 `list.mjs`。目标项目仍拥有部署后的配置和文档副本；升级时要先比较定制和脚本兼容，显式请求迁移后再统一历史记录格式。

参考项目的文档治理内容按通用规则吸收。模板相对链接按目标 `docs/AGENTS.md` 与 `.agents/notes/` 位置校正；本仓库的实际源文档引用则指向 `skills/user-invoked/setup-matt-pocock-skills/docs-agents.md`。

## 验证

Standards 与 Spec 两轴实施审查发现：四份已有真实备选的历史记录仍误留“未记录”注释；另有 implemented 记录把重复验收清单改名保留。已移除四份记录的不适用注释，将可恢复方案统一放入 `## 备选方案`，并删除重复清单、将核对结果并入 `## 验证`。两轴定向复核确认这些问题已修复。

用户指出本地 Notes README 仍保留过多旧规则后，已按参考项目 README 重写为位置分类、记录范围、元数据/章节格式、生命周期迁移和工具检查；移除了与本仓库属主方式不符的多上下文配置细则及重复工程阶段编排。随后按用户对文档分层的澄清，将文档标准中的分类表收敛为常见文档及典型职责，并明确其为可选参考，不是需要完整复制的项目清单。再按用户对 `## Agent skills` 的指引，将其改为目标仓库文档约定的简要索引，只保留适用属主指针，不复制参考仓库专属条目。引用目标逐一确认存在。针对这些文档修订请求 Standards 与 Spec 独立复核，但代理均因用量限制无法运行；因此这几项修订没有独立审查结论。

`node scripts/decisions/check.mjs` 通过，检查 23 条记录；`node scripts/decisions/self-test.mjs` 覆盖统一格式、历史例外日期、上下文导航、无索引、路径安全和多父目录等场景并通过。setup 技能临时兼容副本的 `quick_validate.py` 通过；本地与部署副本中的决策管理脚本同步检查通过。`git diff --check` 通过，只有 Git 提示 LF 将按仓库配置转换为 CRLF。目标项目文件作为只读参考，未修改 `E:\workspace\seeaihub-server-next`。

## 依据与关联

参考材料为 `seeaihub-server-next/docs/AGENTS.md`、`.agents/notes/README.md`、`.agents/notes/AGENTS.md`，以及 `.agents/notes/implemented/workflow/2026-09-22-uniform-agent-note-format.md` 和 `.agents/notes/implemented/workflow/2026-09-23-document-governance-and-adr-gates.md`。项目文档标准种子见 [docs-agents.md](../../../../skills/user-invoked/setup-matt-pocock-skills/docs-agents.md)；记录规则见 [README](../../README.md) 和 [AGENTS](../../AGENTS.md)；工具边界见 [脚本 README](../../../../scripts/decisions/README.md) 与 [setup 资源说明](../../../../skills/user-invoked/setup-matt-pocock-skills/decision-records.md)。
