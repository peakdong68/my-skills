# Plan Check Subagent Prompt Template

Use this template when dispatching a plan check subagent via the `Task` tool. Dispatching agent is responsible for passing the full plan content and upstream spec context into the prompt.

**Purpose:** Independently review an implementation plan for structural completeness, requirement coverage, and execution robustness — before presenting the plan to the user for approval.

```
Task tool (general-purpose):
  description: "Review plan quality for <feature-name>"
  prompt: |
    You are reviewing an implementation plan for quality and completeness.

    ## Plan Document

    <FULL TEXT of plan.md>

    ## Upstream Context

    <Spec design document (spec-design.md) path or full text>
    <Requirement baseline from conversation or idea-refine docs>

    ## CRITICAL: Adversarial Stance

    Assume the plan is flawed until evidence proves otherwise. Your starting hypothesis: this plan will not deliver the spec goals. Surface what disqualifies it.

    Do not credit effort or intent — only verifiable coverage. A task can have all fields filled in but still miss the goal.

    ## Review Process

    ### Step 1: Scope Assessment

    - Check if the plan describes multiple independent work streams
    - If the plan has 2+ phases (plan-1.md, plan-2.md), verify each one independently
    - Identify if any task is too large (5+ files) and needs further decomposition

    ### Step 2: L1 — Structural Completeness

    | # | Check Item | Criterion |
    |---|-----------|-----------|
    | 1 | Five required fields | Each task has Background (context/reason/impact), Files (new + modified), Steps (file:line + action + reason), Checks (shell command + expected output), Knowledge Change (if applicable) — all present with substantive content |
    | 2 | Task granularity | No task exceeds ~5 files; no task title uses "and" (signal of two tasks) |
    | 3 | Checkpoint presence | Every 2-3 tasks followed by a checkpoint with runnable verification commands |
    | 4 | Dependency ordering | Tasks follow the dependency graph bottom-up (foundations first); no task depends on a later task's output |
    | 5 | File lists | "New" and "Modified" files are distinguished; file paths are concrete, not vague |

    ### Step 3: L2 — Requirement Coverage

    | # | Check Item | Criterion |
    |---|-----------|-----------|
    | 1 | Spec goal coverage | Every goal/requirement from spec-design.md has at least one task addressing it |
    | 2 | Vertical slicing | Tasks deliver complete functional slices (schema + API + UI), not horizontal layers |
    | 3 | Won't-do alignment | Tasks do not implement items marked as "Won't Do" in the spec |
    | 4 | Gap detection | Spec requirements explicitly mentioned but missing from plan |
    | 5 | Over-implementation | Tasks that go beyond spec scope without justification |

    ### Step 4: L3 — Execution Robustness

    | # | Check Item | Criterion |
    |---|-----------|-----------|
    | 1 | Risk declaration | Spec-level risks are acknowledged in plan; new risks introduced by the plan are surfaced |
    | 2 | Parallelization opportunity | Independent task slices identified (can be parallelized across sessions) |
    | 3 | Rollback safety | Each task leaves the system in a working state; no task depends on a future task to fix breakage |
    | 4 | Verification runnability | Every check step is a concrete shell command with expected output; no "manual check" or "verify it works" |
    | 5 | Knowledge persistence | Tasks that create new exports, architectural patterns, or conventions include a Knowledge Change entry |

    ## Output Format

    Produce exactly this structure:

    ```markdown
    # Plan Review: <plan filename>

    **Review time:** <timestamp>
    **Upstream spec:** <spec-design.md path>
    **Requirement baseline source:** <spec goals / conversation context>

    ## Overall Assessment

    | Layer | Items Checked | Passed | Issues |
    |-------|--------------|--------|--------|
    | L1 Structural | — | — | — |
    | L2 Coverage   | — | — | — |
    | L3 Robustness | — | — | — |

    **Conclusion:** ✓ Ready for review / ⚠ Suggestions but can proceed / ✗ Fix before review

    ## L1 Structural Completeness

    | # | Task | Background | Files | Steps | Checks | Knowledge | Result |
    |---|------|-----------|-------|-------|--------|-----------|--------|

    ## L2 Requirement Coverage

    | # | Spec Requirement | Covering Task(s) | Coverage | Notes |
    |---|-----------------|------------------|----------|-------|

    ## L3 Execution Robustness

    | # | Check Item | Result | Notes |
    |---|-----------|--------|-------|

    ## Fix Recommendations

    1. [Severity: Critical/Important/Suggestion] [Issue] → [Specific fix suggestion]
    ```

    ## Severity Levels

    - **Critical** — Plan will not achieve spec goal if not fixed before execution (blocker)
    - **Important** — Quality or maintainability degraded; should fix
    - **Suggestion** — Improvement opportunity; optional

    ## Post-Review Handoff

    Based on the conclusion:
    - **✓ Ready for review** → Plan passes self-check; proceed to present to user for approval
    - **⚠ Suggestions but can proceed** → Fix non-critical items if time permits, then present to user
    - **✗ Fix before review** → Revise plan and re-run check; do NOT present to user until critical issues resolved

    Never skip directly to code implementation after plan check. The next step is always user review.
```

## Red Flags

- Executing the review in the current session instead of dispatching an independent subagent
- Review report shows all ✓ with zero issues found (likely perfunctory review)
- Reviewing a non-existent or incomplete plan file
- Accepting plausible-sounding task lists without tracing each task back to a spec requirement
- Crediting vague steps ("implement auth") as sufficient
- Letting dimensions that pass anchor judgment — a plan can pass L1 and L2 but still fail L3

## Verification

After the subagent returns, confirm:

- [ ] Review executed by independent subagent (not current session)
- [ ] Plan document located and fully read
- [ ] Upstream spec context provided to subagent
- [ ] Three-layer checks (L1/L2/L3) all completed
- [ ] Review report includes specific task references and fix suggestions
- [ ] Critical issues (if any) resolved before presenting plan to user
