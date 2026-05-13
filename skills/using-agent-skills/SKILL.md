---
name: using-agent-skills
description: 发现并调用智能体技能。在开始会话或需要确定哪项技能适用于当前任务时使用。这是管理所有其他技能的发现和调用的元技能。
---

<SUBAGENT-STOP>
如果你是被派遣作为子代理（subagent）来执行特定任务的，请跳过此技能。
</SUBAGENT-STOP>

## 指令优先级

my-agent-skillswers 技能会覆盖默认的系统提示词行为，但**用户指令始终具有最高优先级**：

1. **用户的明确指令**（CLAUDE.md、GEMINI.md、AGENTS.md、直接请求）——最高优先级
2. **my-agent-skills 技能**——在与默认系统行为冲突时进行覆盖
3. **默认系统提示词**——最低优先级

如果 CLAUDE.md、GEMINI.md 或 AGENTS.md 指出“不要使用 TDD”，而某项技能要求“始终使用 TDD”，请遵循用户的指令。用户拥有控制权。

## 如何访问技能

**在 Claude Code 中：** 使用 `Skill` 工具。当你调用一项技能时，其内容会被加载并呈现给你——请直接遵循它。切勿对技能文件使用 Read 工具，按需激活完整内容。

**在其他环境中：** 请查阅你所在平台的文档，了解如何加载技能。

## 技能发现

当任务到达时，识别开发阶段并应用相应的技能：

```
任务到达
    │
    ├── 想法模糊/需要细化？ ──→ idea-refine（想法细化）
    ├── 新项目/功能/变更？ ──→ spec-driven-development（规范驱动开发）
    ├── 已有规范，需要任务？ ──────→ planning-and-task-breakdown（规划与任务分解）
    ├── 正在实现代码？ ────────────→ incremental-implementation（增量实现）
    │   ├── UI 工作？ ─────────────────→ frontend-ui-engineering（前端 UI 工程）
    │   ├── API 工作？ ────────────────→ api-and-interface-design（API 与接口设计）
    │   ├── 需要更好的上下文？ ─────→ context-engineering（上下文工程）
    │   └── 需要文档验证的代码？ ───→ source-driven-development（源码驱动开发）
    ├── 编写/运行测试？ ────────→ test-driven-development（测试驱动开发）
    │   └── 基于浏览器？ ───────────→ browser-testing-with-devtools（使用 DevTools 进行浏览器测试）
    ├── 出问题了？ ──────────────→ debugging-and-error-recovery（调试与错误恢复）
    ├── 审查代码？ ───────────────→ code-review-and-quality（代码审查与质量）
    │   ├── 安全问题？ ───────→ security-and-hardening（安全与加固）
    │   └── 性能问题？ ────→ performance-optimization（性能优化）
    ├── 审查后收口验证？ ─────────→ workflow-verification（工作流收口验证）（用户斜杠命令调用 /sdd-verify）
    ├── 提交/分支操作？ ─────────→ git-workflow-and-versioning（Git 工作流与版本控制）★ 内部触发——由其他技能在涉及 git 操作时自动调用
    ├── CI/CD 流水线工作？ ──────────→ ci-cd-and-automation（CI/CD 与自动化）
    ├── 编写文档/ADR？ ───────────→ documentation-and-adrs（文档与架构决策记录）
    └── 部署/发布？ ─────────→ shipping-and-launch（交付与发布）
```

## 核心操作行为

这些行为适用于所有技能，且始终有效。它们是不可协商的。

### 1. 阐明假设

在实施任何非琐碎内容之前，明确陈述你的假设：

```
我所做的假设：
1. [关于需求的假设]
2. [关于架构的假设]
3. [关于范围的假设]
→ 如有误请立即纠正，否则我将按此继续。
```

不要默默填补模糊的需求。最常见的失败模式是做出错误的假设并在未经检查的情况下继续执行。尽早暴露不确定性——这比重做成本低得多。

### 2. 主动管理困惑

当你遇到不一致、冲突的需求或不清晰的规范说明时：

1. **停止。** 不要凭猜测继续。
2. 明确指出具体的困惑点。
3. 提出权衡方案或提出澄清性问题。
4. 在继续之前等待问题解决。

**错误做法：** 默默选择一种解释并希望它是正确的。
**正确做法：** “我在规范中看到 X，但在现有代码中看到 Y。以哪个为准？”

### 3. 必要时提出异议

你不是一个只会说“是”的机器。当某种方法存在明显问题时：

- 直接指出问题
- 解释具体的负面影响（尽可能量化——例如“这会增加约 200ms 的延迟”，而不是“这可能会更慢”）
- 提出替代方案
- 如果用户在充分了解情况后坚持原决定，则接受该决定

阿谀奉承是一种失败模式。说着“当然！”然后实施一个糟糕的想法对任何人都没有帮助。诚实的技术分歧比虚假的一致更有价值。

### 4. 强制保持简洁

你天生倾向于过度复杂化。要积极抵制这种倾向。

在完成任何实现之前，问自己：

- 能否用更少的代码行完成？
- 这些抽象是否值得其带来的复杂性？
- 资深工程师看到这段代码是否会说“你为什么不直接……”？

如果你写了 1000 行代码而实际上 100 行就足够了，那你就是失败了。优先选择平淡、显而易见的解决方案。小聪明代价高昂。

### 5. 保持范围纪律

只修改被要求修改的内容。

禁止：

- 删除你不理解的注释
- “清理”与任务无关的代码
- 作为副作用重构相邻系统
- 未经明确批准删除看似未使用的代码
- 添加规范中未包含但“似乎有用”的功能

你的工作是手术般的精准，而不是未经请求的翻新。

### 6. 验证，而非假设

每项技能都包含一个验证步骤。只有验证通过，任务才算完成。“看起来没问题”永远不够——必须有证据（通过的测试、构建输出、运行时数据）。

## 要避免的失败模式

这些是看似提高生产力实则制造问题的细微错误：

1. 未经检查就做出错误假设
2. 不管理自己的困惑——在迷失方向时仍盲目推进
3. 不暴露你注意到的不一致之处
4. 在不明显的决策上不呈现权衡分析
5. 对存在明显问题的方法阿谀奉承（“当然！”）
6. 过度复杂化代码和 API
7. 修改与任务无关的代码或注释
8. 删除你不完全理解的内容
9. 因为没有规范说明就凭“显而易见”进行构建
10. 因为“看起来正确”而跳过验证

## 技能规则

1. **在开始工作前检查是否有适用的技能。** 技能编码了防止常见错误的流程。

2. **技能是工作流，而非建议。** 按顺序执行步骤。不要跳过验证步骤。

3. **多项技能可能同时适用。** 功能实现可能依次涉及 `idea-refine` → `spec-driven-development` → `planning-and-task-breakdown` → `incremental-implementation` → `test-driven-development` → `code-review-and-quality` → `workflow-verification` → `shipping-and-launch`。

4. **如有疑问，先从规范开始。** 如果任务非琐碎且没有规范说明，请从 `spec-driven-development` 开始。

## 完整的开发生命周期技能序列

此元技能帮助你发现并为当前任务应用正确的技能。并提示用户当前已完成的工作以及建议下一步工作（用户斜杠命令调用还是技能）。

```
定义阶段
  1. idea-refine                  → 细化模糊想法
  2. spec-driven-development      → 写结构化规格文档（用户斜杠命令调用 /spec）

规划阶段
  3. planning-and-task-breakdown  → 拆成可验证的小任务（用户斜杠命令调用 /planning）

构建阶段
  4. context-engineering          → 加载正确的上下文
  5. source-driven-development    → 对照官方文档验证
  6. incremental-implementation   → 逐片增量构建（用户斜杠命令调用 /build）
      ├── UI 工作 → frontend-ui-engineering
      └── API 工作 → api-and-interface-design

验证阶段
  7. test-driven-development      → 证明每片能工作（用户斜杠命令调用 /test）
      └── 浏览器相关 → browser-testing-with-devtools
  8. debugging-and-error-recovery → 出问题时：复现→定位→修复→防护

审查阶段
  9. code-review-and-quality      → 合并前五轴审查（用户斜杠命令调用 /review）
      ├── 安全问题 → security-and-hardening
      ├── 性能问题 → performance-optimization
      └── 代码简化 → code-simplification（用户斜杠命令调用 /code-simplify）

收口阶段
  10. workflow-verification       → 审查后验收任务清单、检查计划验证点、从 git log 反推完成状态、重写 plan.md（用户斜杠命令调用 /verify）

交付阶段
  11. git-workflow-and-versioning  → 原子提交、干净历史 ★ 由其他技能在 git 操作点内部调用
  12. ci-cd-and-automation         → 自动化质量门
  13. deprecation-and-migration    → 安全移除旧系统/API/功能
  14. documentation-and-adrs       → 记录决策，不只是做了什么
  15. shipping-and-launch          → 并行审查 + 发布清单（用户斜杠命令调用 /ship）
```

归档阶段 16. /archive → 将已完成功能目录归档至 docs/spec/archive/，更新全局 Spec 索引并提交（用户斜杠命令调用 /archive）

并非每个任务都需要所有技能。错误修复可能只需要：`debugging-and-error-recovery` → `test-driven-development` → `code-review-and-quality`。

## 快速参考

| 阶段 | 技能                          | 一行总结                                |
| ---- | ----------------------------- | --------------------------------------- |
| 定义 | idea-refine                   | 通过结构化的发散和收敛思维细化想法      |
| 定义 | spec-driven-development       | 先确定需求和验收标准，再写代码          |
| 规划 | planning-and-task-breakdown   | 分解为小型、可验证的任务                |
| 构建 | incremental-implementation    | 薄垂直切片，扩展前测试每个切片          |
| 构建 | source-driven-development     | 实现前根据官方文档验证                  |
| 构建 | context-engineering           | 在正确的时间提供正确的上下文            |
| 构建 | frontend-ui-engineering       | 具备无障碍性的生产级 UI                 |
| 构建 | api-and-interface-design      | 具有清晰契约的稳定接口                  |
| 验证 | test-driven-development       | 先写失败测试，再使其通过                |
| 验证 | browser-testing-with-devtools | 使用 Chrome DevTools MCP 进行运行时验证 |
| 验证 | debugging-and-error-recovery  | 复现 → 定位 → 修复 → 防护               |
| 审查 | code-review-and-quality       | 五轴审查与质量门禁                      |
| 审查 | security-and-hardening        | OWASP 预防、输入验证、最小权限原则      |
| 审查 | performance-optimization      | 先测量，仅优化关键部分                  |
| 收口 | workflow-verification         | git log 反推任务完成状态，重写计划产物  |
| 交付 | git-workflow-and-versioning   | 原子提交，干净历史 ★ 内部触发           |
| 交付 | ci-cd-and-automation          | 每次变更自动执行质量门禁                |
| 交付 | documentation-and-adrs        | 记录”为什么”，而不仅是”是什么”          |
| 交付 | shipping-and-launch           | 发布前检查清单、监控、回滚计划          |
| 归档 | /archive                      | 归档已完成功能目录，更新全局索引并提交  |
