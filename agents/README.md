# 智能体角色

扮演单一角色、持有单一视角的专业角色定义。每个角色都是一个 Markdown 文件，作为系统提示词被你的运行框架（Claude Code、Cursor、Copilot 等）使用。

| 角色                                    | 职能           | 最适用场景                          |
| --------------------------------------- | -------------- | ----------------------------------- |
| [code-reviewer](code-reviewer.md)       | 高级资深工程师 | 合并前的五轴审查                    |
| [security-auditor](security-auditor.md) | 安全工程师     | 漏洞检测、OWASP 风格审计            |
| [test-engineer](test-engineer.md)       | 质量保证工程师 | 测试策略、覆盖率分析、Prove-It 模式 |

## 角色如何与技能和命令关联

三个层级，各有明确的职责：

| 层级     | 是什么                       | 示例                      | 组合角色                         |
| -------- | ---------------------------- | ------------------------- | -------------------------------- |
| **技能** | 包含步骤和退出条件的工作流   | `code-review-and-quality` | _如何做_——在角色或命令内部调用   |
| **角色** | 持有特定视角和输出格式的角色 | `code-reviewer`           | _谁来做_——采纳特定观点，产出报告 |
| **命令** | 面向用户的入口点             | `/review`、`/ship`        | _何时做_——组合角色和技能         |

用户（或斜杠命令）是编排者。**角色不调用其他角色。** 技能是角色工作流内的必经环节。

## 何时使用每种方式

### 直接调用角色

当你需要针对当前变更的单一视角，且用户在流程内时，选择此方式。

- “审查此 PR” → 直接调用 `code-reviewer`
- “`auth.ts` 中有安全问题吗？” → 直接调用 `security-auditor`
- “结账流程缺少哪些测试？” → 直接调用 `test-engineer`

### 斜杠命令（背后是单一角色）

当你有一个可重复的工作流，否则每次都需要重新解释时，选择此方式。

- `/review` → 使用项目的审查技能封装 `code-reviewer`
- `/test` → 使用 TDD 技能封装 `test-engineer`

### 斜杠命令（编排者——扇出模式）

仅当**独立**的调查可以并行运行，并产出报告，再由单一智能体合并时，选择此方式。

- `/ship` → 并行扇出至 `code-reviewer` + `security-auditor` + `test-engineer`，然后综合他们的报告，给出 go/no-go 决策

这是本仓库唯一认可的编排模式。完整模式目录与反模式请参见 [references/orchestration-patterns.md](../references/orchestration-patterns.md)。

## 决策矩阵

```
工作是针对单一产物的单一视角吗？
├── 是 → 直接调用角色
└── 否 → 子任务是否独立（无共享可变状态，无顺序要求）？
         ├── 是 → 采用并行扇出的斜杠命令（例如 /ship）
         └── 否 → 由用户运行的顺序斜杠命令（/spec → /planning → /build → /test → /review）
```

## 有效编排示例

`/ship` 是本仓库中典型的扇出编排器：

```
/ship
  ├── （并行）code-reviewer    → 审查报告
  ├── （并行）security-auditor → 审计报告
  └── （并行）test-engineer    → 覆盖率报告
                  ↓
        合并阶段（主智能体）
                  ↓
        go/no-go 决策 + 回滚计划
```

为何有效：

- 每个子智能体处理同一 diff，但产出**不同的视角**
- 它们之间没有依赖关系 → 真正的并行，切实节省挂钟时间
- 每个子智能体在全新的上下文窗口中运行 → 主会话保持整洁
- 合并步骤工作量小且需要完整上下文，因此留在主智能体中

## 无效编排示例（不要构建此模式）

一个 `meta-orchestrator` 角色，其职责是“决定调用哪个其他角色”：

```
/work-on-pr → meta-orchestrator
                  ↓ （决定“这需要审查”）
              code-reviewer
                  ↓ （返回）
              meta-orchestrator （转述结果）
                  ↓
              用户
```

为何失败：

- 纯粹的路由层，没有领域价值
- 增加了两次转述环节 → 信息丢失 + 两倍的 token 消耗
- 用户已经知道自己想要审查；让他们直接调用 `/review` 即可
- 复制了斜杠命令和 `AGENTS.md` 意图映射已经完成的工作

## 角色规则

1. 一个角色是单一角色、单一输出格式。如果你发现自己在添加第二个角色，请创建第二个角色文件。
2. **角色不调用其他角色。** 组合是斜杠命令或用户的职责。在 Claude Code 上，这也是一个硬性平台约束——_“子智能体(subagents)不能启动其他子智能体(subagents)”_——因此此规则已被强制实施。
3. 角色可以调用技能（_如何做_）。
4. 每个角色文件末尾都有一个“组合(Composition)”块，说明其适用场景。

## Claude Code 互操作

本仓库中的角色设计为无需修改即可作为 Claude Code 子智能体(subagents)和 Agent Teams 团队成员使用：

- **作为子智能体(subagents)：** 启用此插件后自动发现（无需路径配置）。使用 Agent 工具时指定 `subagent_type: code-reviewer`（或 `security-auditor`、`test-engineer`）。`/ship` 是典型示例。
- **作为 Agent Teams 团队成员**（实验性，需要 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`）：启动团队成员时引用相同的角色名称。角色正文将**追加到**团队成员的系统提示词中作为附加指令（而非替换），因此你的角色文本将放置在主控安装的团队协调指令之上（SendMessage、task-list 工具等）。

子智能体(subagents)仅将结果报告给主智能体。Agent Teams 允许团队成员互相直接通信。当报告已足够时，使用子智能体(subagents)；当子智能体(subagents)需要互相质疑对方发现时（例如竞争假设调试），使用 Agent Teams。完整映射请参见 [references/orchestration-patterns.md](../references/orchestration-patterns.md)。

插件智能体不支持 `hooks`、`mcpServers` 或 `permissionMode` 前置信息——这些字段会被静默忽略。在此处编写新角色时避免依赖它们。

## 添加新角色

1. 创建 `agents/<role>.md`，采用与现有角色相同的前置信息格式。
2. 定义角色、范围、输出格式和规则。
3. 在底部添加**组合(Composition)**块（何时直接调用 / 何时通过命令调用 / 不要从其他角色内调用）。
4. 将角色添加到本文件顶部的表格中。
5. 如果该角色启用了新的编排模式，请在 `references/orchestration-patterns.md` 中记录该模式，而不是在角色文件中自行发明模式。
