---
name: verify
description: Use after implementation is complete to verify that the work satisfies its authoritative contract and acceptance conditions.
---

# Verify

Establish that the completed implementation satisfies the authoritative work contract and relevant accepted design constraints.

Use the strongest practical evidence for the affected behavior, such as tests, builds, static checks, runtime execution, integration checks, compatibility or migration checks, and targeted manual verification.

Prefer evidence that directly demonstrates agreed behavior and important contracts.

Do not run checks merely because they exist.

## Failure

When verification fails, identify the owner before changing anything:

- **Implementation defect** — fix the implementation.
- **Verification defect** — fix the incorrect check.
- **Contract ambiguity** — return to `plan`.
- **Environment or tooling failure** — fix the environment or report the blocker.
- **Pre-existing failure** — do not expand scope unless required.

Fix the owner of the failure, then verify again.

Do not weaken the agreed contract merely to make verification pass.

## Completion

Verification passes when practical evidence establishes that the authorized work and important acceptance conditions hold.

When the project defines a completion transition, update the authoritative work item using that workflow convention.

Do not mark work complete merely because implementation or review finished.
