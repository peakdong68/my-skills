# 性能检查清单

Web 应用程序性能的快速参考清单。请与 `performance-optimization` 技能配合使用。

## 目录

- [核心网页指标目标](#核心网页指标目标)
- [TTFB 诊断](#ttfb-诊断)
- [前端检查清单](#前端检查清单)
- [后端检查清单](#后端检查清单)
- [测量命令](#测量命令)
- [常见反模式](#常见反模式)

## 核心网页指标目标

| 指标 | 良好 | 需要改进 | 较差 |
|--------|------|------------|------|
| LCP（最大内容绘制） | ≤ 2.5 秒 | ≤ 4.0 秒 | > 4.0 秒 |
| INP（下次绘制前的交互） | ≤ 200 毫秒 | ≤ 500 毫秒 | > 500 毫秒 |
| CLS（累积布局偏移） | ≤ 0.1 | ≤ 0.25 | > 0.25 |

## TTFB 诊断

当 TTFB 较慢（> 800 毫秒）时，请在 DevTools Network 瀑布流中检查每个组件：

- [ ] **DNS 解析** 较慢 → 为已知源添加 `<link rel="dns-prefetch">` 或 `<link rel="preconnect">`
- [ ] **TCP/TLS 握手** 较慢 → 启用 HTTP/2，考虑边缘部署，验证 keep-alive
- [ ] **服务器处理** 较慢 → 分析后端性能，检查慢查询，添加缓存

## 前端检查清单

### 图片
- [ ] 图片使用现代格式（WebP、AVIF）
- [ ] 图片响应式尺寸（使用 `srcset` 和 `sizes`）
- [ ] 图片和 `<source>` 元素具有明确的 `width` 和 `height`（防止艺术指导场景中的 CLS）
- [ ] 首屏下方的图片使用 `loading="lazy"` 和 `decoding="async"`
- [ ] 首屏/LCP 关键图片使用 `fetchpriority="high"` 且不启用懒加载

### JavaScript
- [ ] 打包体积压缩后小于 200KB（初始加载）
- [ ] 使用动态 `import()` 对路由和重型功能进行代码分割
- [ ] 启用 Tree Shaking（验证依赖项是否提供 ESM 并标记 `sideEffects: false`）
- [ ] `<head>` 中无阻塞性 JavaScript（使用 `defer` 或 `async`）
- [ ] 重型计算卸载到 Web Workers（如适用）
- [ ] 对使用相同 props 重新渲染的昂贵组件使用 `React.memo()`
- [ ] 仅在有性能分析证明收益时使用 `useMemo()` / `useCallback()`
- [ ] 拆分长任务（> 50 毫秒）以保持主线程可用——这是优化 INP 的主要手段
- [ ] 在长时间运行的循环中使用 `yieldToMain` 模式，使输入事件能在任务块之间执行
- [ ] 在可用时使用现代调度 API：`scheduler.yield()`（首选）、带优先级的 `scheduler.postTask()`、`isInputPending()`（仅在需要时让出）
- [ ] 使用 `requestIdleCallback` 处理可延迟、非紧急的工作（分析上报、预取、预热）
- [ ] 将非关键工作从事件处理程序中延迟执行（例如分析、日志），以免延迟对交互的响应
- [ ] 第三方脚本使用 `async` / `defer` 加载，审计其体积，重型脚本（聊天插件、嵌入内容）使用门面模式前置加载

### CSS
- [ ] 关键 CSS 内联或预加载
- [ ] 非关键样式无渲染阻塞 CSS
- [ ] 生产环境中无 CSS-in-JS 运行时开销（使用提取方案）

### 字体
- [ ] 限制使用 2–3 个字体系族，每个字体系族 2–3 种字重（每种额外字重都会增加一次请求）
- [ ] 仅使用 WOFF2 格式（体积最小，通用支持——跳过 WOFF/TTF/EOT）
- [ ] 尽可能自托管（第三方字体 CDN 会增加 DNS + TCP + TLS 往返开销）
- [ ] 预加载对 LCP 关键的字体：`<link rel="preload" as="font" type="font/woff2" crossorigin>`
- [ ] 使用 `font-display: swap`（或非关键字体使用 `optional`）避免 FOIT 阻塞渲染
- [ ] 通过 `unicode-range` 进行子集化，仅发送每个页面所需的字形
- [ ] 当需要多种字重/样式时考虑使用可变字体（一个文件替代多个文件）
- [ ] 使用 `size-adjust`、`ascent-override`、`descent-override` 调整回退字体度量，减少字体切换时的 CLS
- [ ] 在使用任何自定义字体前先考虑系统字体栈

### 网络
- [ ] 静态资源使用长 `max-age` + 内容哈希进行缓存
- [ ] API 响应在适当时缓存（`Cache-Control`）
- [ ] 启用 HTTP/2 或 HTTP/3
- [ ] 为已知源预连接资源（`<link rel="preconnect">`）
- [ ] 对关键非图片资源使用 `fetchpriority`（例如关键 `<link rel="preload">`、首屏 `<script>`）——不仅限于 `<img>`
- [ ] 无不必要的重定向

### 渲染
- [ ] 无布局抖动（强制同步布局）
- [ ] 动画使用 `transform` 和 `opacity`（GPU 加速）
- [ ] 长列表使用虚拟化（例如 `react-window`）
- [ ] 无不必要的全页重新渲染
- [ ] 屏幕外区域使用 `content-visibility: auto` 配合 `contain-intrinsic-size`，跳过不可见区域的布局/绘制
- [ ] 无 `unload` 事件处理程序，HTML 响应无 `Cache-Control: no-store`——保留后退/前进缓存（bfcache）资格

## 后端检查清单

### 数据库
- [ ] 无 N+1 查询模式（使用预加载/连接查询）
- [ ] 查询具有适当的索引
- [ ] 列表端点分页（永不使用 `SELECT * FROM table`）
- [ ] 配置连接池
- [ ] 启用慢查询日志

### API
- [ ] 响应时间 < 200 毫秒（p95）
- [ ] 请求处理程序中无同步重型计算
- [ ] 使用批量操作替代单个调用的循环
- [ ] 响应压缩（gzip/brotli）
- [ ] 适当的缓存（内存缓存、Redis、CDN）

### 基础设施
- [ ] 静态资源使用 CDN
- [ ] 服务器靠近用户部署（或边缘部署）
- [ ] 配置水平扩展（如需要）
- [ ] 为负载均衡器提供健康检查端点

## 测量命令

### INP 实地数据与 DevTools 工作流程

1. **优先查看实地数据** — 在优化前，通过 [CrUX Vis](https://developer.chrome.com/docs/crux/vis) 或您的 RUM 工具查看真实用户 INP 数据
2. **识别慢交互** — 打开 DevTools → Performance 面板 → 在交互时录制；查找由点击/按键触发的长任务
3. **在中端 Android 设备上测试** — INP 问题通常仅在较慢硬件上显现；使用真实设备或 DevTools CPU 节流（4×–6× 降速）

```bash
# Lighthouse CLI
npx lighthouse https://localhost:3000 --output json --output-path ./report.json

# 打包分析
npx webpack-bundle-analyzer stats.json
# 或对于 Vite：
npx vite-bundle-visualizer

# 检查打包体积
npx bundlesize

# 代码中的 Web Vitals
import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP(console.log);
onINP(console.log);
onCLS(console.log);

# 带交互级别详细信息的 INP（attribution 构建）
import { onINP } from 'web-vitals/attribution';
onINP(({ value, attribution }) => {
  const { interactionTarget, inputDelay, processingDuration, presentationDelay } = attribution;
  console.log({ value, interactionTarget, inputDelay, processingDuration, presentationDelay });
});
```

## 常见反模式

| 反模式 | 影响 | 修复方案 |
|---|---|---|
| N+1 查询 | 数据库负载线性增长 | 使用连接查询、includes 或批量加载 |
| 无界查询 | 内存耗尽、超时 | 始终分页，添加 LIMIT |
| 缺少索引 | 数据增长时读取变慢 | 为过滤/排序列添加索引 |
| 布局抖动 | 卡顿、掉帧 | 批量读取 DOM，然后批量写入 |
| 未优化图片 | LCP 慢、带宽浪费 | 使用 WebP、响应式尺寸、懒加载 |
| 大型打包文件 | 可交互时间慢 | 代码分割、Tree Shaking、审计依赖 |
| 阻塞主线程 | INP 差、UI 无响应 | 使用 `scheduler.yield()` / `yieldToMain` 拆分长任务，卸载到 Web Workers |
| 内存泄漏 | 内存增长、最终崩溃 | 清理监听器、定时器、引用 |