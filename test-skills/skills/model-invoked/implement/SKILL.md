---
name: implement
description: Implement explicitly authorized, sufficiently defined work through implementation review and final verification.
---

# Implement

## 1. Entry conditions

Implement the selected scope of the identified Proposal or existing work item. Resolve its issue ID, URL or file path and the requirements and design sections it references before coding.

Load this skill on the user's `/implement` command. Check that the selected scope, observable acceptance conditions, necessary decisions, and applicable approvals are sufficiently defined and dependencies permit work. Reuse existing evidence. If a key contract is unresolved, report the blocker, return to Discuss, and recommend `/planning`; do not enter planning or invent behavior automatically. A command authorizes work but does not supply missing requirements.

For a review-only request, use the `code-review` skill without entering implementation or requiring its gate. Deliver findings and coverage limitations; do not automatically fix changes or advance their workflow status. The implementation correction and completion rules apply only to authorized implementation.

## 2. Decompose when needed

Once the authorized work is sufficiently defined, create implementation tickets only when decomposition is needed. Their existence is not a prerequisite for starting.

Implement directly when the work fits one coherent execution unit.

Read [tickets.md](./tickets.md) when the work is too large or has meaningful independent slices or dependencies.

Do not create tickets merely to enumerate coding steps.

## 3. Execute

Implement against the selected work item's scope, acceptance conditions, referenced requirements, accepted designs and architectural decisions.

Use established architecture, conventions, interfaces, and domain language unless the authoritative design explicitly changes them.

If implementation exposes a material unresolved product, domain, architectural, interface, compatibility, or other contract decision, stop affected implementation and return to Discuss. After discussion, wait for a new `/planning` or `/implement` command for the affected work. Continue independent work within its existing authorization.

### Implementation-time testing

Write or update tests as appropriate for the change. Use test-first development when it improves feedback or helps establish behavior clearly.

Run focused tests and relevant static checks while working.

## 4. Implementation Review

Use the `code-review` skill to review the implementation. Supply the review baseline, selected scope, governing work item and referenced requirements/design, including relevant uncommitted and new files. The skill owns the review method and report.

### Resolve findings and re-review

During authorized implementation, resolve material findings by ownership:

| Finding                                                           | Route                                  |
| ----------------------------------------------------------------- | -------------------------------------- |
| Current implementation is missing or violates the agreed contract | Fix in the current implementation      |
| Additional execution unit is needed within the same agreed work   | Add or update an implementation ticket |
| Product or technical contract must change or was never resolved   | Stop affected work; return to Discuss for a new command                       |
| Issue is unrelated to the agreed work                             | Do not expand scope automatically      |

There is no "fix it while we're here" path for unrelated work.

For implementation corrections, return to §3, rerun affected checks, and re-review the corrected scope under §4. Resolve material in-scope findings before final verification.

Subsequent Implementation Review rounds focus on unresolved material findings, regressions from corrections, and newly evidenced material issues. Reuse valid conclusions; do not reopen accepted decisions without new material evidence. Do not block progress on stylistic preferences, optional improvements, speculative concerns, or unrelated issues. Limit this review to five review-fix cycles, counted independently of other reviews. If material findings remain, report them and return affected work to Discuss; reaching the limit is not a pass.

## 5. Completion and handoff

Implementation is complete when:

- the authorized scope is implemented
- required tickets are complete
- relevant implementation-time checks pass
- material Implementation Review findings are resolved
- the change is ready for final verification

After these conditions hold, load and use the `verify` skill to verify the selected repair or implementation under the same `/implement` authorization. Only successful final verification completes delivery; being ready for verification is an intermediate result, not task completion.

Update the identified work item's implementation progress using the project's workflow convention. Keep final delivery completion and any decision-record transition to `implemented` for successful final verification.
