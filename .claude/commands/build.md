---
description: 增量式实现下一个任务——构建、测试、验证、提交
---

同时调用 my-agent-skills:incremental-implementation 技能和 my-agent-skills:test-driven-development 技能。

从计划中选取下一个待处理任务。对于每个任务：

1. 阅读任务的验收标准
2. 加载相关上下文（现有代码、模式、类型）
3. 为预期行为编写一个失败的测试（RED）
4. 实现通过测试所需的最少代码（GREEN）
5. 运行完整测试套件以检查是否有回归问题
6. 运行构建以验证编译
7. 使用描述性消息提交更改
8. 标记任务为完成（todo任务列表(task list)产物文档），并继续下一个任务

如果任何步骤失败，请遵循 my-agent-skills:debugging-and-error-recovery 技能进行处理。