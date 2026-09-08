# Implementation Tickets

Decompose authorized work only when it cannot be executed coherently as one unit.

Tickets are execution units, not additional design documents.

Do not use decomposition to reopen decisions already settled upstream.

## Storage

Follow the artifact registry for current and historical work-item owners and tracker configuration for operations. Existing work stays with its owner unless explicitly migrated; registration changes alone do not create replacement tickets.

Use the project's existing work-tracking mechanism.

Tickets may be:

- issues in an issue tracker
- local Markdown files
- another project-defined execution artifact

Reference the parent or authoritative work item where the project convention supports it.

## Tracer bullets

Prefer tracer-bullet vertical slices.

Each ticket should:

- deliver a narrow but complete behavior or coherent change
- cut through the layers required for that behavior
- be independently verifiable where practical
- fit within one fresh execution context
- leave the system in a coherent state
- declare genuine blocking dependencies

Prefer one behavior through the necessary layers over one architectural layer across many behaviors.

## Blocking edges

Declare only dependencies that genuinely prevent a ticket from starting.

Tickets with no unresolved blockers form the executable frontier.

Do not create artificial sequencing where work can proceed independently.

Independent frontier tickets may execute in parallel when safe and supported.

Re-evaluate the executable frontier as tickets complete.

## Wide refactors

Do not force broad mechanical changes into artificial vertical slices.

When necessary, prefer:

1. **Expand** — introduce the new form alongside the old.
2. **Migrate** — move consumers in coherent batches.
3. **Contract** — remove the old form after migration.

Represent genuine dependency edges explicitly.

## Ticket contents

Keep each ticket concise.

Include:

### Objective

The behavior or coherent change the ticket delivers.

### Acceptance criteria

Observable or verifiable conditions for completion.

### Blocked by

Only genuine blocking work.

Use the project's native dependency mechanism when one exists.

## Inheritance

Tickets inherit their contract from the authoritative parent work and referenced artifacts.

This may include:

- Proposal
- PRD
- Spec
- RFC
- ADRs
- project constraints

Reference those sources rather than duplicating them.

Avoid detailed implementation recipes or decisions the implementer can safely make itself.

## Execution

Work the executable frontier.

Complete each ticket to a coherent, tested, and verifiable state before advancing dependent work.

Update and close completed tickets according to the configured tracker workflow.

Commit completed ticket work when the repository workflow expects ticket-level commits.

Continue until all tickets required by the authorized scope are complete.
