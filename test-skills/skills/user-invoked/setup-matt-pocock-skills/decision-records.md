# Optional Agent Notes setup

Use this resource when the user selects a categorized decision system with read-only directory navigation and checks. It supplements project configuration; it does not choose an engineering workflow, approve decisions, or authorize implementation.

## Existing projects

New installations use `.agents/notes/` for Agent Notes. For an existing location such as `docs/decisions/`, preserve its registered owner and scripts unless migration is explicitly authorized. A default-path change or repeat setup does not authorize copying records to a second location or replacing existing scripts. When an upgrade retains the old location, adapt the bundled script root to that registered location.

Resolve the repository management root through the project document ownership entry before deployment. Target paths in this resource are relative to that root, not the invocation's current directory. A multi-context repository shares one Agent Notes installation and its scripts; do not deploy another bundle inside each subproject. Contexts and record categories are independent: use config.json rather than generating categories from project folders.

Follow [artifact-registration.md](artifact-registration.md) to establish document owners and historical/new locations. New Proposals use configured work tracking; decision records may reference them without duplicating their contents or work status. Preserve registered historical files that serve both roles and their state mappings unless migration is authorized. Independent RFCs/Specs retain their own owners. Deploying this bundle does not silently change that ownership.

Inspect existing decision, ADR, RFC and proposal conventions. Reuse their authoritative locations rather than creating a competing system. If adopting this bundle requires changing existing categories, statuses or formats, present that mapping in the setup draft; do not migrate records or overwrite customized files implicitly.

## Select record scopes

First reuse the user-confirmed context layout; setup must confirm proposed context boundaries, names and paths before initializing a new `CONTEXT-MAP.md`. Repository discovery alone does not authorize creating all contexts.

Separately confirm which established contexts need Agent Notes and whether a shared area is needed, in the same setup summary. Reuse existing selections; ask only about new or changed scopes. It is valid to enable only some contexts or none. Do not create Notes for every mapped context automatically.

The root config maps selected context identifiers from `CONTEXT-MAP.md` to distinct directories under `.agents/notes/`. Each selected directory has its own lifecycle/category tree; `list.mjs` prints the configured record directories and can filter by context. The map owns domain boundaries, while Notes config owns record enrollment and paths. Categories remain independent. Use `node scripts/decisions/list.mjs --context ordering` and, when selected, `--shared` to locate relevant record directories; follow explicit cross-context links as needed.

See the bundled [management rules](resources/decision-records/.agents/notes/README.md) for `contextMap` and `recordRoots` configuration. Record context map paths relative to the management root and record directory paths relative to `.agents/notes/`. Register paths first; create a selected directory only when its first record is needed. Cross-context decisions have one owner in the selected shared area or an agreed participating context, with links from other contexts rather than duplicate records. If no suitable owner is selected, resolve that choice before creating the record.

Existing unpartitioned records remain in their original lifecycle/category paths and appear in read-only navigation. Adding mappings does not migrate them. Migration requires an explicit source/destination agreement and link repair.

## Deploy the reusable bundle

### Repeat invocation and upgrades

Compare each destination file with the bundle before writing:

- **Identical** — skip it.
- **Missing** — fill it within the selected setup scope only after checking compatibility with existing project configuration and companion scripts. Do not mix incompatible script versions merely to fill a missing file.
- **Different** — preserve the existing file and report the difference; do not infer that the bundled version is newer or more authoritative.

These rules apply to the management README, local instructions, project category configuration, and the checker and navigator scripts. The management README owns the record format; there is no separate copyable template. Repeat setup alone is not an upgrade request. If everything is present and no change was requested, report that configuration was reused without asking for another approval.

When the user explicitly requests an upgrade, inspect differences and prepare a coherent merge that preserves project categories, formats and other customizations. Apply it within the authorized scope, then validate the resulting rules and scripts together. Do not require approval again for an already authorized merge; surface only unresolved project decisions.

Never reset existing decision records. Before removing generated indexes or upgrading a customized checker, inspect its links and project-specific behavior; preserve historical records and repair active pointers. Inspect customized scripts before executing them. Report missing tooling or incompatibilities without treating them as permission to overwrite files.

### Files and deployment

Resolve [resources/decision-records/](resources/decision-records) relative to the setup skill loaded for this invocation, whether installed at user or project level. Determine the target project separately and deploy the selected files there; do not infer the resource source from the target project's directory layout.

The reusable source contains:

- `.agents/notes/README.md`: management rules with project-configured categories
- `.agents/notes/AGENTS.md`: local reading and maintenance guidance
- `.agents/notes/config.json`: empty category configuration to populate from the target project
- `scripts/decisions/README.md`: tool commands and upgrade boundary
- `scripts/decisions/lib.mjs`, `check.mjs`, `list.mjs`: dependency-free Node.js tools

For a new installation, copy these seven files to matching paths under the target project after the setup draft is approved or deployment is already authorized. For existing installations, follow the per-file rules above. Copy no records from this skill repository's own `.agents/notes/`. Existing projects retain their records; remove generated indexes only as part of an authorized, link-repaired upgrade.

The bundle defines no default categories. Reuse target-project categories, or propose ids, names and scopes based on its actual delivery objects and confirm them in the existing setup review. Save them in config.json; scripts read this configuration. An empty categories array can bootstrap the tool, but cannot classify records. Do not copy this skill repository's categories. Preserve the proposed/implemented/rejected lifecycle and record project approval evidence separately. Existing lifecycle migrations require an explicit upgrade request; preserve history and repair links.

Add a concise reference in the selected project instruction file:

```markdown
### Agent Notes

For nontrivial engineering changes and major proposals, follow `.agents/notes/README.md`.
Reuse existing authoritative records; maintain affected records with the change,
use read-only directory navigation when needed, and run the documented checks.
```

Record the agreed relationship to ADRs in `docs/agents/domain.md`. Do not leave a default ADR location that conflicts with the selected decision location. Existing authoritative ADRs need not be duplicated or moved.

Ordinary formatting and link maintenance do not trigger an engineering planning cycle. Material contract changes do. Overall proposals can link stages and module work items; project tracking owns progress, while each record retains its own delivery lifecycle.

## Validate and hand off

From the target project root, run:

```sh
node scripts/decisions/check.mjs
node scripts/decisions/list.mjs --context ordering
```

The list command is read-only and optional for finding a selected context. New installations use the single metadata and lifecycle format defined in the management README. Upgrades preserve existing records until their format and references have been reviewed; an explicitly requested format migration updates the README, checker and records as one coherent change. If Node.js is unavailable, report the unrun checks and required runtime; do not claim successful validation. No CI, commit hook, external publication or approval automation is installed. The checks cover mechanical consistency; decision authority and factual accuracy remain review responsibilities.

The deployed files become project-owned copies. Future bundle changes must be reviewed against project customizations rather than copied over automatically.
