```md
# Engineering Workflow

This document defines cross-stage orchestration, gates, Git/PR transitions, and return paths.

Stage-specific execution belongs to the corresponding skill.

## Flow

    Discuss
       │
       ├─ sufficiently defined ────────────────┐
       │                                       │
       └─ material decisions remain → Planning │
                                      │        │
                                  Plan Review  │
                                      │        │
                                    ready ─────┤
                                               │
                                  Implementation Gate
                                               │
                                  execution authorized?
                                      ┌────────┴────────┐
                                     no                yes
                                      │                  │
                                    stop             Implement
                                                       │
                                              Implementation Review
                                                       │
                                              PR when applicable
                                                       │
                                                     Verify
                                                       │
                                              required evidence passes
                                                       │
                                              merge when applicable
                                                       │
                                                      done

Planning readiness and execution authorization are separate gates.

## Discuss

Determine whether the work is already sufficiently defined or requires Planning.

Exploratory discussion does not itself create planning work.

If material contract or design decisions remain unresolved, enter Planning and load the `planning` skill.

If authoritative work already defines the implementation sufficiently, proceed to the Implementation Gate.

## Planning

Load the `planning` skill.

Planning owns completion of unresolved contract and design decisions and exits through Plan Review.

Planning is complete only when its required review has passed and implementation can proceed without inventing material product behavior or architecture.

Planning establishes readiness only. It does not authorize code execution.

## Implementation Gate

Implementation may begin only when both conditions hold.

### Readiness

The work is ready when:

- authoritative scope and required behavior are sufficiently defined
- material contract and design decisions are resolved
- required planning review and approvals have passed
- known implementation blockers are resolved
- implementation can proceed without inventing material product behavior or architecture

Use the project's existing artifacts, statuses, labels, approvals, or equivalent conventions to determine readiness.

Do not require a specific artifact type or status name.

### Execution Authorization

Code execution must also be explicitly authorized.

`/implement` or an equivalent direct execution instruction authorizes implementation.

Planning approval, RFC acceptance, confirmation, or general agreement does not by itself authorize code modification.

If readiness is established but execution is not authorized, stop before modifying implementation code.

When both conditions pass, load the `implement` skill.

## Git and Pull Requests

Follow the repository's existing Git, branch, commit, pull-request, review, and merge conventions.

Determine those conventions from repository-owned sources such as:

- repository instructions
- contributing documentation
- pull-request templates
- CI/workflow configuration
- branch protection or repository rules
- established repository conventions

Do not invent a parallel Git workflow when the repository already defines one.

When the repository uses branches, begin implementation on the appropriate implementation branch after the Implementation Gate passes.

When the repository uses pull requests:

    Implementation Gate
        ↓
    implementation branch
        ↓
    Implement
        ↓
    Implementation Review
        ↓
    commit / push as required
        ↓
    open or update PR
        ↓
    Verify
        ↓
    required CI / checks / approvals pass
        ↓
    merge

Opening a PR does not mean verification has passed.

PR checks, CI results, and required approvals are final-verification evidence when the repository requires them.

If the repository does not use pull requests, follow its existing integration workflow instead.

## Implement

Load the `implement` skill after the Implementation Gate passes.

Implementation owns execution of the authorized scope, including any necessary decomposition, testing, and Implementation Review.

Implementation Review must pass before the work proceeds to final verification.

When pull requests are used, create or update the PR after implementation and Implementation Review are ready for final verification.

## Verify

Load the `verify` skill after implementation and Implementation Review are complete.

Verification uses the strongest practical evidence available through the project's existing verification mechanisms.

When pull requests are used, applicable repository-required CI, checks, and approvals are part of final verification.

Do not treat the work as complete while required verification is pending or failing.

Merge only after required final verification passes.

## Return Rule

Return to the earliest stage that owns the unresolved issue.

- unresolved product, contract, or design decision → Planning
- implementation defect → Implement
- verification defect → fix verification and retry
- environment or tooling blocker → resolve or report the blocker
- unrelated issue → do not expand scope automatically

After an in-scope implementation fix, repeat the required Implementation Review and Verify steps.

Do not compensate for an upstream contract gap in implementation.

Do not compensate for an implementation defect by weakening verification.
```