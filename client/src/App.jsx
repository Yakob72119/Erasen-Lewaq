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
import StudDashboard from './page/StudDashboard';
import StudProfile from './page/StudProfile';
import EduProfile from './page/EduProfile';

const ProtectedRoute = ({ role, element, ...rest }) => {
  useEffect(() => {
    const isAuthenticated = /* Retrieve isAuthenticated from session */;
    const userRole = /* Retrieve userRole from session */;
    if (!isAuthenticated || (role !== userRole && role !== 'admin')) {
      // Redirect to login page if not authenticated or role does not match
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
          <ProtectedRoute path="educator-profile" role="educator" element={<EduProfile />} />
          {/* Protected routes for admin */}
          <ProtectedRoute path="admin-dashboard" role="admin" element={<AdminDashboard />} />
          <ProtectedRoute path="admin-profile" role="admin" element={<AdminProfile />} />
          {/* Protected routes for student */}
          <ProtectedRoute path="student-dashboard" role="student" element={<StudDashboard />} />
          <ProtectedRoute path="student-profile" role="student" element={<StudProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
