# Agent Note: 按项目注册工件归属及历史位置

Status: implemented

## 问题

仅要求技能遵循“项目约定”不足以指导没有约定或希望变更约定的项目；也容易混淆当前技能库的位置和目标项目的业务工件位置。

## 决定

Setup 提供文档属主与历史位置注册方法，目标项目在现有文档入口登记属主、范围、位置和规则指针。支持保留现有、新工作采用新位置、已授权迁移三种模式。Proposal/工作项拥有当前交付范围和验收；Note 拥有长期设计理由。跟踪器可选，没有 tracker 时当前任务承载本次工作项。

## 备选方案

不将全部工件强制搬入生命周期目录，也不在每个技能中维护相互独立的路径。注册同时保留历史查找与更新规则，避免切换约定时形成第二份合同。没有注册文件的项目仍可按现有约定工作。

## 后果

Proposal 默认直接作为 proposed 记录的约定已由 [明确实施工作项与提案归属](./2026-09-08-work-item-and-proposal-boundaries.md) 替代；该记录关于 tracker 必须配置的要求又由 [DSH 统一 Notes 决定](./2026-10-29-setup-planning-dsh-notes.md) 更新。三种注册模式和历史属主保护继续适用。

共享技能先读取项目注册，默认路径只作后备。重新注册不授权迁移；已有配置保留定制。此交付提供方法、样板及读取规则，不为本技能库虚构业务工件注册，也不实现自动文件迁移器。

## 依据与关联

2026-09-08 本任务会话中用户强调“提供一种方法约定”，认可默认方法、注册入口和历史衔接方案；无独立会话链接。

参见 [注册方法](../../../../skills/user-invoked/setup-agent-skills/artifact-registration.md)、[样板](https://github.com/peakdong68/my-skills/blob/dc2212e2853bbc98cb187e134c7fb411cb55e361/test-skills/skills/user-invoked/setup-matt-pocock-skills/artifacts.md)、[Plan](../../../../skills/model-invoked/planning/SKILL.md)。本记录补充 [项目分类及生命周期](./2026-09-08-project-configured-record-lifecycle.md)。

## 验证

已核对资源链接、技能引用及本仓库记录检查
