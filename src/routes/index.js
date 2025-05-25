import express from 'express';
const router = express.Router();

// API 健康检查
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API 版本信息
router.get('/version', (req, res) => {
  res.json({
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API 文档重定向
router.get('/docs', (req, res) => {
  res.redirect('/api-docs');
});

export default router; 