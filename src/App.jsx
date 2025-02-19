import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Login from "./components//Login/Login";
import Home from "./components/Home";
import Auth from "./components/auth/Auth";
import EmployeeDetailsPage from "./components/Employee_Details/EmployeePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Auth><Home /></Auth>} />
          <Route path="/employee/:id" element={<Auth><EmployeeDetailsPage /></Auth>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </RecoilRoot>
  );
}

export default App;