import './Detail.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const ServiceDetail = () => {
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
      { id: 2, title: 'Quản lý sản phẩm', path: '/productManager' },
      { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' }, 
      { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager',  active: true  },
      { id: 5, title: 'Quản lý tin tức', path: '/newsManager' }, 
      { id: 6, title: 'Quản lý thống kê', path: '/statisticsManager' }
];

  const location = useLocation();
  const service = location.state?.service;

  if (!service) {
    return <div>Không tìm thấy thông tin dịch vụ.</div>;
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
          <h1 className="page-title">Thông tin chi tiết dịch vụ</h1>
          <div className='service'>
              {/* Left Column - Order Details */}
              <div className='part' >
                <div className="detail-row-even">                
                  <div className="detail-label">Mã dịch vụ</div>
                  <div className="detail-value">{service.id}</div>
                </div>
                <div className="detail-row-old">
                  <div className="detail-label">Tên khách hàng</div>
                  <div className="detail-value">{service.customer_name}</div>
                </div>
                <div className="detail-row-even">
                  <div className="detail-label">Số điện thoại</div>
                  <div className="detail-value">{service.phone}</div>
                </div>
                <div className="detail-row-old">
                  <div className="detail-label">Địa chỉ</div>
                  <div className="detail-value">{service.address}</div>
                </div>
            </div>
            <div className='part'>
                <div className="detail-row-even">                
                  <div className="detail-label">Ngày tạo</div>
                  <div className="detail-value">{service.date}</div>
                </div>
                <div className="detail-row-old">
                  <div className="detail-label">Mã sản phẩm</div>
                  <div className="detail-value">{service.product_id}</div>
                </div>
                <div className="detail-row-even">
                  <div className="detail-label">Tên sản phẩm</div>
                  <div className="detail-value">{service.product_name}</div>
                </div>
                <div className="detail-row-old">
                  <div className="detail-label">Tình trạng</div>
                  <div className="detail-value">{service.status}</div>
                </div>
            </div>
          </div>
          {/* Total Amount */}
          <div className="total-section">
            <hr/>
              <div className="total-row">
                <span className="total-label">Tổng chi phí</span>
                <span className="total-amount">{service.price}</span>
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

export default ServiceDetail;