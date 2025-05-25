import { ResponseCode } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  // 如果响应已经发送，传递错误到默认的 Express 错误处理
  if (res.headersSent) {
    return next(err);
  }

  // 处理不同类型的错误
  const statusCode = err.statusCode || ResponseCode.INTERNAL_ERROR;
  const message = err.message || 'Internal Server Error';

  // 特殊错误类型处理
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // JSON 解析错误
    return res.status(400).json({
      code: 400,
      message: 'Invalid JSON',
      data: { error: err.message }
    });
  }

  // 默认错误响应
  res.status(statusCode).json({
    code: statusCode,
    message: message,
    data: process.env.NODE_ENV === 'development' ? {
      stack: err.stack,
      // 在开发环境下提供更多错误信息
      type: err.name,
      details: err.details || {}
    } : {}
  });
};

export class AppError extends Error {
  constructor(message, statusCode, details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}