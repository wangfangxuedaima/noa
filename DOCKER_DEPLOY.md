# Docker 部署指南

## 🚀 快速开始

### 1. 环境准备

确保已安装：
- Docker (>= 20.10)
- Docker Compose (>= 2.0)

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量（生产环境请修改密码和密钥）
vim .env
```

### 3. 部署方式

#### 开发环境部署
```bash
# 使用开发环境配置
docker-compose -f docker-compose.dev.yml up --build

# 或使用脚本
./scripts/dev.sh
```

#### 生产环境部署
```bash
# 使用生产环境配置
docker-compose up --build -d

# 或使用部署脚本
./scripts/deploy.sh
```

#### 高可用生产环境
```bash
# 使用生产环境配置（包含负载均衡）
docker-compose -f docker-compose.prod.yml up --build -d
```

## 📋 服务说明

### 服务组件

| 服务 | 端口 | 说明 |
|------|------|------|
| app | 3000 | NestJS应用主服务 |
| mysql | 3306 | MySQL数据库 |
| redis | 6379 | Redis缓存（可选） |
| nginx | 80/443 | 反向代理（生产环境） |

### 环境变量说明

```env
# 数据库配置
DB_HOST=mysql                    # 数据库主机
DB_PORT=3306                     # 数据库端口
DB_USERNAME=nestjs               # 数据库用户名
DB_PASSWORD=nestjs123            # 数据库密码
DB_DATABASE=nestjs_api           # 数据库名

# JWT配置
JWT_SECRET=your-secret-key       # JWT密钥（生产环境必须修改）
JWT_EXPIRES_IN=7d               # Token过期时间

# 应用配置
PORT=3000                       # 应用端口
NODE_ENV=production             # 运行环境
```

## 🛠️ 常用命令

### 启动服务
```bash
# 后台启动
docker-compose up -d

# 前台启动（查看日志）
docker-compose up

# 重新构建并启动
docker-compose up --build -d
```

### 查看状态
```bash
# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs app
docker-compose logs mysql

# 实时查看日志
docker-compose logs -f app
```

### 停止服务
```bash
# 停止服务
docker-compose down

# 停止并删除数据卷
docker-compose down -v
```

### 数据库操作
```bash
# 进入MySQL容器
docker-compose exec mysql mysql -u nestjs -p nestjs_api

# 备份数据库
docker-compose exec mysql mysqldump -u nestjs -p nestjs_api > backup.sql

# 恢复数据库
docker-compose exec -T mysql mysql -u nestjs -p nestjs_api < backup.sql
```

### 应用操作
```bash
# 进入应用容器
docker-compose exec app sh

# 查看应用日志
docker-compose logs -f app

# 重启应用
docker-compose restart app
```

## 🔧 故障排除

### 常见问题

1. **数据库连接失败**
   ```bash
   # 检查MySQL容器状态
   docker-compose ps mysql
   
   # 查看MySQL日志
   docker-compose logs mysql
   
   # 重启MySQL服务
   docker-compose restart mysql
   ```

2. **应用启动失败**
   ```bash
   # 查看应用日志
   docker-compose logs app
   
   # 检查环境变量
   docker-compose exec app env | grep DB_
   ```

3. **端口冲突**
   ```bash
   # 修改docker-compose.yml中的端口映射
   ports:
     - "3001:3000"  # 改为其他端口
   ```

### 健康检查
```bash
# 检查应用健康状态
curl http://localhost:3000/api

# 检查数据库连接
docker-compose exec app npm run typeorm:check
```

## 🚀 生产环境优化

### 1. 安全配置
- 修改默认密码
- 使用强JWT密钥
- 配置HTTPS证书
- 限制数据库访问

### 2. 性能优化
- 启用Redis缓存
- 配置数据库连接池
- 使用Nginx负载均衡
- 启用Gzip压缩

### 3. 监控配置
```bash
# 添加监控服务
docker-compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
```

## 📊 监控和日志

### 日志管理
```bash
# 配置日志轮转
docker-compose exec app npm install winston-daily-rotate-file

# 查看应用指标
docker stats
```

### 备份策略
```bash
# 自动备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec mysql mysqldump -u nestjs -p nestjs_api > backup_$DATE.sql
```

## 🔄 更新部署

```bash
# 拉取最新代码
git pull

# 重新构建并部署
docker-compose up --build -d

# 检查服务状态
docker-compose ps