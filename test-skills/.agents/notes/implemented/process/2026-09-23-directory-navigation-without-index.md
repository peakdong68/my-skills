# Agent Note: 文档归属入口与无索引记录导航

Status: implemented

## 问题

工件注册表和生成索引形成重复入口；多上下文记录还需要可发现性。Setup 资源只有文档位置表，缺少“一个事实一个家”、按位置写作、slop 检查和文档审查规则。记录规则同时有宽松旧格式、structured 新格式和独立模板，不能由单一检查边界约束。

## 决定

目标项目的文档入口（通常 `docs/AGENTS.md`）拥有文档分层、位置与写法；setup 提供可按项目实际路径调整的完整文档标准种子，涵盖一个事实一个家、写作规则、按位置补充什么、slop 清单、审查步骤与检查入口。文档分层只列常见文档及典型职责，作为辨认属主的参考，不照搬单一项目的完整清单，也不要求每种文档都存在。文档约定区块改为索引：指向目标文档标准、领域规则，以及用户选用时的 Agent Notes 属主，不复制这些文档的规则。新模板使用 `## Project conventions`；已有 `## 文档与约定` 保留标题并原位更新，旧 `## Agent skills` 区块原位更名，避免重复追加。通用说明不携带特定仓库的工程/Git 命令。

Agent Notes 格式、固定分类、生命周期与章节规则由 `write-notes-like-deepseek` Skill 唯一拥有；Setup 不再部署第二份 README 规则、模板、config schema 或 checker。本仓库旧 Notes README 的独有职责只保留项目范围说明，并指向 DSH Skill。过往格式迁移不补造材料中无法确认的备选方案。

DSH 头部与章节校验由其脚本执行；实际决定和备选真实性仍由审阅负责。Setup 文件仅配置所选 Notes 根并指向已安装 Skill，不再复制通用 Note 规则。本仓库 Notes 保持项目历史，不作为目标项目初始化资源。

文档位置继续由目标项目现有入口承载，不要求或新建 `artifacts.md`。若项目已有该文件，保留其属主路由，只有授权并完成整合后才迁移。规划按需创建或更新独立 Spec；Spec 拥有已接受行为合同，小型工作项可以直接拥有行为与验收，不为每次变更重复建档。生命周期/class 目录树承担导航，不生成 `INDEX.md`。上下文映射与 Notes 记录范围仍由用户分别选择，多上下文使用同一份项目根映射，并逐根调用 DSH CLI。

## 备选方案

- **让新安装使用统一格式、本仓库保留旧格式**：不采用。两套规则使相邻记录无法复用，且检查器必须默许旧格式。
- **保留可复制模板**：不采用。README 已经拥有完整格式定义，独立模板会重复元数据和章节骨架。
- **保留工件注册表或生成索引**：不采用。文档属主由项目指令入口拥有，目录树和只读列表能承载记录导航。

## 后果

旧方案曾部署七个 Notes 规则和工具文件；这些 Setup resources 已移除。目标项目拥有自己的 Notes 根选择与历史记录，DSH Skill 拥有格式和工具。迁移时先审计现有定制与记录证据，再在授权范围内统一更新内容和引用。

参考项目的文档治理内容按通用规则吸收。模板相对链接按目标 `docs/AGENTS.md` 与 `.agents/notes/` 位置校正；本仓库的实际源文档引用则指向 `skills/user-invoked/setup-agent-skills/docs-agents.md`。

## 验证

Standards 与 Spec 两轴实施审查发现：四份已有真实备选的历史记录仍误留“未记录”注释；另有 implemented 记录把重复验收清单改名保留。已移除四份记录的不适用注释，将可恢复方案统一放入 `## 备选方案`，并删除重复清单、将核对结果并入 `## 验证`。两轴定向复核确认这些问题已修复。

用户指出本地 Notes README 仍保留过多旧规则后，已按参考项目 README 重写为位置分类、记录范围、元数据/章节格式、生命周期迁移和工具检查；移除了与本仓库属主方式不符的多上下文配置细则及重复工程阶段编排。随后按用户对文档分层的澄清，将文档标准中的分类表收敛为常见文档及典型职责，并明确其为可选参考，不是需要完整复制的项目清单。再按用户对 `## Agent skills` 的指引，将其改为目标仓库文档约定的简要索引，只保留适用属主指针，不复制参考仓库专属条目。`artifact-registration.md` 明确专用 `artifacts.md` 不是必需文件；现存者仅按已有属主保留，迁移需要授权。引用目标逐一确认存在。针对这些文档修订请求 Standards 与 Spec 独立复核，但代理均因用量限制无法运行；因此这些修订没有独立审查结论。

历史实现时，旧 checker 检查 23 条记录，旧工具自测覆盖格式、上下文导航、无索引与路径安全；这些脚本已移除。当前记录树与格式由 DSH 校验命令检查。`git diff --check` 当时通过。目标项目文件当时仅作只读参考，未修改 `E:\workspace\seeaihub-server-next`。

## 依据与关联

参考材料为 `seeaihub-server-next/docs/AGENTS.md`、`.agents/notes/README.md`、`.agents/notes/AGENTS.md`，以及当时采用的格式与文档治理决定。项目文档标准种子见 [docs-agents.md](../../../../skills/user-invoked/setup-agent-skills/docs-agents.md)；本地范围见 [README](../../README.md) 与 [AGENTS](../../AGENTS.md)；Note 格式及工具边界见 [DSH Skill](../../../../.agents/skills/write-notes-like-deepseek/SKILL.md) 和 [Setup 说明](../../../../skills/user-invoked/setup-agent-skills/decision-records.md)。
