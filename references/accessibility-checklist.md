# 无障碍检查清单

WCAG 2.1 AA 合规快速参考。请结合 `frontend-ui-engineering` 技能使用。

## 目录

- [核心检查项](#essential-checks)
- [常见 HTML 模式](#common-html-patterns)
- [测试工具](#testing-tools)
- [快速参考：ARIA 实时区域](#quick-reference-aria-live-regions)
- [常见反模式](#common-anti-patterns)

## 核心检查项

### 键盘导航
- [ ] 所有交互元素均可通过 Tab 键获取焦点
- [ ] 焦点顺序遵循视觉/逻辑顺序
- [ ] 焦点可见（聚焦元素带有轮廓线/光晕）
- [ ] 自定义组件支持键盘操作（Enter 激活，Escape 关闭）
- [ ] 无键盘陷阱（用户始终可通过 Tab 键移出组件）
- [ ] 页面顶部设有“跳转至内容”链接——在键盘聚焦时（至少）可见
- [ ] 模态框打开时锁定焦点，关闭时返还焦点

### 屏幕阅读器
- [ ] 所有图片均带有 `alt` 文本（装饰性图片使用 `alt=""`）
- [ ] 所有表单输入框均有关联的标签（`<label>` 或 `aria-label`）
- [ ] 按钮和链接具有描述性文本（避免使用“点击此处”）
- [ ] 纯图标按钮需添加 `aria-label`
- [ ] 页面仅包含一个 `<h1>`，且标题层级不跳跃
- [ ] 动态内容变更会被播报（使用 `aria-live` 区域）
- [ ] 表格包含带有 `scope` 属性的 `<th>` 表头

### 视觉设计
- [ ] 文本对比度 ≥ 4.5:1（普通文本）或 ≥ 3:1（大文本，18px 及以上）
- [ ] UI 组件与背景的对比度 ≥ 3:1
- [ ] 颜色不是传达信息的唯一方式
- [ ] 文本可放大至 200% 且不破坏布局
- [ ] 无每秒闪烁超过 3 次的内容

### 表单
- [ ] 每个输入框均有可见标签
- [ ] 必填字段有明确标识（不仅依赖颜色）
- [ ] 错误提示具体明确并与对应输入框关联
- [ ] 错误状态通过多种方式可见（如图标、文本、边框）
- [ ] 表单提交错误有汇总提示且可获取焦点
- [ ] 标准字段应使用自动完成属性（例如 `type="email" autocomplete="email"`）

### 内容
- [ ] 声明了页面语言（如 `<html lang="en">`）
- [ ] 页面包含描述性的 `<title>` 标签
- [ ] 链接与周围文本可区分（不仅依赖颜色）
- [ ] 移动端触控区域 ≥ 44x44px
- [ ] 空状态需提供有效信息（非空白屏幕）

## 常见 HTML 模式

### 按钮与链接

```html
<!-- 执行操作时使用 <button> -->
<button onClick={handleDelete}>Delete Task</button>

<!-- 页面跳转时使用 <a> -->
<a href="/tasks/123">View Task</a>

<!-- 绝不要使用 div/span 充当按钮 -->
<div onClick={handleDelete}>Delete</div>  <!-- 错误示例 -->
```

### 表单标签

```html
<!-- 显式关联标签 -->
<label htmlFor="email">Email address</label>
<input id="email" type="email" required />

<!-- 隐式包裹 -->
<label>
  Email address
  <input type="email" required />
</label>

<!-- 隐藏标签（推荐始终使用可见标签） -->
<input type="search" aria-label="Search tasks" />
```

### ARIA 角色

```html
<!-- 导航 -->
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer links">...</nav>

<!-- 状态消息 -->
<div role="status" aria-live="polite">Task saved</div>

<!-- 警告消息 -->
<div role="alert">Error: Title is required</div>

<!-- 模态对话框 -->
<dialog aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Delete</h2>
  ...
</dialog>

<!-- 加载状态 -->
<div aria-busy="true" aria-label="Loading tasks">
  <Spinner />
</div>
```

### 无障碍列表

```html
<ul role="list" aria-label="Tasks">
  <li>
    <input type="checkbox" id="task-1" aria-label="Complete: Buy groceries" />
    <label htmlFor="task-1">Buy groceries</label>
  </li>
</ul>
```

## 测试工具

```bash
# 自动化审计
npx axe-core          # 可编程无障碍测试
npx pa11y             # 命令行无障碍检查器

# 浏览器内
# Chrome DevTools → Lighthouse → Accessibility
# Chrome DevTools → Elements → Accessibility tree

# 屏幕阅读器测试
# macOS：VoiceOver (Cmd + F5)
# Windows：NVDA（免费）或 JAWS
# Linux：Orca
```

## 快速参考：ARIA 实时区域

| 属性值 | 行为表现 | 适用场景 |
|-------|----------|---------|
| `aria-live="polite"` | 在下次停顿处播报 | 状态更新、保存确认提示 |
| `aria-live="assertive"` | 立即播报 | 错误信息、时效性警告 |
| `role="status"` | 与 `polite` 相同 | 状态消息 |
| `role="alert"` | 与 `assertive` 相同 | 错误消息 |

## 常见反模式

| 反模式 | 存在的问题 | 修复方案 |
|---|---|---|
| 使用 `div` 充当按钮 | 无法获取焦点，不支持键盘操作 | 改用 `<button>` |
| 缺失 `alt` 文本 | 屏幕阅读器无法识别图片 | 添加描述性的 `alt` |
| 仅依赖颜色区分状态 | 色盲用户无法辨识 | 补充图标、文字或纹理 |
| 自动播放媒体 | 易造成困扰，且无法暂停 | 添加控制按钮，禁止自动播放 |
| 未使用 ARIA 的自定义下拉菜单 | 键盘和屏幕阅读器无法操作 | 使用原生 `<select>` 或符合规范的 ARIA listbox |
| 移除焦点轮廓线 | 用户无法得知当前焦点位置 | 自定义样式而非直接移除 |
| 空链接/空按钮 | 仅播报“链接”而无描述信息 | 添加文本或 `aria-label` |
| 使用 `tabindex > 0` | 破坏自然的 Tab 键导航顺序 | 仅使用 `tabindex="0"` 或 `tabindex="-1"` |