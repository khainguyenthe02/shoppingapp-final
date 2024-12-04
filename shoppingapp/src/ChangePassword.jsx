import { useState } from 'react';
import "./SignUp.css";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const ChangePassword = () => {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem('user') !== null;
    if (!isLoggedIn) {
      navigate('/login');
    }
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [inputStates, setInputStates] = useState({
    password: { show: false, hasValue: false },
    newPassword: { show: false, hasValue: false },
    confirmPassword: { show: false, hasValue: false }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    const hasValue = value.length > 0;
    setInputStates(prev => ({
      ...prev,
      [name]: { ...prev[name], hasValue: hasValue }
    }));

    // Validate on change
    if (name === 'password' && value.length < 8) {
      setErrors(prev => ({
        ...prev,
        password: 'Mật khẩu phải có ít nhất 8 ký tự!'
      }));
    } else if (name === 'confirmPassword' && value !== formData.newPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Mật khẩu không khớp!'
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
    // Xử lý đổi mật khẩu
    const handleChangePassword = (e) => {
        e.preventDefault();
        
        // Lấy thông tin người dùng từ sessionStorage
        const sessionUser = JSON.parse(sessionStorage.getItem('user'));
        if (!sessionUser) {
            alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!');
            return;
        }
        
        // Lấy danh sách người dùng từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.email === sessionUser.email);
        
        if (userIndex === -1) {
            alert('Người dùng không tồn tại trong hệ thống. Vui lòng đăng nhập lại!');
            sessionStorage.removeItem('user');
            navigate('/login');
            return;
        }
        
        const { password, newPassword, confirmPassword } = formData;
        
        // Kiểm tra mật khẩu cũ có đúng không
        if (users[userIndex].password !== password) {
            setErrors(prev => ({
                ...prev,
                password: 'Mật khẩu cũ không đúng!'
            }));
            return;
        }
        
        // Kiểm tra mật khẩu mới khớp với xác nhận
        if (newPassword !== confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: 'Mật khẩu xác nhận không khớp!'
            }));
            return;
        }
        
        // Cập nhật mật khẩu mới
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Cập nhật lại sessionStorage với mật khẩu mới
        sessionStorage.setItem('user', JSON.stringify({ ...sessionUser, password: newPassword }));
    
        // Xóa sessionStorage
        sessionStorage.removeItem('user');
        
        // Thông báo và điều hướng đến trang đăng nhập
        alert('Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
        navigate('/login');
    };
    

  const handleFocus = (e) => {
    const { name } = e.target;
    const inputHasValue = formData[name].length > 0;
    setInputStates(prev => ({
      ...prev,
      [name]: { ...prev[name], hasValue: inputHasValue }
    }));
  };
  
  const toggleShowPassword = (inputName) => {
    setInputStates(prev => ({
      ...prev,
      [inputName]: { ...prev[inputName], show: !prev[inputName].show }
    }));
  };

  return (
    <div className='container'>
      <Header/>
      <div className="form-container">
        <div className="form-card">
          <h2>Thay đổi mật khẩu</h2>
          <form>
          <div className="form-group">
              <div className="label-row">
                <label>Mật khẩu cũ <span className="required">*</span></label>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
              <div className={`input-wrapper ${inputStates.password.hasValue ? 'has-value' : ''}`}>
                <input
                  type={inputStates.password.show ? "text" : "password"}
                  name="password"
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  placeholder="Nhập lại mật khẩu cũ"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                {inputStates.password.hasValue && (
                  <div
                    className="toggle-password"
                    onClick={() => toggleShowPassword('password')}
                  >
                    {inputStates.password.show ? <EyeOff /> : <Eye />}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="label-row">
                <label>Mật khẩu mới <span className="required">*</span></label>
                {errors.newPassword && <span className="error-text">{errors.newPassword}</span>}
              </div>
              <div className={`input-wrapper ${inputStates.newPassword.hasValue ? 'has-value' : ''}`}>
                <input
                  type={inputStates.newPassword.show ? "text" : "password"}
                  name="newPassword"
                  className={`form-control ${errors.newPassword ? 'error' : ''}`}
                  placeholder="Nhập mật khẩu mới"
                  value={formData.newPassword}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                {inputStates.newPassword.hasValue && (
                  <div
                    className="toggle-password"
                    onClick={() => toggleShowPassword('newPassword')}
                  >
                    {inputStates.newPassword.show ? <EyeOff /> : <Eye />}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Nhập lại mật khẩu <span className="required">*</span></label>
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
              <div className={`input-wrapper ${inputStates.confirmPassword.hasValue ? 'has-value' : ''}`}>
                <input
                  type={inputStates.confirmPassword.show ? "text" : "password"}
                  name="confirmPassword"
                  className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                {inputStates.confirmPassword.hasValue && (
                  <div
                    className="toggle-password"
                    onClick={() => toggleShowPassword('confirmPassword')}
                  >
                    {inputStates.confirmPassword.show ? <EyeOff /> : <Eye />}
                  </div>
                )}
              </div>
            </div>
        
          </form>
          <div className='button-container'>
              <button type="submit" onClick={handleChangePassword} className="btn btn-primary">ĐỔI MẬT KHẨU</button>
            </div>

          <div className="login-link">
            <p><a href="/">Quay lại</a></p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ChangePassword;
