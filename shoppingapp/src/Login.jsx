import { useState} from 'react';
import "./SignUp.css";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import users from './data/user';
import { useNavigate } from 'react-router-dom'; 
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const handleFocus = () => {
    setHasPasswordValue(formData.password.length > 0);
  };
  
  const handleBlur = () => {
    setHasPasswordValue(formData.password.length > 0);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [hasPasswordValue, setHasPasswordValue] = useState(false);

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
  if (name === 'password') {
    setHasPasswordValue(value.length > 0);
  }

    // Validate on change
    if (name === 'email' && value && !validateEmail(value)) {
      setErrors(prev => ({
        ...prev,
        email: 'Định dạng Email không đúng!'
      }));
    }else {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const { email, password } = formData;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));  
        navigate('/orderManager'); 
    } else {
        alert('Email hoặc mật khẩu không đúng!');
    }
};
  return (
    <div className='container'>
      <Header/>
      <div className="form-container">
    
      <div className="form-card">
        <h2>Đăng nhập tài khoản</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <div className="label-row">
              <label>Email <span className="required">*</span></label>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                className="form-control"
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
            <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                  {hasPasswordValue && (
                    <div
                      className="toggle-password"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </div>
                  )}
              </div>
          </div>

          <div className='button-container'>
            <button type="submit" className="btn btn-primary">ĐĂNG NHẬP</button>
        </div>
        </form>
        

        <div className="login-link">
          <p>Bạn chưa có tài khoản? <a href="/signup">Đăng ký</a></p>
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

export default Login;
