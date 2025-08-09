require('dotenv').config();
const jwt = require('jsonwebtoken');

// 测试 JWT 签名
try {
  const token = jwt.sign({ username: 'admin', sub: 1 }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  console.log('JWT 令牌生成成功:', token);
} catch (error) {
  console.error('JWT 令牌生成失败:', error.message);
}