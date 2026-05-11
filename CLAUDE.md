# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

重要说明！目录superpowers资源为参考资源，非本项目资源，仅作为参考

# agent-skills

面向 AI 编程代理的生产级工程技能集合——封装了资深工程师在构建软件时使用的完整工流程、质量门禁和最佳实践。本项目同时是一个 Claude Code 插件（通过 `.claude-plugin/plugin.json` 定义），安装后技能和代理角色会自动被发现。

## 三层架构

本仓库有三个可组合的层级，职责各不相同，不应混淆：

| 层级 | 位置 | 职责 | 示例 |
|------|------|------|------|
| **技能 (Skills)** | `skills/<name>/SKILL.md` | 包含步骤和退出条件的工作流 —— *如何做* | `code-review-and-quality` |
| **角色 (Personas/Agents)** | `agents/<role>.md` | 持有单一视角和输出格式的角色 —— *谁来做* | `code-reviewer` |
| **命令 (Commands)** | `.claude/commands/*.md` | 面向用户的入口点 —— *何时做* | `/review`、`/ship` |

**组合规则：用户（或斜杠命令）是编排者。角色不调用其他角色。** 唯一认可的多角色编排模式是**并行扇出 + 合并**（`/ship` 使用此模式）。详见 `references/orchestration-patterns.md`。

## 项目结构

```
skills/                    → 21 项核心技能（每个目录一个 SKILL.md）
agents/                    → 3 个专业角色（code-reviewer, security-auditor, test-engineer）
hooks/                     → 会话生命周期钩子脚本
.claude/commands/          → 8 个斜杠命令（/spec, /plan, /build, /test, /review, /code-simplify, /verify, /ship）
references/                → 4 份补充检查清单（testing, security, performance, accessibility）
references/orchestration-patterns.md → 编排模式与反模式目录
docs/                      → 各工具的设置指南 + skill-anatomy.md
.claude-plugin/            → 插件清单（plugin.json + marketplace.json）
```

## 开发生命周期与命令

```
DEFINE → PLAN → BUILD → VERIFY → REVIEW → VERIFY → SHIP
/spec    /plan   /build   /test    /review   /verify   /ship
```

每个命令自动激活对应的技能。技能也会根据意图自动激活——例如设计 API 会触发 `api-and-interface-design`，构建 UI 会触发 `frontend-ui-engineering`。

## 钩子系统 (Hooks)

`hooks/hooks.json` 定义了在会话启动时（SessionStart）运行的钩子。`session-start.sh` 脚本会检查 `jq` 是否可用，然后将 `using-agent-skills` 元技能注入到每个新会话的系统提示词中——这是技能发现机制的核心。

额外的可选钩子（需用户在 settings.json 中手动配置）：
- **sdd-cache** (`hooks/sdd-cache-pre.sh`, `hooks/sdd-cache-post.sh`) — 为 `source-driven-development` 技能提供跨会话的文档缓存，通过 HTTP `If-None-Match`/`If-Modified-Since` 验证新鲜度
- **simplify-ignore** (`hooks/simplify-ignore.sh`) — 为 `/code-simplify` 提供块级保护，标记不应被简化的代码段

## 技能格式规范

每个技能文件必须遵循以下格式（详见 `docs/skill-anatomy.md`）：

```yaml
---
name: kebab-case-name       # 必须与目录名一致
description: 以第三人称说明功能，后跟 "Use when" 触发条件。最多 1024 字符。
---
```

标准章节：概述 (Overview) → 何时使用 (When to Use) → 核心流程 (Process) → 常见合理化借口 (Common Rationalizations) → 危险信号 (Red Flags) → 验证 (Verification)

关键设计原则：
- **是流程，不是散文。** 写步骤，不写知识点。具体胜过笼统（"运行 `npm test`" 而不是 "验证测试"）
- **反合理化表格。** 每个技能必须有表格列出代理用来跳步骤的借口和反驳
- **验证不可妥协。** 每个验证复选框必须有可证明的证据
- **渐进式披露。** 辅助材料仅在需要时加载，保持 SKILL.md 在 500 行以内
- **不重复内容。** 引用其他技能，不要复制内容

## 辅助文件策略

- 仅在内容超过 100 行时创建辅助文件
- 辅助文件放在 `references/` 目录中，不放在技能目录内
- 脚本（如有）放在 `skills/<name>/scripts/` 中，必须使用 `#!/bin/bash`、`set -e`、stderr 写日志、stdout 输出机器可读格式

## 验证

检查所有 SKILL.md 文件的 YAML 前置元数据（frontmatter）是否有效：

```bash
for f in skills/*/SKILL.md; do
  name=$(head -5 "$f" | grep "^name:" | sed 's/name: //')
  desc=$(head -10 "$f" | grep "^description:" | sed 's/description: //')
  if [ -z "$name" ] || [ -z "$desc" ]; then
    echo "INVALID: $f (missing name or description)"
  fi
done
```

## 创建新技能

1. 创建 `skills/<kebab-case-name>/SKILL.md`
2. 添加 YAML 前置元数据（name + description）
3. 遵循技能结构格式编写内容
4. 如果需要随技能分发的脚本，放入 `skills/<name>/scripts/`

## 边界

- 始终遵循 `docs/skill-anatomy.md` 的格式
- 不添加模糊建议来代替可执行流程
- 不在技能间重复内容——改为引用其他技能
- 不支持文件（辅助文件、脚本）仅在内容确实超过 100 行时创建
- 角色负责单一视角、单一输出格式。如果你发现自己在添加第二个角色，请创建第二个角色文件
- 角色不调用其他角色（Claude Code 平台也强制执行此规则——子代理不能启动其他子代理）
