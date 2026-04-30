---
name: code-simplification
description: 通过减少复杂度来简化代码，同时保持行为完全不变。用于在不改变行为的前提下重构代码以提升清晰度。用于代码可以运行但阅读、维护或扩展难度超出应有水平时。用于审查积累了大量不必要复杂度的代码时。
---

# 代码简化

> 灵感来源于 [Claude 代码简化器插件](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-simplifier/agents/code-simplifier.md)。在此适配为一种模型无关、流程驱动的技能，适用于任何 AI 编码智能体。

## 概述

在保持行为完全不变的前提下，通过降低复杂度来简化代码。目标不是减少行数——而是让代码更易于阅读、理解、修改和调试。每次简化都必须通过一个简单的检验："新团队成员理解这段简化后的代码，是否会比理解原始代码更快？"

## 何时使用

- 当一个特性已经可以工作且测试通过，但实现方式让人感觉比实际需要的更重时
- 在代码审查期间，当可读性或复杂度问题被标记出来时
- 当你遇到深度嵌套的逻辑、过长的函数或含义不清的名称时
- 重构在时间压力下编写的代码时
- 将分散在多个文件中的相关逻辑进行整合时
- 合并了引入重复或不一致性的变更后

**何时不应使用：**

- 代码已经足够清晰易读 —— 不要为了简化而简化
- 你还不理解代码在做什么 —— 先理解再简化
- 代码对性能敏感，且"更简单"的版本会在可测量的程度上更慢
- 你很快就要重写整个模块 —— 简化即将被丢弃的代码是浪费精力

## 五大原则

### 1. 完整保留行为

不要改变代码做了什么 —— 只改变它表达的方式。所有输入、输出、副作用、错误行为和边缘情况必须保持不变。如果你不确定某个简化会保留原有行为，就不要做。

```
每次修改前都要问自己：
→ 对于相同的输入，是否会产生相同的输出？
→ 是否保持了相同的错误行为？
→ 是否保持了相同的副作用和顺序？
→ 所有现有测试是否无需修改就能通过？
```

### 2. 遵循项目约定

简化意味着让代码与代码库更加一致，而不是强加外部偏好。在简化之前：

```
1. 阅读 CLAUDE.md 或项目约定
2. 研究周边代码如何处理类似的模式
3. 在以下方面匹配项目的风格：
   - 导入顺序和模块系统
   - 函数声明风格
   - 命名约定
   - 错误处理模式
   - 类型注解的深度
```

破坏项目一致性的简化不是简化 —— 那是折腾。

### 3. 清晰优于巧妙

当简洁的版本需要阅读者在心里停顿一下才能解析时，明确的代码比紧凑的代码更好。

```typescript
// 不清晰：密集的三元表达式链
const label = isNew
  ? 'New'
  : isUpdated
    ? 'Updated'
    : isArchived
      ? 'Archived'
      : 'Active';

// 清晰：可读的映射
function getStatusLabel(item: Item): string {
  if (item.isNew) return 'New';
  if (item.isUpdated) return 'Updated';
  if (item.isArchived) return 'Archived';
  return 'Active';
}
```

```typescript
// 不清晰：带有内联逻辑的链式 reduce
const result = items.reduce(
  (acc, item) => ({
    ...acc,
    [item.id]: { ...acc[item.id], count: (acc[item.id]?.count ?? 0) + 1 },
  }),
  {},
);

// 清晰：命名的中间步骤
const countById = new Map<string, number>();
for (const item of items) {
  countById.set(item.id, (countById.get(item.id) ?? 0) + 1);
}
```

### 4. 保持平衡

简化有一个失败模式：过度简化。注意以下陷阱：

- **过度内联** —— 移除一个为概念赋予名称的辅助函数，会让调用点更难阅读
- **合并不相关的逻辑** —— 把两个简单的函数合并成一个复杂的函数，并不是在简化
- **移除“不必要”的抽象** —— 有些抽象是为了可扩展性或可测试性而存在，并非为了复杂度
- **为减少行数而优化** —— 目标不是更少的行数，而是更容易理解

### 5. 范围限定在变更之处

默认只简化最近修改的代码。除非被明确要求扩大范围，否则不要顺手重构不相关的代码。不受范围约束的简化会在差异（diff）中制造噪音，并可能引发无意的回归。

## 简化流程

### 第 1 步：理解之后再动手（Chesterton's Fence）

在更改或移除任何东西之前，先理解它为什么存在。这就是 Chesterton's Fence：如果你看到路上有一道栅栏，却不知道它为什么在那里，就不要拆除它。先去理解其中的缘由，然后再决定这个缘由是否仍然成立。

```
在简化之前，先回答：
- 这段代码的职责是什么？
- 什么调用了它？它调用了什么？
- 边缘情况和错误路径有哪些？
- 有没有定义预期行为的测试？
- 它为什么会写成这样？（性能？平台限制？历史原因？）
- 检查 git blame：这段代码最初出现的上下文是什么？
```

如果你无法回答这些问题，你就还没准备好做简化。先去阅读更多上下文。

### 第 2 步：识别简化机会

扫描以下模式 —— 每一个都是具体的信号，而非模糊的坏味道：

**结构复杂度：**

| 模式                 | 信号                         | 简化方式                             |
| -------------------- | ---------------------------- | ------------------------------------ |
| 深度嵌套（3 层以上） | 难以跟踪控制流               | 将条件提取为卫语句或辅助函数         |
| 长函数（50 行以上）  | 承担多重职责                 | 拆分为具有描述性名称的单一职责函数   |
| 嵌套三元表达式       | 需要消耗脑力去解析           | 替换为 if/else 链、switch 或查询对象 |
| 布尔参数标记         | `doThing(true, false, true)` | 替换为选项对象或分开的函数           |
| 重复的条件判断       | 多处出现相同的 `if` 检查     | 提取为一个命名良好的谓词函数         |

**命名与可读性：**

| 模式                     | 信号                                    | 简化方式                                                 |
| ------------------------ | --------------------------------------- | -------------------------------------------------------- |
| 过于泛化的名称           | `data`、`result`、`temp`、`val`、`item` | 重命名以描述其内容：`userProfile`、`validationErrors`    |
| 缩写名称                 | `usr`、`cfg`、`btn`、`evt`              | 使用完整单词，除非该缩写在业界通用（`id`、`url`、`api`） |
| 误导性名称               | 名为 `get` 的函数还会修改状态           | 重命名以反映实际行为                                     |
| 解释“做了什么”的注释     | `count++` 上面一行写 `// 递增计数器`    | 删除注释 —— 代码本身已经足够清晰                         |
| 解释“为什么这么做”的注释 | `// 重试是因为该 API 在负载下不稳定`    | 保留这些 —— 它们承载了代码无法表达的意图                 |

**冗余：**

| 模式             | 信号                                         | 简化方式                     |
| ---------------- | -------------------------------------------- | ---------------------------- |
| 重复的逻辑       | 多处出现相同的 5 行以上代码                  | 提取为共享函数               |
| 死代码           | 不可达的分支、未使用的变量、被注释掉的代码块 | 移除（在确认它确实已死之后） |
| 不必要的抽象     | 没有带来任何价值的包装器                     | 内联包装器，直接调用底层函数 |
| 过度工程化的模式 | 工厂的工厂、只有一个策略的策略模式           | 替换为直接简单的方式         |
| 冗余的类型断言   | 将值转换为已经被推断出的类型                 | 移除断言                     |

### 第 3 步：增量地应用变更

每次只做一个简化。每次变更后运行测试。**把重构变更单独提交，不要和功能或缺陷修复混在一起。**一个既重构又添加功能的拉取请求应该拆成两个。

```
对每一个简化：
1. 进行变更
2. 运行测试套件
3. 如果测试通过 → 提交（或继续下一个简化）
4. 如果测试失败 → 回退并重新思考
```

避免将多个简化打包成一个未经测试的变更。一旦出现问题，你需要知道是哪个简化导致的。

**500 条规则：**如果一次重构将触及超过 500 行代码，请投入精力使用自动化工具（codemod、sed 脚本、AST 转换），而不是手动修改。这种规模的手动编辑既容易出错，又让审查者疲惫不堪。

### 第 4 步：验证结果

所有简化完成后，退一步整体评估：

```
比较修改前后：
- 简化后的版本是否真正更容易理解？
- 你是否引入了与代码库不一致的新模式？
- 差异（diff）是否干净且易于审查？
- 同事会认可这个变更吗？
```

如果“简化”后的版本更难以理解或审查，就回退。不是每一次简化尝试都会成功。

## 特定语言指南

### TypeScript / JavaScript

```typescript
// 简化：不必要的 async 包装器
// 修改前
async function getUser(id: string): Promise<User> {
  return await userService.findById(id);
}
// 修改后
function getUser(id: string): Promise<User> {
  return userService.findById(id);
}

// 简化：冗长的条件赋值
// 修改前
let displayName: string;
if (user.nickname) {
  displayName = user.nickname;
} else {
  displayName = user.fullName;
}
// 修改后
const displayName = user.nickname || user.fullName;

// 简化：手动构建数组
// 修改前
const activeUsers: User[] = [];
for (const user of users) {
  if (user.isActive) {
    activeUsers.push(user);
  }
}
// 修改后
const activeUsers = users.filter((user) => user.isActive);

// 简化：冗余的布尔返回
// 修改前
function isValid(input: string): boolean {
  if (input.length > 0 && input.length < 100) {
    return true;
  }
  return false;
}
// 修改后
function isValid(input: string): boolean {
  return input.length > 0 && input.length < 100;
}
```

### Python

```python
# 简化：冗长的字典构建
# 修改前
result = {}
for item in items:
    result[item.id] = item.name
# 修改后
result = {item.id: item.name for item in items}

# 简化：嵌套条件与提前返回
# 修改前
def process(data):
    if data is not None:
        if data.is_valid():
            if data.has_permission():
                return do_work(data)
            else:
                raise PermissionError("No permission")
        else:
            raise ValueError("Invalid data")
    else:
        raise TypeError("Data is None")
# 修改后
def process(data):
    if data is None:
        raise TypeError("Data is None")
    if not data.is_valid():
        raise ValueError("Invalid data")
    if not data.has_permission():
        raise PermissionError("No permission")
    return do_work(data)
```

### React / JSX

```tsx
// 简化：冗长的条件渲染
// 修改前
function UserBadge({ user }: Props) {
  if (user.isAdmin) {
    return <Badge variant='admin'>Admin</Badge>;
  } else {
    return <Badge variant='default'>User</Badge>;
  }
}
// 修改后
function UserBadge({ user }: Props) {
  const variant = user.isAdmin ? 'admin' : 'default';
  const label = user.isAdmin ? 'Admin' : 'User';
  return <Badge variant={variant}>{label}</Badge>;
}

// 简化：通过中间组件传递 props 的层层穿透
// 修改前 —— 考虑下用 context 或组合来解决这个问题是否更好。
// 这是一个需要判断的情况 —— 标注出来，不要自动重构。
```

## 常见借口

| 借口                               | 现实                                                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| “代码能跑就不要动它”               | 难以阅读的代码在出现问题时会难以修复。现在简化能为将来每一次修改节省时间。                                      |
| “行数少就是更简单”                 | 一行嵌套的三元表达式并不比一个 5 行的 if/else 更简单。简单关乎理解速度，而非行数。                              |
| “我顺手快速简化一下那部分无关代码” | 不受范围约束的简化会产生嘈杂的差异，并可能导致你不打算触碰的代码出现回归。请保持专注。                          |
| “类型让代码一目了然”               | 类型记载的是结构，不是意图。一个命名良好的函数比一个类型签名更能解释“为什么”。                                  |
| “这个抽象以后可能有用”             | 不要保留推测性的抽象。如果现在没有用到，它就是没有价值的复杂度。移除它，需要时再加回来。                        |
| “原作者必定有其原因”               | 也许有。去检查 git blame —— 运用 Chesterton's Fence。但积累的复杂度往往没有原因，只是压力下多次迭代留下的痕迹。 |
| “我一边加功能一边重构”             | 将重构与功能开发分开。混合的变更更难审查、更难回退，在历史中也更难以理解。                                      |

## 危险信号

- 需要修改测试才能通过的简化（你可能改变了行为）
- “简化”后的代码比原版更长、更难理解
- 将命名改为符合你个人偏好，而不是遵循项目约定
- 因为“这样代码更干净”而移除了错误处理
- 简化你不完全理解的代码
- 将多个简化打包成一个巨大且难以审查的提交
- 在没有被要求的情况下重构当前任务范围之外的代码

## 验证

完成一轮简化后：

- [ ] 所有现有测试无需修改就能通过
- [ ] 构建成功，没有新增警告
- [ ] 检查工具/格式化工具通过（没有风格上的回归）
- [ ] 每个简化都是一个可审查的、增量式的变更
- [ ] 差异（diff）干净 —— 没有混入不相关的变更
- [ ] 简化后的代码遵循项目约定（对照 CLAUDE.md 或等效文件检查）
- [ ] 没有移除或削弱任何错误处理
- [ ] 没有留下死代码（未使用的导入、不可达的分支）
- [ ] 同事或审查智能体会认可这次变更是净改进
