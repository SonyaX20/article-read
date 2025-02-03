import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/article-read',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key'
}; 