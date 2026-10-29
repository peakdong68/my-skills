# Agent Note: Agent Notes 迁移至 .agents/notes

Status: implemented

## 问题

此前规则没有区分通用 Agent Notes 资源位置与本仓库历史位置，默认路径变化可能被误解为要求其他项目迁移。

## 决定

本仓库 Agent Notes 的默认位置为 `.agents/notes/`。通用规则由 DSH Skill 拥有，Notes 历史不作为 Setup 资源复制。2026-10 的迁移保留本仓库记录文件名与记录事实，分类、格式和内部链接按 DSH 规则更新。

项目指令指向 DSH Skill 和本地 Notes 入口；所有 Notes 工具从 DSH Skill 的 `scripts/` 调用，并以 `--root .agents/notes` 指定本仓库根。若项目没有 Issue tracker，当前任务承载工作项；已登记的独立 Spec 位置不因此改变。

其他项目继续遵循已注册的历史位置；重复 setup 或使用新默认值不授权迁移、复制旧记录或覆盖脚本。明确升级且保留旧位置时，脚本根路径适配注册位置。

## 验证

2026-09-09 本任务会话中用户明确目录名带点，随后授权实施。无独立会话链接。

历史迁移时核对文件清单与内容校验值；当时记录了十条既有记录并更新其部署说明。本次迁移将记录内容与格式转为 DSH，保留原始文件名与日期。

当时的旧 checker、自测命令和 `git diff --check` 均通过；旧工具现已移除，由 DSH Skill 中的树、格式及归档校验命令接管。

参见 [Agent Notes 规则](../../README.md)、[setup 配置](../../../../skills/user-invoked/setup-agent-skills/decision-records.md)、[工件位置样板](https://github.com/peakdong68/my-skills/blob/dc2212e2853bbc98cb187e134c7fb411cb55e361/test-skills/skills/user-invoked/setup-matt-pocock-skills/artifacts.md)。本次更新默认物理位置，沿用 [工件注册方法](./2026-09-08-artifact-location-registration.md) 中保留历史归属和显式迁移的原则。


## 备选方案

原始记录未记载可确认的真实备选方案；不补造。

## 后果

本仓库将 Agent Notes 与脚本放在新的默认位置；其他项目仍保留已注册的历史位置，迁移需明确授权。
