#!/bin/bash

echo "🔧 修复Docker网络问题..."

# 方案1: 配置Docker镜像源
echo "配置Docker镜像源..."
mkdir -p ~/.docker
cat > ~/.docker/daemon.json << EOF
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
EOF

# 重启Docker服务（需要管理员权限）
echo "请手动重启Docker Desktop或Docker服务"

# 方案2: 使用本地配置
echo "使用本地配置启动服务..."
docker-compose -f docker-compose.local.yml up --build -d

echo "✅ 修复完成！"