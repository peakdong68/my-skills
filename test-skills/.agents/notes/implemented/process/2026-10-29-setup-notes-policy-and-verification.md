# Agent Note: Setup 配置 Agent Notes 写入规则与统一校验入口

Status: implemented

## Problem

DSH Skill 的说明建议把“重要改动留笔记”加入项目指令，但 Setup 当前只登记 DSH Skill 与 Notes 根，没有保证这段规则进入目标项目实际生效的 `AGENTS.md` 或 `CLAUDE.md`。规则还要求运行 `npm run verify-notes`，而 Setup 过去把 `package.json` 脚本视为可选，因此新配置可能留下不可执行的命令。

## Decision

Setup 写入或更新项目实际生效的 `AGENTS.md` 或 `CLAUDE.md` 时，加入指向文档规则入口的说明，指出其负责文档分层、位置、职责与写法；链接相对指令文件解析，项目已有文档入口路径不同时适配链接目标。当 Setup 启用 Agent Notes 时，复制 Setup 配置说明中的“重要改动必须留笔记”四条中文模板，保留原文、编号与技能名引用。使用技能名引用以兼容项目级和用户级 DSH Skill 安装。已选 Notes 根映射另用项目指针说明。等价规则已存在时更新或补齐，不重复添加。详细 Note 生命周期与归档操作仍以 DSH Skill 为准。

Setup 技能的公开名称为 `setup-agent-skills`；技能目录、frontmatter 名称和仓库内有效入口同步使用该名称。

同一 Setup 配置必须确保管理根 `package.json` 提供 `verify-notes` 脚本。文件不存在时创建仅包含必要脚本的文件；文件已存在时保留现有字段和脚本，只新增或安全更新 `verify-notes`。脚本用目标项目稳定的本地 DSH 脚本路径运行目录/链接、格式和归档检查，并对每个已选 Notes 根分别检查。若已有同名自定义脚本无法在不丢失现有行为的情况下合并，Setup 在写入前说明差异并请用户裁决。CI 仍只在用户选择后配置；npm 脚本与 CI 均不判定每次重要代码改动是否附带 Note，该项由项目指令引导并在评审中检查。

本次工作项为当前任务会话，无需配置 Issue tracker。Setup 主技能和 Agent Notes 配置说明共用 Setup 自有模板；[此前 Setup/Planning 采用 DSH 且 npm scripts 可选的决定](../../implemented/process/2026-10-29-setup-planning-dsh-notes.md)继续适用于独立安装场景，该决定仅收窄 Setup 启用 Agent Notes 时的行为。DSH README 面向人类读者，不作为 Setup 配置模板来源。

## Alternatives considered

- **保持 `package.json` 命令可选，并在项目指令中为缺少脚本的项目写入三条 `npx tsx` 命令** — 能避免给非 Node 项目增加 `package.json`，也与 DSH 独立安装的默认行为一致；用户已选择 Setup 配置时对所有启用 Notes 的项目提供统一 `npm run verify-notes` 入口，因此不采用。
- **要求项目团队自行把 DSH 规则复制进 `AGENTS.md` 或 `CLAUDE.md`** — 不会改写项目自定义规则且无需 Setup 知道指令文件结构；但会让 Setup 完成后依旧漏掉用户要求的 Agent 规则，因此不采用。

## Consequences

- Setup 写入或更新实际生效的项目指令时，加入文档入口指针；启用 Agent Notes 时额外加入“重要改动必须留笔记”规则，已有等价规则时更新而不重复，未启用 Notes 时不添加该规则。
- 规则链接到目标项目实际 DSH Skill 路径，并明确覆盖所有已选 Notes 根；不存在错误假设的默认路径。
- Setup 的中文模板按用户给定原文保留；详细 Note 生命周期及归档操作由 DSH Skill 负责，不要求改写决定历史或编造备选。
- Setup 在项目管理根创建或补齐 `package.json` 的 `verify-notes` 脚本，保留其他字段与脚本；该脚本对每个已选 Notes 根执行目录/链接、格式及归档验证。
- 无法安全合并既有 `verify-notes` 命令时，Setup 在变更前请求裁决；运行环境缺少 Node/npm 或本地 DSH 验证脚本时，不声称验证完成，并报告具体阻塞。
- Setup 的重复配置不会产生重复规则或覆盖用户脚本；GitHub Actions 仍是显式可选项。
- Setup 主技能、Setup Agent Notes 配置说明和生成到目标项目的规则共用同一 Setup 自有中文模板。

## Consequences

在非 Node 项目中新增 `package.json` 只用于 Notes 校验，可能使工具链入口看起来像项目运行依赖；脚本应只调用现有 DSH 校验器，不添加项目运行依赖或 lockfile。`npx tsx` 首次运行可能需要网络获取执行器。既有自定义 `verify-notes` 行为不可安全推断，必须保留并在有冲突时请用户决定。

## Testing

- DSH tree/link verification: passed for all 25 notes.
- DSH format verification: passed for all 25 notes.
- Archived-note verification: passed (0 archived notes, 0 manifest seals).
- `git diff --check`: passed.
- Standards and Spec implementation reviews: PASS.
- Reviewed the Setup-owned template and its use from the skill and configuration guide. The target project's `npm run verify-notes` is a Setup completion check; no target project was configured in this implementation turn.
