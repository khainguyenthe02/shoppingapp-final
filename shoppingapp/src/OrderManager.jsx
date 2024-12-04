import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './Manager.css';
import { Eye, Edit, Trash } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const OrderManager = () => {
      const [orders, setOrders] = useState([]); 
      const [filteredOrders, setFilteredOrders] = useState([]); 
      useEffect(() => {
            const storedOrders = localStorage.getItem('orderList');
            if (storedOrders) {
              setOrders(JSON.parse(storedOrders));
              setFilteredOrders(storedOrders);
            }
          }, []);
      const [selectedSortValue, setSelectedSortValue] = useState('');
      const [selectedFilterValue, setSelectedFilterValue] = useState('');
      const [currentPage, setCurrentPage] = useState(1);
      const [ordersPerPage, setOrdersPerPage] = useState(10);
      const [searchText, setSearchText] = useState('');
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [editingOrder, setEditingOrder] = useState(null);
      const openEditDialog = (order) => {
            setEditingOrder(order);
            setIsEditDialogOpen(true);
        };
        
        const closeEditDialog = () => {
            setIsEditDialogOpen(false);
            setEditingOrder(null);
        };
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
      const handleFilterChange = (event) => {
      const filterValue = event.target.value;
      setSelectedFilterValue(filterValue); 
      setCurrentPage(1); 
      };
      useEffect(() => {
            let filtered = [...orders];
    
            // Lọc theo trạng thái
            if (selectedFilterValue !== '') {
                const status = parseInt(selectedFilterValue, 10);
                filtered = filtered.filter((order) => order.status === status);
            }
            // Tìm kiếm theo mã đơn và số điện thoại
            if (searchText) {
            const searchValue = searchText.toLowerCase();
            filtered = filtered.filter(order => 
                  order.id.toLowerCase().includes(searchValue) ||
                  order.phone.includes(searchText)
            );
            }
    
            // Sắp xếp theo trạng thái
            filtered.sort((a, b) => a.status - b.status); 
            const newOrdersPerPage = parseInt(selectedSortValue) || 10;
            setFilteredOrders(filtered);
    
            // Cập nhật số lượng đơn hiển thị
            
            setOrdersPerPage(newOrdersPerPage);
        }, [selectedFilterValue, selectedSortValue, orders, searchText]);
        

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
            navigate('/orderDetail', { state: { product: order } }); 
      };

      const deleteOrder = (id) => {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
            if (confirmDelete) {
              const updatedOrders = orders.filter(order => order.id !== id);
              setOrders(updatedOrders);
              localStorage.setItem('orderList', JSON.stringify(updatedOrders)); // Cập nhật lại localStorage
            }
          };
      const sidebarItems = [
            { id: 1, title: 'Quản lý đơn hàng', path: '/orderManager',  active: true }, 
            { id: 2, title: 'Quản lý sản phẩm', path: '/productManager' },
            { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' }, 
            { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager' },
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
                  {isEditDialogOpen && (
                        <div className="dialog-overlay">
                              <div className="dialog-content">
                                    <h2>Sửa trạng thái đơn hàng</h2>
                                    <div className="sort-dropdown-filter">
                                          <label>Trạng thái:</label>
                                          <select
                                                value={editingOrder?.status}
                                                onChange={(e) =>
                                                      setEditingOrder({ ...editingOrder, status: parseInt(e.target.value, 10) })
                                                }
                                          >
                                                <option value="0">Chờ xác nhận</option>
                                                <option value="1">Đã xác nhận</option>
                                                <option value="2">Đang giao hàng</option>
                                                <option value="3">Đã giao hàng</option>
                                                <option value="4">Đã hủy</option>
                                          </select>
                                    </div>
                                    <div className="dialog-footer">
                                    <button onClick={closeEditDialog}>Hủy</button>
                                    <button
                                          onClick={() => {
                                                // Cập nhật trạng thái đơn hàng
                                                const updatedOrders = orders.map((order) =>
                                                order.id === editingOrder.id ? editingOrder : order
                                                );
                                                setOrders(updatedOrders);
                                                localStorage.setItem('orderList', JSON.stringify(updatedOrders));
                                                closeEditDialog();
                                          }}
                                    >
                                          Lưu
                                    </button>
                                    </div>
                              </div>
                        </div>
                        )}
                        <div className="content-header">
                        <h1>Danh sách đơn hàng</h1>
                        </div>
                        <div className='filters'>
                              <div className="sort-dropdown">
                                    <select value={selectedSortValue} onChange={handleSortChange}>
                                          <option value="">Xem</option>
                                          <option value="10">10 đơn</option>
                                          <option value="20">20 đơn</option>
                                          <option value="30">30 đơn</option>
                                          <option value="50">50 đơn</option>
                                    </select>
                              </div>
                              <div className="search-bar">
                                <div className="search-container">
                                <input className='inputSearch' name='searchText' 
                                    value={searchText} 
                                    onChange={(e) => setSearchText(e.target.value)}
                                    type="text" 
                                    placeholder="Tìm kiếm mã đơn, số điện ..." />
                                {/* <button className='search'  onClick={handleSearch}>
                                    <img src='search.svg' alt="Search Icon"/>
                                </button> */}
                                </div>
                            </div>
                              <div className="sort-dropdown-filter">
                                    <select value={selectedFilterValue} onChange={handleFilterChange} >
                                          <option value="">Trạng thái</option>
                                          <option value="0">Chờ xác nhận</option>
                                          <option value="1">Đã xác nhận</option>
                                          <option value="2">Đang giao hàng</option>
                                          <option value="3">Đã giao hàng</option>
                                          <option value="4">Đã hủy</option>
                                    </select>
                              </div>
                        </div>

                  {/* Table */}
                  <div className="table-container">
                  <table>
                        <thead>
                        <tr>
                        <th>Mã đơn</th>
                        <th>Ngày đặt</th>
                        <th>Số điện thoại</th>
                        <th className='character'>Sản phẩm</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Mã nhân viên</th>
                        <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentOrders.map((order) => (
                        <tr key={order.id}>
                              <td>{order.id}</td>
                              <td>{order.date}</td>
                              <td>{order.phone}</td>
                              <td className='character'>{order.product.length > 20 ? order.product.substring(0, 20) + '...' : order.product}</td>
                              <td className='number'>{order.total} VND</td>
                              <td className="status">
                                    {order.status === 0 && <span className="status-waiting">Chờ xác nhận</span>}
                                    {order.status === 1 && <span className="status-confirmed">Đã xác nhận</span>}
                                    {order.status === 2 && <span className="status-in-delivery">Đang giao hàng</span>}
                                    {order.status === 3 && <span className="status-delivered">Đã giao hàng</span>}
                                    {order.status === 4 && <span className="status-cancel">Đã hủy</span>}
                              </td>
                              <td>{order.staffId}</td>
                              <td className="action-buttons">
                                    <button className="action-btn view" onClick={() => viewOrderDetails(order)}><Eye size={16} /></button>
                                    <button className="action-btn edit" onClick={() => openEditDialog(order)} ><Edit size={16} /></button>
                                    <button className="action-btn delete" onClick={() => deleteOrder(order.id)}><Trash size={16} /></button>
                              </td>
                        </tr>
                        ))}
                        </tbody>
                  </table>
                  </div>
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

export default OrderManager;