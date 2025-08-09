#!/bin/bash

# Docker部署脚本

echo "🚀 开始部署NestJS应用..."

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

# 停止现有容器
echo "🛑 停止现有容器..."
docker-compose down

# 清理旧镜像（可选）
read -p "是否清理旧镜像？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 清理旧镜像..."
    docker system prune -f
fi

# 构建并启动服务
echo "🔨 构建并启动服务..."
docker-compose up --build -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 30

# 检查服务状态
echo "📊 检查服务状态..."
docker-compose ps

# 检查应用健康状态
echo "🏥 检查应用健康状态..."
for i in {1..10}; do
    if curl -f http://localhost:3000/api > /dev/null 2>&1; then
        echo "✅ 应用启动成功！"
        echo "🌐 应用地址: http://localhost:3000"
        echo "📚 API文档: http://localhost:3000/api"
        echo "🔑 默认账户: admin/admin123"
        exit 0
    fi
    echo "等待应用启动... ($i/10)"
    sleep 5
done

echo "❌ 应用启动失败，请检查日志："
docker-compose logs app

exit 1