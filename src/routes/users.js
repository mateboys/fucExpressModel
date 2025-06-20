import express from 'express';
import { handleUserLogin, handleUserRegister, handleGetUserProfile } from '../handlers/userHandlers.js';
import { AppError } from '../middlewares/errorHandler.js';
import { ResponseCode } from '../utils/response.js';

const router = express.Router();

// 用户登录路由
router.post('/login', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new AppError('用户名和密码不能为空', ResponseCode.BAD_REQUEST);
    }
    const result = await handleUserLogin(req.body);
    res.success(result);
  } catch (error) {
    next(error);
  }
});

// 用户注册路由
router.post('/register', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      throw new AppError('注册信息不完整', ResponseCode.BAD_REQUEST);
    }
    const result = await handleUserRegister(req.body);
    res.success(result);
  } catch (error) {
    next(error);
  }
});

// 获取用户信息路由
router.get('/profile', async (req, res, next) => {
  try {
    if (!req.query.userId) {
      throw new AppError('用户ID不能为空', ResponseCode.BAD_REQUEST);
    }
    // 注意：现在用户信息在 req.auth 中
    const result = await handleGetUserProfile(req.query.userId);
    res.success(result);
  } catch (error) {
    next(error);
  }
});

export default router; 