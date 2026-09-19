```md
## Engineering Workflow

Engineering work follows:

    Discuss → Planning → Implementation Gate → Implement → Verify

Read `.agents/workflow/engineering.md` for cross-stage orchestration, gates, Git/PR transitions, and return paths.

### Discuss

Stay in discussion while the request is exploratory, alternatives are still being compared, or material scope or direction remains unclear.

Do not create planning artifacts merely because the conversation is exploratory.

When the discussion is sufficiently resolved, determine the appropriate next step but do not leave Discuss automatically:

- if material product, scope, domain, architectural, interface, compatibility, risk, or other contract decisions still require formal resolution, prompt the user to enter Planning with `/planning`
- if the authoritative work is already sufficiently defined for implementation, prompt the user to authorize implementation with `/implement`
- if the user only wants understanding or further exploration, remain in Discuss

The user controls the transition out of Discuss.

### Implementation

Implementation requires both:

- implementation readiness
- explicit execution authorization

Readiness does not authorize code changes.

Approval, confirmation, or acceptance of planning artifacts does not by itself authorize implementation.

When implementation is explicitly authorized with `/implement` or an equivalent direct execution instruction, load the `implement` skill and follow the Implementation Gate in `engineering.md`.

### Verification

After implementation and Implementation Review are complete, load the `verify` skill.

Only successful final verification completes engineering work.

Return unresolved issues to the earliest stage that owns them.
```