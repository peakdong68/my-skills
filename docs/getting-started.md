# agent-skills 入门指南

agent-skills 可与任何接受 Markdown 指令的 AI 编程智能体配合使用。本指南介绍通用方法。如需特定工具的设置说明，请参阅专门的指南。

## 技能的工作原理

每个技能都是一个 Markdown 文件（`SKILL.md`），用于描述一个特定的工程工作流。当加载到智能体的上下文中时，智能体会遵循该工作流——包括验证步骤、需要避免的反模式以及退出条件。

**技能不是参考文档。** 它们是智能体遵循的分步流程。

## 快速入门（任意智能体）

### 1. 克隆仓库

```bash
git clone https://github.com/peakdong68/my-agent-skills.git
```

### 2. 选择一个技能

浏览 `skills/` 目录。每个子目录都包含一个 `SKILL.md`，其中包含：

- **何时使用** — 表明该技能适用的触发条件
- **流程** — 分步工作流
- **验证** — 如何确认工作已完成
- **常见借口** — 智能体可能用来跳过步骤的托词
- **危险信号** — 技能被违反的迹象

### 3. 将技能加载到你的智能体中

将相关 `SKILL.md` 的内容复制到你的智能体的系统提示、规则文件或对话中。最常见的做法：

**系统提示：** 在会话开始时粘贴技能内容。

**规则文件：** 将技能内容添加到项目的规则文件中（CLAUDE.md、.cursorrules 等）。

**对话：** 在给出指令时引用技能：“针对此更改，遵循 test-driven-development 流程。”

### 4. 使用元技能进行发现

从加载 `using-agent-skills` 技能开始。它包含一个流程图，可将任务类型映射到相应的技能。

## 推荐设置

### 最小化设置（从这里开始）

将三个基本技能加载到你的规则文件中：

1. **spec-driven-development** — 用于定义要构建的内容
2. **test-driven-development** — 用于证明构建的内容能正常工作
3. **code-review-and-quality** — 用于在合并之前验证质量

这三个技能覆盖了 AI 辅助开发中最关键的质量缺口。

### 全生命周期

为了全面覆盖，可以按阶段加载技能：

```
启动项目时：  spec-driven-development → planning-and-task-breakdown
开发期间：    incremental-implementation + test-driven-development
合并前：      code-review-and-quality + security-and-hardening
部署前：      shipping-and-launch
```

### 感知上下文的加载

不要一次性加载所有技能——这会浪费上下文。应加载与当前任务相关的技能：

- 做 UI 开发？加载 `frontend-ui-engineering`
- 做调试？加载 `debugging-and-error-recovery`
- 配置 CI？加载 `ci-cd-and-automation`

## 技能的构成

每个技能都遵循相同的结构：

```
YAML frontmatter（name、description）
├── 概述 — 此技能的功能
├── 何时使用 — 触发条件和场景
├── 核心流程 — 分步工作流
├── 示例 — 代码示例和模式
├── 常见借口 — 托词和反驳
├── 危险信号 — 技能被违反的迹象
└── 验证 — 退出条件检查清单
```

请参阅 [skill-anatomy.md](skill-anatomy.md) 获取完整规范。

## 使用智能体

`agents/` 目录包含预配置的智能体角色：

| 智能体                | 用途           |
| --------------------- | -------------- |
| `code-reviewer.md`    | 五维度代码审查 |
| `test-engineer.md`    | 测试策略与编写 |
| `security-auditor.md` | 漏洞检测       |

当你需要专业审查时，加载一个智能体定义。例如，让你的编程智能体“使用 code-reviewer 智能体角色审查此更改”，并提供该智能体定义。

## 使用命令

`.claude/commands/` 目录包含用于 Claude Code 的斜杠命令：

| 命令      | 调用的技能                                           |
| --------- | ---------------------------------------------------- |
| `/spec`   | spec-driven-development                              |
| `/plan`   | planning-and-task-breakdown                          |
| `/build`  | incremental-implementation + test-driven-development |
| `/test`   | test-driven-development                              |
| `/review` | code-review-and-quality                              |
| `/ship`   | shipping-and-launch                                  |

## 使用参考资料

`references/` 目录包含补充性的检查清单：

| 参考资料                     | 搭配使用                 |
| ---------------------------- | ------------------------ |
| `testing-patterns.md`        | test-driven-development  |
| `performance-checklist.md`   | performance-optimization |
| `security-checklist.md`      | security-and-hardening   |
| `accessibility-checklist.md` | frontend-ui-engineering  |

当你需要技能未涵盖的详细模式时，加载一份参考资料。

## Spec 和任务产出物

`/spec` 和 `/plan` 命令会创建工作产出物（`SPEC.md`、`tasks/plan.md`、`tasks/todo.md`）。在开发过程中，将它们视为**动态文档**：

- 在开发期间将它们放入版本控制中，这样开发者和智能体就有了一个共享的事实来源。
- 当范围或决策发生变化时更新它们。
- 如果你的仓库不希望长期保留这些文件，请在合并前删除它们，或者将该文件夹添加到 `.gitignore` 中——该工作流不要求这些文件是永久性的。

## 提示

1. **对于任何非简单的工作，从 spec-driven-development 开始**
2. **编写代码时始终加载 test-driven-development**
3. **不要跳过验证步骤** — 这是关键所在
4. **有选择地加载技能** — 上下文并非越多越好
5. **使用智能体进行审查** — 不同视角能发现不同问题
