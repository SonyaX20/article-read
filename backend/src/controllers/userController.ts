import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: '用户名或邮箱已存在' });
    }

    // 创建新用户
    const user = new User({ username, email, password });
    await user.save();

    // 生成 JWT
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '用户不存在' });
    }

    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: '密码错误' });
    }

    // 生成 JWT
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '24h' });

    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
}; 