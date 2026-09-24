---
name: setup-matt-pocock-skills
description: Configure, inspect, or update the project settings needed by selected engineering skills, reusing existing tracker, document, and domain conventions.
disable-model-invocation: true
---

# Setup Matt Pocock's Skills

Configure only what the selected skills and current request need. Existing sufficient configuration does not require a preliminary setup run. Supported configuration includes:

- **Issue tracker** — where issues live (GitHub by default; local markdown is also supported out of the box)
- **Triage labels** — the strings used for the five canonical triage roles
- **Domain docs** — where `CONTEXT.md` and ADRs live, and the consumer rules for reading them
- **Document ownership** — current and historical document owners, new destinations, and lifecycle conventions

Inspect the current configuration, identify necessary differences, apply authorized changes, and verify the result. Setup configures selected tools and document locations; it does not grant planning or implementation authority. Preserve the project's progression rules unless the user explicitly requests their deployment or revision. Tracker states do not authorize `/planning` or `/implement`.

## Process

On repeat invocation, default to inspecting and filling missing configuration, not replacing or upgrading existing files. Reuse settled choices without asking again. Skip identical files; preserve and report differences from bundled defaults, including scripts. Apply changes to existing files only within an explicitly requested reconfiguration or upgrade scope. The steps below do not authorize blanket overwrites or duplicate instruction blocks.

### 1. Explore

Resolve the repository management root from project instructions and existing document ownership, using the Git top-level only as a fallback. Perform setup for that boundary, not the current subproject directory. Follow [artifact-registration.md](artifact-registration.md) for root resolution and historical exceptions before creating configuration.

- `git remote -v` and `.git/config` — is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root — does either exist? Is there already a `## 文档与约定` or `## Project conventions` section, or a legacy `## Agent skills` section, in either?
- `CONTEXT.md` and `CONTEXT-MAP.md` at the repo root
- Existing context maps and the ADR or domain-document locations they actually reference, including project directories outside `src/`
- `docs/agents/` — does this skill's prior output already exist?
- Document ownership entries, representative planning files, and historical locations referenced by project instructions
- `.scratch/` — sign that a local-markdown issue tracker convention is already in use
- Is the `triage` skill installed? (a `triage` skill folder alongside this one, or `triage` in your available skills.) This decides whether Section B runs at all.
- Context boundaries — existing maps, registered domain owners, user-specified layouts, and actual project responsibilities take precedence. Workspace manifests and package directories are supporting evidence, not prerequisites for multiple contexts.

### 2. Determine necessary changes

Present one concise configuration difference summary: what is reused, what needs adding or changing, and any migration or overwrite implications. Include proposed content for changes that need a user decision. Ask only for unresolved material choices, grouping independent questions where useful; reuse prior decisions and authorization rather than requiring a separate approval round after each section. If no changes are needed, proceed to verification.

Apply only the relevant configuration areas below. Skip triage configuration when `triage` is not selected or installed; inspect existing document ownership independently of context count.

**Section A — Issue tracker.**

> Explainer: The "issue tracker" is where this repo tracks Proposals and work items. Configure the system you use, including local Markdown if preferred.

Reuse an existing tracker choice first; a hosting remote does not override it. If no choice exists and a `git remote` points at GitHub, propose that. If a `git remote` points at GitLab (`gitlab.com` or a self-hosted host), propose GitLab. Otherwise (or if the user prefers), offer:

- **GitHub** — issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **GitLab** — issues live in the repo's GitLab Issues (uses the [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Local markdown** — issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote)
- **Other** (Jira, Linear, etc.) — ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

Update the tracker configuration already referenced by project instructions; use `docs/agents/issue-tracker.md` only when no existing owner is established. The GitHub and GitLab templates carry a "PRs as a request surface" flag, defaulted **off** — leave it off and don't raise it; a user who wants external PRs in the triage queue can flip the flag in the file later.

Include the Proposal location/identifier, work-state representation and transitions, and where review and approval evidence are recorded. Reuse existing states; if missing, resolve their mapping in this setup review. Readiness requires the applicable review and approvals, while execution authorization follows project instructions. This configuration is required before creating or updating Proposals; choosing a tracker does not itself authorize publishing work or creating remote labels.

**Section B — Triage label vocabulary.** Skip this section entirely if the `triage` skill isn't installed (exploration told you) — an uninstalled skill needs no labels.

Reuse the existing label mapping. If none exists, include the defaults in the configuration summary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Ask only when a material mapping choice is unresolved. Preserve existing strings and the selected mapping; writing configuration does not itself authorize creating remote labels.

**Section C — Document ownership and domain docs.** Read [artifact-registration.md](artifact-registration.md) to locate historical and new document owners. Reuse the existing document entry (normally `docs/AGENTS.md`); distinguish new-work routing from migration. When the user asks to add or revise writing and review standards, also read [docs-agents.md](docs-agents.md), merge only the selected rules into that existing owner, and preserve unrelated project rules. Use its registered ADR and decision locations. Without another choice, retain the single-context default of `CONTEXT.md` plus `docs/adr/`.

Reuse an established multi-context map even without workspace manifests. When no layout exists, propose boundaries, names and paths based on actual responsibilities. Confirm which contexts the user wants to establish in the configuration summary before creating the map; detecting projects or workspace entries does not select them. Reuse settled choices and confirm only additions or changes. A root `CONTEXT-MAP.md` points to the selected contexts' documents. Register intended locations without creating empty glossaries or ADRs.

Multi-context layouts share one document ownership entry. If Agent Notes is selected, separately confirm which established contexts need records and whether a shared record area is wanted, in the same configuration summary. Map only those selected scopes to separate directories within root `.agents/notes/`, following [decision-records.md](decision-records.md). Context selection does not automatically enable records or create categories; later-discovered projects do not expand either selection.

**Optional decision records.** When the user requests categorized decision records with navigation and checks, read [decision-records.md](decision-records.md). Reuse any existing decision system first. Include this option in the same configuration review; prior explicit selection does not require another approval round. Selecting an engineering workflow alone does not require installing it.

### 3. Apply authorized configuration

Use the entry file selected by the user or actually consumed by the target environment, following existing instruction pointers. If both `AGENTS.md` and `CLAUDE.md` exist, identify the authoritative owner rather than giving either filename unconditional priority. Preserve established forwarding between files; do not duplicate the same rules in both. If the target environment and existing evidence do not resolve the choice, ask within the configuration summary before writing. Create a missing entry only within the authorized setup scope.

Apply the changes whose scope and choices are already authorized. Preserve unrelated text, existing owners, and customized files; migrations and upgrades follow [artifact-registration.md](./artifact-registration.md) and [decision-records.md](./decision-records.md).

If `## 文档与约定` or `## Project conventions` already exists, update its document-owner map in place and preserve its heading and unrelated entries. If only the legacy `## Agent skills` block exists, rename and update that block in place. Never append a duplicate or overwrite user edits to surrounding sections.

Adapt this block to the selected configuration; omit unused areas and replace example paths with the existing registered locations:

```markdown
## Project conventions

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Document ownership

The project document entry (normally `docs/AGENTS.md`) is the pointer map for document rules; keep each rule in its owner instead of copying it here:

- Document types, owners, writing and review standards: `docs/AGENTS.md`.
- Domain docs: `[single-context/multi-context and location summary]`; terminology and ADR consumer rules: `docs/agents/domain.md`.
- Agent Note scope, lifecycle and format: `.agents/notes/README.md`; local reading and maintenance guidance: `.agents/notes/AGENTS.md` (only when Agent Notes is selected).

Resolve registered paths from the repository management root, even inside a subproject.
```

Use only pointers for configurations selected for this project. Omit the Agent Notes pointer unless that system is selected; omit unused triage configuration. Do not copy another project's engineering, Git, or other policy pointers unless the target project has matching owners. Configuring domain docs alone does not require creating tracker configuration.

For each selected configuration, use the corresponding seed template as a starting point:

- [issue-tracker-github.md](./issue-tracker-github.md) — GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md) — GitLab issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md) — local-markdown issue tracker
- [triage-labels.md](./triage-labels.md) — label mapping (only if `triage` is installed)
- [domain.md](./domain.md) — domain doc consumer rules + layout
- [docs-agents.md](./docs-agents.md) — adapt document responsibilities, writing and review standards to the selected project entry when requested

For "other" issue trackers, adapt the existing tracker owner using the user's description; create a new configuration at the agreed destination only when no owner exists.

### 4. Verify and report

Before claiming setup complete, check the selected configuration:

- Use one document-conventions pointer map: update an existing `## 文档与约定` or `## Project conventions` section in place; if only the legacy `## Agent skills` block exists, rename it in place. The map points to the target's document-standard owner and selected domain/Agent Notes owners without copying their rules; each path resolves from root and subproject entry points through the established management root.
- Tracker destinations, work-state mappings, and review/approval references are explicit for selected work tracking; an existing work item is updated in its owner instead of duplicated.
- Context layout matches the existing map or selected boundaries; shared registration and optional Agent Notes do not become per-context copies.
- Existing customizations and historical owners remain intact; no unused configuration or placeholder artifacts were introduced. Registered future locations need not exist yet.
- Check availability of the chosen CLI or other configured access method. Where possible, use a read-only check for account access and destination identity. Missing credentials or tooling are a reported access limitation, not permission to install tools or create test issues, comments, or labels. When Agent Notes is selected, run its documented checks.

Report files added, updated, or reused; the chosen entry and root; checks actually performed; and remaining decisions or access limitations. Distinguish local configuration completion from verified remote access. Repeat setup may inspect, fill gaps, or perform an explicitly requested upgrade; it is not a reset.
