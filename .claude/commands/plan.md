---
description: 将工作分解为带有验收标准和依赖顺序的小型可验证任务
---

Invoke the agent-skills:planning-and-task-breakdown skill.

Read the existing spec (docs/specs/<filename>.md) and the relevant codebase sections. Then:

1. Enter plan mode — read only, no code changes
2. Identify the dependency graph between components
3. Slice work vertically (one complete path per task, not horizontal layers)
4. Write tasks with acceptance criteria and verification steps
5. Add checkpoints between phases
6. Present the plan for human review

Save the plan to: docs/plans/<feature-name>/plan.md and task list to: docs/plans/<feature-name>/todo.md.
(User preferences for plan location override this default)
