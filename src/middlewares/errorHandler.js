import { ResponseCode } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || ResponseCode.INTERNAL_ERROR;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    code: statusCode,
    message: message,
    data: process.env.NODE_ENV === 'development' ? {
      stack: err.stack
    } : {}
  });
};

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
} 