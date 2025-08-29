# NestJS API 服务

基于 NestJS 的中小项目 API 服务，包含 JWT 登录、角色控制、Swagger 文档、统一响应格式和基础 CRUD 功能。

## 说明

>本项目基于 [CloudBase AlToolKit ](https://docs.cloudbase.net/cli-v1/ai/introduce)开发，通过A!提示词和 MCP 协议+云开发，让开发更智能、更高效，支持A1生成全栈代码、一键部署至腾讯云开发(免服务器)、智能日志修复。

## 功能特性

- ✅ JWT 身份认证
- ✅ 基于角色的访问控制 (RBAC)
- ✅ Swagger API 文档
- ✅ 统一响应格式
- ✅ 全局异常处理
- ✅ 数据验证
- ✅ 用户管理 CRUD
- ✅ 角色管理 CRUD
- ✅ TypeORM 数据库集成
- ✅ 密码加密

## 技术栈

- **框架**: NestJS
- **数据库**: MySQL + TypeORM
- **认证**: JWT + Passport
- **文档**: Swagger
- **验证**: class-validator
- **加密**: bcryptjs

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env` 文件并修改数据库配置：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=123456
DB_DATABASE=nestjs_api

# JWT配置
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# 应用配置
PORT=3000
NODE_ENV=development
```

### 3. 创建数据库

```sql
CREATE DATABASE nestjs_api;
```

### 4. 启动应用

```bash
# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

### 5. 访问应用

- **API 服务**: http://localhost:3000
- **Swagger 文档**: http://localhost:3000/api

## 默认账户

系统会自动创建默认管理员账户：

- **用户名**: admin
- **密码**: admin123

## API 接口

### 认证接口

- `POST /auth/login` - 用户登录

### 用户管理

- `GET /users` - 获取用户列表 (需要 admin 角色)
- `GET /users/:id` - 获取用户详情
- `POST /users` - 创建用户 (需要 admin 角色)
- `PATCH /users/:id` - 更新用户 (需要 admin 角色)
- `DELETE /users/:id` - 删除用户 (需要 admin 角色)

### 角色管理

- `GET /roles` - 获取角色列表
- `GET /roles/:id` - 获取角色详情
- `POST /roles` - 创建角色 (需要 admin 角色)
- `PATCH /roles/:id` - 更新角色 (需要 admin 角色)
- `DELETE /roles/:id` - 删除角色 (需要 admin 角色)

## 统一响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 错误响应格式

```json
{
  "code": 400,
  "message": "错误信息",
  "data": null,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint"
}
```

## 项目结构

```
src/
├── common/                 # 通用模块
│   ├── filters/           # 异常过滤器
│   └── interceptors/      # 拦截器
├── modules/               # 业务模块
│   ├── auth/             # 认证模块
│   ├── users/            # 用户模块
│   └── roles/            # 角色模块
├── database/             # 数据库相关
│   └── seeds/           # 数据初始化
├── app.module.ts         # 应用主模块
└── main.ts              # 应用入口
```

## 开发指南

### 添加新的模块

1. 创建模块目录结构
2. 定义实体 (Entity)
3. 创建 DTO 类
4. 实现服务 (Service)
5. 创建控制器 (Controller)
6. 创建模块 (Module)
7. 在 AppModule 中导入

### 权限控制

使用 `@Roles()` 装饰器控制接口访问权限：

```typescript
@Roles('admin', 'user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Get()
findAll() {
  // 只有 admin 或 user 角色可以访问
}
```

## 部署

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### PM2 部署

```bash
npm install -g pm2
npm run build
pm2 start dist/main.js --name "nestjs-api"
```

## 许可证

MIT License