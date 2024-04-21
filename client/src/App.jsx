import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Registration from './page/Registration';
import Index from './page/Index';
import Login from './page/Login';
import RegisterInfo from './page/RegisterInfo';
import EducatorRegister from './page/EducatorRegister';
import EduDashboard from './page/EduDashboard';
import AdminDashboard from './page/AdminDashboard';
import StudDashboard from './page/StudDashboard';
import StudProfile from './page/StudProfile';
import AdminProfile from './page/AdminProfile';
import EduProfile from './page/EduProfile';

const ProtectedRoute = ({ role, element, ...rest }) => {
  const navigate = useNavigate(); // Get the navigation function

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const userRole = sessionStorage.getItem('role');
    if (!isAuthenticated || (role !== userRole && role !== 'admin')) {
      navigate('/login');
    }
  }, [role, navigate]);

  return role;
};

ProtectedRoute.propTypes = {
  role: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes path="/">
          {/* Protected routes for educator */}
          <Route path="educator-dashboard" role="educator" element={
            <ProtectedRoute>
              <EduDashboard />
            </ProtectedRoute>
          } />
          <Route path="educator-profile" role="educator" element={
            <ProtectedRoute>
              <EduProfile />
            </ProtectedRoute>
          } />
          {/* Protected routes for admin */}
          <Route path="admin-dashboard" role="admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="admin-profile" role="admin" element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          } />
          {/* Protected routes for student */}
          <Route path="student-dashboard" role="student" element={
            <ProtectedRoute>
              <StudDashboard />
            </ProtectedRoute>
          } />
          <Route path="student-profile" role="student" element={
            <ProtectedRoute>
              <StudProfile />
            </ProtectedRoute>
          } />
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="information" element={<RegisterInfo />} />
          <Route path="educator-registration" element={<EducatorRegister />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
