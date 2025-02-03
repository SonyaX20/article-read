import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      localStorage.setItem('token', response.data.token);
      // 处理成功注册后的逻辑
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="用户名"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="邮箱"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="密码"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">注册</button>
    </form>
  );
};

export default Register; 