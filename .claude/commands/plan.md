---
description: 将工作分解为带有验收标准和依赖顺序的小型可验证任务
---

调用 my-agent-skills:planning-and-task-breakdown 技能。

阅读现有规范（docs/specs/<filename>.md）以及相关代码库部分。然后：

1. 编写全面的实施计划——仅读取，不更改代码
2. 识别组件之间的依赖关系图
3. 垂直切分工作（每个任务包含一个完整路径，而非水平分层）
4. 编写带有验收标准和验证步骤的任务
5. 在各阶段之间添加检查点
6. 提交计划供人工审查

撰写任务计划文档，产物保存至：docs/plans/<feature-name>/plan.md，并将任务列表(task list)产物保存至：docs/plans/<feature-name>/todo.md。
注明：用户对任务计划产物保存位置的偏好设置将覆盖此默认值
