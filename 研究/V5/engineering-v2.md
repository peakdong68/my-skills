## Engineering Workflow

Route engineering work through:

    Discuss → Planning → Implementation Gate → Implement → Verify

This section defines project-level orchestration, decision authority, gates, and return paths.

A stage-scoped request ends when that stage's deliverable is complete.

A request solely to review a PR, branch, or specified change scope uses the review scope and axes under Implementation Review without entering implementation or requiring its gate. Deliver evidence-backed findings and coverage limitations; do not automatically fix changes or advance their workflow status. Implementation correction and completion rules apply only to authorized implementation.

### Discuss

Discuss is complete when the goal, scope, and material unresolved decisions are clear enough to choose the next stage.

Resolve routine details from context and repository evidence; ask only for missing information that materially affects the work.

Do not create planning artifacts merely because the conversation is exploratory.

### Planning

Formal planning is required when implementation would otherwise need to invent a material product, scope, domain, architectural, interface, compatibility, or other contract decision.

Planning establishes the intended outcome, scope, and observable acceptance conditions, with a practical way to verify them.

Use the project's existing authoritative planning artifacts and conventions.

Depending on the project, these may include:

- Proposal or issue
- PRD
- approved Spec
- RFC
- ADR
- another project-defined contract

Do not require a particular artifact type when the project already has an authoritative equivalent.

Do not create a new artifact when an existing authoritative artifact already owns the required information.

#### Technical Design

Resolve material technical decisions in the project's existing design artifact. Use an RFC when a separate design proposal is needed.

A proposed design becomes an implementation basis only when accepted or approved under the project's workflow.

Resolve ordinary technical choices directly when they remain within the agreed contract, accepted architecture, and project constraints.

When a material design choice has meaningful alternatives, recommend a direction and preserve enough reasoning for review.

Material unresolved product, business, compatibility, cost, risk, architectural-direction, or other value judgments belong to the user unless that authority has been explicitly delegated.

#### Plan Review

Review the planning set before implementation along three independent axes:

- **Standards** — fidelity to accepted ADRs, applicable RFCs, established domain language, and project constraints.
- **Spec** — coverage of the authoritative product or work contract without material omissions, contradictions, or unintended scope.
- **Architecture** — coherence of module boundaries, responsibilities, dependencies, interfaces, and system relationships.

Keep the axes distinct so a pass on one does not mask a failure on another.

Plan Review may accept, reject, or require revision of the proposed design within established decision authority.

Resolve findings in the artifact that owns them.

Questions already governed by accepted contracts, ADRs, RFCs, or project constraints should be resolved from those authorities.

Material unresolved value judgments or architectural-direction choices belong to the user unless authority has been explicitly delegated.

When an accepted decision establishes or changes a durable architectural constraint, preserve it as an ADR when warranted.

Plan Review passes only when no unresolved material finding or required decision remains.

Planning is complete when required decisions are resolved and Plan Review passes.

### Implementation Gate

Implementation may begin only when both conditions hold:

1. **Readiness** — the authoritative work and required design are sufficiently defined, required planning review has passed, blockers are resolved, and the project's workflow considers the work executable.
2. **Authorization** — implementation of the defined scope is authorized under repository rules.

Readiness and execution authorization are separate gates.

Use the project's existing statuses, labels, approvals, or other workflow conventions. Do not require a specific artifact type or status name.

Skip formal Planning when the authoritative work already satisfies the readiness side of this gate.

### Implement

Implement only after the Implementation Gate passes.

Implement against the authoritative contract and accepted design.

#### Decomposition

Implement directly when the work fits one coherent execution unit.

Decompose into implementation tickets when the work has meaningful independent slices, dependencies, or is too large to execute coherently as one unit.

When tickets are used:

- follow dependency edges rather than arbitrary ordering
- execute independent frontier work in parallel when safe and supported
- keep each completed unit coherent and verifiable
- update visible work tracking as execution progresses
- complete or close work items according to the project's tracker conventions

Do not create tickets merely to enumerate coding steps.

#### Execution

Implement the agreed scope.

Test appropriately while working.

Do not stop at the first working implementation when authorized end-to-end work still has remaining implementation, review, or verification steps.

If implementation exposes a material unresolved contract decision, return to Planning rather than inventing it downstream.

#### Implementation Review

Before handing completed implementation to verification, review the change along two independent axes:

- **Standards** — fidelity to repository conventions, accepted ADRs/RFCs, and established technical constraints.
- **Spec** — fidelity to the authoritative work contract, including required behavior, scope, and acceptance criteria.

Establish the review baseline and scope from the request and available context. Review the full scoped change, including new, staged, and unstaged files where applicable; distinguish pre-existing and unrelated changes.

Keep the two axes distinct so a pass on one does not mask a failure on the other.

During authorized implementation, route material findings by ownership:

| Finding | Route |
|---|---|
| Implementation is missing or violates the agreed contract | Fix in the current implementation |
| Additional execution unit is needed within the same agreed work | Add or update an implementation ticket |
| Product or technical contract must change or was never resolved | Return to Planning |
| Issue is unrelated to the agreed work | Do not expand scope automatically |

Resolve material in-scope findings before proceeding to verification.

There is no "fix it while we're here" path for unrelated work.

Implementation is complete when the authorized scope is implemented, relevant checks pass, and material Implementation Review findings are resolved.

### Verify

Verification passes when sufficient practical evidence demonstrates that the agreed acceptance conditions hold for the completed and reviewed work.

Reuse relevant implementation-time evidence; broaden or repeat checks only when changes, failures, or unresolved risks justify it.

Expected behavior comes from the authoritative contract; implementation and tests provide evidence, not authority.

If verification fails, route the failure to its owner:

- implementation defect → Implement
- verification defect → fix verification and retry
- contract ambiguity → Planning
- environment or tooling failure → resolve or report the blocker
- unrelated pre-existing failure → do not expand scope automatically

After an in-scope fix, verify again.

Report pass, fail, or blocked with supporting evidence and any remaining gaps. Only a pass completes end-to-end delivery.

### Return rule

Return affected work to the earliest stage that owns the unresolved issue. Continue independent, authorized work.

Corrections within the agreed contract retain the existing execution authorization.

Do not compensate for an upstream contract gap in implementation.

Do not compensate for an implementation defect by weakening verification.
