import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx'; // Import trang SignUp
import OrderDetail from './OrderDetail.jsx';
import OrderManager from './OrderManager.jsx';
import ProductManager from './ProductManager.jsx';
import ProductDetail from './ProductDetail.jsx';
import EmployeeManager from './EmployeeManager.jsx';
import CreateEmployee from './CreateEmployee.jsx';
import EditEmployee from './EditEmployee.jsx';
import EmployeeDetail from './EmployeeDetail.jsx';
import CreateProduct from './CreateProduct.jsx';
import ServiceManager from './ServiceManager.jsx';
import CreateService from './CreateService.jsx';
import ServiceDetail from './ServiceDetail.jsx';
import EditProduct from './EditProduct.jsx';
import EditService from './EditService.jsx';
import initData from './data/initData.jsx';
import NewsManager from './NewsManager.jsx';
import CreateNews from './CreateNews.jsx';
import EditNews from './EditNews.jsx';
import NewsDetail from './NewsDetail.jsx';
import StatisticsManager from './StatisticsManager.jsx';
import ChangePassword from './ChangePassword.jsx';

initData();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/orderDetail" element={<OrderDetail />} /> 
        <Route path="/orderManager" element={<OrderManager />} />
        <Route path="/" element={<Navigate to="/orderManager" replace />} />
        <Route path='/productManager' element={<ProductManager/>} />
        <Route path='/productDetail' element={<ProductDetail/>} />
        <Route path='/employeeManager' element={<EmployeeManager/>}/>
        <Route path='/createEmployee' element={<CreateEmployee/>}/>
        <Route path='/employeeDetail' element={<EmployeeDetail/>}/>
        <Route path='/editEmployee' element={<EditEmployee/>}/>
        <Route path='/createProduct' element={<CreateProduct/>}/>
        <Route path='/serviceManager' element={<ServiceManager/>}/>
        <Route path='/createService' element={<CreateService/>}/>
        <Route path='/editProduct' element={<EditProduct/>}/>
        <Route path='/serviceDetail' element={<ServiceDetail/>}/>
        <Route path='/editService' element={<EditService/>}/>
        <Route path='/newsManager' element={<NewsManager/>}/>
        <Route path='/createNews' element={<CreateNews/>}/>
        <Route path='/editNews' element={<EditNews/>}/>
        <Route path='/newsDetail' element={<NewsDetail/>}/>
        <Route path='/statisticsManager' element={<StatisticsManager/>}/>
        <Route path='/changePassword' element={<ChangePassword/>}/>

      </Routes>
    </Router>
  </StrictMode>,
);