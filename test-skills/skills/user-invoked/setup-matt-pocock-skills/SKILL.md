---
name: setup-matt-pocock-skills
description: Configure this repo for the engineering skills — set up its issue tracker, triage label vocabulary, and domain doc layout. Run once before first use of the other engineering skills.
disable-model-invocation: true
---

# Setup Matt Pocock's Skills

Scaffold the per-repo configuration that the engineering skills assume:

- **Issue tracker** — where issues live (GitHub by default; local markdown is also supported out of the box)
- **Triage labels** — the strings used for the five canonical triage roles
- **Domain docs** — where `CONTEXT.md` and ADRs live, and the consumer rules for reading them
- **Artifact registry** — current and historical artifact owners, new destinations, and lifecycle conventions

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

On repeat invocation, default to inspecting and filling missing configuration, not replacing or upgrading existing files. Reuse settled choices without asking again. Skip identical files; preserve and report differences from bundled defaults, including scripts. Apply changes to existing files only within an explicitly requested reconfiguration or upgrade scope. The steps below do not authorize blanket overwrites or duplicate instruction blocks.

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

Resolve the repository management root from project instructions and existing registration, using the Git top-level only as a fallback. Perform setup for that boundary, not the current subproject directory. Follow [artifact-registration.md](artifact-registration.md) for root resolution and historical exceptions before creating configuration.

- `git remote -v` and `.git/config` — is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root — does either exist? Is there already an `## Agent skills` section in either?
- `CONTEXT.md` and `CONTEXT-MAP.md` at the repo root
- `docs/adr/` and any `src/*/docs/adr/` directories
- `docs/agents/` — does this skill's prior output already exist?
- Artifact registries, representative planning files, and historical locations referenced by project instructions
- `.scratch/` — sign that a local-markdown issue tracker convention is already in use
- Is the `triage` skill installed? (a `triage` skill folder alongside this one, or `triage` in your available skills.) This decides whether Section B runs at all.
- Monorepo signals — a `pnpm-workspace.yaml`, a `workspaces` field in `package.json`, or a populated `packages/*` with its own `src/`. Present only in a genuinely large multi-package repo; their absence means single-context, which is almost every repo.

### 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order — one section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Give a one-line explainer only when the choice genuinely branches; skip questions exploration already settled. Skip Section B when `triage` isn't installed; absence of a monorepo skips the multi-context choice, not artifact registration.

**Section A — Issue tracker.**

> Explainer: The "issue tracker" is where this repo tracks Proposals and work items. Configure the system you use, including local Markdown if preferred.

Default posture: these skills were designed for GitHub. If a `git remote` points at GitHub, propose that. If a `git remote` points at GitLab (`gitlab.com` or a self-hosted host), propose GitLab. Otherwise (or if the user prefers), offer:

- **GitHub** — issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **GitLab** — issues live in the repo's GitLab Issues (uses the [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Local markdown** — issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote)
- **Other** (Jira, Linear, etc.) — ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

Record the choice in `docs/agents/issue-tracker.md`. The GitHub and GitLab templates carry a "PRs as a request surface" flag, defaulted **off** — leave it off and don't raise it; a user who wants external PRs in the triage queue can flip the flag in the file later.

Include the Proposal location/identifier, work-state representation and transitions, and where review and approval evidence are recorded. Reuse existing states; if missing, resolve their mapping in this setup review. Readiness requires the applicable review and approvals, while execution authorization follows project instructions. This configuration is required before creating or updating Proposals; choosing a tracker does not itself authorize publishing work or creating remote labels.

**Section B — Triage label vocabulary.** Skip this section entirely if the `triage` skill isn't installed (exploration told you) — an uninstalled skill needs no labels.

If it is installed, ask exactly one question:

> Do you want to keep the default triage labels? (recommended: **yes**)

The defaults are the five canonical roles, each label string equal to its name: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. On **yes**, write them as-is. Only if the user says no — usually because their tracker already uses other names (e.g. `bug:triage` for `needs-triage`) — collect the overrides so `triage` applies existing labels instead of creating duplicates.

**Section C — Artifact and domain docs.** Read [artifact-registration.md](artifact-registration.md) to register historical and new artifact locations. Reuse the user's chosen registration mode; distinguish new-work routing from migration. Use the selected registry for decision/ADR locations. Without another choice, retain the single-context default of `CONTEXT.md` plus `docs/adr/`.

Offer **multi-context** — a root `CONTEXT-MAP.md` pointing to per-context `CONTEXT.md` files — only when exploration found monorepo signals. Then confirm which layout they want.

Multi-context layouts share the root artifact registry and Agent Notes installation. Register context-local document owners there; do not scaffold a registry or `.agents/notes/` per subproject. Context selection does not automatically select record categories.

**Optional decision records.** When the user requests categorized decision records with an index and checks, read [decision-records.md](decision-records.md). Reuse any existing decision system first. Include this option in the same configuration review; prior explicit selection does not require another approval round. Selecting an engineering workflow alone does not require installing it.

### 3. Confirm and edit

Show the user a draft of:

- The `## Agent skills` block to add to whichever of `CLAUDE.md` / `AGENTS.md` is being edited (see step 4 for selection rules)
- The contents of `docs/agents/issue-tracker.md`, `docs/agents/domain.md`, and `docs/agents/triage-labels.md` (the last only when `triage` is installed)
- The artifact registry and historical/new location map, normally `docs/agents/artifacts.md`
- If selected, the decision-record deployment and its project instruction pointer, including its relationship to existing ADRs

Let them edit before writing.

### 4. Write

**Pick the file to edit:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither exists, ask the user which one to create — don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa) — always edit the one that's already there.

If an `## Agent skills` block already exists in the chosen file, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

The block:

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context" or "multi-context"]. See `docs/agents/domain.md`.

### Artifact management

For engineering artifact discovery, creation, updates and lifecycle, follow `docs/agents/artifacts.md`.
Resolve registry locations from the repository management root, even inside a subproject.
```

Include the `### Triage labels` sub-block, and write `docs/agents/triage-labels.md`, only when `triage` is installed and Section B ran. When it isn't, both are omitted.

Then write the docs files using the seed templates in this skill folder as a starting point:

- [issue-tracker-github.md](./issue-tracker-github.md) — GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md) — GitLab issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md) — local-markdown issue tracker
- [triage-labels.md](./triage-labels.md) — label mapping (only if `triage` is installed)
- [domain.md](./domain.md) — domain doc consumer rules + layout
- [artifacts.md](./artifacts.md) — adapt artifact ownership and historical/new locations to the selected registration mode

For "other" issue trackers, write `docs/agents/issue-tracker.md` from scratch using the user's description.

### 5. Done

Tell the user the setup is complete and which engineering skills will now read from these files. Mention they can edit `docs/agents/*.md` directly later — re-running this skill is only necessary if they want to switch issue trackers or restart from scratch.
