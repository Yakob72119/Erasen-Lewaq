import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from './page/Registration'
import Index from './page/Index';
import Login from './page/Login';
import RegisterInfo from './page/RegisterInfo';
import EducatorRegister from './page/EducatorRegister'
import EduDashboard from './page/EduDashboard';
import AdminDashboard from './page/AdminDashboard';
import StudDashboard from './page/StudDashboard';
import StudProfile from './page/StudProfile';
import AdminProfile from './page/AdminProfile';
import EduProfile from './page/EduProfile';
import ExamPage from './page/ExamPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes path="/">
          <Route index element={
            <Index />
          } />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="information" element={<RegisterInfo />} />
          <Route path="educator-registration" element={<EducatorRegister />} />
          <Route path="educator-dashboard" element={<EduDashboard />} />
          <Route path="educator-profile" element={<EduProfile />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="admin-profile" element={<AdminProfile />} />
          <Route path="student-dashboard" element={<StudDashboard />} />
          <Route path="student-profile" element={<StudProfile />} />
          <Route path="exam-page" element={<ExamPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
