import { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import './Create.css';
import axios from 'axios';

const EditEmployee = () => {
  const isLoggedIn = sessionStorage.getItem('user') !== null;
  if (!isLoggedIn) {
    navigate('/login');
  }
  const navigate = useNavigate();
  const location = useLocation();
  const employee = location.state?.employee;

  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id,
        gender: employee.gender,
        phone: employee.phone,
        name: employee.name,
        date: employee.date,
        email: employee.email,
        address: employee.address,
        position: employee.position,
        image: null,
      });
      setSelectedImage(employee.image); 
    }
  }, [employee]);


  const [formData, setFormData] = useState({
    id: '',
    gender: '',
    phone: '',
    name: '',
    date: '',
    email: '',
    address: '',
    position: '',
    image: null,
  });

  // State quản lý lỗi
  const [errors, setErrors] = useState({});

  // State để hiển thị ảnh preview
  const [selectedImage, setSelectedImage] = useState(null);

  // Xử lý thay đổi ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Hiển thị ảnh preview
      setFormData({ ...formData, image: file }); // Lưu ảnh vào formData
    }
  };

  // Xử lý thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm validate dữ liệu form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.id.trim()) newErrors.employeeId = 'Mã nhân viên là bắt buộc.';
    if (!formData.name.trim()) newErrors.fullName = 'Họ tên là bắt buộc.';
    if (!formData.phone.trim()) newErrors.phone = 'Số điện thoại là bắt buộc.';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại phải gồm 10 chữ số.';
    if (!formData.email.trim()) newErrors.email = 'Email là bắt buộc.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ.';
    if (!formData.gender) newErrors.gender = 'Giới tính là bắt buộc.';
    if (!formData.date) newErrors.date = 'Ngày sinh là bắt buộc.';
    if (!formData.address.trim()) newErrors.address = 'Địa chỉ là bắt buộc.';
    if (!formData.position.trim()) newErrors.position = 'Chức vụ là bắt buộc.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        // Kiểm tra xem nhân viên có id đó đã tồn tại hay chưa
      const storedEmployees = JSON.parse(localStorage.getItem('employeeList')) || [];
      const existingEmployee = storedEmployees.find(employee => employee.id === formData.id);

      if (existingEmployee) {
        alert('Nhân viên với mã này đã tồn tại!');
        return;
      }
        // Tạo FormData để gửi dữ liệu
        const data = new FormData();
        data.append('id', formData.id);
        data.append('gender', formData.gender);
        data.append('phone', formData.phone);
        data.append('name', formData.name);
        data.append('date', formData.date);
        data.append('address', formData.address);
        data.append('email', formData.email);
        data.append('position', formData.position);
        if (formData.image && formData.image instanceof File) {
          data.append('image', formData.image);
        } else {
          data.append('image', employee.image);
        }
  
        // Gửi dữ liệu đến API
        const response = await axios.post('http://localhost:5000/upload/employee', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          console.log(response.data)
          const filePath = response.data.image; 
          const newEmployee = { 
            ...formData, 
            image: filePath 
          };
  
          // Lưu danh sách nhân viên vào localStorage
          const storedEmployees = JSON.parse(localStorage.getItem('employeeList')) || [];
          const existingProductIndex = storedEmployees.findIndex(product => product.id === formData.id);
        
        if (existingProductIndex > -1) {
          storedEmployees[existingProductIndex] = newEmployee;
        } else {
          storedEmployees.push(newEmployee);
        }

        localStorage.setItem('employeeList', JSON.stringify(storedEmployees));

        alert('Cập nhật nhân viên thành công!');
        navigate('/employeeManager');
        }
      } catch (error) {
        console.error('Lỗi khi tạo nhân viên:', error);
        alert('Có lỗi xảy ra khi cập nhật nhân viên!');
      }
    }
  };

  // Nút kéo lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Dữ liệu sidebar
  const sidebarItems = [
    { id: 1, title: 'Quản lý đơn hàng', path: '/orderManager' }, 
    { id: 2, title: 'Quản lý sản phẩm', path: '/productManager'},
    { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager', active: true }, 
    { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager' },
    { id: 5, title: 'Quản lý tin tức', path: '/newsManager' }, 
    { id: 6, title: 'Quản lý thống kê', path: '/statisticsManager' }
  ];

  return (
    <div className="manager-container">
      <Header />
      <div className="admin-dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <h2 className="sidebar-title">Danh mục quản lý</h2>
          <ul className="sidebar-menu">
            {sidebarItems.map((item) => (
              <li key={item.id} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                <Link to={item.path} className="sidebar-link">{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <form className="employee-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Thông tin nhân viên</h2>
            <div className="form-grid">
              <div>
                <div className="form-group">
                  <label htmlFor="employeeId" className="form-label">Mã nhân viên</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    className="form-input"
                    placeholder="Nhập mã nhân viên"
                    value={formData.id}
                    onChange={handleChange}
                  />
                  {errors.id && <p className="error-text">{errors.id}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Giới tính</label>
                  <div className="form-radio-group">
                    <label className="form-radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="nam"
                        checked={formData.gender === "nam"}
                        className="form-radio-input"
                        onChange={handleChange}
                      /> Nam
                    </label>
                    <label className="form-radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="nữ"
                        checked={formData.gender === "nữ"}
                        className="form-radio-input"
                        onChange={handleChange}
                      /> Nữ
                    </label>
                  </div>
                  {errors.gender && <p className="error-text">{errors.gender}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-input"
                    placeholder="Nhập địa chỉ"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <p className="error-text">{errors.address}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="profileImage" className="form-label">Ảnh đại diện</label>
                  <input
                    type="file"
                    id="image"
                    className="form-input"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Profile Preview"
                      className="profile-image"
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Họ tên</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Nhập họ tên"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="birthDate" className="form-label">Ngày sinh</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-input"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  {errors.date && <p className="error-text">{errors.date}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                <label htmlFor="position" className="form-label">Chức vụ</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    className="form-input"
                    placeholder="Nhập chức vụ"
                    value={formData.position}
                    onChange={handleChange}
                  />
                  {errors.position && <p className="error-text">{errors.position}</p>}
                </div>
              </div>
            </div>
            <button type="submit" className="form-submit">LƯU</button>
          </form>
        </div>
      </div>

      {/* Nút Kéo lên đầu trang */}
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>

      <Footer />
    </div>
  );
};

export default EditEmployee;
