// 响应状态码
export const ResponseCode = {
  SUCCESS: 200,           // 成功
  BAD_REQUEST: 400,       // 请求参数错误
  UNAUTHORIZED: 401,      // 未授权
  FORBIDDEN: 403,         // 禁止访问
  NOT_FOUND: 404,         // 资源不存在
  CONFLICT: 409,          // 资源冲突
  INTERNAL_ERROR: 500,    // 服务器内部错误
};

// 默认消息
const DefaultMessage = {
  [ResponseCode.SUCCESS]: 'success',
  [ResponseCode.BAD_REQUEST]: 'Bad Request',
  [ResponseCode.UNAUTHORIZED]: 'Unauthorized',
  [ResponseCode.FORBIDDEN]: 'Forbidden',
  [ResponseCode.NOT_FOUND]: 'Not Found',
  [ResponseCode.CONFLICT]: 'Resource Conflict',
  [ResponseCode.INTERNAL_ERROR]: 'Internal Server Error',
};

/**
 * @typedef {Object} ApiResponseType
 * @property {number} code - 响应状态码
 * @property {string} message - 响应消息
 * @property {Object} data - 响应数据
 */

// 统一响应格式
export class ApiResponse {
  /**
   * 生成成功响应
   * @param {Object} [data={}] - 响应数据
   * @param {string} [message=success] - 响应消息
   * @returns {ApiResponseType} 响应对象
   */
  static success(data = {}, message = DefaultMessage[ResponseCode.SUCCESS]) {
    return {
      code: ResponseCode.SUCCESS,
      message,
      data: data || {}  // 确保 data 始终是对象
    };
  }

  /**
   * 生成错误响应
   * @param {number} [code=500] - 错误状态码
   * @param {string} [message] - 错误消息
   * @param {Object} [data={}] - 错误详情数据
   * @returns {ApiResponseType} 响应对象
   */
  static error(code = ResponseCode.INTERNAL_ERROR, message = null, data = {}) {
    return {
      code,
      message: message || DefaultMessage[code] || 'Error',
      data: data || {}  // 确保 data 始终是对象
    };
  }
}

/**
 * Express 响应扩展中间件
 * @param {import('express').Request} req - Express 请求对象
 * @param {import('express').Response} res - Express 响应对象
 * @param {import('express').NextFunction} next - Express next 函数
 */
export const responseHandler = (req, res, next) => {
  // 扩展 response 对象
  res.success = function(data = {}, message = DefaultMessage[ResponseCode.SUCCESS]) {
    return this.json(ApiResponse.success(data, message));
  };

  res.error = function(code = ResponseCode.INTERNAL_ERROR, message = null, data = {}) {
    const statusCode = code < 600 ? code : 500;
    return this.status(statusCode).json(ApiResponse.error(code, message, data));
  };

  next();
}; 