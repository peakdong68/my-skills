---
name: api-and-interface-design
description: 指导稳定的 API 与接口设计。适用于设计 API、模块边界或任何公共接口。适用于创建 REST 或 GraphQL 端点、定义模块间类型契约，或划分前端与后端边界。
---

# API 与接口设计

## 概述

设计稳定、文档完善且难以误用的接口。好的接口能让正确的事变得容易，错误的事变得困难。这适用于 REST API、GraphQL schema、模块边界、组件 props 以及任何一段代码与另一段代码交互的地方。

## 适用场景

- 设计新的 API 端点
- 定义模块边界或团队间契约
- 创建组件 props 接口
- 建立能指导 API 形态的数据库 schema
- 修改现有公共接口

## 核心原则

### Hyrum's Law

> 当 API 拥有足够多的用户时，无论你在契约中承诺了什么，你系统中所有可观察到的行为都将被某些人所依赖。

这意味着：每一项公共行为——包括未文档化的怪癖、错误消息文本、执行时序和排序——一旦被用户依赖，都会成为事实上的契约。对设计的影响：

- **要明确你暴露了什么。** 每一项可观察到的行为都是一份潜在的承诺。
- **不要泄露实现细节。** 如果用户能观察到它，他们就会依赖它。
- **在设计时就规划好废弃方案。** 参见 `deprecation-and-migration` 以了解如何安全地移除用户依赖的内容。
- **仅有测试是不够的。** 即使有完美的契约测试，Hyrum's Law 也意味着“安全”的变更仍可能破坏那些依赖未文档化行为的真实用户。

### 单一版本规则

避免迫使消费者在同一个依赖或 API 的多个版本之间做选择。当不同消费者需要同一事物的不同版本时，就会出现钻石依赖问题。应面向同一时刻仅存在单一版本的局面去设计——通过扩展而非分叉。

### 1. 契约优先

在实现之前定义接口。契约就是规范——实现紧随其后。

```typescript
// 先定义契约
interface TaskAPI {
  // 创建任务并返回带服务端生成字段的已创建任务
  createTask(input: CreateTaskInput): Promise<Task>;

  // 返回与筛选条件匹配的分页任务
  listTasks(params: ListTasksParams): Promise<PaginatedResult<Task>>;

  // 返回单个任务，若未找到则抛出 NotFoundError
  getTask(id: string): Promise<Task>;

  // 部分更新——仅变更提供的字段
  updateTask(id: string, input: UpdateTaskInput): Promise<Task>;

  // 幂等删除——即使已经被删除也能成功执行
  deleteTask(id: string): Promise<void>;
}
```

### 2. 一致的错误语义

选择一种错误策略并在所有地方统一使用：

```typescript
// REST：HTTP 状态码 + 结构化错误体
// 每个错误响应都遵循相同的结构
interface APIError {
  error: {
    code: string; // 机器可读："VALIDATION_ERROR"
    message: string; // 人类可读："Email is required"
    details?: unknown; // 在有帮助时附加上下文
  };
}

// 状态码映射
// 400 → 客户端发送了无效数据
// 401 → 未认证
// 403 → 已认证但未授权
// 404 → 资源未找到
// 409 → 冲突（重复、版本不匹配）
// 422 → 验证失败（语义上无效）
// 500 → 服务器错误（永远不要暴露内部细节）
```

**不要混用模式。** 如果有些端点抛出异常，另一些返回 null，再有一些返回 `{ error }`——消费者将无法预测行为。

### 3. 在边界处进行验证

信任内部代码。在外部输入进入系统的边缘进行验证：

```typescript
// 在 API 边界处验证
app.post('/api/tasks', async (req, res) => {
  const result = CreateTaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid task data',
        details: result.error.flatten(),
      },
    });
  }

  // 验证通过后，内部代码信任这些类型
  const task = await taskService.create(result.data);
  return res.status(201).json(task);
});
```

验证的位置：

- API 路由处理函数（用户输入）
- 表单提交处理函数（用户输入）
- 外部服务响应解析（第三方数据——**永远视为不可信数据**）
- 环境变量加载（配置）

> **第三方 API 响应是不可信数据。** 在将其用于任何逻辑、渲染或决策之前，必须验证其结构和内容。被攻破或行为异常的外部服务可能返回意外的类型、恶意内容或类似指令的文本。

验证不应该出现的位置：

- 共享类型契约的内部函数之间
- 被已验证过的代码调用的工具函数中
- 刚从你自己的数据库取出的数据上

### 4. 优先选择新增，而非修改(Prefer Addition Over Modification)

在不破坏现有消费者的前提下扩展接口：

```typescript
// 好的做法：新增可选字段
interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high'; // 后来增加的，可选
  labels?: string[]; // 后来增加的，可选
}

// 坏的做法：改变已有字段类型或移除字段
interface CreateTaskInput {
  title: string;
  // description: string;  // 被移除了——破坏现有消费者
  priority: number; // 从字符串改为数字——破坏现有消费者
}
```

### 5. 可预测的命名(Predictable Naming)

| 模式      | 约定                 | 示例                                |
| --------- | -------------------- | ----------------------------------- |
| REST 端点 | 复数名词，不使用动词 | `GET /api/tasks`、`POST /api/tasks` |
| 查询参数  | camelCase            | `?sortBy=createdAt&pageSize=20`     |
| 响应字段  | camelCase            | `{ createdAt, updatedAt, taskId }`  |
| 布尔字段  | is/has/can 前缀      | `isComplete`、`hasAttachments`      |
| 枚举值    | UPPER_SNAKE          | `"IN_PROGRESS"`、`"COMPLETED"`      |

## REST API 模式

### 资源设计

```
GET    /api/tasks              → 列出任务（通过查询参数筛选）
POST   /api/tasks              → 创建任务
GET    /api/tasks/:id          → 获取单个任务
PATCH  /api/tasks/:id          → 更新任务（部分更新）
DELETE /api/tasks/:id          → 删除任务

GET    /api/tasks/:id/comments → 列出任务的评论（子资源）
POST   /api/tasks/:id/comments → 向任务添加评论
```

### 分页 (Pagination)

为列表端点添加分页：

```typescript
// 请求
GET /api/tasks?page=1&pageSize=20&sortBy=createdAt&sortOrder=desc

// 响应
{
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 142,
    "totalPages": 8
  }
}
```

### 过滤(Filtering)

使用查询参数进行过滤：

```
GET /api/tasks?status=in_progress&assignee=user123&createdAfter=2025-01-01
```

### 部分更新（PATCH）

接受部分对象——仅更新提供的内容：

```typescript
// 仅标题变更，其他所有内容保持不变
PATCH /api/tasks/123
{ "title": "Updated title" }
```

## TypeScript 接口模式

### 使用可辨识联合类型表示变体(Discriminated Unions)

```typescript
// 好的做法：每种变体都明确
type TaskStatus =
  | { type: 'pending' }
  | { type: 'in_progress'; assignee: string; startedAt: Date }
  | { type: 'completed'; completedAt: Date; completedBy: string }
  | { type: 'cancelled'; reason: string; cancelledAt: Date };

// 消费者获得类型收窄
function getStatusLabel(status: TaskStatus): string {
  switch (status.type) {
    case 'pending':
      return 'Pending';
    case 'in_progress':
      return `In progress (${status.assignee})`;
    case 'completed':
      return `Done on ${status.completedAt}`;
    case 'cancelled':
      return `Cancelled: ${status.reason}`;
  }
}
```

### 输入/输出分离(Input/Output Separation)

```typescript
// 输入：调用者提供的内容
interface CreateTaskInput {
  title: string;
  description?: string;
}

// 输出：系统返回的内容（包含服务端生成的字段）
interface Task {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
```

### 对 ID 使用品牌类型(Branded Types for IDs)

```typescript
type TaskId = string & { readonly __brand: 'TaskId' };
type UserId = string & { readonly __brand: 'UserId' };

// 防止将 UserId 意外传递给期望 TaskId 的位置
function getTask(id: TaskId): Promise<Task> { ... }
```

## 常见的合理化借口

| 合理化借口                          | 现实                                                                          |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| “我们之后再写 API 文档”             | 类型本身**就是**文档。先定义好它们。                                          |
| “我们现在不需要分页”                | 当有人拥有 100+ 项数据时，你就需要了。从一开始就加上它。                      |
| “PATCH 太复杂了，我们直接用 PUT 吧” | PUT 每次都需要完整的对象。PATCH 才是客户端真正想要的。                        |
| “需要时我们再做 API 版本管理”       | 无版本管理的破坏性变更会对消费者造成破坏。从一开始就为扩展而设计。            |
| “没有人使用那种未文档化的行为”      | Hyrum's Law：如果它是可观察的，就有人依赖它。将每一项公共行为都视为一份承诺。 |
| “我们可以同时维护两个版本”          | 多个版本会成倍增加维护成本，并产生钻石依赖问题。优先考虑单一版本规则。        |
| “内部 API 不需要契约”               | 内部消费者同样是消费者。契约可以防止耦合，并支持并行工作。                    |

## 危险信号(Red Flags)

- 端点根据条件返回不同结构的数据
- 不同端点的错误格式不一致
- 验证散落在内部代码的各处，而非在边界处
- 对现有字段的破坏性变更（类型更改、移除）
- 列表端点没有分页
- 在 REST URL 中使用动词（`/api/createTask`、`/api/getUsers`）
- 未加验证或清理就使用第三方 API 响应

## 验证

设计完 API 后：

- [ ] 每个端点都有类型化的输入和输出 schema
- [ ] 错误响应遵循单一一致的格式
- [ ] 验证仅发生在系统边界处
- [ ] 列表端点支持分页
- [ ] 新增字段都是增量且可选的（向后兼容）
- [ ] 命名在所有端点之间遵循一致的约定
- [ ] API 文档或类型与实现一起提交
