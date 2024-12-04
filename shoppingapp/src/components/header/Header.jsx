import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Kiểm tra đăng nhập khi component được load
  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    if (sessionUser) {
      setIsLoggedIn(true);
      setUserEmail(sessionUser.email);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/login');
  };

  const handleChangePassword = () => {
    // Điều hướng đến trang đổi mật khẩu
    navigate('/changePassword');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.svg" alt="Logo MoHome" />
      </div>
      
        {isLoggedIn ? (
          <div className="user-dropdown">
            <span className="user-name">{userEmail}</span>
            <div className="dropdown-content">
              <button onClick={handleChangePassword}>Đổi mật khẩu</button>
              <button onClick={handleLogout}>Đăng xuất</button>
            </div>
          </div>
        ) : (
          <div className="user">
          <a className='person' href="/login">
            <img src='person.svg' alt="User Icon" className="user-icon" />
          </a>
          </div>

        )}
    
    </header>
  );
}

export default Header;
