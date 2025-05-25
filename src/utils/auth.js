import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 密码加密
export const hashPassword = (password) => 
  bcrypt.hashSync(password, 10);

// 密码验证
export const verifyPassword = (password, hash) => 
  bcrypt.compareSync(password, hash);

// 生成 JWT token
export const generateToken = (user) => {
  // token 中包含的信息
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    // 不要包含敏感信息如密码
  };

  // 生成 token
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      // 可选配置
      issuer: 'your-app-name',    // token 签发者
      audience: 'your-app-users'   // token 接收者
    }
  );
};

// 验证 token
export const verifyToken = (token) => {
  try {
    // 验证并解码 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 检查 token 是否过期
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      throw new Error('Token has expired');
    }

    return decoded;
  } catch (error) {
    throw new Error('Invalid token: ' + error.message);
  }
}; 