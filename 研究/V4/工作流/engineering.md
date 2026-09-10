## Engineering Workflow

Route engineering work through:

    Discuss → Plan → Implementation Gate → Implement → Verify

This section defines project-level orchestration, decision authority, gates, and return paths.

### Discuss

Use Discuss to understand the request, explore alternatives, and resolve enough ambiguity to determine the next stage.

Remain in Discuss while:

- the work is exploratory
- material alternatives are still being considered
- the user is seeking understanding rather than preparing work for implementation
- the goal or selected scope is not yet clear enough to establish an implementation contract

Resolve routine details from context and repository evidence.

Ask only for missing information that materially affects the work; implementation details need not all be settled here.

Do not create planning artifacts merely because product, technical, or architectural decisions are being discussed.

The model may determine that the discussion is sufficiently mature for a later stage, but must not leave Discuss solely on that basis.

The user decides when discussion proceeds toward implementation, unless the user's existing request already explicitly authorizes that progression.

When progression is authorized:

- proceed directly to the Implementation Gate when the authoritative work is already sufficiently defined
- enter Plan when material contract decisions still need to be completed or formalized

### Plan

Enter `plan` when the work is proceeding toward implementation and implementation would otherwise require inventing a material product, scope, domain, architectural, interface, compatibility, or other contract decision.

Skip Plan when the work is already sufficiently defined.

Plan owns its planning artifacts and Plan Review.

If a later stage exposes a material unresolved contract decision, return to `plan`.

### Implementation Gate

Enter implementation only when:

- the authoritative work is sufficiently defined
- required decisions and blockers are resolved
- the project's workflow considers the work executable
- execution is authorized under repository rules

Planning readiness and execution authorization are separate conditions.

The authoritative work may be a Proposal, Spec, issue, ticket, accepted plan, or another project-defined artifact.

Use the project's existing workflow conventions rather than requiring a particular artifact type, status, or approval mechanism.

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