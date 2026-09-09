# Optional Agent Notes setup

Use this resource when the user selects a categorized decision system with generated indexes and checks. It supplements project configuration; it does not choose an engineering workflow, approve decisions, or authorize implementation.

## Existing projects

New installations use `.agents/notes/` for Agent Notes. For an existing location such as `docs/decisions/`, preserve its registered owner and scripts unless migration is explicitly authorized. A default-path change or repeat setup does not authorize copying records to a second location or replacing existing scripts. When an upgrade retains the old location, adapt the bundled script root to that registered location.

Follow [artifact-registration.md](artifact-registration.md) to register artifact owners and historical/new locations. New Proposals use configured work tracking; decision records may reference them without duplicating their contents or work status. Preserve registered historical files that serve both roles and their state mappings unless migration is authorized. Independent RFCs/Specs retain their own owners. Deploying this bundle does not silently change that ownership.

Inspect existing decision, ADR, RFC and proposal conventions. Reuse their authoritative locations rather than creating a competing system. If adopting this bundle requires changing existing categories, statuses or formats, present that mapping in the setup draft; do not migrate records or overwrite customized files implicitly.

## Deploy the reusable bundle

### Repeat invocation and upgrades

Compare each destination file with the bundle before writing:

- **Identical** — skip it.
- **Missing** — fill it within the selected setup scope only after checking compatibility with existing project configuration and companion scripts. Do not mix incompatible script versions merely to fill a missing file.
- **Different** — preserve the existing file and report the difference; do not infer that the bundled version is newer or more authoritative.

These rules apply to the management README, template, project category configuration, and all three scripts. Repeat setup alone is not an upgrade request. If everything is present and no change was requested, report that configuration was reused without asking for another approval.

When the user explicitly requests an upgrade, inspect differences and prepare a coherent merge that preserves project categories, formats and other customizations. Apply it within the authorized scope, then validate the resulting rules and scripts together. Do not require approval again for an already authorized merge; surface only unresolved project decisions.

Never reset existing decision records. INDEX.md may be regenerated from the project's current records using its existing, inspected scripts; it must not be replaced with the bundle's or this repository's index. Inspect customized scripts before executing them, since their effects may differ from the bundle. Report missing tooling or incompatibilities without treating them as permission to overwrite files.

### Files and deployment

The reusable source is [resources/decision-records/](resources/decision-records/). It contains:

- `.agents/notes/README.md`: management rules with project-configured categories
- `.agents/notes/config.json`: empty category configuration to populate from the target project
- `.agents/notes/templates/record.md`: fallback template
- `scripts/decisions/lib.mjs`, `update-index.mjs`, `check.mjs`: dependency-free Node.js tools

For a new installation, copy these six files to matching paths under the target project after the setup draft is approved or deployment is already authorized. For existing installations, follow the per-file rules above. Copy no records or generated index from this skill repository's own `.agents/notes/`. For a new installation, generate an empty index; existing projects retain their records.

The bundle defines no default categories. Reuse target-project categories, or propose ids, names and scopes based on its actual delivery objects and confirm them in the existing setup review. Save them in config.json; scripts read this configuration. An empty categories array can bootstrap an empty index, but cannot classify records. Do not copy this skill repository's categories. Preserve the proposed/implemented/rejected lifecycle and record project approval evidence separately. Existing lifecycle migrations require an explicit upgrade request; preserve history and repair links.

Add a concise reference in the selected project instruction file:

```markdown
### Agent Notes

For nontrivial engineering changes and major proposals, follow `.agents/notes/README.md`.
Reuse existing authoritative records; maintain affected records with the change,
regenerate the index, and run the documented checks.
```

Record the agreed relationship to ADRs in `docs/agents/domain.md`. Do not leave a default ADR location that conflicts with the selected decision location. Existing authoritative ADRs need not be duplicated or moved.

Ordinary formatting, link maintenance and index generation do not trigger an engineering planning cycle. Material contract changes do. Overall proposals can link stages and module work items; project tracking owns progress, while each record retains its own delivery lifecycle.

## Validate and hand off

From the target project root, run:

```sh
node scripts/decisions/update-index.mjs
node scripts/decisions/check.mjs
```

If Node.js is unavailable, report the unrun checks and required runtime; do not claim successful validation. No CI, commit hook, external publication or approval automation is installed. The checks cover mechanical consistency; decision authority and factual accuracy remain review responsibilities.

The deployed files become project-owned copies. Future bundle changes must be reviewed against project customizations rather than copied over automatically.
