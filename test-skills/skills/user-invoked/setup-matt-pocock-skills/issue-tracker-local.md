# Issue tracker: Local Markdown

Work items for this repo are tracked as Markdown files in `.scratch/`. Independent Specs and designs retain their registered owners.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The Proposal is `.scratch/<feature-slug>/proposal.md`; its file path is its work identifier. Reuse registered historical Proposal paths for existing work.
- An independent Spec keeps its registered location; this tracker does not establish a second Spec owner
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` — never a single combined tickets file
- Triage state is recorded as a `Status:` line near the top of each issue file (see `triage-labels.md` for the role strings)
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## Proposal workflow

Use `Status: planning`, `ready`, `in-progress`, `complete` or `rejected` near the top of the Proposal, unless the project has configured other states. These are work states, separate from ticket triage and decision-record lifecycle.

Record Plan Review results and approval evidence in the Proposal's Decisions section, with references to relevant requirements and design. Move to `ready` only when required review and approvals are complete and the selected scope has no blocking decision or dependency. Start `in-progress` only with execution authorization under project rules; use `complete` after delivery and final verification. If readiness is lost, revoke the invalid readiness by moving the work item back to its configured non-ready state (`planning` in this template), record the blocker, and return affected work to Discuss; a tracker state does not authorize a `/planning` or `/implement` transition; record the decision when rejecting work.

Separate Specs and designs remain at their registered locations.

## When a skill says "publish to the issue tracker"

Resolve the selected work item and its registered location first. Update its existing file when it already exists; create a new file under `.scratch/<feature-slug>/` only for new work using that configured destination. Verify the request or existing authorization covers this publication. Inspect existing work when no identifier is supplied, and resolve ambiguous ownership rather than duplicating a file. Preserve historical paths; tracker configuration alone does not authorize publication.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the issue number directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `.scratch/<effort>/map.md` — the Notes / Decisions-so-far / Fog body.
- **Child ticket**: `.scratch/<effort>/issues/NN-<slug>.md`, numbered from `01`, with the question in the body. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/`task`); a `Status:` line records `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. A ticket is unblocked when every file it lists is `resolved`.
- **Frontier**: scan `.scratch/<effort>/issues/` for files that are open, unblocked, and unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set `Status: resolved`, then append a context pointer (gist + link) to the map's Decisions-so-far in `map.md`.
