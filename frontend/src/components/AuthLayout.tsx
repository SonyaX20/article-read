import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
      <div className="auth-container">
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLoginPage ? 'active' : ''}`}
            onClick={() => navigate('/login')}
          >
            登录
          </button>
          <button 
            className={`auth-tab ${!isLoginPage ? 'active' : ''}`}
            onClick={() => navigate('/register')}
          >
            注册
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 