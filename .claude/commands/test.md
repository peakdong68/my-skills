---
description: 运行测试驱动开发 (TDD) 工作流——编写失败测试、实现代码、验证。对于 Bug，使用“证明它” (Prove-It) 模式。
---

调用 my-agent-skills:test-driven-development 技能。

对于新功能：
1. 编写描述预期行为的测试（它们应当失败）
2. 实现代码以使测试通过
3. 在保持测试通过的情况下进行重构

对于 Bug 修复（“证明它”模式）：
1. 编写重现该 Bug 的测试（必须失败）
2. 确认测试失败
3. 实施修复
4. 确认测试通过
5. 运行完整测试套件以检查回归问题

对于浏览器相关问题，还需调用 my-agent-skills:browser-testing-with-devtools，以便通过 Chrome DevTools MCP 进行验证。

完成通过后，撰写测试验证报告——保存至`docs/spec/feature_<date>_<id>_<topic>/test.md`，并在继续之前与用户确认