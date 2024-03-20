import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from './page/Registration'
import Index from './page/Index';
import Login from './page/Login';
import RegisterInfo from './page/RegisterInfo';
import EducatorRegister from './page/EducatorRegister'
import EduDashboard from './page/EduDashboard';

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
