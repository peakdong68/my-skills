# Agent Skills

**面向 AI 编程代理的生产级工程技能。**

Skills（技能）编码了资深工程师在构建软件时所使用的工流程、质量门禁和最佳实践。这些技能经过封装，确保 AI 代理在开发的每个阶段都能一致地遵循它们。

```
  DEFINE          PLAN           BUILD          VERIFY         REVIEW        VERIFY          SHIP
 ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐
 │ Idea │ ───▶ │ Spec │ ───▶ │ Code │ ───▶ │ Test │ ───▶ │  QA  │ ───▶ │Audit │ ───▶ │  Go  │
 │Refine│      │  PRD │      │ Impl │      │Debug │      │ Gate │      │Plan  │      │ Live │
 └──────┘      └──────┘      └──────┘      └──────┘      └──────┘      └──────┘      └──────┘
  /spec          /plan          /build        /test         /review       /sdd-verify    /ship          /archive
```

---

## 命令

9 个斜杠命令映射到开发生命周期。每个命令都会自动激活相应的技能。

| 你在做什么     | 命令             | 核心原则           |
| -------------- | ---------------- | ------------------ |
| 定义构建内容   | `/spec`          | 规范先行，代码在后 |
| 规划构建方式   | `/plan`          | 小而原子的任务     |
| 增量构建       | `/build`         | 一次一个切片       |
| 证明其有效性   | `/test`          | 测试即证明         |
| 合并前审查     | `/review`        | 提升代码健康度     |
| 简化代码       | `/code-simplify` | 清晰胜于巧技       |
| 审查后验收     | `/sdd-verify`    | 反推验证，产物同步 |
| 发布到生产环境 | `/ship`          | 越快越安全         |
| 归档已完成功能 | `/archive`       | 移动目录，更新索引  |

Skills 也会根据你所做的操作自动激活——设计 API 会触发 `api-and-interface-design`，构建 UI 会触发 `frontend-ui-engineering`，依此类推。

---

## 快速开始

<details>
<summary><b>Claude Code（推荐）</b></summary>

**通过市场安装：**

```
/plugin marketplace add peakdong68/my-agent-skills

/plugin install my-agent-skills@peak-agent-skills
```

> **遇到 SSH 错误？** 市场通过 SSH 克隆仓库。如果你没有在 GitHub 上设置 SSH 密钥，请[添加你的 SSH 密钥](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)，或者仅针对获取操作切换到 HTTPS：
>
> ```bash
> git config --global url."https://github.com/".insteadOf "git@github.com:"
> ```

**本地/开发模式：**

```bash

git clone https://github.com/peakdong68/my-agent-skills.git

claude --plugin-dir /path/to/my-agent-skills

```

</details>

<details>
<summary><b>Cursor</b></summary>

将任何 `SKILL.md` 复制到 `.cursor/rules/` 中，或引用完整的 `skills/` 目录。参见 [docs/cursor-setup.md](docs/cursor-setup.md)。

</details>

<details>
<summary><b>Gemini CLI</b></summary>

作为原生技能安装以实现自动发现，或添加到 `GEMINI.md` 中以保持上下文持久化。参见 [docs/gemini-cli-setup.md](docs/gemini-cli-setup.md)。

**从仓库安装：**

```bash

gemini skills install https://github.com/peakdong68/my-agent-skills.git --path skills

```

**从本地克隆安装：**

```bash
gemini skills install ./my-agent-skills/skills/
```

</details>

<details>
<summary><b>Windsurf</b></summary>

将技能内容添加到你的 Windsurf 规则配置中。参见 [docs/windsurf-setup.md](docs/windsurf-setup.md)。

</details>

<details>
<summary><b>OpenCode</b></summary>

通过 AGENTS.md 和 `skill` 工具使用由代理驱动的技能执行。

参见 [docs/opencode-setup.md](docs/opencode-setup.md)。

</details>

<details>
<summary><b>GitHub Copilot</b></summary>

使用 `agents/` 中的代理定义作为 Copilot 角色，并将技能内容放入 `.github/copilot-instructions.md` 中。参见 [docs/copilot-setup.md](docs/copilot-setup.md)。

</details>

<details>
  <summary><b>Kiro IDE & CLI </b></summary>
  Kiro 的技能位于 ".kiro/skills/" 下，可以存储在项目级或全局级。Kiro 也支持 Agents.md。请参阅 Kiro 文档：https://kiro.dev/docs/skills/
</details>

<details>
<summary><b>Codex / 其他代理</b></summary>

Skills 是纯 Markdown 格式——它们适用于任何接受系统提示或指令文件的代理。参见 [docs/getting-started.md](docs/getting-started.md)。

</details>

---

## 全部 21 项技能

上述命令是入口点。在底层，它们激活这 21 项技能——每一项都是包含步骤、验证门禁和反合理化表格的结构化工作流。你也可以直接引用任何技能。

### Define - 明确构建内容

| 技能                                                               | 作用                                                                                   | 使用时机                     |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ---------------------------- |
| [idea-refine](skills/idea-refine/SKILL.md)                         | 结构化的发散/收敛思维，将模糊的想法转化为具体的提案                                    | 你有一个需要探索的粗略概念时 |
| [spec-driven-development](skills/spec-driven-development/SKILL.md) | 在编写任何代码之前，撰写涵盖目标、命令、结构、代码风格、测试和边界的产品需求文档 (PRD) | 启动新项目、功能或重大变更时 |

### Plan - 分解任务

| 技能                                                                       | 作用                                                 | 使用时机                       |
| -------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------ |
| [planning-and-task-breakdown](skills/planning-and-task-breakdown/SKILL.md) | 将规范分解为带有验收标准和依赖顺序的小型、可验证任务 | 你拥有规范并需要可实施的单元时 |

### Build - 编写代码

| 技能                                                                     | 作用                                                                                | 使用时机                                         |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------ |
| [incremental-implementation](skills/incremental-implementation/SKILL.md) | 薄垂直切片 - 实施、测试、验证、提交。使用功能标志、安全默认值、易于回滚的变更       | 任何涉及多个文件的变更                           |
| [test-driven-development](skills/test-driven-development/SKILL.md)       | 红-绿-重构，测试金字塔 (80/15/5)，测试规模，DAMP 优于 DRY，Beyonce 规则，浏览器测试 | 实施逻辑、修复错误或更改行为时                   |
| [context-engineering](skills/context-engineering/SKILL.md)               | 在正确的时间向代理提供正确的信息 - 规则文件、上下文打包、MCP 集成                   | 开始会话、切换任务或输出质量下降时               |
| [source-driven-development](skills/source-driven-development/SKILL.md)   | 将每个框架决策建立在官方文档基础上 - 验证、引用来源、标记未验证内容                 | 你希望获得任何框架或库的权威、带来源引用的代码时 |
| [frontend-ui-engineering](skills/frontend-ui-engineering/SKILL.md)       | 组件架构、设计系统、状态管理、响应式设计、WCAG 2.1 AA 无障碍标准                    | 构建或修改面向用户的界面时                       |
| [api-and-interface-design](skills/api-and-interface-design/SKILL.md)     | 契约优先设计、Hyrum 定律、单一版本规则、错误语义、边界验证                          | 设计 API、模块边界或公共接口时                   |

### Verify - 证明其有效性

| 技能                                                                           | 作用                                                                                  | 使用时机                             |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------ |
| [browser-testing-with-devtools](skills/browser-testing-with-devtools/SKILL.md) | Chrome DevTools MCP 用于获取实时运行时数据 - DOM 检查、控制台日志、网络追踪、性能分析 | 构建或调试任何在浏览器中运行的内容时 |
| [debugging-and-error-recovery](skills/debugging-and-error-recovery/SKILL.md)   | 五步分诊：复现、定位、简化、修复、防护。停线规则、安全回退                            | 测试失败、构建中断或行为不符合预期时 |

### Review - 合并前的质量门禁

| 技能                                                                 | 作用                                                                                | 使用时机                                     |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------- |
| [code-review-and-quality](skills/code-review-and-quality/SKILL.md)   | 五轴审查、变更规模 (~100 行)、严重性标签 (Nit/Optional/FYI)、审查速度规范、拆分策略 | 合并任何变更之前                             |
| [code-simplification](skills/code-simplification/SKILL.md)           | 切斯特顿的栅栏原则、500 行规则、在保留确切行为的同时降低复杂度                      | 代码能运行，但可读性或可维护性低于应有水平时 |
| [security-and-hardening](skills/security-and-hardening/SKILL.md)     | OWASP Top 10 预防、认证模式、密钥管理、依赖审计、三层边界系统                       | 处理用户输入、认证、数据存储或外部集成时     |
| [performance-optimization](skills/performance-optimization/SKILL.md) | 测量优先方法 - Core Web Vitals 目标、分析工作流、包分析、反模式检测                 | 存在性能要求或你怀疑有回归时                 |
| [workflow-verification](skills/workflow-verification/SKILL.md)       | 从 git log 反推任务完成状态、与计划验证点比对、重写 tplan.md、产出验证报告 | 审查完成后、发布前，作为工作流收口步骤         |

### Ship - 自信部署

| 技能                                                                       | 作用                                                                 | 使用时机                            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------- |
| [git-workflow-and-versioning](skills/git-workflow-and-versioning/SKILL.md) | 基于主干的开发、原子提交、变更规模 (~100 行)、将提交作为保存点的模式 | 进行任何代码变更时（始终适用）      |
| [ci-cd-and-automation](skills/ci-cd-and-automation/SKILL.md)               | 左移、越快越安全、功能标志、质量门禁流水线、失败反馈循环             | 设置或修改构建和部署流水线时        |
| [deprecation-and-migration](skills/deprecation-and-migration/SKILL.md)     | 代码即负债思维、强制性与建议性弃用、迁移模式、僵尸代码移除           | 移除旧系统、迁移用户或下线功能时    |
| [documentation-and-adrs](skills/documentation-and-adrs/SKILL.md)           | 架构决策记录 (ADR)、API 文档、内联文档标准 - 记录*原因*              | 做出架构决策、更改 API 或发布功能时 |
| [shipping-and-launch](skills/shipping-and-launch/SKILL.md)                 | 发布前检查清单、功能标志生命周期、分期发布、回滚程序、监控设置       | 准备部署到生产环境时                |

---

## 代理角色

预配置的专业角色，用于针对性审查：

| 代理                                           | 角色           | 视角                                               |
| ---------------------------------------------- | -------------- | -------------------------------------------------- |
| [code-reviewer](agents/code-reviewer.md)       | 资深主任工程师 | 五轴代码审查，标准为“主任工程师是否会批准此代码？” |
| [test-engineer](agents/test-engineer.md)       | QA 专家        | 测试策略、覆盖率分析和“证明它”模式                 |
| [security-auditor](agents/security-auditor.md) | 安全工程师     | 漏洞检测、威胁建模、OWASP 评估                     |

---

## 参考检查清单

技能在需要时调用的快速参考材料：

| 参考                                                                | 涵盖内容                                             |
| ------------------------------------------------------------------- | ---------------------------------------------------- |
| [testing-patterns.md](references/testing-patterns.md)               | 测试结构、命名、模拟、React/API/E2E 示例、反模式     |
| [security-checklist.md](references/security-checklist.md)           | 提交前检查、认证、输入验证、头部、CORS、OWASP Top 10 |
| [performance-checklist.md](references/performance-checklist.md)     | Core Web Vitals 目标、前端/后端检查清单、测量命令    |
| [accessibility-checklist.md](references/accessibility-checklist.md) | 键盘导航、屏幕阅读器、视觉设计、ARIA、测试工具       |

---

## 技能工作原理

每项技能都遵循一致的结构：

```
┌─────────────────────────────────────────────────┐
│  SKILL.md                                       │
│                                                 │
│  ┌─ Frontmatter ─────────────────────────────┐  │
│  │ name: lowercase-hyphen-name               │  │
│  │ description: Guides agents through [task].│  │
│  │              Use when…                    │  │
│  └───────────────────────────────────────────┘  │
│  Overview         → 此技能的作用                │
│  When to Use      → 触发条件                   │
│  Process          → 逐步工作流                  │
│  Rationalizations → 借口 + 反驳                 │
│  Red Flags        → 问题迹象                    │
│  Verification     → 证据要求                    │
└─────────────────────────────────────────────────┘
```

**关键设计选择：**

- **是流程，而非散文。** 技能是代理遵循的工作流，而非供其阅读的参考文档。每项技能都有步骤、检查点和退出标准。
- **反合理化。** 每项技能都包含一个表格，列出代理用来跳过步骤的常见借口（例如，“我稍后会添加测试”），并提供有据可查的反驳论点。
- **验证不可妥协。** 每项技能都以证据要求结束——测试通过、构建输出、运行时数据。“看起来没问题”永远不够。
- **渐进式披露。** `SKILL.md` 是入口点。支持性参考文献仅在需要时加载，以最小化 token 使用量。

---

## 项目结构

```
agent-skills/
├── skills/                            # 21 项核心技能（每个目录一个 SKILL.md）
│   ├── idea-refine/                   #   Define
│   ├── spec-driven-development/       #   Define
│   ├── planning-and-task-breakdown/   #   Plan
│   ├── incremental-implementation/    #   Build
│   ├── context-engineering/           #   Build
│   ├── source-driven-development/     #   Build
│   ├── frontend-ui-engineering/       #   Build
│   ├── test-driven-development/       #   Build
│   ├── api-and-interface-design/      #   Build
│   ├── browser-testing-with-devtools/ #   Verify
│   ├── debugging-and-error-recovery/  #   Verify
│   ├── code-review-and-quality/       #   Review
│   ├── code-simplification/          #   Review
│   ├── security-and-hardening/        #   Review
│   ├── performance-optimization/      #   Review
│   ├── workflow-verification/         #   Review (收口)
│   ├── git-workflow-and-versioning/   #   Ship
│   ├── ci-cd-and-automation/          #   Ship
│   ├── deprecation-and-migration/     #   Ship
│   ├── documentation-and-adrs/        #   Ship
│   ├── shipping-and-launch/           #   Ship
│   └── using-agent-skills/            #   Meta: 如何使用此包
├── agents/                            # 3 个专业角色
├── references/                        # 4 份补充检查清单
├── hooks/                             # 会话生命周期钩子
├── .claude/commands/                  # 9 个斜杠命令
└── docs/                              # 各工具的设置指南
```

---

## 为什么需要 Agent Skills？

AI 编程代理默认倾向于最短路径——这通常意味着跳过规范、测试、安全审查以及使软件可靠的那些实践。Agent Skills 为代理提供了结构化的工作流，强制执行资深工程师在生产代码中带来的同等纪律。

每项技能都编码了来之不易的工程判断：*何时*编写规范、_测试什么_、*如何*审查以及*何时*发布。这些不是通用的提示——它们是那种观点鲜明、流程驱动的工作流，区分了生产级工作和原型级工作。

Skills 融入了来自 Google 工程文化的最佳实践——包括来自 [Software Engineering at Google](https://abseil.io/resources/swe-book) 和 Google [工程实践指南](https://google.github.io/eng-practices/) 的概念。你会发现 API 设计中的 Hyrum 定律、测试中的 Beyonce 规则和测试金字塔、代码审查中的变更规模和审查速度规范、简化中的切斯特顿的栅栏原则、Git 工作流中的基于主干的开发、CI/CD 中的左移和功能标志，以及将代码视为负债的专用弃用技能。这些不是抽象的原则——它们直接嵌入到代理遵循的逐步工作流中。

---

## 贡献

Skills 应当**具体**（可操作的步骤，而非模糊的建议）、**可验证**（带有证据要求的清晰退出标准）、**久经沙场**（基于真实工作流）且**极简**（仅包含指导代理所需的内容）。

有关格式规范，请参见 [docs/skill-anatomy.md](docs/skill-anatomy.md)；有关指南，请参见 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 许可证

MIT - 在你的项目、团队和工具中使用这些技能。
