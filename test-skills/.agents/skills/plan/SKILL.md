---
name: plan
description: Use when creating or updating a Proposal, when the product contract needs further definition, or when material technical decisions must be resolved before implementation.
---

# Plan

Turn the current conversation and relevant project context into the minimum planning artifacts needed for the work to pass the project's Implementation Gate. 

Planning is synthesis and decision completion, not a mandatory step for every engineering task.

## Proposal

Every work item planned through this skill has one Proposal.

Read [proposal.md](./proposal.md) when creating or updating it.

Reuse an existing Proposal when one already represents the work.

## Planning

Create additional artifacts only when needed:

- **PRD** — read [prd.md](./prd.md) when the product contract needs further definition.
- **RFC** — read [rfc.md](./rfc.md) when meaningful technical decisions must be resolved before implementation.

Use established domain language and architectural decisions as project context.

Use `domain-modeling` when planning establishes or changes durable domain knowledge or architectural decisions.

Do not create artifacts merely to complete a sequence.

## Decision authority

Resolve ordinary technical choices autonomously when they remain within the agreed contract, established architecture, and project constraints.

Escalate when a material choice requires an unresolved product, business, compatibility, cost, risk, architectural, or other value judgment.

The user owns such unresolved decisions unless they have explicitly delegated that authority.

When authority is delegated, make the decision and preserve the material reasoning where appropriate.

## Review

When the required planning work is complete, read [review.md](./review.md).

Resolve material findings in the artifact that owns them and review again.

Planning completes when the planning set passes Plan Review and satisfies the project's requirements for entering implementation.

Do not begin implementation unless requested.

