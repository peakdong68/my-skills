---
name: to-spec
description: "Create or update a testable Spec from established product and design decisions and repository evidence, without reopening decisions or granting implementation approval."
disable-model-invocation: true
---

# To Spec

Create or update a Spec when the user or project explicitly requires that deliverable, using established requirements, design decisions, and repository evidence.

The Spec answers:

> What exactly must be implemented, and how will we know it is correct?

The Spec records requirements intended for implementation and acceptance verification. Its authority follows the project's review and approval conventions; generating it does not grant approval or execution authorization.

Prefer updating an existing Spec for the same work. Reference information owned by other authoritative artifacts rather than duplicating it. If the Spec is intended to replace an existing contract, record that relationship through the project's acceptance process; do not create a competing authority by default.

Reuse project configuration. Missing tracker configuration does not prevent local drafting; handle publication requirements under Publishing.

Follow the artifact registry referenced by project instructions, or `docs/agents/artifacts.md` when present, for Spec location, historical owners and lifecycle. Existing work remains with its owner unless explicitly migrated. Without a registry, reuse established conventions. An independent Spec does not move with a linked change record's delivery lifecycle.

## Rules

### 1. Synthesize, do not redesign

Use decisions already established by relevant:

- conversation context
- PRDs
- RFCs
- ADRs
- existing Specs
- prototypes
- repository evidence
- issue or task history

Do not reopen settled decisions.

Do not introduce new product, architecture, UX, compatibility, security, migration, or risk decisions merely to complete the Spec.

If implementation would require a new material decision, record the content gap.

### 2. Do not interview

Do not conduct a product or design interview; publication configuration questions are handled under Publishing.

Resolve repository-answerable facts by inspecting available evidence.

If a required product or design decision is missing, contradictory, or ambiguous:

- record it as a blocker
- identify the owning upstream decision
- do not guess

A Spec with blocking unknowns is not sufficiently defined. Complete unaffected content and identify the owning planning decision. In an end-to-end task, the enclosing engineering workflow returns affected work to Planning; for a Spec-only request, deliver the draft and blockers.

### 3. Inspect repository evidence

Before finalizing, inspect the relevant repository unless it has already been sufficiently explored.

Check only what is relevant, such as:

- current code and behavior
- tests and fixtures
- configuration
- documentation
- architecture boundaries
- existing contracts
- related PRDs, RFCs, ADRs, and Specs
- established testing patterns

Use project terminology and respect existing authoritative decisions.

Repository evidence establishes current behavior and technical constraints. It must not silently redefine established product intent.

### 4. Specify behavior, not coding steps

Describe:

- observable behavior
- contracts
- invariants
- constraints
- relevant failure behavior

Prefer:

> A successfully saved preference MUST remain effective across supported sessions.

Over:

> Add a boolean column to the settings table.

Include implementation details only when they are themselves part of an established contract or accepted design decision.

Do not turn the Spec into an implementation plan.

### 5. Make requirements normative and verifiable

Use the project's existing requirement and acceptance tracking convention. When none exists, stable IDs such as `R-001` and `AC-001` may establish traceability.

Use normative language where appropriate:

- **MUST**
- **MUST NOT**
- **SHOULD**
- **SHOULD NOT**
- **MAY**

Every **MUST** and **MUST NOT** must have an observable verification path.

Requirements should be atomic where practical and precise enough that implementation does not need to invent behavior.

### 6. Prefer the highest stable verification seam

Verify behavior through the highest stable existing boundary that reliably demonstrates the requirement.

Prefer:

external/public behavior  
→ integration/domain/service boundary  
→ module boundary  
→ internal component

Prefer existing seams over introducing test-only seams.

Do not test private implementation details when the required behavior can be demonstrated through a higher boundary.

The goal is not to maximize the number of seams. Use the fewest stable seams that provide sufficient behavioral coverage.

## Process

### Step 1 — Establish scope and evidence

Extract the already-established:

- goal
- required behavior
- scope
- exclusions
- constraints
- compatibility expectations
- relevant product and design decisions

Inspect repository evidence needed to understand the current system and existing verification patterns.

Do not invent missing decisions.

### Step 2 — Define requirements and contracts

Translate established behavior into normative requirements.

Define relevant contracts when necessary, such as:

- APIs
- commands
- events
- schemas
- state transitions
- persistence behavior
- compatibility behavior

Include only contracts that materially affect implementation or verification.

Do not invent abstractions merely to make the Spec more detailed.

### Step 3 — Define acceptance criteria

Use the project's acceptance tracking convention, preserving existing identifiers when updating a Spec.

Acceptance criteria describe observable outcomes.

Prefer:

> Given `<initial condition>`, when `<action>`, then `<observable result>`.

Map acceptance criteria to requirements using that convention, for example:

`R-001 → AC-001, AC-002`

Every required behavior must be objectively verifiable.

Acceptance criteria define what must be demonstrated during post-delivery verification; they should not prescribe unnecessary implementation details.

### Step 4 — Define verification strategy

For each required behavior, determine how it can be demonstrated.

Identify:

- primary verification seam
- required automated coverage
- existing test patterns that can be reused
- integration, end-to-end, or manual verification when necessary

Existing tests are useful evidence, but the Spec should define required behavior independently of the current implementation.

Prefer behavior-oriented verification over implementation-oriented testing.

### Step 5 — Check content readiness

The Spec is sufficiently defined only when:

- goal and scope are clear
- required behavior is unambiguous
- relevant contracts are defined
- relevant errors and edge cases are defined
- acceptance criteria are observable
- every MUST and MUST NOT has a verification path
- viable verification seams exist
- relevant repository evidence has been inspected
- applicable PRD, RFC, ADR, and existing Spec decisions are respected
- compatibility or migration behavior is defined when required
- no blocking product or design decision remains
- implementation does not require inventing material behavior or contract decisions

This check establishes content readiness, not passage through the Implementation Gate. Required Plan Review, project approvals, and execution authorization remain separate conditions; reuse their existing evidence rather than requesting them again.

If any blocking condition fails:

- record the content as blocked using the project's convention
- identify the blocker and its owning upstream layer
- do not guess
- do not publish it as ready for implementation

## Spec Template

Follow the project's explicit Spec conventions first. When updating an existing Spec, preserve its style unless those conventions require a change. For a new Spec, inspect relevant existing project Specs and follow their established structure, heading style, terminology, requirement and acceptance notation, and level of detail.

If no explicit format exists, use a representative, maintained Spec for similar work as the style reference. Adapt its structure to the current scope without copying unrelated content or obsolete decisions.

Read [spec-template.md](./spec-template.md) only when no suitable project format or existing Spec is available.

## Publishing

Publish when requested or already authorized for this scope, using the configured project destination. Content readiness alone does not authorize publication.

Apply an implementation-ready status only when its project-defined conditions, including required review and approval, are met. Draft publication does not make the Spec approved; publication or a readiness label does not itself grant execution authorization.

If requested publication lacks necessary configuration, finish the local draft, identify the specific missing destination or configuration, and ask only for information needed to publish. Use the project's setup process where applicable; do not require initialization merely to draft a Spec.

Do not invent tracker configuration, project identifiers, issue types, or labels.

## Writing Rules

- Be concise, normative, and testable.
- Specify outcomes before mechanisms.
- Avoid ambiguous terms such as "properly", "fast", or "gracefully" unless their meaning is defined.
- Do not manufacture requirements, edge cases, contracts, or abstractions.
- Do not reopen accepted product or design decisions.
- Do not include file paths or code snippets unless they are themselves part of an established contract.
- Do not write a conversation transcript.
- Remove resolved questions and exploratory reasoning.
- Use established project terminology.
- Include optional sections only when they materially affect implementation or verification.

Once accepted under the project's workflow, the Spec serves as an implementation and acceptance contract within its recorded scope and relationships to other authorities.

Downstream tickets decompose the contract into executable work without redefining it.
