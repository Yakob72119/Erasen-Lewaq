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
          <Route path="/" element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="information" element={<RegisterInfo />} />
          <Route path="educator-registration" element={<EducatorRegister />} />
          {/* Protected routes */}
          <Route path="educator-dashboard" element={<ProtectedRoute role="educator" element={<EduDashboard />} />} />
          <Route path="educator-profile" element={<ProtectedRoute role="educator" element={<EduProfile />} />} />
          <Route path="admin-dashboard" element={<ProtectedRoute role="admin" element={<AdminDashboard />} />} />
          <Route path="admin-profile" element={<ProtectedRoute role="admin" element={<AdminProfile />} />} />
          <Route path="student-dashboard" element={<ProtectedRoute role="student" element={<StudDashboard />} />} />
          <Route path="student-profile" element={<ProtectedRoute role="student" element={<StudProfile />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
