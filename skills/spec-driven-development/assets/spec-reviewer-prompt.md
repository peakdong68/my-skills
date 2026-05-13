# Spec Review Subagent Prompt Template

Use this template when dispatching a spec review subagent via the `Task ` tool. Dispatching agent is responsible for passing the full spec content and original requirement context into the prompt.

**Purpose:** Independently review a spec/design document for structural completeness, requirement alignment, and edge-case robustness — before implementation planning begins.

```
Task tool (general-purpose):
  description: "Review spec compliance for <feature-name>"
  prompt: |
    You are reviewing a specification document for quality and completeness.

    ## Spec Document

    <FULL TEXT of spec-design.md>

    ## Requirement Baseline

    <Original requirements from conversation context, idea-refine docs, or spec goals>

    ## CRITICAL: Independent Review

    You MUST verify the spec document independently. Do not trust the author's self-review.
    Read the spec carefully and check every section.

    ## Review Process

    ### Step 1: Scope Assessment

    - Check if the spec describes multiple independent subsystems
    - If 2+ independent subsystems detected, split into separate review units
    - Each subsystem gets full L1/L2/L3 checks

    ### Step 2: L1 — Structural Completeness

    | # | Check Item | Criterion |
    |---|-----------|-----------|
    | 1 | Required sections | Background, Goals, Design, Implementation Notes, Acceptance Criteria, Won't Do, Open Questions — all present with substantive content |
    | 2 | Design structure | Includes overall architecture description, subsystem breakdown if applicable |
    | 3 | Implementation details | Key technical decisions, challenges, dependencies, new/modified file lists all populated |
    | 4 | Document location | Under `docs/spec/` directory |
    | 5 | Placeholders/TODOs | No section with only `[placeholder]`, TBD, or TODO without follow-up |
    | 6 | Testable acceptance criteria | Every criteria must be answerable with yes/no; no vague terms like "feels good" |
    | 7 | Feature ID format | Title contains `YYYY-MM-DD_F00X` format Feature ID |

    ### Step 3: L2 — Requirement Consistency

    | # | Check Item | Criterion |
    |---|-----------|-----------|
    | 1 | Feature coverage | Every requirement baseline item has corresponding description or acceptance criteria |
    | 2 | Internal consistency | No contradictions between design and implementation (e.g., framework A in design, framework B in file list) |
    | 3 | Won't-do rationale | Excluded items have sufficient justification, don't conflict with core requirements |
    | 4 | Dependency declaration | External dependencies (APIs, databases, third-party services) are explicitly listed |
    | 5 | Gap detection | Requirements explicitly mentioned by user but missing from spec |

    ### Step 4: L3 — Edge Cases & Robustness

    | # | Check Item | Criterion |
    |---|-----------|-----------|
    | 1 | Error handling | Key operations define error handling strategy (API failures, timeouts, network errors) |
    | 2 | Boundary inputs | Empty input, overflow, special characters considered |
    | 3 | Empty/loading states | Empty state, loading state, error state UI descriptions present |
    | 4 | Concurrency & races | Concurrent operations or race conditions mentioned |
    | 5 | Security | Input validation, authN/authZ, sensitive data handling |
    | 6 | Rollback & degradation | Feature degradation or rollback strategy defined |

    ## Output Format

    Produce exactly this structure:

    ```markdown
    # Spec Review: <spec filename>

    **Review time:** <timestamp>
    **Requirement baseline source:** <conversation context / idea-refine docs / spec goals>

    ## Overall Assessment

    | Layer | Items Checked | Passed | Issues |
    |-------|--------------|--------|--------|
    | L1 Structural | — | — | — |
    | L2 Consistency | — | — | — |
    | L3 Robustness  | — | — | — |

    **Conclusion:** ✓ Ready for planning / ⚠ Suggestions but can proceed / ✗ Fix before planning

    ## L1 Structural Completeness

    | # | Check Item | Result | Notes |
    |---|-----------|--------|-------|

    ## L2 Requirement Consistency

    | # | Requirement | Coverage | Spec Section | Notes |
    |---|------------|----------|-------------|-------|

    ## L3 Edge Cases & Robustness

    | # | Scenario | Result | Notes |
    |---|---------|--------|-------|

    ## Fix Recommendations

    1. [Severity: Critical/Important/Suggestion] [Issue] → [Specific fix suggestion]
    ```

    ## Post-Review Handoff

    Based on the conclusion:
    - **✓ Ready for planning** → Tell user: proceed to `/plan` or invoke `planning-and-task-breakdown`
    - **⚠ Suggestions but can proceed** → List suggestions, let user decide; if confirmed, proceed to `/plan`
    - **✗ Fix before planning** → List critical issues; user must fix spec and re-review before `/plan`

    Never skip directly to code implementation after review. The next step after spec review is always planning.
```

## Red Flags

- Executing the review in the current session instead of dispatching an independent subagent
- Review report shows all ✓ with zero issues found (likely perfunctory review)
- Reviewing a non-existent or incomplete spec file
- L3 only checks technical boundaries, ignoring UX boundaries (empty states, loading states)
- Reviewing large specs monolithically instead of splitting by subsystem

## Verification

After the subagent returns, confirm:

- [ ] Review executed by independent subagent (not current session)
- [ ] Spec document located and fully read
- [ ] Requirement baseline established with confidence source noted
- [ ] Three-layer checks (L1/L2/L3) all completed
- [ ] Review report includes specific section references and fix suggestions
- [ ] Report presented to user, awaiting decision to proceed to `/plan`
