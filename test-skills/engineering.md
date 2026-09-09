## Engineering Workflow

Route engineering work through:

    Discuss → Plan → Implementation Gate → Implement → Verify

This section defines project-level orchestration, decision authority, gates, and return paths.

### Discuss

Discuss is complete when the goal, scope, and any material unresolved decisions are identified well enough to choose the next stage.

Resolve routine details from context and repository evidence. Ask only for missing information that materially affects the work; implementation details need not all be settled here.

Do not create planning artifacts merely because the conversation is exploratory.

### Plan

Enter `plan` when implementation would otherwise require inventing a material product, scope, domain, architectural, interface, compatibility, or other contract decision.

Skip Plan when the work is already sufficiently defined.

Identify the Proposal or existing work item for the current change by its ID, URL or path. It defines the selected scope and acceptance conditions, directly or by reference to relevant requirements and design. Reuse it; a separate Proposal, PRD, Spec or RFC is needed only when its content needs a new owner.

Plan owns its planning artifacts and Plan Review.

If a later stage exposes a material unresolved contract decision, return to `plan`.

### Implementation Gate

Enter implementation only when:

- the identified Proposal or existing work item specifies the selected implementation scope
- observable acceptance conditions are stated or linked to applicable requirement sections
- necessary design decisions, required planning review and approvals are evidenced, with no material unresolved decision affecting this scope
- dependencies and blockers allow the selected scope to start
- execution authorization under repository rules covers that scope

Planning readiness and execution authorization are separate conditions.

Use the work item and its references as evidence; a status label or directory location alone does not pass the gate. Reuse valid review and authorization evidence. Before coding, sync agreed scope and decisions not yet reflected in their existing owners.

### Implement

After the Implementation Gate passes, use `implement`.

Implementation owns execution, decomposition when needed, implementation-time testing, and Implementation Review.

Do not stop at the first working implementation when authorized end-to-end work still requires review or verification.

### Verify

After implementation and Implementation Review are complete, use `verify`.

Only successful verification completes the work.

### Return Rule

Return affected work to the earliest stage that owns the unresolved issue. Continue independent, authorized work while that issue is resolved.

Corrections within the agreed contract retain the existing execution authorization; resume the workflow without requesting it again.

Do not compensate for an upstream contract gap in implementation, and do not compensate for an implementation defect by weakening verification.
