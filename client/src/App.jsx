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
    const userRole =  sessionStorage.getItem('role');
    if (!isAuthenticated || (role !== userRole && role !== 'admin')) {
      navigate('/login');
    }
  }, [role, navigate]);

  return <Route {...rest} element={element} />;
};

ProtectedRoute.propTypes = {
  role: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired
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
