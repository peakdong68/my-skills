
# Plan Review

Review the relevant planning artifacts before implementation.

Evaluate the planning set along three independent axes:

- **Standards** — fidelity to accepted ADRs, applicable RFCs, established domain language, and project constraints.
- **Spec** — coverage of the authoritative product or work contract, such as the Proposal, PRD, approved Spec, or equivalent project artifact.
- **Architecture** — coherence of boundaries, responsibilities, dependencies, interfaces, and system relationships.

Report only material findings and trade-offs.

## Decision

Plan Review may accept a proposed design, require revision, or reject it.

Resolve findings in the artifact that owns them.

Existing contracts, accepted decisions, and established constraints may directly resolve questions already governed by them.

Material choices requiring an unresolved product, business, compatibility, cost, risk, architectural, or other value judgment belong to the user unless that authority has been explicitly delegated.

When authority is delegated, make the decision and preserve the material reasoning.

For RFCs involved in the work:

- accepted design → mark it accepted or approved using the project's RFC convention
- rejected design → mark it rejected using the project's convention
- revision required → keep it non-authoritative until reviewed again

When an accepted decision creates or changes a durable architectural constraint, preserve it through `domain-modeling` as an ADR when warranted.

## Gate

The planning set passes when:

- Standards, Spec, and Architecture have no unresolved material findings
- required decisions are resolved
- RFCs required for implementation are accepted or approved
- accepted decisions are reflected in their authoritative artifacts
- durable decisions are preserved when warranted
- implementation can proceed without inventing material product behavior or architecture

If the gate passes, mark the authoritative work as approved or ready for implementation using the project's workflow convention.

If it does not pass, keep the work in planning, revise the owning artifact, and review again.

Routine implementation details may remain open.