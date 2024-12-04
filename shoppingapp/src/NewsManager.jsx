import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './Manager.css';
import { Eye, Edit, Trash } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const NewsManager = () => {
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
        
            const [news, setOrders] = useState([]); 
            const [searchText, setSearchText] = useState('');
            const [filteredNews, setFilterNews] = useState([]); 
            useEffect(() => {
                const storedNews = localStorage.getItem('newsList');
                if (storedNews) {
                    const parsedProducts = JSON.parse(storedNews);
                    setOrders(parsedProducts);
                    setFilterNews(parsedProducts);
                }
              }, []);
              useEffect(() => {
                const filtered = news.filter(service => 
                    service.id.toLowerCase().includes(searchText.toLowerCase()) ||
                    service.title.toLowerCase().includes(searchText.toLowerCase()) 
                );
                setFilterNews(filtered);
            }, [searchText, news]);
              console.log(filteredNews)
            const [selectedSortValue, setSelectedSortValue] = useState('');
            const [currentPage, setCurrentPage] = useState(1);
            const [ordersPerPage, setOrdersPerPage] = useState(10);
    
            const handleSortChange = (event) => {
                  const selectedValue = event.target.value;
                  setSelectedSortValue(selectedValue);
                  
                  
                  const newOrdersPerPage = parseInt(selectedValue) || 10;
                  setOrdersPerPage(newOrdersPerPage);
                  setCurrentPage(1); 
          
                  
                  setFilterNews(news);
              };
          
              const totalPages = Math.ceil((filteredNews?.length || 0) / ordersPerPage);
              const indexOfLastOrder = currentPage * ordersPerPage;
              const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
              const currentOrders = filteredNews.slice(indexOfFirstOrder, indexOfLastOrder);          
            const viewOrderDetails = (order) => {
                  navigate('/newsDetail', { state: { product: order } });
            };
            const toCreateNew = () => {
                navigate('/createNews');
          }
          const ToEditNews = (order) => {
            navigate('/editNews', { state: { product: order } });
          }
            const deleteOrder = (id) => {
                  const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tin tức này?");

                  if (confirmDelete) {
                    setOrders((prevOrders) => {
                        const updatedOrders = prevOrders.filter(order => order.id !== id);
                        localStorage.setItem('newsList', JSON.stringify(updatedOrders));
                        setFilterNews(updatedOrders);
                        return updatedOrders;
                    });
                }
            };
      const sidebarItems = [
            { id: 1, title: 'Quản lý đơn hàng', path: '/orderManager' }, 
            { id: 2, title: 'Quản lý sản phẩm', path: '/productManager' },
            { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' }, 
            { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager' },
            { id: 5, title: 'Quản lý tin tức', path: '/newsManager', active: true }, 
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
                        <h1>Danh sách tin tức</h1>
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
                                    placeholder="Tìm kiếm mã, tiêu đề tin tức ..." />
                                    
                                {/* <button className='search'  onClick={handleSearch}>
                                    <img src='search.svg' alt="Search Icon"/>
                                </button> */}
                                </div>
                        </div>
                        <div>
                              <button className='button-add' onClick={toCreateNew}>THÊM</button>
                        </div>
                        </div>

                  {/* Table */}
                  <div className="table-container">
                  <table>
                        <thead>
                        <tr>
                        <th className='number'>Mã tin tức</th>
                        <th className='character'>Tiêu đề</th>
                        <th>Ngày đăng</th>
                        <th className='character'>Nội dung</th>
                        <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentOrders.map((news) => (
                              <tr key={news.id}>
                              <td className='number' >{news.id}</td>
                              <td className='character'>{(() => {
                                    const materialsString = news.title;
                                    const maxLength = 30;
                                    return materialsString.length > maxLength 
                                          ? materialsString.substring(0, maxLength) + '...' 
                                          : materialsString;
                              })()}</td>
                              <td>{news.date}</td>
                              <td className='character'>{
                                (() => {
                                    const materialsString = news.description;
                                    const maxLength = 50;
                                    return materialsString.length > maxLength 
                                          ? materialsString.substring(0, maxLength) + '...' 
                                          : materialsString;
                                })()
                              }</td>
                              <td className="action-buttons">
                                    <button className="action-btn view" onClick={() => viewOrderDetails(news)}><Eye size={16} /></button>
                                    <button className="action-btn edit" onClick={() => ToEditNews(news)}><Edit size={16} /></button>
                                    <button className="action-btn delete" onClick={() => deleteOrder(news.id)}><Trash size={16} /></button>
                              </td>
                        </tr>
                        ))}
                        </tbody>
                  </table>
                  </div>

                        {/* Pagination */}
                    {/* <div className="pagination">
                        <div className="pagination-info">
                            <span>Trang {currentPage} / {totalPages}</span>
                        </div>
                        <div className="pagination-buttons">
                            {currentPage > 1 && (
                                <button className='button-paging' onClick={() => handlePageChange(currentPage - 1)}>Trang trước</button>
                            )}
                            {totalPages > 1 && (
                                <>
                                    <button className='button-paging' onClick={() => handlePageChange(1)}>1</button>
                                    {totalPages > 2 && currentPage < totalPages && (
                                        <button className='button-paging' onClick={() => handlePageChange(2)}>2</button>
                                    )}
                                </>
                            )}
                            {currentPage < totalPages && (
                                <button className='button-paging' onClick={handleNextPage}>Trang sau</button>
                            )}
                        </div>
                    </div> */}
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

export default NewsManager;