#!/bin/bash

# 开发环境启动脚本

echo "🚀 启动开发环境..."

# 停止现有容器
echo "🛑 停止现有容器..."
docker-compose -f docker-compose.dev.yml down

# 启动开发环境
echo "🔨 启动开发环境..."
docker-compose -f docker-compose.dev.yml up --build

echo "✅ 开发环境启动完成！"
echo "🌐 应用地址: http://localhost:3000"
echo "📚 API文档: http://localhost:3000/api"
echo "🗄️ 数据库地址: localhost:3307"