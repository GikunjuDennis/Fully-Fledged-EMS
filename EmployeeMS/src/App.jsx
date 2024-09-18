import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './Components/Login';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Start from './Components/Start';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import EmployeeDetail from './Components/EmployeeDetail';
import EmployeeLogin from './Components/EmployeeLogin';
import AdminEditEmployee from "./Components/AdminEditEmployee";
import { useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from './Components/PrivateRoute';
import LeaveDetails from './Components/LeaveDetails';
import LeaveForm from './Components/LeaveForm';
import LeaveList from './Components/LeaveList';
import LeavePage from './Components/LeavePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      {/* Public Routes */}
      <Route path='/'element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/employee_login' element={<EmployeeLogin/>}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail/>}></Route>

      {/* Protected Routes */}
      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }>
        <Route path='' element={<Home/>}></Route>
        <Route path='/dashboard/employee' element={<Employee/>}></Route>
        <Route path='/dashboard/category' element={<Category/>}></Route>
        <Route path='/dashboard/profile' element={<Profile/>}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory/>}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee/>}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App