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
import EduProfile from './page/EduProfile';
import ExamPage from './page/ExamPage';
import CvGrade from './page/CvGrade';
import ExamView from './page/ExamView';
import ForgetPassword from './page/ForgetPassword';
import StudentExamReview from './page/StudentExamReview';


const ProtectedRoute = ({ role, element }) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const userRole = sessionStorage.getItem('role');
  
  if (isAuthenticated && role === userRole) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
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
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="register" element={<Registration />} />
          <Route path="information" element={<RegisterInfo />} />
          <Route path="educator-registration" element={<EducatorRegister />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />

          <Route path="educator-profile" element={<ProtectedRoute role="educator" element={<EduProfile />} />} />
          <Route path="educator-dashboard" element={<ProtectedRoute role="educator" element={<EduDashboard />} />} />
          {/* <Route path="educator-dashboard"  element={<EduDashboard />} /> */}

          <Route path="admin-dashboard"  element={<AdminDashboard />} />
          <Route path="exam-page"  element={<ExamPage />} />
          <Route path="cv-grade"  element={<CvGrade />} />
          <Route path="exam-view"  element={<ExamView />} />
          {/* <Route path="admin-dashboard" element={<ProtectedRoute role="admin" element={<AdminDashboard />} />} /> */}

          <Route path="student-dashboard"  element={<StudDashboard />} />
          <Route path="exam-review"  element={<StudentExamReview />} />
          {/* <Route path="student-dashboard" element={<ProtectedRoute role="student" element={<StudDashboard />} />} /> */}
          <Route path="student-profile" element={<ProtectedRoute role="student" element={<StudProfile />} />} />
          
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
