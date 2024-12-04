import { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import './Create.css';
import axios from 'axios';

const EditProduct = () => {
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
    product: '',
    image: null,
    price: '',
    description: '',
    origin: '',
    dimension: '',
  });
    // Sử dụng useEffect để cập nhật formData khi có employee
    useEffect(() => {
        if (product) {
          setFormData({
            id: product.id,
            date: product.date,
            product: product.product,
            image: product.image,
            price: product.price,
            description: product.description,
            origin: product.origin,
            dimension: product.dimension,
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

    if (!formData.id.trim()) newErrors.id = 'Mã sản phẩm là bắt buộc.';
    if (!formData.product.trim()) newErrors.product = 'Tên sản phẩm là bắt buộc.';
    if (!formData.price.trim()) newErrors.price = 'Giá sản phẩm là bắt buộc.';
    if (!formData.description.trim()) newErrors.description = 'Mô tả sản phẩm là bắt buộc.';
    if (!formData.origin.trim()) newErrors.origin = 'Xuất xứ sản phẩm là bắt buộc.';
    if (!formData.dimension.trim()) newErrors.dimension = 'Kích thước sản phẩm là bắt buộc.';

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
        data.append('product', formData.product);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('origin', formData.origin);
        data.append('dimension', formData.dimension);
        if (formData.image && formData.image instanceof File) {
          data.append('image', formData.image);
        } else {
          data.append('image', product.image);
        }
  
        // Gửi dữ liệu đến API
        console.log(formData.image)
          const response = await axios.post('http://localhost:5000/upload/product', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log(response.status)
          if (response.status === 200) {
            console.log(response.data)
            const filePath = response.data.image;    
          const newProduct = { 
            ...formData, 
            image: filePath 
          };

  
          const storedProducts = JSON.parse(localStorage.getItem('productList')) || [];
          const existingProductIndex = storedProducts.findIndex(product => product.id === formData.id);
        
        if (existingProductIndex > -1) {
          storedProducts[existingProductIndex] = newProduct;
        } else {
          storedProducts.push(newProduct);
        }

        localStorage.setItem('productList', JSON.stringify(storedProducts));

        alert('Cập nhật sản phẩm thành công!');
        navigate('/productManager');
        }
      } catch (error) {
        console.error('Lỗi khi tạo sản phẩm:', error);
        alert('Có lỗi xảy ra khi tạo sản phẩm!');
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
    { id: 2, title: 'Quản lý sản phẩm', path: '/productManager' , active: true},
    { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' }, 
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
            <h2 className="form-title">Thông tin sản phẩm</h2>
            <div className="form-grid">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="id" className="form-label">Mã sản phẩm</label>
              <input
                type="text"
                id="id"
                name="id"
                className="form-input"
                placeholder="Nhập mã sản phẩm"
                value={formData.id}
                onChange={handleChange}
              />
              {errors.id && <p className="error-text">{errors.id}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="product" className="form-label">Tên sản phẩm</label>
              <input
                type="text"
                id="product"
                name="product"
                className="form-input"
                placeholder="Nhập tên sản phẩm"
                value={formData.product}
                onChange={handleChange}
              />
              {errors.product && <p className="error-text">{errors.product}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">Giá sản phẩm</label>
              <input
                type="text"
                id="price"
                name="price"
                className="form-input"
                placeholder="Nhập giá sản phẩm"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className="error-text">{errors.price}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="origin" className="form-label">Xuất xứ sản phẩm</label>
              <input
                type="text"
                id="origin"
                name="origin"
                className="form-input"
                placeholder="Nhập xuất xứ sản phẩm"
                value={formData.origin}
                onChange={handleChange}
              />
              {errors.origin && <p className="error-text">{errors.origin}</p>}
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label htmlFor="dimension" className="form-label">Kích thước sản phẩm</label>
              <input
                type="text"
                id="dimension"
                name="dimension"
                className="form-input"
                placeholder="Nhập kích thước sản phẩm"
                value={formData.dimension}
                onChange={handleChange}
              />
              {errors.dimension && <p className="error-text">{errors.dimension}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Mô tả sản phẩm</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                placeholder="Nhập mô tả sản phẩm"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <p className="error-text">{errors.description}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="image" className="form-label">Hình ảnh sản phẩm</label>
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

export default EditProduct;
