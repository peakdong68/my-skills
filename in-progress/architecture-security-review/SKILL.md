---
name: architecture-security-review
description: Review a repository or major change across architecture, security and implementation. Evaluate the technical approach and alternatives before reviewing the implementation worth retaining, and report evidence-backed issues worth fixing. Use for full repository reviews, technical direction assessments or combined cross-module security and code reviews; do not automatically escalate ordinary local code reviews or individual design questions into this workflow.
disable-model-invocation: true
---

# Architecture, Security and Code Review

Assess the approach and implementation from three independent perspectives: software architect, security reviewer and code reviewer. Existing design, invested effort and passing tests do not guarantee correctness. Prioritize root causes worth addressing; do not measure review quality by the number of findings.

## Scope and authority

- Deliver review conclusions without modifying the reviewed code, configuration, tests or design. Do not automatically publish comments, create tickets or push changes. If the user later explicitly requests implementation, follow the project's implementation entry rules separately.
- Reuse the repository, baseline and scope specified by the user or calling workflow. A full review covers the main architectural and trust boundaries and investigates high-risk paths in depth. Do not interpret it as an aimless line-by-line scan or claim that sampled review guarantees comprehensive security.
- Find material through the project's AGENTS.md and its pointers first. Read supplementary instructions such as CLAUDE.md where applicable. Do not assume a language, directory structure, deployment platform or issue tracker. Missing one kind of document does not itself block the rest of the review.
- Read-only investigation may use searches, Git history and existing tests. Check commands for side effects before running them, and use temporary directories, fake services or isolated environments. Do not run tests that touch real data, credentials, production services or external writes. If safe execution is not possible, record the verification gap and continue static analysis. Do not display secret values.
- Ask only when the repository cannot supply the answer, different answers would materially change the conclusion, and reasonable read-only checks cannot resolve the question. Ask at most three essential questions at a time. Label ordinary uncertainty explicitly and continue independent analysis while waiting.

## Investigate and reconstruct

First establish the project goals, current delivery scope and main risks, then pursue a focused investigation:

1. Read the README, project instructions, and relevant requirements, designs, accepted decisions, specs, work items and acceptance material.
2. Record the current branch, HEAD, existing worktree changes and review baseline. Inspect relevant recent commits. When reviewing current changes, include staged, unstaged and relevant new files. Distinguish pre-existing defects from newly introduced ones; an empty diff does not replace a repository review.
3. Examine dependency manifests and lockfiles, build and deployment configuration, and runtime assumptions. Trace program entry points, core call relationships, data models, external services and key tests. Prioritize paths affected by the change or with serious consequences.
4. Trace untrusted input through authentication, authorization, sensitive data and side effects. Identify who can call each entry point, where trust changes, who owns state and how failures recover. Follow internal implementation as needed rather than stopping at interface declarations or local patches.

Support conclusions about goals and current behavior with file locations, and list assumptions and missing information that affect them. Requirements and accepted contracts establish what should happen; source code and observed results establish what actually happens. State discrepancies explicitly. The design itself may still be challenged, but do not reinterpret the contract to erase an implementation defect.

## Evaluate the technical approach first

Examine requirement coverage, sources of complexity, historical patches, permission boundaries, state consistency and operational burden in relation to the goals. Use commit history or specific code to support claims that an early choice caused later patches. Do not infer overengineering solely from module count or code length.

Determine whether a problem can be fixed locally or stems from shared state, trust relationships, responsibility boundaries or the technology choice itself. For security issues, identify the assets, attacker capabilities, entry points and deployment assumptions. Do not present an idealized threat model as current fact.

When meaningful alternatives exist, compare them with the current approach or a minimal adjustment:

| Dimension | Comparison |
| --- | --- |
| Requirement coverage | Acceptance conditions already met, missing or affected |
| Security and failure impact | Trust boundaries, privilege scope, failure blast radius and recovery capability |
| Implementation and maintenance | Added mechanisms, coordinated changes, debugging and long-term operational costs |
| Performance and resources | Measured costs and assumptions still requiring verification |
| Migration and rollback | Data, interfaces, transitional compatibility, incremental delivery and recovery costs |

Do not invent alternatives to fill a table. When alternative technologies' versions, support status or security capabilities affect the recommendation, verify official sources. For vulnerability findings, check the actual locked version, authoritative advisories, reachable paths and deployment conditions. Do not classify a vulnerability based only on a package name or scanner alert.

Give one explicit conclusion about the technical approach, with evidence: **retain the current approach / adjust the current approach / replace the approach / insufficient information to decide yet**. A recommendation is not approval. This workflow does not provide or apply code patches.

## Then review the implementation

When the approach is worth retaining or adjusting locally, examine the retained implementation's functionality, permissions, input handling, error handling, concurrency, state consistency, resource cleanup, performance, tests and maintainability. Trace callers and data flows to establish impact rather than checking only changed lines.

When recommending replacement, focus on risks that must be controlled before migration and on code that will remain, rather than polishing implementation scheduled for removal. When the approach cannot yet be judged, continue independently verifiable security and correctness checks and state their assumptions.

Prefer existing tests, minimal safe reproductions or complete call paths to validate findings. Record actual commands and results. When reproduction is not possible, explain how far the evidence supports the claim. Report test gaps only when they relate to specific required behavior or a plausible risk.

## Finding quality

Each finding includes:

- **Nature**: confirmed defect / plausible risk / hypothesis requiring verification.
- **Severity**: critical / high / medium / low, assessed against trigger conditions, exploitability and impact.
- **Confidence**: high / medium / low. Explain evidence limitations; severity does not substitute for confidence.
- **Evidence**: precise file locations, configuration, call paths or test results.
- **Trigger and consequences**: who triggers it under which conditions, and which behavior, data or permissions are affected.
- **Remediation direction**: the smallest effective correction or architectural adjustment and how to verify it, without writing a patch.
- **Root-cause relationship**: root cause or symptom. Consolidate findings with the same cause and explain their affected scope.

Critical usually means widespread system compromise or severe, unrecoverable data loss. High means an important security boundary or core behavior is broken. Medium means material impact with limited scope or trigger conditions. Low means limited impact that can usually be deferred. Support severity with a concrete scenario rather than assigning it mechanically by vulnerability category.

Keep purely theoretical hypotheses among unconfirmed information, separate from confirmed defects. Distinguish violations of a standard from objections to the standard itself. Do not treat style preferences, code volume or invested effort as defects or reasons to retain an approach. Check remediation status and do not report resolved issues again. For low-probability, low-impact concerns, explicitly state whether they are worth addressing. If there are no new material findings, say so.

## Report and stopping conditions

Report in the following order, using the user's language. Use a single sentence for sections without substantive content; do not pad tables or finding counts:

1. **Repository investigation scope**: baseline, modules and paths examined, checks run and areas not covered.
2. **Project goals and current approach**: a brief account of the goals, approach and sources.
3. **Key unconfirmed information**: missing evidence and its effect on conclusions.
4. **Key assumptions of the current approach**: conditions for validity and verification status.
5. **Approach-level issues**: use the finding format above, or explain the evidence that supports the current direction.
6. **Alternatives and trade-offs**: compare only feasible alternatives worth considering.
7. **Technical approach conclusion**: select one of the four outcomes, with reasons and applicable conditions.
8. **Implementation issues**: ordered by severity. Reference earlier findings for shared root causes without counting them twice.
9. **Top three priorities**: at most three, possibly fewer or none. Do not present hypotheses as definite remediation tasks.
10. **Residual risks that may be accepted for now**: acceptance conditions and signals to monitor. Label acceptance as a recommendation unless the user has accepted it.
11. **Whether another review round is worthwhile**: give a concrete objective and expected benefit, or recommend stopping.

Deliver the report once the main architectural and trust boundaries have been investigated, priority paths verified, findings deduplicated and checked for remediation status, and the technical approach conclusion and coverage limitations explained. Stop when further checks yield no new high-value leads. Explicitly list important remaining gaps rather than claiming a comprehensive pass. After the review, wait for the user's decision; do not automatically begin remediation.
