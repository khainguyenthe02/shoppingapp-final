import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './Manager.css';
import { Eye, Edit, Trash } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const ServiceManager = () => {
      // const handlePageChange = (pageNumber) => {
      //       setCurrentPage(pageNumber);
      //   };
      //   const handleNextPage = () => {
      //       setCurrentPage(totalPages);
      //   };
      const navigate = useNavigate();
      const isLoggedIn = sessionStorage.getItem('user') !== null;
      if (!isLoggedIn) {
        navigate('/login');
      }
      const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
            const [orders, setOrders] = useState([]); 
            const [searchText, setSearchText] = useState('');
            const [filteredOrders, setFilteredOrders] = useState([]);
            useEffect(() => {
                  const storedProducts = localStorage.getItem('serviceList');
                  if (storedProducts) {
                      const parsedProducts = JSON.parse(storedProducts);
                      setOrders(parsedProducts);
                      setFilteredOrders(parsedProducts);
                  }
                }, []); 
            useEffect(() => {
                const filtered = orders.filter(order => 
                    order.id.includes(searchText) ||
                    order.product_name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredOrders(filtered);
            }, [searchText, orders]);
            const [selectedSortValue, setSelectedSortValue] = useState('');
            const [currentPage, setCurrentPage] = useState(1);
            const [ordersPerPage, setOrdersPerPage] = useState(10);
    
            const handleSortChange = (event) => {
                  const selectedValue = event.target.value;
                  setSelectedSortValue(selectedValue);
                  
                  
                  const newOrdersPerPage = parseInt(selectedValue) || 10;
                  setOrdersPerPage(newOrdersPerPage);
                  setCurrentPage(1); 
          
                  
                  setFilteredOrders(orders);
              };
          
              const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
              const indexOfLastOrder = currentPage * ordersPerPage;
              const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
              const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);          
            const viewOrderDetails = (order) => {
                  navigate('/serviceDetail', { state: { service : order } });
            };
            const toCreateEmployee = () => {
                  navigate('/createService');
            }
            const ToEditEmployee = (order) => {
                  navigate('/editService', { state: { service: order } });
            };


            const deleteOrder = (id) => {
                  const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?");
              
                  if (confirmDelete) {
                      setOrders((prevOrders) => {
                          const updatedOrders = prevOrders.filter(order => order.id !== id);
                          localStorage.setItem('serviceList', JSON.stringify(updatedOrders));
                          setFilteredOrders(updatedOrders);
                          return updatedOrders;
                      });
                  }
              };
      const sidebarItems = [
            { id: 1, title: 'Quản lý đơn hàng', path: '/orderManager' }, 
            { id: 2, title: 'Quản lý sản phẩm', path: '/productManager'},
            { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager'  }, 
            { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager', active: true  },
            { id: 5, title: 'Quản lý tin tức', path: '/newsManager' }, 
            { id: 6, title: 'Quản lý thống kê', path: '/statisticsManager' } 
      ];
  return (
      <div className="manager-container">
      <Header/>
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
                        <div className="content-header">
                        <h1>Danh sách dịch vụ</h1>
                        </div>
                        <div className="sort-and-add">
                        <div className="sort-dropdown">
                              <select value={selectedSortValue} onChange={handleSortChange}>
                                    <option value="">Xem</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                              </select>
                        </div>
                        <div className="search-bar">
                                <div className="search-container">
                                <input className='inputSearch' name='searchText' 
                                    value={searchText} 
                                    onChange={(e) => setSearchText(e.target.value)}
                                    type="text" 
                                    placeholder="Tìm kiếm mã phiếu, khách hàng ..." />
                                    
                                {/* <button className='search'  onClick={handleSearch}>
                                    <img src='search.svg' alt="Search Icon"/>
                                </button> */}
                                </div>
                        </div>
                        <div>
                              <button className='button-add' onClick={toCreateEmployee}>THÊM</button>
                        </div>
                        </div>

                  {/* Table */}
                  <div className="table-container">
                  <table>
                        <thead>
                        <tr>
                        <th>Mã phiếu</th>
                        <th>Ngày lập</th>
                        <th>Tên khách hàng</th>
                        <th>Tên sản phẩm</th>
                        <th>Tình trạng</th>
                        <th>Tổng chi phí</th>
                        <th >Mã nhân viên</th>
                        <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentOrders.map((order) => (
                              <tr key={order.id}>
                              <td >{order.id}</td>
                              <td>{order.date}</td>
                              <td>{order.customer_name}</td>
                              <td>{order.product_name}</td>
                              <td>{order.status}</td>
                              <td>{order.price} VND</td>
                              <td>{order.emp_id}</td>
                              <td className="action-buttons">
                                    <button className="action-btn view" onClick={() => viewOrderDetails(order)}><Eye size={16} /></button>
                                    <button className="action-btn edit" onClick={() => ToEditEmployee(order)} ><Edit size={16} /></button>
                                    <button className="action-btn delete" onClick={() => deleteOrder(order.id)}><Trash size={16} /></button>
                              </td>
                        </tr>
                        ))}
                        </tbody>
                  </table>
                  </div>
                    {/* Phân trang */}
            <div className="pagination">
                <div className="pagination-info">
                    <span>Trang {currentPage} / {totalPages}</span>
                </div>
                <div className="pagination-buttons">
                    {currentPage > 1 && (
                        <button onClick={() => setCurrentPage(currentPage - 1)}>Trang trước</button>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                    {currentPage < totalPages && (
                        <button onClick={() => setCurrentPage(currentPage + 1)}>Trang sau</button>
                    )}
                </div>
            </div>
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

export default ServiceManager;