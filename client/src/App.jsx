import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './page/Registration';
import Index from './page/Index';
import Login from './page/Login';
import RegisterInfo from './page/RegisterInfo';
import EducatorRegister from './page/EducatorRegister';
import EduDashboard from './page/EduDashboard';
import AdminDashboard from './page/AdminDashboard';


const ProtectedRoute = ({ role, element, ...rest }) => {
  useEffect(() => {
    
    const isAuthenticated = /* Retrieve isAuthenticated from session */;
    const userRole = /* Retrieve userRole from session */;
    if (!isAuthenticated || userRole !== role) {
      window.location.href = '/login';
    }
  }, [role]);

  return <Route {...rest} element={element} />;
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="information" element={<RegisterInfo />} />
          <Route path="educator-registration" element={<EducatorRegister />} />
          {/* Protected routes for educator */}
          <ProtectedRoute path="educator-dashboard" role="educator" element={<EduDashboard />} />
          {/* Protected routes for admin */}
          <ProtectedRoute path="admin-dashboard" role="admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
