import './Detail.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('user') !== null;
  if (!isLoggedIn) {
    navigate('/login');
  }
    const handleBackButtonClick = () => {
        navigate(-1);
    };
    const sidebarItems = [
      { id: 1, title: 'Quản lý đơn hàng', path: '/orderManager' }, 
      { id: 2, title: 'Quản lý sản phẩm', path: '/productManager' ,  active: true },
      { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' }, 
      { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager' },
      { id: 5, title: 'Quản lý tin tức', path: '/newsManager' }, 
      { id: 6, title: 'Quản lý thống kê', path: '/statisticsManager' }
];

  const location = useLocation();
  const order = location.state?.product;

  if (!order) {
    return <div>Không tìm thấy thông tin sản phẩm.</div>;
  }

  return (
    <div>
      <Header />
      <div className="order-detail-container">
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
          <h1 className="page-title">Thông tin chi tiết sản phẩm</h1>
          <div className='order'>
            <div className="order-grid-product">
              {/* Left Column - Order Details */}
              <div className="order-details">
                <div className="detail-row-even">
                  <div className="detail-label">Mã sản phẩm</div>
                  <div className="detail-value">{order.id}</div>
                </div>
                <div className="detail-row-old">
                  <div className="detail-label">Tên sản phẩm</div>
                  <div className="detail-value">{order.product}</div>
                </div>
                <div className="detail-row-even">
                  <div className="detail-label">Giá</div>
                  <div className="detail-value">{order.price} VND</div>
                </div>
                <div className="detail-row-old">
                  <div className="detail-label">Xuất xứ</div>
                  <div className="detail-value">{order.origin}</div>
                </div>
                <div className="detail-row-even">
                  <div className="detail-label">Kích thước</div>
                  <div className="detail-value">{order.dimension}</div>
                </div>

              </div>

              {/* Right Column - Product Details */}
              <div className="product-section">
                <div className="product-container">
                  <div className="product-image">
                    <img src={order.image} />
                  </div>
                  </div>
              </div>

              {/* Total Amount */}
            </div>
          </div>

          <div className="detail">
                  <div className="detail-label">Mô tả chi tiết sản phẩm</div>
                  <div className="detail-value-des">
                  {order.description.split('\n').map((paragraph, index) => (
                    <p key={index}> - {paragraph}</p>
                  ))}
                  </div>
              </div>
          {/* Back Button */}
          <div className="button-container">
              <button className="back-button" onClick={handleBackButtonClick}>QUAY LẠI</button>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;