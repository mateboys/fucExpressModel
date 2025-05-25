import express from 'express';
import { userQueries } from '../db/index.js';
import { hashPassword, verifyPassword, generateToken } from '../utils/auth.js';
import { authenticate } from '../middlewares/auth.js';
import { ResponseCode } from '../utils/response.js';

const router = express.Router();

// 用户注册 - POST /api/users/register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    // 检查邮箱是否已存在
    const existingUser = await userQueries.findByEmail(email);
    if (existingUser.length > 0) {
      return res.error(ResponseCode.CONFLICT, '邮箱已被注册', {
        field: 'email'
      });
    }

    // 创建新用户
    const hashedPassword = hashPassword(password);
    await userQueries.create({ email, password: hashedPassword, name });
    
    res.success({ email, name }, '注册成功');
  } catch (error) {
    res.error(ResponseCode.INTERNAL_ERROR, '服务器错误', {
      error: error.message
    });
  }
});

// 用户登录 - POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 查找用户
    const users = await userQueries.findByEmail(email);
    const user = users[0];
    
    if (!user || !verifyPassword(password, user.password)) {
      return res.error(ResponseCode.UNAUTHORIZED, '邮箱或密码错误', {
        field: 'credentials'
      });
    }

    // 生成 token
    const token = generateToken(user);
    res.success({ token, userId: user.id });
  } catch (error) {
    res.error(ResponseCode.INTERNAL_ERROR, '服务器错误', {
      error: error.message
    });
  }
});

// 获取用户信息 - GET /api/users/profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await userQueries.findById(req.user.id);
    if (!user) {
      return res.error(ResponseCode.NOT_FOUND, '用户不存在', {
        userId: req.user.id
      });
    }
    
    // 移除敏感信息
    const { password, ...userData } = user;
    res.success({ user: userData });
  } catch (error) {
    res.error(ResponseCode.INTERNAL_ERROR, '服务器错误');
  }
});

export default router; 