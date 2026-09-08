# Proposal

Use a Proposal when the work needs a root planning artifact and no existing authoritative work item serves that purpose.

When used, the Proposal is the canonical root of that planning work. It identifies the work and references authoritative artifacts without duplicating them.

## Storage

Use registered artifact locations first. If a `proposed` change record owns the Proposal, create or update that record rather than a second Proposal. Existing work remains with its historical owner unless explicitly migrated. The defaults below apply only when no registered or established convention resolves the location.

Prefer the project's configured issue tracker when one exists.

Otherwise store the Proposal locally at:

    docs/proposals/<slug>.md

Reuse an existing Proposal when the work already has one.

Do not create both an issue and a local Proposal unless the project explicitly requires it.

## Contents

Keep the Proposal concise.

Include:

### Summary

Briefly describe the intended change and why it exists.

### Acceptance

Define the minimum observable conditions for considering the work successful.

Keep this concise when another authoritative artifact, such as a PRD or Spec, owns the detailed contract.

### Artifacts

Reference authoritative artifacts that actually exist, such as:

- PRD
- Spec
- RFC
- ADRs
- implementation tickets

Do not create placeholder artifacts merely to populate this section.

## Status

Use the project's existing workflow convention to represent Proposal status.

This may use:

- issue-tracker statuses
- labels
- approvals
- frontmatter
- another established project mechanism

Do not introduce a parallel status vocabulary when the project already defines one.

For a local Proposal in a project without an established convention, a simple status field may be used:

    ---
    status: planning
    ---

The status should make relevant lifecycle distinctions clear, such as whether the work is still being planned, approved for implementation, blocked, or complete.

The exact state names belong to the project.

## Updates

Update the Proposal when:

- its workflow status materially changes
- an authoritative artifact is added, removed, replaced, or superseded
- implementation tickets are introduced

Do not copy detailed requirements, design reasoning, review findings, or implementation progress into the Proposal when another artifact owns that information.

## Local format

    ---
    status: <project-defined-status>
    ---

    # <Title>

    ## Summary

    <What is changing and why.>

    ## Acceptance

    - <Observable success condition>
    - <Observable success condition>

    ## Artifacts

    - PRD: <reference>
    - Spec: <reference>
    - RFC: <reference>
    - ADR: <reference>
    - Tickets: <reference>

Omit artifact entries that do not exist.
