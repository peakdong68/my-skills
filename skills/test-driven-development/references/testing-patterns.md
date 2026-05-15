# 测试模式参考手册

跨技术栈常用测试模式的快速参考。请与 `test-driven-development`（测试驱动开发）技能配合使用。

## 目录

- [测试结构（排列-执行-断言）](#test-structure-arrange-act-assert)
- [测试命名规范](#test-naming-conventions)
- [常用断言](#common-assertions)
- [Mock 模式](#mocking-patterns)
- [React/组件测试](#reactcomponent-testing)
- [API / 集成测试](#api--integration-testing)
- [端到端测试（Playwright）](#e2e-testing-playwright)
- [测试反模式](#test-anti-patterns)

## 测试结构（排列-执行-断言）

```typescript
it('描述预期行为', () => {
   // Arrange：设置测试数据和前置条件
  const input = { title: 'Test Task', priority: 'high' };

  // Act：执行被测操作
  const result = createTask(input);

  // Assert：验证结果
  expect(result.title).toBe('Test Task');
  expect(result.priority).toBe('high');
  expect(result.status).toBe('pending');
});
```

## 测试命名规范

```typescript
// 模式：[被测单元] [预期行为] [条件]
describe('TaskService.createTask', () => {
  it('创建一条默认状态为 pending 的任务', () => {});
  it('当标题为空时抛出 ValidationError', () => {});
  it('去除标题中的空白字符', () => {});
  it('为每条任务生成唯一 ID', () => {});
});
```

## 常用断言

```typescript
// 相等性
expect(result).toBe(expected);           // 严格相等（===）
expect(result).toEqual(expected);        // 深度相等（对象/数组）
expect(result).toStrictEqual(expected);  // 深度相等 + 类型匹配

// 真值性
expect(result).toBeTruthy();
expect(result).toBeFalsy();
expect(result).toBeNull();
expect(result).toBeDefined();
expect(result).toBeUndefined();

// 数值
expect(result).toBeGreaterThan(5);
expect(result).toBeLessThanOrEqual(10);
expect(result).toBeCloseTo(0.3, 5);      // 浮点数

// 字符串
expect(result).toMatch(/pattern/);
expect(result).toContain('substring');

// 数组 / 对象
expect(array).toContain(item);
expect(array).toHaveLength(3);
expect(object).toHaveProperty('key', 'value');

// 错误
expect(() => fn()).toThrow();
expect(() => fn()).toThrow(ValidationError);
expect(() => fn()).toThrow('specific message');

// 异步
await expect(asyncFn()).resolves.toBe(value);
await expect(asyncFn()).rejects.toThrow(Error);
```

## Mock 模式

### Mock 函数

```typescript
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue({ data: 'test' });
mockFn.mockImplementation((x) => x * 2);

expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledTimes(3);
```

### Mock 模块

```typescript
// Mock 整个模块
jest.mock('./database', () => ({
  query: jest.fn().mockResolvedValue([{ id: 1, title: 'Test' }]),
}));

// Mock 特定导出
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  generateId: jest.fn().mockReturnValue('test-id'),
}));
```

### 仅在边界处进行 Mock

```
建议 Mock 这些：              不建议 Mock 这些：
├── 数据库调用                ├── 内部工具函数
├── HTTP 请求                 ├── 业务逻辑
├── 文件系统操作              ├── 数据转换
├── 外部 API 调用             ├── 验证函数
└── 时间/日期（必要时）        └── 纯函数
```

## React/组件测试

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('TaskForm', () => {
  it('提交表单时携带输入的数据', async () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    // 通过无障碍角色/标签查找元素（而不是测试 ID）
    await screen.findByRole('textbox', { name: /title/i });
    fireEvent.change(screen.getByRole('textbox', { name: /title/i }), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ title: 'New Task' });
    });
  });

  it('当标题为空时显示验证错误', async () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });
});
```

## API / 集成测试

```typescript
import request from 'supertest';
import { app } from '../src/app';

describe('POST /api/tasks', () => {
  it('创建任务并返回 201', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' })
      .set('Authorization', `Bearer ${testToken}`)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      title: 'Test Task',
      status: 'pending',
    });
  });

  it('无效输入返回 422', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: '' })
      .set('Authorization', `Bearer ${testToken}`)
      .expect(422);

    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('未认证时返回 401', async () => {
    await request(app)
      .post('/api/tasks')
      .send({ title: 'Test' })
      .expect(401);
  });
});
```

## 端到端测试（Playwright）

```typescript
import { test, expect } from '@playwright/test';

test('用户可以创建并完成任务', async ({ page }) => {
  // 导航并认证
  await page.goto('/');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'testpass123');
  await page.click('button:has-text("Log in")');

  // 创建任务
  await page.click('button:has-text("New Task")');
  await page.fill('[name="title"]', 'Buy groceries');
  await page.click('button:has-text("Create")');

  // 验证任务已显示
  await expect(page.locator('text=Buy groceries')).toBeVisible();

  // 完成任务
  await page.click('[aria-label="Complete Buy groceries"]');
  await expect(page.locator('text=Buy groceries')).toHaveCSS(
    'text-decoration-line', 'line-through'
  );
});
```

## 测试反模式

| 反模式 | 问题 | 更好的做法 |
|---|---|---|
| 测试实现细节 | 重构时会破坏测试 | 测试输入/输出 |
| 对所有内容使用快照 | 无人审查快照差异 | 断言具体值 |
| 共享可变状态 | 测试相互污染 | 每个测试独立设置/清理 |
| 测试第三方代码 | 浪费时间，问题不在你 | Mock 边界 |
| 跳过测试以通过 CI | 隐藏真实缺陷 | 修复或删除测试 |
| 永久使用 `test.skip` | 产生死代码 | 移除或修复它 |
| 断言过于宽泛 | 无法捕获回归问题 | 保持断言具体 |
| 缺少异步错误处理 | 错误被吞没，产生假通过 | 始终 `await` 异步测试 |
