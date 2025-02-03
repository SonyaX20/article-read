import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import User from '../models/User';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('User Authentication', () => {
  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('username', 'testuser');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login existing user', async () => {
      // First register a user
      await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123'
        });

      // Then try to login
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@test.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });
}); 