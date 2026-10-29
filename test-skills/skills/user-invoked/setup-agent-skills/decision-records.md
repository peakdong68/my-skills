# Agent Notes setup

Use this reference when Planning or the requested setup selects Agent Notes. The `write-agent-notes` Skill owns note format, lifecycle, authoring, validation and migration semantics. Setup owns project-specific selection and wiring only; it does not deploy a second copy of the Skill's rules or scripts.

## Select Notes roots

Reuse the project's established context map and Notes selections. Ask only about new or changed choices. Context discovery alone does not enable Notes for a context.

- A single Notes scope uses `.agents/notes/`.
- A multi-context project records only selected contexts and an optional shared scope in `.agents/notes/AGENTS.md`. Give each selected scope its own directory under `.agents/notes/`, such as `ordering/` or `shared/`; each directory is a DSH root containing the normal lifecycle/class tree.
- Keep domain boundaries in `GLOSSARY-MAP.md`. The Notes root map records which selected scopes have Notes and their paths; it does not duplicate DSH format rules or act as a category configuration.
- For every selected scope, run DSH commands with `--root <path>` targeting exactly that scope. Never silently scan or write a different scope.

Project instructions identify the `write-agent-notes` Skill by name and point to the selected Notes roots. Add its filesystem path only when needed to make the Skill discoverable. When a required DSH Skill is unavailable, report the missing prerequisite and the actual path needed; do not replace it with bundled Setup rules.

## Work items and Issue trackers

Issue tracking is optional. If configured, use its existing work item for scope, product acceptance, progress, review and approval evidence. Without a tracker, the current task or conversation is the work item. Do not require an Issue to locate a Proposal, and do not create a duplicate local Proposal when the task already carries the plan.

Agent Notes own durable technical design and decisions. Work items link to Notes; Notes do not mirror work-item status or approval evidence. Planning follows its own skill and uses `proposed` Notes only when a durable technical design meets DSH's writing criteria.

## Project instructions and verification integration

Whenever Setup writes or updates the target project's actually consumed `AGENTS.md` or `CLAUDE.md`, include the document-entry pointer sentence from the Setup skill's project-conventions template. Resolve its link relative to that instruction file; root-level files default to `docs/AGENTS.md`, while nested files or an established alternate document entry need an adapted target.

When Setup enables Agent Notes, copy the following Setup-owned template into that instruction file. Preserve its Chinese wording and numbering verbatim. It references the Skill by name so the instruction works with project-level and user-level Skill installations. Keep selected Notes-root mapping in a separate project-specific pointer. Merge an equivalent existing section instead of duplicating it. The template is a concise project instruction; the DSH Skill remains authoritative for detailed Note lifecycle and archive operations.

```markdown
## 重要改动必须留笔记

1. 非平凡改动（改了行为、架构、跨文件契约、流程与工具链、测试策略、落盘/网络/配置格式）前，遵循 `write-agent-notes` Skill 写或更新笔记；机械性小改（样式、格式化、打标、不改行为的补丁）直接提交。
2. 写之前先检索 .agents/notes/ 里的同主题旧笔记：有归属就地更新；新想法先放 proposed/，落地随同代码改动转 implemented/；新方案彻底取代旧决策时，同批归档旧篇并标明被谁取代。
3. 被放弃的方案先写它最强的理由，再解释为什么不用。
4. 提交前跑 npm run verify-notes，红了先修再交。
```

Every Setup configuration that enables Agent Notes must also ensure the management-root `package.json` contains a working `verify-notes` script. Create `package.json` with the required script when absent; otherwise preserve its fields and scripts and add or safely update only `verify-notes`. Build the script from the selected local DSH Skill path by running `verify-agent-note-tree.ts`, `verify-agent-note-format.ts`, and `verify-archived-agent-notes.ts` with `--root <path>` for every selected Notes root. Quote paths as needed; do not omit a selected root. Do not add project runtime dependencies or a lockfile solely for this script. If an existing `verify-notes` command cannot be safely merged, or a stable local DSH script path is unavailable, report the difference or blocker and resolve it before claiming setup complete. The instruction block's pre-commit command must match the configured script. Run `npm run verify-notes` after setup and do not claim Notes configuration complete until it passes; missing Node/npm, network access needed by `npx tsx`, or DSH scripts are reported blockers.

CI remains optional. Configure a GitHub Actions workflow only when the user selects CI enforcement and the DSH scripts are committed at stable paths; include every selected Notes root in its checks. Neither the instruction block nor the validators mechanically determine whether every important change has a Note; explain that this presence check remains part of review.

Project instructions explain when to write a Note and where each selected root lives. This makes the Skill reachable but does not mechanically enforce it. Local DSH validators enforce note structure; CI enforces it remotely only when explicitly configured.

## Existing project migration

For an existing non-DSH Notes system, inventory its roots, records, links, scripts, package commands, project instructions and CI before editing. Prepare a record-by-record class/lifecycle mapping and identify ambiguous ownership or lost evidence. Convert the authorized records to the DSH format, repair inbound and outbound links and command references, then remove the old checker, configuration schema, templates and duplicated rule documents. Do not retain a legacy checker, schema or dual-format compatibility mode.

Preserve dates, decision facts, applicable verification evidence and real alternatives. Do not infer DSH classes from legacy folder names or invent alternatives. When the history does not establish an alternative, write `无`. Preserve historical paths unless relocation is explicitly included in the migration. Do not rewrite a past decision into its opposite; create a new Note and link it when a decision changes.

After migration, validate each selected root with the DSH Skill's commands using `--root`, and check repository references for removed paths and commands. Report any record whose evidence or ownership cannot be safely reconstructed.
