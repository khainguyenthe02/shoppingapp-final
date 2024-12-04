import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, ChevronDown } from 'lucide-react';
import './StatisticsManager.css';
import Header from './components/header/Header';
import { Link } from 'react-router-dom';


const StatisticsManager = () => {
    const statusOptions = [
        { value: null, label: 'Tất cả' },
        { value: 0, label: 'Chờ xác nhận' },
        { value: 1, label: 'Đã xác nhận' },
        { value: 2, label: 'Đang giao hàng' },
        { value: 3, label: 'Đã giao hàng' },
        { value: 4, label: 'Đã hủy' },
    ];
    const sidebarItems = [
        { id: 1, title: 'Quản lý đơn hàng', path: '/orderManager' }, 
        { id: 2, title: 'Quản lý sản phẩm', path: '/productManager'},
        { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' }, 
        { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager' },
        { id: 5, title: 'Quản lý tin tức', path: '/newsManager' }, 
        { id: 6, title: 'Quản lý thống kê', path: '/statisticsManager', active: true  } 
  ];
    const [orderList, setOrders] = useState([]); 
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chartType, setChartType] = useState('line');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    useEffect(() => {
        const storedOrders = localStorage.getItem('orderList');
        if (storedOrders) {
            const orders = JSON.parse(storedOrders);
            setOrders(orders);
            setFilteredOrders(orders);
        }
    }, []);

  // Xử lý dữ liệu cho biểu đồ
  const maxRecords = 5;
  const chartData = useMemo(() => {
    const groupedData = filteredOrders.reduce((acc, order) => {
        const date = order.date;
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date]++;
        return acc;
    }, {});

    const data = Object.entries(groupedData).map(([date, count]) => ({
        date,
        orders: count
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Giới hạn số lượng bản ghi
    return data.slice(0, maxRecords); // Chỉ lấy 10 bản ghi đầu tiên
}, [filteredOrders]);

  const totalOrders = orderList.length;
  const handleFilter = () => {
    let filtered = orderList;
    if (startDate && endDate) {
         filtered = orderList.filter(order => {
            const orderDate = new Date(order.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return orderDate >= start && orderDate <= end;
        });
        
    } 
    if (selectedStatus !== null) {
        filtered = filtered.filter(order => order.status === selectedStatus);
    }

    setFilteredOrders(filtered)
};
  console.log(orderList) 

  return (
    <div className="manager-container">
      <Header/>
      <div className="admin-dashboard">
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

        <div className="main-content">
        <div className="content-header">
        <h1>Thống kê đơn hàng</h1>
        </div>
        
        <div className="filter-controls">
            <div className="dropdown">
            <button className="dropdown-button" onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}>
                {chartType === 'line' ? 'Dạng đường kẻ' : 'Dạng cột'}

            </button>
            </div>

            <div className="date-range">
                <span className="date-label">Ngày</span>
                <div className="date-input-container">
                    <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="date-input"
                    />
                    <Calendar className="calendar-icon" />
                </div>
            
                <span className="date-label">đến</span>
            
                <div className="date-input-container">
                    <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="date-input"
                    />
                    <Calendar className="calendar-icon" />
                </div>
            </div>
            <div className="dropdown status-dropdown">
            <select
                className="dropdown-button"
                value={selectedStatus !== null ? selectedStatus : 'all'} // 'all' đại diện cho Tất cả
                onChange={(e) => {
                const value = e.target.value;
                setSelectedStatus(value === 'all' ? null : Number(value));
                }}
            >
                {statusOptions.map((option) => (
                <option key={option.value ?? 'all'} value={option.value !== null ? option.value : 'all'}>
                    {option.label}
                </option>
                ))}
            </select>
            </div>
            <button className="button-filter" onClick={handleFilter}>
                Lọc
            </button>
        </div>

        <div className="order-count">
            <span className="order-label">Đơn hàng:</span>
            <span className="order-number">{totalOrders}</span>
            <button className="refresh-button">
            <svg viewBox="0 0 24 24" className="refresh-icon">
                <path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            </button>
        </div>

        <div className="chart-container">
            <div className="chart-legend">
            <div className="legend-item">
                <div className="legend-color"></div>
                <span className="legend-label">Tổng đơn hàng</span>
            </div>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
            {chartType === 'line' ? (
                <LineChart data={chartData} maxBarSize={3} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#666', fontSize: 12 }}
                ticks={[0, 1, 2, 3, 4, 5]}
                />
                <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#1a237e" 
                strokeWidth={2}
                dot={{ fill: '#1a237e', r: 4 }}
                activeDot={{ r: 6 }}
                />
            </LineChart>
            ): (
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="#E0E0E0" />
                <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 12 }}
                    ticks={[0, 1, 2, 3, 4, 5]}
                />
                <Bar 
                    dataKey="orders" 
                    fill="#1a237e" 
                    maxBarSize={30}
                />
            </BarChart>
            )}
            </ResponsiveContainer>
        </div>
        </div>
      </div>
        
      </div>
    
  );
};

export default StatisticsManager;

