---
name: frontend-ui-engineering
description: 构建生产质量的 UI。用于构建或修改面向用户的界面时。用于创建UI组件、实现布局、前端交互、管理状态，或当输出需要具有生产质量的外观和感觉而非 AI 生成时。
---

# 前端 UI 工程

## 概述

构建可访问、高性能且视觉精美的生产质量用户界面。目标是让 UI 看起来像是由顶级公司中具备设计意识的工程师构建的——而不是由 AI 生成的。这意味着真正遵循设计系统、实现正确的可访问性、深思熟虑的交互模式，并且避免通用的“AI 审美”。

## 何时使用

- 构建新的 UI 组件或页面
- 修改现有的面向用户界面
- 实现响应式布局
- 添加交互或状态管理
- 修复视觉或 UX 问题

## 组件架构

### 文件结构

将与组件相关的所有内容放在一起：

```
src/components/
  TaskList/
    TaskList.tsx          # 组件实现
    TaskList.test.tsx     # 测试
    TaskList.stories.tsx  # Storybook 故事（如果使用）
    use-task-list.ts      # 自定义 Hook（如果状态复杂）
    types.ts              # 组件特定的类型（如果需要）
```

### 组件模式

**优先使用组合而非配置：**

```tsx
// 好：可组合
<Card>
  <CardHeader>
    <CardTitle>Tasks</CardTitle>
  </CardHeader>
  <CardBody>
    <TaskList tasks={tasks} />
  </CardBody>
</Card>

// 避免：过度配置
<Card
  title="Tasks"
  headerVariant="large"
  bodyPadding="md"
  content={<TaskList tasks={tasks} />}
/>
```

**保持组件专注：**

```tsx
// 好：只做一件事
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className='flex items-center gap-3 p-3'>
      <Checkbox checked={task.done} onChange={() => onToggle(task.id)} />
      <span className={task.done ? 'line-through text-muted' : ''}>
        {task.title}
      </span>
      <Button variant='ghost' size='sm' onClick={() => onDelete(task.id)}>
        <TrashIcon />
      </Button>
    </li>
  );
}
```

**将数据获取与展示分离：**

```tsx
// 容器：处理数据
export function TaskListContainer() {
  const { tasks, isLoading, error } = useTasks();

  if (isLoading) return <TaskListSkeleton />;
  if (error)
    return <ErrorState message='Failed to load tasks' retry={refetch} />;
  if (tasks.length === 0) return <EmptyState message='No tasks yet' />;

  return <TaskList tasks={tasks} />;
}

// 展示：处理渲染
export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul role='list' className='divide-y'>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
```

## 状态管理

**选择有效的最简单方法：**

```
Local state (useState)           → 组件特定的 UI 状态
Lifted state                     → 在 2-3 个兄弟组件之间共享
Context                          → 主题、身份验证、语言环境（读多写少）
URL state (searchParams)         → 过滤、分页、可共享的 UI 状态
Server state (React Query, SWR)  → 带缓存的远程数据
Global store (Zustand, Redux)    → 复杂的客户端状态，在整个应用中共享
```

**避免超过 3 层的 prop 钻取。** 如果你通过不使用这些 prop 的组件来传递 prop，请引入上下文(context)或重构组件树。

## 遵循设计系统

### 避免 AI 审美

AI 生成的 UI 具有可识别的模式。避免所有这些：

| AI 默认做法               | 为何是问题                                                   | 生产质量                               |
| ------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| 全是紫色/靛蓝色           | 模型默认使用视觉上“安全”的调色板，导致每个应用看起来都一样   | 使用项目实际的调色板                   |
| 过多的渐变                | 渐变增加视觉噪音，与大多数设计系统冲突                       | 符合设计系统的平面或细微渐变           |
| 所有都圆角（rounded-2xl） | 最大圆角传递“友好”信号，但忽略了真实设计中圆角半径的层次结构 | 来自设计系统的一致 border-radius       |
| 通用的首屏区域            | 模板驱动的布局，与实际内容或用户需求无关                     | 内容优先的布局                         |
| Lorem ipsum 风格的文案    | 占位文本隐藏了真实内容会暴露的布局问题（长度、换行、溢出）   | 真实的占位内容                         |
| 处处都是过大的内边距      | 均匀的过大的内边距破坏了视觉层次，浪费屏幕空间               | 一致的间距比例                         |
| 千篇一律的卡片网格        | 统一的网格是忽略信息优先级和扫描模式的布局捷径               | 目的驱动的布局                         |
| 重度阴影设计              | 分层阴影增加深度，与内容争夺注意力，并降低低端设备的渲染速度 | 除非设计系统指定，否则使用微妙或无阴影 |

### 间距和布局

使用一致的间距比例。不要随意发明值：

```css
/* 使用比例：0.25rem 增量（或项目使用的任何值） */
/* 好 */
padding: 1rem; /* 16px */
/* 好 */
gap: 0.75rem; /* 12px */
/* 坏 */
padding: 13px; /* 不在任何比例上 */
/* 坏 */
margin-top: 2.3rem; /* 不在任何比例上 */
```

### 排版

尊重排版的层次结构：

```
h1 → 页面标题（每页一个）
h2 → 部分标题
h3 → 子部分标题
body → 默认文本
small → 次要/辅助文本
```

不要跳过标题级别。不要将标题样式用于非标题内容。

### 颜色

- 使用语义颜色标记：`text-primary`、`bg-surface`、`border-default`——而不是原始十六进制值
- 确保足够的对比度（普通文本 4.5:1，大文本 3:1）
- 不要仅依赖颜色来传达信息（也使用图标、文本或图案）

## 可访问性（WCAG 2.1 AA）

每个组件都必须满足这些标准：

### 键盘导航

```tsx
// 每个交互元素都必须可通过键盘操作
<button onClick={handleClick}>Click me</button>        // ✓ 默认可获得焦点
<div onClick={handleClick}>Click me</div>               // ✗ 不可获得焦点
<div role="button" tabIndex={0} onClick={handleClick}    // ✓ 但优先使用 <button>
     onKeyDown={e => {
       if (e.key === 'Enter') handleClick();
       if (e.key === ' ') e.preventDefault();
     }}
     onKeyUp={e => {
       if (e.key === ' ') handleClick();
     }}>
  Click me
</div>
```

### ARIA 标签

```tsx
// 为缺少可见文本的交互元素添加标签
<button aria-label="Close dialog"><XIcon /></button>

// 为表单输入添加标签
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// 或者当没有可见标签时使用 aria-label
<input aria-label="Search tasks" type="search" />
```

### 焦点管理

```tsx
// 当内容变化时移动焦点
function Dialog({ isOpen, onClose }: DialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  // 打开时将焦点限制在对话框内
  return (
    <dialog open={isOpen}>
      <button ref={closeRef} onClick={onClose}>
        Close
      </button>
      {/* dialog content */}
    </dialog>
  );
}
```

### 有意义的空状态和错误状态

```tsx
// 不要显示空白屏幕
function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div role='status' className='text-center py-12'>
        <TasksEmptyIcon className='mx-auto h-12 w-12 text-muted' />
        <h3 className='mt-2 text-sm font-medium'>No tasks</h3>
        <p className='mt-1 text-sm text-muted'>
          Get started by creating a new task.
        </p>
        <Button className='mt-4' onClick={onCreateTask}>
          Create Task
        </Button>
      </div>
    );
  }

  return <ul role='list'>...</ul>;
}
```

## 响应式设计

移动端优先设计，然后扩展：

```tsx
// Tailwind：移动端优先的响应式
<div className="
  grid grid-cols-1      /* 移动端：单列 */
  sm:grid-cols-2        /* 小屏：2列 */
  lg:grid-cols-3        /* 大屏：3列 */
  gap-4
">
```

在这些断点下测试：320px、768px、1024px、1440px。

## 加载和过渡

```tsx
// 骨架屏加载（不使用转圈动画）
function TaskListSkeleton() {
  return (
    <div className='space-y-3' aria-busy='true' aria-label='Loading tasks'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='h-12 bg-muted animate-pulse rounded' />
      ))}
    </div>
  );
}

// 乐观更新以提升感知速度
function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTask,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previous = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        old.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
      );

      return { previous };
    },
    onError: (_err, _taskId, context) => {
      queryClient.setQueryData(['tasks'], context?.previous);
    },
  });
}
```

## 另请参阅

有关详细的可访问性要求和测试工具，请参阅 `references/accessibility-checklist.md`。

## 常见借口

| 借口                               | 现实                                                                 |
| ---------------------------------- | -------------------------------------------------------------------- |
| “可访问性只是锦上添花”             | 在许多司法管辖区，这是法律要求，也是工程质量标准。                   |
| “我们之后再搞响应式”               | 改造响应式设计比从开始就构建要难 3 倍。                              |
| “设计还没最终确定，所以先跳过样式” | 使用设计系统的默认值。未设置样式的 UI 会给评审者留下破碎的第一印象。 |
| “这只是一个原型”                   | 原型会成为生产代码。从一开始就打好基础。                             |
| “AI 审美目前还行”                  | 它暗示低质量。从一开始就使用项目的实际设计系统。                     |

## 危险信号

- 超过 200 行的组件（拆分它们）
- 内联样式或任意像素值
- 缺少错误状态、加载状态或空状态
- 没有键盘导航测试
- 仅用颜色指示状态（红色/绿色没有文本或图标）
- 通用的“AI 外观”（紫色渐变、过大的卡片、千篇一律的布局）

## 验证

构建 UI 后：

- [ ] 组件渲染时没有控制台错误
- [ ] 所有交互元素都可通过键盘操作（使用 Tab 键浏览页面）
- [ ] 屏幕阅读器可以传达页面的内容和结构
- [ ] 响应式：在 320px、768px、1024px、1440px 下均可正常使用
- [ ] 加载、错误和空状态均已处理
- [ ] 遵循项目的设计系统（间距、颜色、排版）
- [ ] 开发者工具或 axe-core 中没有可访问性警告
