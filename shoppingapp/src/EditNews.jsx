import { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import './Create.css';
import axios from 'axios';

const EditNews = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const isLoggedIn = sessionStorage.getItem('user') !== null;
  if (!isLoggedIn) {
    navigate('/login');
  }
  // State quản lý giá trị form
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    desription: '',
    image: null,
  });
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        title: product.title,
        date: product.date,
        description: product.description,
        image: null,
      });
      setSelectedImage(product.image); // Nếu bạn có đường dẫn ảnh
    }
  }, [product]);

  const [errors, setErrors] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm validate dữ liệu form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.id.trim()) newErrors.id = 'Mã tin tức là bắt buộc.';
    if (!formData.title.trim()) newErrors.title = 'Tiêu đề tin tức là bắt buộc.';
    if (!formData.date.trim()) newErrors.date = 'Ngày tin tức là bắt buộc.';
    if (!formData.description.trim()) newErrors.description = 'Mô tả tin tức là bắt buộc.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {

        // Tạo FormData để gửi dữ liệu
        const data = new FormData();
        data.append('id', formData.id);
        data.append('title', formData.title);
        data.append('date', formData.date);
        data.append('description', formData.description);
        if (formData.image && formData.image instanceof File) {
            data.append('image', formData.image);
          } else {
            data.append('image', product.image);
          }
  
        // Gửi dữ liệu đến API
        const response = await axios.post('http://localhost:5000/upload/news', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          console.log(response.data)
          const filePath = response.data.image;  
  
          const newNews = { 
            ...formData, 
            image: filePath 
          };
  
          const storedNews = JSON.parse(localStorage.getItem('newsList')) || [];
          const existingProductIndex = storedNews.findIndex(product => product.id === formData.id);
        
          if (existingProductIndex > -1) {
            storedNews[existingProductIndex] = newNews;
          } else {
            storedProducts.push(newNews);
          }
  
          localStorage.setItem('newsList', JSON.stringify(storedNews));
  
  
          alert('Cập nhật tin tức thành công!');
          navigate('/newsManager');
        }
      } catch (error) {
        console.error('Lỗi khi tạo tin tức', error);
        alert('Có lỗi xảy ra khi Cập nhật tin tức!');
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
    { id: 2, title: 'Quản lý sản phẩm', path: '/productManager' },
    { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' }, 
    { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager' },
    { id: 5, title: 'Quản lý tin tức', path: '/newsManager' , active: true}, 
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
            <h2 className="form-title">Thông tin tin tức</h2>
            <div className="form-grid">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="id" className="form-label">Mã tin tức</label>
              <input
                type="text"
                id="id"
                name="id"
                className="form-input"
                placeholder="Nhập mã tin tức"
                value={formData.id}
                onChange={handleChange}
              />
              {errors.id && <p className="error-text">{errors.id}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="product" className="form-label">Tiêu đề</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="Nhập tiêu đề"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <p className="error-text">{errors.title}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="date" className="form-label">Ngày tạo</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-input"
                placeholder="Nhập ngày tạo"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <p className="error-text">{errors.date}</p>}
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label htmlFor="description" className="form-label">Nội dung</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                placeholder="Nhập nội dung"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <p className="error-text">{errors.description}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="image" className="form-label">Hình ảnh tin tức</label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-input"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImage && <img src={selectedImage} alt="Preview" className="image-preview" />}
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

export default EditNews;
