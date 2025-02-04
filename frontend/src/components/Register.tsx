import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/users/register', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      setMessage('注册成功！');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="form-input"
          type="text"
          placeholder="用户名"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          className="form-input"
          type="email"
          placeholder="邮箱"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          className="form-input"
          type="password"
          placeholder="密码"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      <button 
        className="submit-button" 
        type="submit"
        disabled={loading}
      >
        {loading ? '注册中...' : '注册'}
      </button>
      {message && (
        <div className={`message ${message.includes('成功') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </form>
  );
};

export default Register; 