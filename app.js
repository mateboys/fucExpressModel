"use strict";

import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import indexRoutes from './src/routes/index.js';
import userRoutes from './src/routes/users.js';
import productRoutes from './src/routes/products.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { responseHandler } from './src/utils/response.js';
import { authenticate, handleJWTError } from './src/middlewares/auth.js';

// 环境变量配置
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS 配置
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // 允许发送凭证
  maxAge: 86400  // CORS 预检请求缓存时间
};

// 中间件
app.use(helmet());
app.use(cors(corsOptions));  // 使用配置的 CORS 选项
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(responseHandler);

// JWT 认证中间件
app.use(authenticate);
app.use(handleJWTError);

// API 路由
const apiRouter = express.Router();
app.use('/api', apiRouter);

// 各模块路由
apiRouter.use('/', indexRoutes);           // 基础路由: /api/health, /api/version
apiRouter.use('/users', userRoutes);       // 用户路由: /api/users/xxx
apiRouter.use('/products', productRoutes); // 商品路由: /api/products/xxx

// 404处理 - 在所有路由之后，处理未匹配的请求
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在',
    data: {}
  });
});

// 错误处理中间件 - 虽然定义在最后，但会处理所有前面中间件和路由中的错误
app.use(errorHandler);

export default app;
