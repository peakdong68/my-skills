# Agent Note: 用 DSH Notes 统一 Setup 与 Planning 的记录契约

Status: implemented

## Problem

Setup 随附的决策记录资源仍定义动态分类、旧元数据和独立校验器；这些规则与项目采用的 `write-notes-like-deepseek` 固定分类、生命周期、章节和迁移脚本冲突。Planning 又把 Issue 配置作为 Proposal 定位前置条件，使没有 tracker 的项目无法用当前任务继续规划。按上下文隔离 Notes 的既有决定仍需保留。

## Decision

Setup 与项目 Agent 指令统一采用 `write-notes-like-deepseek` 作为 Note 格式和校验的唯一属主。整个 Setup `resources/decision-records/` 都是旧 Notes 子系统，不再作为资源部署并整体删除，其中包括旧 `.agents/notes/AGENTS.md`、`config.json`、`README.md`、模板和 `scripts/decisions/` 的 checker、库、导航器及说明；不提供双格式兼容。Notes 按用户选定的上下文及共享范围分别登记根目录；只有目标项目确需表达根映射时，Setup 才在项目指令中写入简短的项目特有映射和 DSH Skill 指针，不复制静态规则文件。DSH 所有按根读取或写入 Notes 的命令（目录导航、格式/目录校验、锚点检查、看板构建、归档和归档验证）统一支持跨平台 `--root <path>`，每次只作用于显式选定的根并复用同一套规则；目录树承担导航，不生成索引。

Planning 优先复用已有工作项。未配置 tracker 时，当前任务会话承载本次工作项，不要求创建 Issue 或独立 Proposal；Agent Note 只在符合 DSH 记录条件时保存设计理由和真实备选，工作进度、审批与阶段授权仍归工作项及项目指令。产品合同、技术设计和持久架构决定分别归工作项/Spec、proposed Agent Note 与适用 ADR。

启用 Notes 时，Setup 更新实际生效的 `AGENTS.md` 或 `CLAUDE.md`，加入指向 DSH Skill 和所选 Notes 根的规则。`package.json` 的 `verify-notes` / `archive-note` 命令作为可选便利项；GitHub Actions 工作流只在用户选择团队 CI 门禁时配置，并要求 DSH 脚本已提交且工作流路径有效。Setup 启用 Notes 时强制保证 `verify-notes` npm 脚本；[Setup Notes 规则与校验入口决定](../../implemented/process/2026-10-29-setup-notes-policy-and-verification.md)仅对该场景构成例外，不改变 DSH 单独安装时的可选集成原则。

旧项目升级先盘点已注册根、记录、脚本、命令和 CI，展示迁移映射后一次性迁移。保留记录日期、决定事实、有效证据和引用；逐篇映射至固定分类，转换章节与头部，恢复有依据的备选，没有真实备选时写“无”，不改写决定历史。修复受影响的链接和调用后移除旧脚本、旧配置与旧格式说明。历史路径继续由项目原属主保管，除非用户另行选择迁移位置。

本仓库已迁移现有活动记录并更新通用资源与部署副本。动态分类、生命周期及格式规则由 [DSH Notes Skill](../../../../.agents/skills/write-notes-like-deepseek/SKILL.md) 取代；无索引、按用户选定上下文隔离、保留项目定制和不自动迁移历史的决定继续有效，参见[按用户选定上下文隔离 Agent Notes 目录](../../implemented/process/2026-09-15-context-record-directories.md)、[文档归属入口与无索引记录导航](../../implemented/process/2026-09-23-directory-navigation-without-index.md)及[Setup 按需配置](../../implemented/process/2026-09-14-setup-targeted-configuration.md)。Setup 的项目接线规则见[Setup Agent Notes 配置说明](../../../../skills/user-invoked/setup-agent-skills/decision-records.md)。

## Alternatives considered

- **保留旧 checker、config schema 并增加 DSH 格式兼容分支** — 可减少旧项目升级的即时改动，但会让两套格式和工具长期并存；用户明确要求旧文档更新到新规则，并反对保留兼容层，因此不采用。
- **把所有上下文合并到一个 Notes 根** — 能直接使用 DSH 默认根并简化校验，但会丢失既有按用户选择隔离记录范围的能力；用户已选择保留隔离，因此不采用。
- **要求所有项目先配置 Issue tracker 才能进入 Planning** — 能集中记录工作进度、评审和批准状态，但会阻断没有 tracker 的项目；当前任务会话可承载工作项，且 Agent Note 生命周期不代替工作进度，因此不作为前置条件。
- **默认安装 npm scripts 与 GitHub Actions** — 命令和 CI 能提供方便的持续校验，但会给非 Node 项目和未采用 GitHub Actions 的项目引入无关配置；保留为显式可选集成。

## Consequences

Setup 的 Notes 路由依赖目标项目明确列出启用上下文；更改根映射需要同步更新校验命令和可选 CI。Agent 指令使 DSH Skill 可被发现，但只有本地验证或显式配置的 CI 会检查格式，指令本身不保证每个重要改动都写 Note。迁移逐篇按内容分类；证据未记录的备选保持为“无”，历史路径与事实不改写。

## Testing

本次验证中，DSH 目录与链接检查通过（24 篇）、格式检查通过（24 篇）、归档清单检查通过（0 篇归档）、锚点检查无悬空引用；看板初始化命令成功生成并清理临时输出。归档工具实测拒绝跨 Notes 根的 successor，且未修改其文件；`git diff --check` 通过。
