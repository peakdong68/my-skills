## Engineering Workflow

Route engineering work through:

    Discuss → Plan → Implementation Gate → Implement → Verify

This section defines project-level orchestration, decision authority, gates, and return paths.

### Discuss

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

- for a planning-only request, enter Plan, complete the requested planning deliverable and applicable review, then stop without entering implementation
- for authorized end-to-end work, enter Plan when material contract decisions still need to be completed or formalized; proceed directly to the Implementation Gate only when the authoritative work satisfies its readiness conditions

Authorization to plan does not authorize implementation. Implementation remains subject to the separate gate and repository execution rules.


### Plan

Enter `plan` when the user requests planning, including planning-only work, or when authorized end-to-end work would otherwise require inventing a material product, scope, domain, architectural, interface, compatibility, or other contract decision.

For end-to-end work, skip Plan when the work already satisfies the Implementation Gate's readiness conditions. An explicit planning request still receives its requested deliverable and applicable review, reusing existing artifacts and valid evidence.

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

Return affected work to the earliest stage that owns the unresolved issue.

Continue independent, ready, and authorized work while that issue is resolved.

Corrections within the agreed contract retain the existing execution authorization; resume from the owning stage without requesting it again.

Changes to the agreed contract must pass the applicable planning and implementation gates before affected implementation resumes.

Do not compensate for an upstream contract gap in implementation, and do not compensate for an implementation defect by weakening verification.
