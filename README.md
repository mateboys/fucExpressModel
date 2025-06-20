# 电商后台管理系统 API

基于 Express.js 构建的现代化电商后台 API 服务，采用 ES Modules 规范。

## 技术栈

- Node.js >= 14
- Express.js
- MySQL
- PM2 (进程管理)
- JWT (认证)
- ESM (ES Modules)

## 项目特点

- 🚀 现代化的 ES Modules 项目结构
- 🔐 JWT 身份认证
- 🌐 统一的 API 响应格式
- 🛡️ 完善的错误处理机制
- 📝 详细的日志记录
- 🔧 灵活的环境配置
- 🚦 多进程和负载均衡 (PM2)

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
├── ecosystem.config.cjs # PM2 配置文件
├── app.js              # 应用主文件
├── package.json
└── .env               # 环境变量配置
```

## 快速开始

### 环境要求

- Node.js >= 14
- MySQL >= 5.7
- PM2 (用于生产环境)

### 开发环境

1. **克隆项目**
```bash
git clone [项目地址]
cd [项目目录]
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
cp .env.example .env
# 编辑 .env 文件，配置必要的环境变量
```

4. **启动开发服务器**
```bash
npm run dev
```

### 生产环境部署

1. **安装 PM2**
```bash
sudo npm install -g pm2
```

2. **安装生产依赖**
```bash
npm install --production
```

3. **配置生产环境变量**
```bash
# 创建并编辑生产环境配置
cp .env.example .env
```

4. **启动服务**
```bash
npm run start  #启动实例(单进程)  第一种方式
npm run prod:start  # 启动所有实例(多进程 PM2)  第二种方式
```

### PM2 管理命令

```bash
npm run prod:start    # 启动服务
npm run prod:stop     # 停止服务
npm run prod:restart  # 重启服务
npm run prod:logs     # 查看日志
npm run prod:monitor  # 监控面板
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

## 环境变量配置

在 \`.env\` 文件中配置以下环境变量：

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

## 性能优化

### 多进程处理
- 使用 PM2 cluster 模式
- 自动使用所有可用 CPU 核心
- 负载均衡处理请求
- 进程崩溃自动重启

### 错误处理
- 统一的错误处理中间件
- 详细的错误日志记录
- 开发环境显示详细错误信息
- 生产环境隐藏敏感信息

### 安全措施
- 使用 helmet 中间件
- JWT 认证
- CORS 保护
- 环境变量隔离

## 监控和维护

### 日志管理
- 错误日志: `logs/error.log`
- 访问日志: `logs/out.log`
- 使用 `npm run prod:logs` 查看实时日志

### 性能监控
- 使用 `npm run prod:monitor` 查看：
  - CPU 使用率
  - 内存使用
  - 请求响应时间
  - 错误率统计


## License

MIT License - 详见 LICENSE 文件 