import './Detail.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const EmployeeDetail = () => {
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
      { id: 2, title: 'Quản lý sản phẩm', path: '/productManager'},
      { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' , active: true  }, 
      { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager' },
      { id: 5, title: 'Quản lý tin tức', path: '/newsManager' }, 
      { id: 6, title: 'Quản lý thống kê', path: '/statisticsManager' } 
];

  const location = useLocation();
  const employee = location.state?.employee;
  console.log(employee)

  if (!employee) {
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
          <h1 className="page-title">Thông tin nhân viên</h1>
          
          <div className="order-grid">
            {/* Left Column - Order Details */}
            <div className="order-details">
                <div className="detail-row-even">
                    <div className="detail-label">Mã nhân viên</div>
                    <div className="detail-value">{employee.id}</div>
                </div>
                <div className="detail-row-old">
                    <div className="detail-label">Tên nhân viên</div>
                    <div className="detail-value">{employee.name}</div>
                </div>
                <div className="detail-row-even">
                    <div className="detail-label">Ngày sinh</div>
                    <div className="detail-value">{employee.date}</div>
                </div>
                <div className="detail-row-old">
                    <div className="detail-label">Giới tính</div>
                    <div className="detail-value">{employee.gender}</div>
                </div>
                <div className="detail-row-even">
                    <div className="detail-label">Số điện thoại</div>
                    <div className="detail-value">{employee.phone}</div>
                </div>
                <div className="detail-row-old">
                    <div className="detail-label">Email</div>
                    <div className="detail-value">{employee.email}</div>
                </div>
                <div className="detail-row-even">
                    <div className="detail-label">Chức vụ</div>
                    <div className="detail-value">{employee.position}</div>
                </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="product-section">
              <div className="product-container">
                <div className="product-image">
                  <img src={employee.image} />
                </div>
                </div>
            </div>

            {/* Total Amount */}
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

export default EmployeeDetail;