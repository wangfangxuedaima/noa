# 生产环境Dockerfile
FROM node:18-alpine

# 安装构建依赖
RUN apk add --no-cache python3 make g++ gcc

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装所有依赖（包括开发依赖，以便能够构建项目）
RUN npm ci && npm cache clean --force

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 创建非root用户（安全最佳实践）
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# 更改文件所有权
RUN chown -R nestjs:nodejs /app
USER nestjs

# 启动应用
CMD ["npm", "run", "start:prod"]