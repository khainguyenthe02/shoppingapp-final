import { useState } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import './Create.css';


const CreateService = () => {
  const navigate = useNavigate();

  // State quản lý giá trị form
  const [formData, setFormData] = useState({
    id: '',
    customer_name: '',
    address: '',
    phone: '',
    date: '',
    emp_id: '',
    status: '',
    product_id: '',
    product_name: '',
    price: '',

  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const isLoggedIn = sessionStorage.getItem('user') !== null;
  if (!isLoggedIn) {
    navigate('/login');
  }
  
  // Hàm validate dữ liệu form
const validateForm = () => {

      const newErrors = {};
    
      if (!formData.id.trim()) newErrors.id = 'Mã phiếu là bắt buộc.';
      if (!formData.customer_name.trim()) newErrors.customer_name = 'Tên khách hàng là bắt buộc.';
      if (!formData.address.trim()) newErrors.address = 'Địa chỉ là bắt buộc.';
      if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại phải gồm 10 chữ số.';
      if (!formData.emp_id.trim()) newErrors.emp_id = 'Mã nhân viên là bắt buộc.';
      if (!formData.product_id.trim()) newErrors.product_id = 'Mã sản phẩm là bắt buộc.';
      if (!formData.product_name.trim()) newErrors.product_name = 'Tên sản phẩm là bắt buộc.';
      if (!formData.status.trim()) newErrors.status = 'Tình trạng là bắt buộc.';
      if (!formData.price) newErrors.price = 'Tổng chi phí là bắt buộc.';
      if (!formData.date) newErrors.date = 'Ngày lập là bắt buộc.';
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    // Xử lý khi submit form
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (validateForm()) {
        try {
          const storedEmployees = JSON.parse(localStorage.getItem('serviceList')) || [];
          const existingEmployee = storedEmployees.find(employee => employee.id === formData.id);
    
          if (existingEmployee) {
            alert('Phiếu dịch vụ với mã này đã tồn tại!');
            return;
          }
    
          const newEmployee = { 
            ...formData
          };
    
          storedEmployees.push(newEmployee); 
          localStorage.setItem('serviceList', JSON.stringify(storedEmployees));
    
          alert('Tạo mới phiếu dịch vụ thành công!');
          navigate('/serviceManager'); // Chuyển hướng
    
        } catch (error) {
          console.error('Lỗi khi tạo phiếu dịch vụ:', error);
          alert('Có lỗi xảy ra khi tạo phiếu dịch vụ!');
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
    { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager'}, 
    { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager', active: true  },
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
            <h2 className="form-title">Thông tin dịch vụ</h2>
            <div className="form-grid">
              <div>
                <div className="form-group">
                  <label htmlFor="employeeId" className="form-label">Mã phiếu</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    className="form-input"
                    placeholder="Nhập mã dịch vụ"
                    value={formData.id}
                    onChange={handleChange}
                  />
                  {errors.id && <p className="error-text">{errors.id}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Tên khách hàng</label>
                  <input
                    type="tel"
                    id="customer_name"
                    name="customer_name"
                    className="form-input"
                    placeholder="Nhập tên khách hàng"
                    value={formData.customer_name}
                    onChange={handleChange}
                  />
                  {errors.customer_name && <p className="error-text">{errors.customer_name}</p>}
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
                  <label htmlFor="phone" className="form-label">Số điện thoại</label>
                  <input
                    type="text"
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
                  <label htmlFor="date" className="form-label">Ngày lập</label>
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
                </div>
                <div>
                <div className="form-group">
                  <label htmlFor="emp_id" className="form-label">Mã nhân viên</label>
                  <input
                    type="text"
                    id="emp_id"
                    name="emp_id"
                    className="form-input"
                    placeholder="Nhập mã nhân viên"
                    value={formData.emp_id}
                    onChange={handleChange}
                  />
                  {errors.emp_id && <p className="error-text">{errors.emp_id}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="product_id" className="form-label">Mã sản phẩm</label>
                  <input
                    type="text"
                    id="product_id"
                    name="product_id"
                    className="form-input"
                    placeholder="Nhập mã sản phẩm"
                    value={formData.product_id}
                    onChange={handleChange}
                  />
                  {errors.product_id && <p className="error-text">{errors.product_id}</p>}
                </div>
                <div className="form-group">
                <label htmlFor="product_name" className="form-label">Tên sản phẩm</label>
                  <input
                    type="text"
                    id="product_name"
                    name="product_name"
                    className="form-input"
                    placeholder="Nhập tên sản phẩm"
                    value={formData.product_name}
                    onChange={handleChange}
                  />
                  {errors.product_name && <p className="error-text">{errors.product_name}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="status" className="form-label">Tình trạng</label>
                        <input
                        type="text"
                        id="status"
                        name="status"
                        className="form-input"
                        placeholder="Nhập tình trạng"
                        value={formData.status}
                        onChange={handleChange}
                        />
                        {errors.status && <p className="error-text">{errors.status}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="price" className="form-label">Tổng chi phí</label>
                        <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-input"
                        placeholder="Nhập tổng chi phí"
                        value={formData.price}
                        onChange={handleChange}
                        />
                        {errors.price && <p className="error-text">{errors.price}</p>}
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

export default CreateService;
