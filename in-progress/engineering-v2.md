# Engineering Workflow

Route engineering work through:

    §1 Discuss → §2 Planning → §3 Implementation Gate → §4 Implement → §5 Verify

This section defines project-level orchestration, decision authority, gates, and return paths.

Judge stage completion by that stage's completion conditions; proactively complete its required review, corrections, and re-review. Before ending the task, check for remaining required and authorized work within the request's scope and continue through the workflow when it remains.

A stage-scoped request ends when that stage's deliverable is complete.

A request solely to review a PR, branch, or specified change scope uses the review scope and axes under Implementation Review without entering implementation or requiring its gate. Deliver evidence-backed findings and coverage limitations; do not automatically fix changes or advance their workflow status. Implementation correction and completion rules apply only to authorized implementation.

## 1. Discuss

Use Discuss to understand the request, explore alternatives, and resolve enough ambiguity to determine the next stage.

When the user has not requested planning or authorized end-to-end progression, remain in Discuss while:

- the work is exploratory
- material alternatives are still being considered
- the user is seeking understanding rather than preparing work for implementation
- the goal or selected scope is not yet clear enough to establish an implementation contract

Resolve routine details from context and repository evidence.

Ask only for missing information that materially affects the work; implementation details need not all be settled here.

Do not create planning artifacts merely because product, technical, or architectural decisions are being discussed.

The model may determine that the discussion is sufficiently mature for a later stage, but must not leave Discuss solely on that basis.

The user decides when discussion proceeds to planning or implementation. Reuse an existing request that already authorizes that progression; unresolved alternatives do not require a return to Discuss when planning is already authorized.

Route according to the authorized scope:

- for a planning-only request, enter Planning, complete the requested planning deliverable and applicable review, then stop without entering implementation
- for authorized end-to-end work, enter Planning when material contract decisions still need to be completed or formalized; proceed directly to the Implementation Gate only when the authoritative work satisfies its readiness conditions

Authorization to plan does not authorize implementation. Implementation remains subject to the separate gate and repository execution rules.

## 2. Planning

Enter Planning when the user requests planning, including planning-only work, or when authorized end-to-end work would otherwise require inventing a material product, scope, domain, architectural, interface, compatibility, or other contract decision.

Planning establishes the intended outcome, scope, and observable acceptance conditions, with a practical way to verify them.

Identify the Proposal or existing work item for this change by its ID, URL or path. It owns the goal, selected scope, acceptance conditions and decision status, directly or through references to applicable requirements and design. A product-wide Spec alone does not identify the current change.

Reuse a suitable work item; create a Proposal when a new planning root is needed. Separate PRDs, Specs, RFCs and ADRs are used when their content needs independent ownership. A clear work item and sufficient requirements are necessary even when no new document is needed.

Before creating or updating a Proposal, use the project's issue-tracker configuration for its location, work states and review/approval evidence. If missing, ask the user to complete that configuration; discussion and conversation drafts can continue. Local Markdown is valid when configured. Preserve historical owners and project formats. Decision records may reference the Proposal; their delivery lifecycle does not set its work status.

### Technical Design

Resolve material technical decisions in the project's existing design artifact. Use an RFC when a separate design proposal is needed.

A proposed design becomes an implementation basis only when accepted or approved under the project's workflow.

Resolve ordinary technical choices directly when they remain within the agreed contract, accepted architecture, and project constraints.

When a material design choice has meaningful alternatives, recommend a direction and preserve enough reasoning for review.

Material unresolved product, business, compatibility, cost, risk, architectural-direction, or other value judgments belong to the user unless that authority has been explicitly delegated.

### Plan Review

Review the planning set before implementation along three independent axes:

- **Standards** — fidelity to accepted ADRs, applicable RFCs, established domain language, and project constraints.
- **Spec** — coverage of the authoritative product or work contract without material omissions, contradictions, or unintended scope.
- **Architecture** — coherence of module boundaries, responsibilities, dependencies, interfaces, and system relationships.

Keep the axes distinct so a pass on one does not mask a failure on another.

Plan Review assesses the design within established decision authority. Record the result on the identified Proposal or existing work item; obtain required external approvals before treating proposed decisions as accepted.

Resolve findings in the artifact that owns them.

Questions already governed by accepted contracts, ADRs, RFCs, or project constraints should be resolved from those authorities.

Material unresolved value judgments or architectural-direction choices belong to the user unless authority has been explicitly delegated.

When an accepted decision establishes or changes a durable architectural constraint, preserve it as an ADR when warranted.

Plan Review passes only when no unresolved material finding or required decision remains.

After drafting, proactively complete Plan Review, resolve material findings in their owning artifacts, and review affected content again. Planning is complete when required decisions are resolved and Plan Review passes; a finished draft alone does not complete the stage.

Update that work item's readiness under its configured workflow only when required approvals are also obtained and no blocker prevents the selected scope from starting. Referenced artifacts retain their own approval conventions; review does not grant execution authorization.

## 3. Implementation Gate

Implementation may begin only when both conditions hold:

1. **Readiness** — the identified Proposal or existing work item specifies the selected scope and observable acceptance conditions, directly or by reference to applicable requirement sections; necessary design decisions, required planning review and approvals are evidenced; no material unresolved decision or blocking dependency prevents that scope from starting.
2. **Authorization** — implementation of the defined scope is authorized under repository rules.

Readiness and execution authorization are separate gates.

Use the work item and its references as evidence; a status label or directory location alone does not pass the gate. Reuse valid review and authorization evidence. Before coding, sync agreed scope and decisions not yet reflected in their existing owners.

For end-to-end work, skip formal Planning when the identified work item already satisfies the readiness side of this gate. An explicit planning request still receives its requested deliverable and applicable review, reusing existing artifacts and valid evidence.

## 4. Implement

Implement only after the Implementation Gate passes.

Implement the selected work item's scope against its acceptance conditions, referenced requirements and accepted design.

### Decomposition

Implement directly when the work fits one coherent execution unit.

Decompose into implementation tickets when the work has meaningful independent slices, dependencies, or is too large to execute coherently as one unit.

Create these tickets after entering implementation; they are not prerequisites for its initial gate. Tickets reference the parent work item and inherit its scope and valid execution authorization. Check each ticket's acceptance conditions and dependencies before starting it, without repeating the full planning gate. New material decisions return affected work to Planning.

When tickets are used:

- follow dependency edges rather than arbitrary ordering
- execute independent frontier work in parallel when safe and supported
- keep each completed unit coherent and verifiable
- update visible work tracking as execution progresses
- complete or close work items according to the project's tracker conventions

Do not create tickets merely to enumerate coding steps.

### Execution

Implement the agreed scope.

Do not stop at the first working implementation when authorized end-to-end work still has remaining implementation, review, or verification steps.

If implementation exposes a material unresolved contract decision, return to Planning rather than inventing it downstream.

#### Implementation-time testing

Test appropriately while working, including after corrections.

### Implementation Review

Before handing completed implementation to verification, review the change along two independent axes:

- **Standards** — fidelity to repository conventions, accepted ADRs/RFCs, and established technical constraints.
- **Spec** — fidelity to the authoritative work contract, including required behavior, scope, and acceptance criteria.

Establish the review baseline and scope from the request and available context. Review the full scoped change, including new, staged, and unstaged files where applicable; distinguish pre-existing and unrelated changes.

Keep the two axes distinct so a pass on one does not mask a failure on the other.

#### Resolve findings and re-review

During authorized implementation, route material findings by ownership:

| Finding | Route |
|---|---|
| Implementation is missing or violates the agreed contract | Fix in the current implementation |
| Additional execution unit is needed within the same agreed work | Add or update an implementation ticket |
| Product or technical contract must change or was never resolved | Return to Planning |
| Issue is unrelated to the agreed work | Do not expand scope automatically |

Return implementation corrections to Execution, rerun affected checks, and re-review the corrected scope. Resolve material in-scope findings before proceeding to verification.

There is no "fix it while we're here" path for unrelated work.

### Completion and handoff

Implementation is complete when the authorized scope is implemented, relevant checks pass, and material Implementation Review findings are resolved.

Update the work item's implementation progress under the project convention. Final delivery completion and any decision-record transition to `implemented` follow successful final verification.

## 5. Verify

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

## Return Rule

Return affected work to the earliest stage that owns the unresolved issue.

Continue independent, ready, and authorized work while that issue is resolved.

Corrections within the agreed contract retain the existing execution authorization; resume from the owning stage without requesting it again.

Changes to the agreed contract must pass the applicable planning and implementation gates before affected implementation resumes.

Do not compensate for an upstream contract gap in implementation, and do not compensate for an implementation defect by weakening verification.
