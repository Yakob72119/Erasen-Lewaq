import React, { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png';
import './style/EduDashboard.scss';
import './style/AdminDashboard.scss';
import Home from '../assets/home.svg';
import Home2 from '../assets/home2.svg';
import Exam from '../assets/exam.svg';
import Payment from '../assets/payment.svg';
import Logout from '../assets/logout.svg';
import { Link } from 'react-router-dom';

const StudDashboard = () => {
  const [navBar, setNavBar] = useState('side-nav');
  const [display, setDisplay] = useState('dashboard');
  const handleNav = () => {
    setNavBar(navBar === 'side-nav' ? 'side-nav-show' : 'side-nav');
  };

  const handleDashboard = () => {
    setDisplay('dashboard');
  };

  const handleExam = () => {
    setDisplay('exam');
  };

  const handlePayment = () => {
    setDisplay('payment');
  };

  return (
    <div className='Registration edu-dashboard admin-dashboard student-dashboard'>
      <div className="scroll"></div>

      <div className="logo-profile">
        <img src={erasenLweq} alt="" className='img-logo' />
        <Link to={'/'}><img src={Home2} alt="" className='img-home' /></Link>
      </div>
      <div className={navBar}>
        <span onClick={handleNav} className='nav-btn'>|</span>
        <div className="option">
          <ul>
            <li className={display === 'dashboard' ? 'currentClass' : ''} onClick={handleDashboard}><img src={Home} alt="" />Dashboard</li>
            <li className={display === 'exam' ? 'currentClass' : ''} onClick={handleExam}><img src={Exam} alt="" />Exams</li>
            <li className={display === 'payment' ? 'currentClass' : ''} onClick={handlePayment}><img src={Payment} alt="" />Payment</li>
          </ul>
        </div>
        <div className="setting">
          <ul>
            <li><img src={Logout} alt="" />Sign out</li>
          </ul>
        </div>
      </div>
      <div className="main">

      </div>

      <div className='right-decor'>{/* this is just for right decor */}</div>
    </div>
  );
}

export default StudDashboard
