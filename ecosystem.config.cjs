module.exports = {
  apps: [{
    name: 'express-api',
    script: 'bin/www.js',
    instances: 'max',  // 使用所有可用的 CPU 核心
    exec_mode: 'cluster',  // 使用集群模式
    autorestart: true,  // 自动重启
    watch: false,  // 生产环境不开启文件监视
    max_memory_restart: '1G',  // 超过内存限制时重启
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // 错误日志文件
    error_file: 'logs/error.log',
    // 输出日志文件
    out_file: 'logs/out.log',
    // 时间格式
    time: true
  }]
}; 