# Establish document ownership

During setup, locate the repository management root from project instructions and existing owners; use Git top-level only when no project boundary is established. Working in a subproject does not silently create another management root. Resolve recorded paths from that root, while Markdown links remain relative to their files.

Inspect current project instructions, document conventions, representative artifacts and work tracking. Record the agreed document types, owners, new locations and historical exceptions in the project's existing document entry, normally `docs/AGENTS.md`. Use [docs-agents.md](docs-agents.md) as a starting point when no owner exists. Do not deploy a second artifact registry. Reuse an existing `artifacts.md` only as a historical owner until the project has authorized and completed its consolidation.

For each artifact, preserve one authoritative home: the tracker owns work status; a Spec owns accepted behavior and acceptance; an RFC owns implementation design; an ADR owns a durable decision; Agent Notes own change-specific reasons and results. Adapt these roles to the project's actual conventions. A root `CONTEXT-MAP.md` can direct readers to context-local documents; the Notes root config separately selects record directories. Contexts do not create record categories.

Review existing and new work separately. An existing artifact remains with its owner unless migration is explicitly authorized. New locations can be documented without creating empty files. If ownership changes, include the source, destination, affected scope, status mapping and link repair in the authorized change; do not treat a new entry as proof of migration.

Verify that root and subproject readers reach the same document ownership entry, every active artifact has one owner, historical paths remain discoverable, and tracker approval and delivery status are distinct. Refer to the tracker and Notes rules from the document entry instead of repeating their mechanics there.
