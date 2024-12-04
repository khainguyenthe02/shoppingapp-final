// src/initData.js
import users from './user';
import employeeList from './employee';
import productList from './product';
import orderList from './order';
import serviceList from './service';
import newsList from './news';

const initData = () => {
  localStorage.clear();
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  if (!localStorage.getItem('employeeList')) {
    localStorage.setItem('employeeList', JSON.stringify(employeeList));
  }
  if (!localStorage.getItem('productList')) {
    localStorage.setItem('productList', JSON.stringify(productList));
  }
  if (!localStorage.getItem('orderList')) {
    localStorage.setItem('orderList', JSON.stringify(orderList));
  }
  if (!localStorage.getItem('serviceList')) {
    localStorage.setItem('serviceList', JSON.stringify(serviceList));
  }
  if (!localStorage.getItem('newsList')) {
    localStorage.setItem('newsList', JSON.stringify(newsList));
  }
};

export default initData;