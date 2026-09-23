# Agent Notes

本目录保存影响本仓库的工程决定、交付理由和实际后果。代码、测试、Spec、RFC 或 ADR 已完整拥有的信息不在此复制；Agent Note 只记录该决定独有的取舍与验证。

正文的文档归属、写作规则和审查方法遵循[文档标准](../../skills/user-invoked/setup-matt-pocock-skills/docs-agents.md)。本 README 只规定 Agent Notes 的位置、元数据和生命周期格式。

## 位置与分类

记录路径为 `{lifecycle}/{category}/YYYY-MM-DD-topic-slug.md`。生命周期目录为 `proposed/`、`implemented/` 或 `rejected/`；类别以[项目配置](./config.json)为准，不在正文或脚本中另设分类。

日期表示主题首次提出日期；无法确认时使用建档日期。文件名在所有生命周期和类别中唯一，移动生命周期时保留原文件名。记录之间使用相对 Markdown 链接。目录树是记录清单，不生成集中式 `INDEX.md`；需要导航时可运行只读的 `node scripts/decisions/list.mjs`。

## 何时记录

- 重要决定的独有理由、备选方案或后果无法从代码、测试或权威设计文档得知时，创建或更新记录。
- 同一决定已有记录时更新原属主，不创建重复记录；独立的新决定才新建记录。
- 不用 Agent Note 复制合同正文、跟踪工单进度、保存会议纪要或完整实现和测试日志。
- 纯机械编辑、链接修复和格式整理不创建记录。实质改变既有决定时，创建替代记录并链接原记录。

部分替代时，两份记录都保留并说明各自仍适用的范围。完全替代时，先将旧记录仍有价值的理由、备选、后果和验证并入新属主，修复入站链接，再删除旧记录；无法确认其价值或引用时先保留并说明。

## 生命周期

| 目录与 `status` | 含义 |
| --- | --- |
| `proposed/`：`proposed` | 变更尚未交付或仅部分交付；记录提议、备选、验收条件和风险。 |
| `implemented/`：`implemented` | 所记录范围已交付并完成必要验证；内容与实际交付保持一致。 |
| `rejected/`：`rejected` | 提案已否决；保留拒绝原因和仍有参考价值的取舍。 |

批准、交付和验证是不同事实。记录状态不能代替项目批准或执行授权；没有充分交付证据时保留 `proposed`。

## 元数据与正文

文件以 UTF-8 元数据块开头。字段使用一行一个 `key: value`，不得增加项目自定义字段，顺序固定如下：

```yaml
title: 记录标题
status: implemented
created: YYYY-MM-DD
updated: YYYY-MM-DD
approval: 实际批准依据
verification: 实际验证证据
```

`proposed` 记录只使用前五个字段；`implemented` 必须追加 `verification`；`rejected` 必须追加 `reason: 一句话否决理由`，不使用 `verification`。日期格式为 `YYYY-MM-DD`；`created` 与文件名日期一致，`updated` 在实质修改时更新。批准和验证写实际事实，不用状态词代替证据。

元数据后的第一个非空行必须是 `# Agent Note：<title>`，标题与 `title` 一致；正文第一节固定为 `## 问题`。

| 状态 | 必需章节 |
| --- | --- |
| `proposed` | `## 提案`、`## 备选方案`、`## 验收条件`、`## 风险` |
| `implemented` | `## 决定`、`## 备选方案`、`## 后果`、`## 验证` |
| `rejected` | `## 备选方案`，并保留原提案正文 |

`implemented` 不保留 `## 提案`、`## 计划`、`## 迁移计划` 或 `## 验收条件`。只记录真实考虑过的备选方案，不为满足格式而补造。2026-09-22 前创建且原始材料确实无法还原备选方案的历史记录，可以用以下注释代替 `## 备选方案`；不得用于新记录：

```markdown
<!-- agent-note-format: alternatives-not-recorded (pre-format Agent Note) -->
```

## 生命周期迁移与维护

- `proposed → implemented`：移动文件并更新状态；把提议改写为已交付的决定，将验收条件和风险折入后果或验证，用实际结果替换计划。
- `proposed → rejected`：移动文件并更新状态与 `reason`，保留提案及相关取舍。
- 决定部分被替代时保留原记录，明确失效范围并互相链接；完全替代按前述合并规则处理。
- `implemented` 的路径、结构、默认值等事实随交付同步更新；推翻已接受决定时另建记录，不改写旧决定的历史。

仍能帮助后续判断的已交付和已否决记录可以保留；没有长期决策价值的记录可在修复引用后删除。本仓库不使用 `archived/` 生命周期。

## 检查与导航

从仓库根目录运行：

```sh
node scripts/decisions/check.mjs
node scripts/decisions/list.mjs
```

工具用法和检查边界见[决策记录工具说明](../../scripts/decisions/README.md)。检查器校验配置、目录、元数据、生命周期章节、日期、文件名唯一性及本地链接；它不证明批准属实、决定充分、备选方案真实或交付验证有效，这些由审阅判断。`list.mjs` 只读列出记录目录，不生成文件。
