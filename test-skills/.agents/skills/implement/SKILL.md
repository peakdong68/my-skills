---
name: implement
description: Implement authorized work after the project's Implementation Gate passes, including implementation review and preparation for final verification.
---

# Implement

Implement the selected scope of the identified Proposal or existing work item. Resolve its issue ID, URL or file path and the requirements and design sections it references before coding.

Before implementation, check the scope and acceptance conditions, required decisions and review/approval evidence, unresolved blockers, and execution authorization for that scope under project rules. Reuse valid evidence without requesting confirmation again. Sync already agreed scope and decisions to their existing owners; unresolved material decisions return to the project's Planning stage. Document status or location alone does not establish readiness or authorization.

For a review-only request, use the review scope and axes below without entering implementation or requiring its gate. Deliver evidence-backed findings and coverage limitations; do not automatically fix changes or advance their workflow status. The implementation correction and completion rules apply only to authorized implementation.

## Decomposition

After the Implementation Gate passes, create implementation tickets only when decomposition is needed. Their existence is not a condition for initially entering implementation.

Implement directly when the work fits one coherent execution unit.

Read [tickets.md](./tickets.md) when the work is too large or has meaningful independent slices or dependencies.

Do not create tickets merely to enumerate coding steps.

## Execution

Implement against the selected work item's scope, acceptance conditions, referenced requirements, accepted designs and architectural decisions.

Use established architecture, conventions, interfaces, and domain language unless the authoritative design explicitly changes them.

Write or update tests as appropriate for the change. Use test-first development when it improves feedback or helps establish behavior clearly.

Run focused tests and relevant static checks while working.

If implementation exposes a material unresolved product, domain, architectural, interface, compatibility, or other contract decision, return to the project's Planning stage rather than inventing it during implementation.

## Implementation Review

Establish the review baseline and scope from the request and available context. Review the full scoped change, including new, staged, and unstaged files where applicable; distinguish pre-existing and unrelated changes.

Review the resulting implementation, or the independently requested change scope, along two independent axes:

- **Standards** — fidelity to repository standards, accepted RFCs and ADRs, established architecture, conventions, and constraints.
- **Spec** — fidelity to the authoritative work contract, including missing behavior, incorrect behavior, and unintended scope.

Keep the two axes distinct so a pass on one does not mask a failure on the other.

During authorized implementation, resolve material findings by ownership:

| Finding                                                           | Route                                  |
| ----------------------------------------------------------------- | -------------------------------------- |
| Current implementation is missing or violates the agreed contract | Fix in the current implementation      |
| Additional execution unit is needed within the same agreed work   | Add or update an implementation ticket |
| Product or technical contract must change or was never resolved   | Return to the project's Planning stage                       |
| Issue is unrelated to the agreed work                             | Do not expand scope automatically      |

There is no "fix it while we're here" path for unrelated work.

Resolve material in-scope findings before final verification.

## Completion

Implementation is complete when:

- the authorized scope is implemented
- required tickets are complete
- relevant implementation-time checks pass
- material Implementation Review findings are resolved
- the change is ready for final verification

Update the identified work item's implementation progress using the project's workflow convention. Keep final delivery completion and any decision-record transition to `implemented` for successful final verification.
