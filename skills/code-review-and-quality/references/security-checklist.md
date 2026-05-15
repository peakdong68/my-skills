# 安全检查清单

Web 应用程序安全快速参考指南。请与 `security-and-hardening` 技能配合使用。

## 目录

- [提交前检查](#pre-commit-checks)
- [身份认证](#authentication)
- [授权管理](#authorization)
- [输入验证](#input-validation)
- [安全响应头](#security-headers)
- [CORS 配置](#cors-configuration)
- [数据保护](#data-protection)
- [依赖项安全](#dependency-security)
- [错误处理](#error-handling)
- [OWASP Top 10 快速参考](#owasp-top-10-quick-reference)

## 提交前检查

- [ ] 代码中无敏感信息（`git diff --cached | grep -i "password\|secret\|api_key\|token"`）
- [ ] `.gitignore` 已覆盖：`.env`、`.env.local`、`*.pem`、`*.key`
- [ ] `.env.example` 使用占位值（非真实密钥）

## 身份认证

- [ ] 密码使用 bcrypt（≥12 轮）、scrypt 或 argon2 进行哈希加密
- [ ] Session Cookie 设置：`httpOnly`、`secure`、`sameSite: 'lax'`
- [ ] 已配置会话过期时间（合理的 max-age）
- [ ] 登录接口启用速率限制（≤10 次尝试/15 分钟）
- [ ] 密码重置令牌：设有时效（≤1 小时）、单次使用
- [ ] 多次失败后账户锁定（可选，建议配合通知机制）
- [ ] 敏感操作支持多因素认证（MFA）（可选但推荐）

## 授权管理

- [ ] 每个受保护端点均验证身份认证状态
- [ ] 每次资源访问均检查所有权/角色（防止 IDOR）
- [ ] 管理员端点需验证管理员角色权限
- [ ] API 密钥权限范围限定为最小必要权限
- [ ] JWT 令牌验证（签名、过期时间、签发者）

## 输入验证

- [ ] 所有用户输入在系统边界处验证（API 路由、表单处理器）
- [ ] 验证采用白名单机制（而非黑名单）
- [ ] 字符串长度受限（最小/最大值）
- [ ] 数值范围经过验证
- [ ] 邮箱、URL、日期格式使用正规库验证
- [ ] 文件上传：限制类型、限制大小、验证内容
- [ ] SQL 查询使用参数化（禁止字符串拼接）
- [ ] HTML 输出进行编码（使用框架自动转义）
- [ ] 重定向前验证 URL（防止开放重定向）

## 安全响应头

```
Content-Security-Policy: default-src 'self'; script-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0  （已禁用，依赖 CSP）
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## CORS 配置

```typescript
// 限制性配置（推荐）
cors({
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

// 生产环境严禁使用：
cors({ origin: '*' })  // 允许任意来源
```

## 数据保护

- [ ] 敏感字段从 API 响应中排除（`passwordHash`、`resetToken` 等）
- [ ] 敏感数据不记录到日志（密码、令牌、完整信用卡号）
- [ ] 个人身份信息（PII）静态加密存储（如法规要求）
- [ ] 所有外部通信使用 HTTPS
- [ ] 数据库备份加密

## 依赖项安全

```bash
# 审计依赖项
npm audit

# 自动修复可修复的问题
npm audit fix

# 检查关键级别漏洞
npm audit --audit-level=critical

# 保持依赖项更新
npx npm-check-updates
```

## 错误处理

```typescript
// 生产环境：返回通用错误，不暴露内部信息
res.status(500).json({
  error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' }
});

// 生产环境严禁返回：
res.status(500).json({
  error: err.message,
  stack: err.stack,         // 暴露内部堆栈信息
  query: err.sql,           // 暴露数据库查询细节
});
```

## OWASP Top 10 快速参考

| #   | 漏洞类型           | 防护措施                         |
| --- | -------------- | ---------------------------- |
| 1   | 访问控制失效         | 每个端点进行身份认证检查，验证资源所有权         |
| 2   | 加密机制失效         | 使用 HTTPS、强哈希算法、代码中不包含密钥      |
| 3   | 注入攻击           | 使用参数化查询、输入验证                 |
| 4   | 不安全设计          | 威胁建模、规范驱动开发                  |
| 5   | 安全配置错误         | 配置安全响应头、最小权限原则、审计依赖项         |
| 6   | 易受攻击的组件        | 使用 `npm audit`、保持依赖项更新、最小化依赖 |
| 7   | 身份认证失效         | 强密码策略、速率限制、会话管理              |
| 8   | 数据完整性失效        | 验证更新/依赖项、使用签名制品              |
| 9   | 日志记录失效         | 记录安全事件、不记录敏感信息               |
| 10  | 服务器端请求伪造（SSRF） | 验证/白名单 URL、限制出站请求            |