---
name: security-and-hardening
description: 针对漏洞对代码进行加固。用于处理用户输入、认证、数据存储或外部集成的场景。用于构建任何接收不可信数据、管理用户会话或与第三方服务交互的功能。
---

# 安全与加固

## 概述

面向 Web 应用的安全优先开发实践。将每条外部输入都视为敌意的，将每个密钥都视为神圣的，并将每次授权检查都视为强制性的。安全不是一个阶段——它是贯穿每一行涉及用户数据、认证或外部系统的代码的约束。

## 适用场景

- 构建任何接收用户输入的功能
- 实现认证或授权
- 存储或传输敏感数据
- 与外部 API 或服务集成
- 添加文件上传、Webhook 或回调
- 处理支付或个人身份信息（PII）数据

## 三层边界系统

### 始终执行（无例外）

- **在系统边界验证所有外部输入**（API 路由、表单处理器）
- **对所有数据库查询进行参数化处理** —— 永远不要将用户输入拼接到 SQL 中
- **对输出进行编码**以防止 XSS（使用框架的自动转义，不要绕过它）
- **对所有外部通信使用 HTTPS**
- **使用 bcrypt/scrypt/argon2 对密码进行哈希处理**（永远不要存储明文）
- **设置安全头部**（CSP、HSTS、X-Frame-Options、X-Content-Type-Options）
- **对会话使用 httpOnly、secure、sameSite cookies**
- **在每次发布前运行 `npm audit`**（或等效命令）

### 先询问（需要人工批准）

- 添加新的认证流程或更改认证逻辑
- 存储新类别的敏感数据（个人身份信息、支付信息）
- 添加新的外部服务集成
- 更改 CORS 配置
- 添加文件上传处理程序
- 修改速率限制或节流
- 授予提升的权限或角色

### 永远不做

- **永远不要将密钥提交到版本控制中**（API 密钥、密码、令牌）
- **永远不要记录敏感数据**（密码、令牌、完整的信用卡号）
- **永远不要将客户端验证信任为安全边界**
- **永远不要为了方便而禁用安全头部**
- **永远不要对用户提供的数据使用 `eval()` 或 `innerHTML`**
- **永远不要将会话存储在客户端可访问的存储中**（如使用 localStorage 存储认证令牌）
- **永远不要向用户暴露堆栈跟踪或内部错误详情**

## OWASP Top 10 预防措施

### 1. 注入（SQL、NoSQL、操作系统命令）

```typescript
// 错误：通过字符串拼接导致 SQL 注入
const query = `SELECT * FROM users WHERE id = '${userId}'`;

// 正确：参数化查询
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);

// 正确：使用参数化输入的 ORM
const user = await prisma.user.findUnique({ where: { id: userId } });
```

### 2. 失效的认证

```typescript
// 密码哈希
import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 12;
const hashedPassword = await hash(plaintext, SALT_ROUNDS);
const isValid = await compare(plaintext, hashedPassword);

// 会话管理
app.use(
  session({
    secret: process.env.SESSION_SECRET, // 来自环境变量，而非代码
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // 无法通过 JavaScript 访问
      secure: true, // 仅 HTTPS 传输
      sameSite: 'lax', // CSRF 防护
      maxAge: 24 * 60 * 60 * 1000, // 24 小时
    },
  }),
);
```

### 3. 跨站脚本攻击（XSS）

```typescript
// 错误：将用户输入作为 HTML 渲染
element.innerHTML = userInput;

// 正确：使用框架自动转义（React 默认如此）
return <div>{userInput}</div>;

// 如果必须渲染 HTML，先进行净化
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```

### 4. 失效的访问控制

```typescript
// 始终检查授权，而不仅仅是认证
app.patch('/api/tasks/:id', authenticate, async (req, res) => {
  const task = await taskService.findById(req.params.id);

  // 检查已认证用户是否拥有该资源
  if (task.ownerId !== req.user.id) {
    return res.status(403).json({
      error: { code: 'FORBIDDEN', message: '无权修改此任务' },
    });
  }

  // 继续执行更新
  const updated = await taskService.update(req.params.id, req.body);
  return res.json(updated);
});
```

### 5. 安全配置错误

```typescript
// 安全头部（对 Express 使用 helmet）
import helmet from 'helmet';
app.use(helmet());

// 内容安全策略
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // 如有可能，进一步收紧
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
    },
  }),
);

// CORS — 限制为已知来源
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
  }),
);
```

### 6. 敏感数据泄露

```typescript
// 永远不要在 API 响应中返回敏感字段
function sanitizeUser(user: UserRecord): PublicUser {
  const { passwordHash, resetToken, ...publicFields } = user;
  return publicFields;
}

// 使用环境变量存储密钥
const API_KEY = process.env.STRIPE_API_KEY;
if (!API_KEY) throw new Error('STRIPE_API_KEY 未配置');
```

## 输入验证模式

### 在边界处进行 Schema 验证

```typescript
import { z } from 'zod';

const CreateTaskSchema = z.object({
  title: z.string().min(1).max(200).trim(),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.string().datetime().optional(),
});

// 在路由处理器处进行验证
app.post('/api/tasks', async (req, res) => {
  const result = CreateTaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: '输入无效',
        details: result.error.flatten(),
      },
    });
  }
  // result.data 现在是类型化且已验证的
  const task = await taskService.create(result.data);
  return res.status(201).json(task);
});
```

### 文件上传安全

```typescript
// 限制文件类型和大小
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function validateUpload(file: UploadedFile) {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new ValidationError('不允许的文件类型');
  }
  if (file.size > MAX_SIZE) {
    throw new ValidationError('文件过大（最大 5MB）');
  }
  // 不要信任文件扩展名——如对安全性要求高，请检查魔数（magic bytes）
}
```

## 对 npm audit 结果进行分类

并非所有审计发现都需要立即采取行动。请使用以下决策树：

```
npm audit 报告了一个漏洞
├── 严重程度：critical 或 high
│   ├── 在你的应用中，该易受攻击的代码是否可达？
│   │   ├── 是 --> 立即修复（更新、打补丁或替换该依赖项）
│   │   └── 否（仅开发环境依赖、未使用的代码路径） --> 尽快修复，但不构成阻塞
│   └── 是否有可用的修复？
│       ├── 是 --> 更新到已打补丁的版本
│       └── 否 --> 检查变通方案，考虑替换该依赖项，或将其加入许可名单并设定审核日期
├── 严重程度：moderate
│   ├── 在生产环境中可达？ --> 在下一个发布周期中修复
│   └── 仅开发环境？ --> 方便时修复，在待办列表中跟踪
└── 严重程度：low
    └── 在常规依赖项更新期间跟踪并修复
```

**关键问题：**

- 你的代码路径中是否实际调用了该易受攻击的函数？
- 该依赖项是运行时依赖还是仅开发环境依赖？
- 鉴于你的部署环境，该漏洞是否可能被利用（例如，仅在客户端应用中存在的服务器端漏洞）？

当你推迟修复时，请记录原因并设定审核日期。

## 速率限制

```typescript
import rateLimit from 'express-rate-limit';

// 通用 API 速率限制
app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 每个窗口最多 100 次请求
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// 对认证端点采用更严格的限制
app.use(
  '/api/auth/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // 每 15 分钟最多尝试 10 次
  }),
);
```

## 密钥管理

```
.env 文件：
  ├── .env.example  → 已提交（包含占位值的模板）
  ├── .env          → 未提交（包含真实的密钥）
  └── .env.local    → 未提交（本地覆盖值）

.gitignore 必须包含：
  .env
  .env.local
  .env.*.local
  *.pem
  *.key
```

**提交前务必检查：**

```bash
# 检查是否有意外暂存的密钥
git diff --cached | grep -i "password\|secret\|api_key\|token"
```

## 安全审查检查清单

```markdown
### 认证

- [ ] 密码是否使用 bcrypt/scrypt/argon2 进行哈希处理（盐值轮数 ≥ 12）
- [ ] 会话令牌是否设为 httpOnly、secure、sameSite
- [ ] 登录是否有速率限制
- [ ] 密码重置令牌是否会过期

### 授权

- [ ] 每个端点是否都检查了用户权限
- [ ] 用户是否只能访问自己的资源
- [ ] 管理员操作是否需要管理员角色验证

### 输入

- [ ] 是否在边界验证了所有用户输入
- [ ] SQL 查询是否进行了参数化处理
- [ ] HTML 输出是否经过编码/转义

### 数据

- [ ] 代码或版本控制中是否没有密钥
- [ ] API 响应中是否排除了敏感字段
- [ ] 个人身份信息在静态存储时是否已加密（如适用）

### 基础设施

- [ ] 安全头部是否已配置（CSP、HSTS 等）
- [ ] CORS 是否限制为已知来源
- [ ] 依赖项是否已审计过漏洞
- [ ] 错误消息是否未暴露内部信息
```

## 另请参阅

有关详细的安全检查清单和预提交验证步骤，请参阅 `references/security-checklist.md`。

## 常见的合理化解

| 合理化解                     | 实际情况                                                   |
| ---------------------------- | ---------------------------------------------------------- |
| "这是个内部工具，安全不重要" | 内部工具也会被入侵。攻击者总是找最薄弱的环节下手。         |
| "我们以后再补上安全措施"     | 安全改造比一开始就构建进去难上 10 倍。现在就加上。         |
| "没人会想利用这个的"         | 自动化扫描器会发现它。通过隐蔽性来保证安全不是真正的安全。 |
| "框架会处理安全问题的"       | 框架提供工具，但不提供保证。你仍然需要正确地使用它们。     |
| "这只是一个原型"             | 原型最终会进入生产环境。从第一天起就要养成安全习惯。       |

## 危险信号

- 用户输入被直接传递给数据库查询、Shell 命令或 HTML 渲染
- 源代码或提交历史中存在密钥
- API 端点缺乏认证或授权检查
- 缺少 CORS 配置或使用了通配符（`*`）来源
- 认证端点没有速率限制
- 向用户暴露堆栈跟踪或内部错误
- 依赖项存在已知的高危漏洞

## 验证

在实现安全相关的代码后：

- [ ] `npm audit` 未显示 critical 或 high 级别的漏洞
- [ ] 源代码或 git 历史中无密钥
- [ ] 所有用户输入均在系统边界进行了验证
- [ ] 在每个受保护的端点上都检查了认证和授权
- [ ] 响应中存在安全头部（使用浏览器开发者工具检查）
- [ ] 错误响应未暴露内部细节
- [ ] 认证端点上已启用了速率限制
