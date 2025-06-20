import { expressjwt } from 'express-jwt';
import { ResponseCode } from '../utils/response.js';

// 定义不需要验证token的路由
const unlessPath = {
  path: [
    '/api/users/login',
    '/api/users/register',
    '/api/health',
    '/api/version',
    { url: /^\/api\/products\/?$/, methods: ['GET'] },  // 允许未登录查看商品列表
    { url: /^\/api\/products\/[^\/]+$/, methods: ['GET'] }  // 允许未登录查看商品详情
  ]
};

// JWT 验证中间件
export const authenticate = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'auth', // token 解析后的信息会被设置到 req.auth
}).unless(unlessPath);

// JWT 错误处理中间件
export const handleJWTError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    let message = '需要登录';
    let code = ResponseCode.UNAUTHORIZED;

    // 根据具体的错误类型返回不同的错误信息
    switch (err.code) {
      case 'invalid_token':
        message = 'Token无效或已损坏';
        break;
      case 'credentials_required':
        message = '需要提供Token';
        break;
      case 'credential_bad_scheme':
        message = 'Token格式错误';
        break;
      case 'invalid_signature':
        message = 'Token签名无效';
        break;
      case 'jwt_expired':
        message = 'Token已过期';
        break;
      default:
        message = '认证失败';
    }

    // 在开发环境下提供更详细的错误信息
    const data = process.env.NODE_ENV === 'development' 
      ? { error: err.code, inner: err.inner }
      : {};

    return res.status(401).json({
      code,
      message,
      data
    });
  }
  
  // 其他类型的错误传递给下一个错误处理中间件
  next(err);
}; 