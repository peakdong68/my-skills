---
name: performance-optimization
description: 优化应用性能。用于当存在性能要求时，当怀疑存在性能回归时，或当核心 Web 指标或加载时间需要改善时。用于当性能分析发现需要修复的瓶颈时。
---

# 性能优化

## 概述

优化前先测量。没有测量的性能工作是猜测——猜测会导致过早优化，增加复杂性却不会改善真正重要的东西。先进行分析，找到真正的瓶颈，修复它，再次测量。只优化那些测量数据证明有价值的部分。

## 何时使用

- 规范中存在性能要求（加载时间预算、响应时间 SLA）
- 用户或监控报告慢行为
- 核心网页指标（Core Web Vitals）得分低于阈值
- 你怀疑某个变更引入了性能回归
- 构建处理大数据集或高流量的功能

**何时不应使用：** 不要在没有问题证据之前进行优化。过早优化会增加复杂性，代价高于它带来的性能收益。

## 核心 Web 指标目标

| 指标                                | 良好    | 需要改进 | 较差    |
| ----------------------------------- | ------- | -------- | ------- |
| **LCP** (Largest Contentful Paint)  | ≤ 2.5s  | ≤ 4.0s   | > 4.0s  |
| **INP** (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms  | > 500ms |
| **CLS** (Cumulative Layout Shift)   | ≤ 0.1   | ≤ 0.25   | > 0.25  |

## 优化工作流

```
1. 测量(MEASURE)  → 使用真实数据建立基线
2. 找出(IDENTIFY)  → 找出真正的瓶颈（而非假设的）
3. 修复(FIX)  → 解决特定瓶颈
4. 验证(VERIFY)  → 再次测量，确认改进
5. 守卫(GUARD)  → 添加监控或测试以防止回归
```

### 步骤 1：测量

两种互补方法——两者同时使用：

- **合成监控（Lighthouse、DevTools Performance 面板）：** 受控条件，可复现。最适合用于 CI 回归检测和隔离特定问题。
- **真实用户监控 (RUM)**（web-vitals 库、CrUX）：\*\* 真实条件下真实用户数据。验证修复是否真正改善了用户体验时必须使用。

**前端：**

```bash
# 合成监控：Chrome DevTools 中的 Lighthouse（或在 CI 中）
# Chrome DevTools → Performance 选项卡 → 录制
# Chrome DevTools MCP → 性能跟踪

# RUM：在代码中使用 Web Vitals 库
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(console.log);
onINP(console.log);
onCLS(console.log);
```

**后端：**

```bash
# 响应时间日志
# 应用性能监控（APM）
# 带计时的数据库查询日志

# 简单计时
console.time('db-query');
const result = await db.query(...);
console.timeEnd('db-query');
```

### 从哪里开始测量

利用症状决定先测量什么：

```
是什么慢？
├── 首次页面加载
│   ├── 包过大？ --> 测量包大小，检查代码分割
│   ├── 服务器响应慢？ --> 在 DevTools Network 瀑布图中测量 TTFB
│   │   ├── DNS 耗时长？ --> 为已知源添加 dns-prefetch / preconnect
│   │   ├── TCP/TLS 耗时长？ --> 启用 HTTP/2，检查边缘部署，keep-alive
│   │   └── 等待（服务器）耗时长？ --> 分析后端，检查查询和缓存
│   └── 渲染阻塞资源？ --> 检查网络瀑布图中阻塞渲染的 CSS/JS
├── 交互感觉卡顿
│   ├── 点击时 UI 冻结？ --> 分析主线程，查找长任务（>50ms）
│   ├── 表单输入延迟？ --> 检查重渲染，受控组件开销
│   └── 动画卡顿？ --> 检查布局抖动，强制回流
├── 导航后页面
│   ├── 数据加载？ --> 测量 API 响应时间，检查是否存在请求瀑布
│   └── 客户端渲染？ --> 分析组件渲染时间，检查 N+1 查询
└── 后端 / API
    ├── 单个端点慢？ --> 分析数据库查询，检查索引
    ├── 所有端点慢？ --> 检查连接池、内存、CPU
    └── 间歇性缓慢？ --> 检查锁争用、GC 暂停、外部依赖
```

### 步骤 2：找出瓶颈

按类别划分的常见瓶颈：

**前端：**

| 症状       | 可能原因                             | 调查方法                   |
| ---------- | ------------------------------------ | -------------------------- |
| 慢 LCP     | 大图片，渲染阻塞资源，慢服务器       | 检查网络瀑布图，图片大小   |
| 高 CLS     | 无尺寸图片，延迟加载内容，字体偏移   | 检查布局偏移归因           |
| 差 INP     | 主线程上繁重 JavaScript，大 DOM 更新 | 在性能跟踪中检查长任务     |
| 初始加载慢 | 大包，大量网络请求                   | 检查 bundle 大小、代码分割 |

**后端：**

| 症状        | 可能原因                       | 调查方法           |
| ----------- | ------------------------------ | ------------------ |
| 慢 API 响应 | N+1 查询，缺失索引，未优化查询 | 检查数据库查询日志 |
| 内存增长    | 泄漏的引用，无界缓存，大负载   | 堆快照分析         |
| CPU 尖峰    | 同步重型计算，正则回溯         | CPU 分析           |
| 高延迟      | 缺少缓存，冗余计算，网络跳跃   | 贯穿整个栈跟踪请求 |

### 步骤 3：修复常见反模式

#### N+1 查询（后端）

```typescript
// 坏：N+1——每个任务单独查询其所有者
const tasks = await db.tasks.findMany();
for (const task of tasks) {
  task.owner = await db.users.findUnique({ where: { id: task.ownerId } });
}

// 好：使用 join/include 单次查询
const tasks = await db.tasks.findMany({
  include: { owner: true },
});
```

#### 无界数据获取

```typescript
// 坏：获取所有记录
const allTasks = await db.tasks.findMany();

// 好：分页并设置限制
const tasks = await db.tasks.findMany({
  take: 20,
  skip: (page - 1) * 20,
  orderBy: { createdAt: 'desc' },
});
```

#### 缺少图片优化（前端）

```html
<!-- 坏：无尺寸，无格式优化 -->
<img src="/hero.jpg" />

<!-- 好：首屏 / LCP 图片——艺术方向 + 分辨率切换，高优先级 -->
<!--
  两种技术结合：
  - 艺术方向 (media)：每个断点不同的裁剪/构图
  - 分辨率切换 (srcset + sizes)：为不同屏幕密度提供正确的文件大小
-->
<picture>
  <!-- 移动端：纵向裁剪 (8:10) -->
  <source
    media="(max-width: 767px)"
    srcset="/hero-mobile-400.avif 400w, /hero-mobile-800.avif 800w"
    sizes="100vw"
    width="800"
    height="1000"
    type="image/avif"
  />
  <source
    media="(max-width: 767px)"
    srcset="/hero-mobile-400.webp 400w, /hero-mobile-800.webp 800w"
    sizes="100vw"
    width="800"
    height="1000"
    type="image/webp"
  />
  <!-- 桌面端：横向裁剪 (2:1) -->
  <source
    srcset="/hero-800.avif 800w, /hero-1200.avif 1200w, /hero-1600.avif 1600w"
    sizes="(max-width: 1200px) 100vw, 1200px"
    width="1200"
    height="600"
    type="image/avif"
  />
  <source
    srcset="/hero-800.webp 800w, /hero-1200.webp 1200w, /hero-1600.webp 1600w"
    sizes="(max-width: 1200px) 100vw, 1200px"
    width="1200"
    height="600"
    type="image/webp"
  />
  <img
    src="/hero-desktop.jpg"
    width="1200"
    height="600"
    fetchpriority="high"
    alt="Hero image description"
  />
</picture>

<!-- 好：首屏以下图片——懒加载 + 异步解码 -->
<img
  src="/content.webp"
  width="800"
  height="400"
  loading="lazy"
  decoding="async"
  alt="Content image description"
/>
```

#### 不必要的重渲染（React）

```tsx
// 坏：每次渲染都创建新对象，导致子组件重新渲染
function TaskList() {
  return <TaskFilters options={{ sortBy: 'date', order: 'desc' }} />;
}

// 好：稳定引用
const DEFAULT_OPTIONS = { sortBy: 'date', order: 'desc' } as const;
function TaskList() {
  return <TaskFilters options={DEFAULT_OPTIONS} />;
}

// 对开销大的组件使用 React.memo
const TaskItem = React.memo(function TaskItem({ task }: Props) {
  return <div>{/* 昂贵渲染 */}</div>;
});

// 对开销大的计算使用 useMemo
function TaskStats({ tasks }: Props) {
  const stats = useMemo(() => calculateStats(tasks), [tasks]);
  return (
    <div>
      {stats.completed} / {stats.total}
    </div>
  );
}
```

#### 包体积过大

```typescript
// 现代打包工具（Vite、webpack 5+）会自动对命名导入进行 tree-shaking，
// 前提是依赖提供 ESM 并在 package.json 中标记为 `sideEffects: false`。
// 在改变导入风格前先分析——真正的收益来自代码分割和懒加载。

// 好：对不常用的大型功能使用动态导入
const ChartLibrary = lazy(() => import('./ChartLibrary'));

// 好：路由级代码分割并用 Suspense 包裹
const SettingsPage = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <SettingsPage />
    </Suspense>
  );
}
```

#### 缺少缓存（后端）

```typescript
// 缓存频繁读取、很少变化的数据
const CACHE_TTL = 5 * 60 * 1000; // 5 分钟
let cachedConfig: AppConfig | null = null;
let cacheExpiry = 0;

async function getAppConfig(): Promise<AppConfig> {
  if (cachedConfig && Date.now() < cacheExpiry) {
    return cachedConfig;
  }
  cachedConfig = await db.config.findFirst();
  cacheExpiry = Date.now() + CACHE_TTL;
  return cachedConfig;
}

// 静态资源的 HTTP 缓存头
app.use(
  '/static',
  express.static('public', {
    maxAge: '1y', // 缓存 1 年
    immutable: true, // 永不复核（文件名使用内容哈希）
  }),
);

// API 响应的 Cache-Control
res.set('Cache-Control', 'public, max-age=300'); // 5 分钟
```

## 性能预算

设定预算并强制执行：

```
JavaScript 包：< 200KB gzipped（初始加载）
CSS：< 50KB gzipped
图片：< 200KB 每张（首屏）
字体：< 100KB 总计
API 响应时间：< 200ms（P95）
Time to Interactive：< 3.5s 按 4G 网络
Lighthouse 性能得分：≥ 90
```

**在 CI 中强制执行：**

```bash
# Bundle 大小检查
npx bundlesize --config bundlesize.config.json

# Lighthouse CI
npx lhci autorun
```

## 参见

有关详细的性能清单、优化命令和反模式参考，请参阅 `references/performance-checklist.md`。

## 常见的自我合理化借口

| 借口                   | 现实                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| "我们后续再优化"       | 性能债务会累积。现在就修复明显的反模式，推迟微优化。              |
| "在我机器上很快"       | 你的机器不是用户的机器。在代表性硬件和网络条件下进行分析。        |
| "这种优化很明显"       | 如果你没有测量，你就不知道。先分析。                              |
| "用户不会注意到 100ms" | 研究表明 100ms 的延迟会影响转化率。用户注意到的程度比你想象的多。 |
| "框架会处理性能"       | 框框架可以防止一些问题，但无法修复 N+1 查询或过大的 bundle。      |

## 红旗（危险信号）

- 没有分析数据支持的优化
- 数据获取中的 N+1 查询模式
- 没有分页的列表端点
- 图片缺少尺寸、懒加载或响应式尺寸
- Bundle 体积增长未经审查
- 生产环境没有性能监控
- 到处使用 `React.memo` 和 `useMemo`（过度使用与不使用一样糟糕）

## 验证

在任何与性能相关的更改之后：

- [ ] 存在前后测量数据（具体数字）
- [ ] 特定的瓶颈已被识别和解决
- [ ] 核心 Web 指标处于“良好”阈值内
- [ ] Bundle 体积没有显著增加
- [ ] 新的数据获取代码中没有 N+1 查询
- [ ] 性能预算在 CI 中通过（如果已配置）
- [ ] 现有测试仍然通过（优化未破坏行为）
