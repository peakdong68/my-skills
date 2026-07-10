# My Skills

源自：https://github.com/mattpocock/skills

---

## 快速开始

<details>
<summary><b>Claude Code（推荐）</b></summary>

**通过市场安装：**

```
/plugin marketplace add peakdong68/my-skills

/plugin install my-skills@peak-skills
```

``

**本地/开发模式：**

```bash

git clone https://github.com/peakdong68/my-skills.git

claude --plugin-dir /path/to/my-skills

```

</details>

## 参考

这些技能按一个维度划分——谁可以调用它们。**用户调用**的技能只有在你输入时才能使用（例如 `/grill-me`）；其职责是进行编排。**模型调用**的技能可以由你调用，也可以在任务匹配时由代理自动调用；它们承载可复用的规约。用户调用的技能可以调用模型调用的技能，但不能调用另一个用户调用的技能。

### 工程

我日常用于代码工作的技能。

**用户调用**

- **[ask-matt](./skills/engineering/ask-matt/SKILL.md)** —— 询问哪个技能或流程适合你的情况。作为本仓库中用户调用技能的路由器。
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** —— 盘问会话，同时构建你项目的领域模型，精炼术语并内联更新 `CONTEXT.md` 和 ADR。
- **[triage](./skills/engineering/triage/SKILL.md)** —— 通过状态机推动问题单在分类角色间流转。
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** —— 扫描代码库寻找可深化的机会，以可视化 HTML 报告呈现，然后针对你选择的任意一项进行盘问。
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** —— 为本仓库配置工程技能（问题跟踪器、分类标签、领域文档布局）。在使用其他工程技能之前，每个仓库运行一次。
- **[to-spec](./skills/engineering/to-spec/SKILL.md)** —— 将当前对话转化为一份规范，并发布到问题跟踪器。无需访谈——仅综合你们已经讨论过的内容。
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)** —— 将任何计划、规范或对话拆解为一组穿甲弹式问题单，每个问题单声明其阻塞依赖——以文本形式写入本地文件，或以原生阻塞链接形式写入真实跟踪器。
- **[implement](./skills/engineering/implement/SKILL.md)** —— 按照规范或问题单集所描述的内容进行构建，在预先约定的接合处驱动 `/tdd`，并在提交前以 `/code-review` 收尾。
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)** —— 规划一大块工作（超过单个代理会话能承载的规模），在问题跟踪器上以共享的调研问题单地图呈现——逐个解决，直至通往目的地的路径清晰。

**模型调用**

- **[prototype](./skills/engineering/prototype/SKILL.md)** —— 构建一个一次性原型来回答设计问题——针对状态/逻辑问题构建可运行的终端应用，或针对 UI 变体构建多个截然不同的方案，通过一个路由切换。
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)** —— 针对疑难缺陷和性能回归的有序诊断循环：复现 → 最小化 → 假设 → 埋点 → 修复 → 回归测试。
- **[research](./skills/engineering/research/SKILL.md)** —— 针对高可信的一手来源调查某个问题，并将发现以带引用的 Markdown 文件形式捕获在仓库中，作为后台代理运行。
- **[tdd](./skills/engineering/tdd/SKILL.md)** —— 红-绿-重构循环的测试驱动开发。每次构建一个垂直切片的功能或缺陷修复。
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)** —— 主动构建和精炼项目的领域模型——对照术语表质疑术语，用边缘案例场景进行压力测试，并内联更新 `CONTEXT.md` 和 ADR。
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)** —— 设计深度模块的共享规约和词汇：在小接口背后承载大量行为，置于清晰的接合处，并通过该接口可测试。
- **[code-review](./skills/engineering/code-review/SKILL.md)** —— 对某个固定点以来的差异进行双轴评审：**标准**（是否遵循仓库的编码规范，加上 Fowler 坏味道基线？）和**规范**（是否忠实实现了来源问题单/PRD？），作为并行子代理运行，互不干扰。

### 生产力

通用工作流工具，非代码专用。

**用户调用**

- **[grill-me](./skills/productivity/grill-me/SKILL.md)** —— 就某个计划或设计接受无情的盘问，直到决策树的每个分支都得到解决。
- **[handoff](./skills/productivity/handoff/SKILL.md)** —— 将当前对话压缩为一份交接文档，以便另一个代理继续工作。
- **[teach](./skills/productivity/teach/SKILL.md)** —— 在多个会话中教授用户一项新技能或新概念，将当前目录作为有状态的教学工作区。
- **[writing-great-skills](./skills/productivity/writing-great-skills/SKILL.md)** —— 关于如何写好和编辑技能的参考：使技能可预测的词汇和原则。

**模型调用**

- **[grilling](./skills/productivity/grilling/SKILL.md)** —— 就某个计划或设计对用户进行无情的盘问，直到决策树的每个分支都得到解决。`grill-me` 和 `grill-with-docs` 背后的可复用循环。