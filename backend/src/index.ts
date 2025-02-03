import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config';
import userRoutes from './routes/userRoutes';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/users', userRoutes);

// 连接数据库
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 优化的服务器启动逻辑
const startServer = async () => {
  try {
    const server = app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });

    // 优雅关闭
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 