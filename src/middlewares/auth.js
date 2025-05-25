import { verifyToken } from '../utils/auth.js';
import { ResponseCode } from '../utils/response.js';

// 提取 token
const extractToken = (req) => 
  req.headers.authorization?.split(' ')[1];

// 验证中间件
export const authenticate = (req, res, next) => {
  const token = extractToken(req);
  
  if (!token) {
    return res.error(ResponseCode.UNAUTHORIZED, '需要登录');
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.error(ResponseCode.UNAUTHORIZED, '无效的登录信息');
  }
}; 