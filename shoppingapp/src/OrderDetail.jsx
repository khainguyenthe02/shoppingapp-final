import './Detail.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { useLocation } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom'; 

const OrderDetail = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('user') !== null;
  if (!isLoggedIn) {
    navigate('/login');
  }
    const handleBackButtonClick = () => {
        navigate(-1);
    };
    const sidebarItems = [
      { id: 1, title: 'Quản lý đơn hàng', path: '/orderManager',  active: true }, 
      { id: 2, title: 'Quản lý sản phẩm', path: '/productManager' },
      { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' }, 
      { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager' },
      { id: 5, title: 'Quản lý tin tức', path: '/newsManager' }, 
      { id: 6, title: 'Quản lý thống kê', path: '/statisticsManager' }
];
  const location = useLocation();
  const order = location.state?.product;
  console.log(order)
  const productList = JSON.parse(localStorage.getItem('productList')) || [];
  const productDetails = productList.find(item => item.id === order.productId);

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
          <h1 className="page-title">Thông tin chi tiết đơn hàng</h1>
          
          <div className="order-grid">
            {/* Left Column - Order Details */}
            <div className="order-details">
              <div className="detail-row-even">
                <div className="detail-label">Mã đơn hàng</div>
                <div className="detail-value">{order.id}</div>
              </div>
              <div className="detail-row-old">
                <div className="detail-label">Tên khách hàng</div>
                <div className="detail-value">{order.customer}</div>
              </div>
              <div className="detail-row-even">
                <div className="detail-label">Số điện thoại</div>
                <div className="detail-value">{order.phone}</div>
              </div>
              <div className="detail-row-old">
                <div className="detail-label">Địa chỉ</div>
                <div className="detail-value">{order.address}</div>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="product-section">
              <div>
                {order.status === 0 && <span className="status-waiting">Chờ xác nhận</span>}
                {order.status === 1 && <span className="status-confirmed">Đã xác nhận</span>}
                {order.status === 2 && <span className="status-in-delivery">Đang giao hàng</span>}
                {order.status === 3 && <span className="status-delivered">Đã giao hàng</span>}
              </div>
              <div className="product-container">
                <div className="product-image">
                  <img src={productDetails.image} alt={productDetails.product} />
                </div>
                <div className="product-info">
                  <div className="sku">SKU: {productDetails.id}</div>
                  <div className="product-name">{productDetails.product}</div>
                  <div className="price-quantity">
                    <span className="price">{order.total}</span>
                    <span className="quantity">x1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="total-section">
            <hr/>
              <div className="total-row">
                <span className="total-label">Tổng tiền</span>
                <span className="total-amount">{order.total}</span>
              </div>
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

export default OrderDetail;