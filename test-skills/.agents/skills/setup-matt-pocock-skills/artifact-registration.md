# Register artifact ownership and locations

During setup, establish where the target project finds, creates, updates and tracks engineering artifacts. Store the agreement in `docs/agents/artifacts.md`, or update the registry already referenced by project instructions. Use [artifacts.md](artifacts.md) as a seed, not as permission to overwrite existing conventions.

## Discover and select

Inspect project instructions, registries, representative artifacts, tracker configuration and historical directories. Distinguish authoritative work from examples, generated output and abandoned drafts. Reuse the user's existing choice; otherwise present the relevant mode in the normal setup review:

| Mode | Meaning |
| --- | --- |
| Keep existing | Register actual locations and continue their conventions. |
| New work uses new locations | Register legacy owners and new destinations; existing work stays with its original artifact unless explicitly migrated. |
| Migrate | Prepare source/destination and status mappings plus link repairs for the authorized scope, preserving provenance and customized content. |

Re-registration does not authorize moving historical artifacts. Multiple directories may own different work; an old location is not obsolete merely because new destinations were selected.

## Default method

When the user selects this repository's artifact method, register Proposal handling in the issue-tracker configuration: its location and identifier, work states, review/approval evidence and readiness transition. Configure a remote tracker or explicit local Markdown tracking; there is no unconfigured Proposal storage fallback. Reuse established choices and resolve missing configuration in the setup review.

A Proposal is the planning work item; a decision record may reference it to preserve a durable choice or delivery rationale without copying it. If historical files already serve both roles, register the mapping between work status, approval and record delivery lifecycle. Preserve that ownership unless migration is authorized. Read [decision-records.md](decision-records.md) if deploying the record system. Choosing an engineering workflow alone does not select this artifact method automatically.

RFCs and Specs are optional independent owners, not mandatory steps. They retain their own locations and approval conventions when associated change records move between delivery states. Record project style references when available; create no empty artifacts just to establish directories.

## Register and verify

Include the registry, historical/new location map and instruction pointer in the existing setup draft. Apply already approved configuration edits without a second approval round; migrations require authorization for those changes.

```markdown
### Artifact management

For engineering artifact discovery, creation, updates and lifecycle,
follow `docs/agents/artifacts.md`.
```

The registry owns artifact relationships and historical routing; it points to tracker configuration for work-item locations, identifiers, operations and work states. Domain configuration owns glossary consumption, and decision configuration owns categories. Cross-reference these rather than duplicating rules. Update existing pointers and domain configuration within the selected scope.

Verify existing work still resolves to its owner, new destinations are explicit, approval and delivery states remain distinct, and references to existing files resolve. Future directories need not exist yet. For authorized migrations also verify preserved content, record counts and inbound links. Report outstanding migration work instead of claiming it complete.
