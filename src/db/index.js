import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 通用查询函数
export const query = async (sql, params) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

// 示例：用户相关的数据库操作
export const userQueries = {
  findByEmail: (email) => 
    query('SELECT * FROM users WHERE email = ?', [email]),
    
  create: (user) => 
    query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [user.email, user.password, user.name]
    ),
    
  findById: (id) => 
    query('SELECT * FROM users WHERE id = ?', [id])
};

export default pool; 