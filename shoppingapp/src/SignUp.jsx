import { useState } from 'react';
import "./SignUp.css";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [inputStates, setInputStates] = useState({
    password: { show: false, hasValue: false },
    confirmPassword: { show: false, hasValue: false }
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

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
    if (name === 'email' && value && !validateEmail(value)) {
      setErrors(prev => ({
        ...prev,
        email: 'Định dạng Email không đúng!'
      }));
    } else if (name === 'password' && value.length < 8) {
      setErrors(prev => ({
        ...prev,
        password: 'Mật khẩu phải có ít nhất 8 ký tự!'
      }));
    } else if (name === 'confirmPassword' && value !== formData.password) {
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
  const handleSignUp = (e) => {
    e.preventDefault();
  
    // Lấy danh sách người dùng từ localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
  
    // Kiểm tra email đã tồn tại
    const emailExists = users.some(user => user.email === formData.email);
  
    if (emailExists) {
      setErrors(prev => ({
        ...prev,
        email: 'Email đã tồn tại!'
      }));
      return;
    }
  
    // Thêm người dùng mới
    const newUser = {
      email: formData.email,
      password: formData.password
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    // Xóa form và thông báo đăng ký thành công
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
    alert('Đăng ký thành công!');
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
          <h2>Đăng ký tài khoản</h2>
          <form>
            <div className="form-group">
              <div className="label-row">
                <label>Email <span className="required">*</span></label>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Mật khẩu <span className="required">*</span></label>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
              <div className={`input-wrapper ${inputStates.password.hasValue ? 'has-value' : ''}`}>
                <input
                  type={inputStates.password.show ? "text" : "password"}
                  name="password"
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  placeholder="Ít nhất 8 ký tự"
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
              <button type="submit" onClick={handleSignUp} className="btn btn-primary">ĐĂNG KÝ</button>
            </div>

          <div className="login-link">
            <p>Bạn đã có tài khoản? <a href="/">Đăng nhập</a></p>
          </div>
          <div className="divider">
            <span>hoặc</span>
          </div>

          <div className="social-login">
            <img src="/facebook.png" alt="Facebook" className="social-icon" />
            <img src="/google.png" alt="Google" className="social-icon" />
            <img src="/apple.png" alt="Apple" className="social-icon" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SignUp;
