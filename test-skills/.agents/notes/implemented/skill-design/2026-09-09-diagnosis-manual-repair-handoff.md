---
title: 独立验收诊断与手动实现修复的衔接
status: implemented
created: 2026-09-09
updated: 2026-09-23
approval: 本任务会话认可诊断及手动修复方案，并明确要求同意修复方案，执行实现
verification: Standards 与 Spec 审查无实质发现，验收情境文义核对、技能格式兼容校验、链接及记录索引检查通过
---


# Agent Note：独立验收诊断与手动实现修复的衔接

## 问题

独立验收诊断、工程内验证和用户手动修复的职责边界需要明确。

## 决定

本任务会话为工作项及范围依据，无独立会话链接。补充[验收职责决定](./2026-09-09-verification-acceptance-boundaries.md)，仅调整 [DIAGNOSE.md](../../../../skills/user-invoked/to-verify/DIAGNOSE.md)、[fix-bug](../../../../skills/user-invoked/fix-bug/SKILL.md) 及记录、索引，不覆盖此前两份验收技能的交付。

DIAGNOSE 为 to-verify 的只读关联资料，返回验收报告而非工程 verify；分类描述所需后续修正，不执行或授权修复。沿实际因果及引用关系判断归属，不将工件列表当作固定优先级。证据不足时返回已知事实、假设及取证需求，未知根因不覆盖已证实的 FAIL。

fix-bug 接收用户明确请求的实现缺陷修复。合同决定预期，诊断提供证据；复用仍适用于当前交付版本的报告，也支持直接报错。代理负责技术分类，非实现问题报告归属，不借修复代码改变合同。范围内修复包括审查发现处理与重验，以原可观察场景及选定验收条件恢复为完成依据。

没有引入两份手动技能的自动调用链，也不以一次局部修复宣告整个历史验收报告通过。代价是修复完成需要明确关联原失败场景，不能仅凭底层测试通过结束。

## 验证

上述规则已写入两份目标文件。Standards 与 Spec 独立审查均无实质发现。情境核对确认：诊断只读且依据实际引用与因果关系归属；未知根因不覆盖已证实失败，环境阻塞不直接证明产品失败；修复以权威合同为准，非实现分类不改产品代码，审查后修改需重验；过期报告需核对，直接报错可进入诊断，局部修复不宣告整体验收通过。此为文义审查，未运行代理行为测试。

fix-bug 的手动调用字段保留并单独校验；现有 quick_validate.py 不识别 disable-model-invocation，临时兼容副本仅移除此扩展字段后其余格式校验通过，目标文件不作兼容性删减。检查使用 Python UTF-8 模式。本地引用、git diff --check 和 node scripts/decisions/check.mjs 通过；索引由 node scripts/decisions/update-index.mjs 生成。未修改调用策略文件、安装副本或前一轮验收技能实现。

<!-- agent-note-format: alternatives-not-recorded (pre-format Agent Note) -->

## 后果

to-verify 只读报告；fix-bug 按用户请求实施范围内修复并重验，不把一次局部修复说成整体验收通过。
