# 电商后台管理系统 API

基于 Express.js 构建的现代化电商后台 API 服务，采用 ES Modules 规范。

## 技术栈

- Node.js
- Express.js
- MySQL
- JWT (认证)
- ESM (ES Modules)

## 项目特点

- 🚀 现代化的 ES Modules 项目结构
- 🔐 JWT 身份认证
- 🌐 统一的 API 响应格式
- 🛡️ 完善的错误处理机制
- 📝 详细的日志记录
- 🔧 灵活的环境配置

## 项目结构

```
├── src/
│   ├── routes/          # 路由定义
│   │   ├── index.js     # 基础路由
│   │   ├── users.js     # 用户相关路由
│   │   └── products.js  # 商品相关路由
│   ├── middlewares/     # 中间件
│   │   └── errorHandler.js
│   └── utils/          # 工具函数
│       └── response.js  # 响应格式化
├── public/             # 静态资源
├── bin/
│   └── www.js          # 应用启动脚本
├── app.js              # 应用主文件
├── package.json
└── .env               # 环境变量配置
```

## API 响应格式

所有 API 响应都遵循统一的格式：

```javascript
{
  "code": 200,          // 状态码
  "message": "success", // 响应消息
  "data": {            // 响应数据
    // ... 具体数据
  }
}
```

### 状态码说明

- 200: 成功
- 400: 请求参数错误
- 401: 未授权
- 403: 禁止访问
- 404: 资源不存在
- 409: 资源冲突
- 500: 服务器内部错误

## 快速开始

### 环境要求

- Node.js >= 14
- MySQL >= 5.7

### 安装

1. 克隆项目
```bash
git clone [项目地址]
cd [项目目录]
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，配置必要的环境变量
```

4. 启动服务
```bash
# 开发环境
npm run dev

# 生产环境
npm start
```

## 环境变量配置

在 `.env` 文件中配置以下环境变量：

```bash
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=your_database

# JWT 配置
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# 跨域配置
CORS_ORIGIN=http://localhost:3000
```

## API 路由

### 基础路由
- `GET /api/health` - 健康检查
- `GET /api/version` - 获取 API 版本

### 用户路由
- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/profile` - 获取用户信息
- `PUT /api/users/profile` - 更新用户信息

### 商品路由
- `GET /api/products` - 获取商品列表
- `POST /api/products` - 创建商品
- `GET /api/products/:id` - 获取商品详情
- `PUT /api/products/:id` - 更新商品
- `DELETE /api/products/:id` - 删除商品

## 开发指南

### 添加新路由

1. 在 `src/routes` 目录下创建路由文件
2. 在 `app.js` 中注册路由
3. 遵循统一的响应格式

### 错误处理

使用 `AppError` 类抛出业务错误：

```javascript
import { AppError } from '../middlewares/errorHandler.js';

if (!user) {
  throw new AppError('用户不存在', 404);
}
```

## 部署

1. 构建项目
```bash
npm run build
```

2. 启动服务
```bash
npm start
```

推荐使用 PM2 进行进程管理：
```bash
pm2 start bin/www.js --name "api-server"
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## License

MIT License - 详见 LICENSE 文件 