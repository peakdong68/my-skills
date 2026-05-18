---
description: 增量式实现下一个任务——构建、测试、验证、提交
---

同时调用 my-agent-skills:incremental-implementation  技能和 my-agent-skills:test-driven-development 技能，一次执行一个任务。使用my-agent-skills:context-engineering 技能在每一步加载正确的计划任务部分和源文件，而不是用整个计划任务淹没代理。

阅读计划，`docs/spec/feature_<date>_<id>_<topic>/plan.md`（多阶段则为 plan-<N>.md），提取的 checkbox 任务清单，创建 TodoWrite。

从计划中选取下一个待处理任务。对于每个任务：

1. 阅读计划任务文档的验收标准
2. 加载相关上下文（现有代码、模式、类型）
3. 为预期行为编写一个失败的测试（RED）
4. 实现通过测试所需的最少代码（GREEN）
5. 运行完整测试套件以检查是否有回归问题
6. 运行构建以验证编译
7. 使用描述性消息提交更改
8. **标记任务完成** — 将 plan.md 中对应任务 checkbox 从 `[ ]` 更新为 `[x]`，追加提交说明

如果任何步骤失败，请调用遵循 `debugging-and-error-recovery` 技能进行处理。

所有任务完成后，提示进入质量门禁阶段：
> "所有任务已完成。下一步：**/test** — 测试验证（编写失败测试、实现代码、验证），**/review** — 代码审查（正确性/可读性/架构/安全性/性能），然后 **/sdd-verify** — 工作流验收 （git 反推 + plan.md 验证）。审查通过后才可 /ship。" 
