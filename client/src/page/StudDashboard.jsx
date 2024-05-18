import React, { useEffect, useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png';
import './style/EduDashboard.scss';
import './style/AdminDashboard.scss';
import './style/StudentDashboard.scss';
import Home from '../assets/home.svg';
import Home2 from '../assets/home2.svg';
import Exam from '../assets/exam.svg';
import Wallet from '../assets/wallet.svg';
import Compliment from '../assets/customer.svg';
import Logout from '../assets/logout.svg';
import User from '../assets/user.svg';
import { Link } from 'react-router-dom';
import StudentDashboardComponent from './../components/StudentDashboardComponent'
import StudentWalletComponent from './../components/StudentWalletComponent'
import StudentExamComponent from './../components/StudentExamComponent'
import StudentComplainComponent from './../components/StudentComplainComponent'

const StudDashboard = () => {
  const [navBar, setNavBar] = useState('side-nav');
  const [display, setDisplay] = useState('dashboard');
  const [fname, setFname] = useState('');
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    const fname = sessionStorage.getItem('fname');

    if (fname) {
      setAuthenticated(true);
      setFname(fname);
    } else {
      setAuthenticated(false);
      setFname('');
    }
  }, []);

  const handleNav = () => {
    setNavBar(navBar === 'side-nav' ? 'side-nav-show' : 'side-nav');
  };

  const handleDashboard = () => {
    setDisplay('dashboard');
  };

  const handleExam = () => {
    setDisplay('exam');
  };

  const handleWallet = () => {
    setDisplay('wallet');
  };

  const handleCompliment = () => {
    setDisplay('compliment');
  };

  return (
    <div className='Registration edu-dashboard admin-dashboard student-dashboard'>
      <div className="scroll"></div>

      <div className="logo-profile">
        <img src={erasenLweq} alt="" className='img-logo' />
        <Link to={'/'}><img src={Home2} alt="" className='img-home' /></Link>
        <h1 className='profile-letter'>{authenticated ? fname[0] : ''}</h1>
      </div>
      <div className={navBar}>
        <span onClick={handleNav} className='nav-btn'>|</span>
        <div className="option">
          <ul>
            <li className={display === 'dashboard' ? 'currentClass' : ''} onClick={handleDashboard}><img src={Home} alt="" />Dashboard</li>
            <li className={display === 'wallet' ? 'currentClass' : ''} onClick={handleWallet}><img src={Wallet} alt="" />Wallet</li>
            <li className={display === 'exam' ? 'currentClass' : ''} onClick={handleExam}><img src={Exam} alt="" />Exams</li>
            <li className={display === 'compliment' ? 'currentClass' : ''} onClick={handleCompliment}><img src={Compliment} alt="" />Complain</li>
          </ul>
        </div>
        <div className="setting">
          <ul>
            <li><Link className='profile' to={'/student-profile'}><img src={User} alt="" />Profile</Link></li>
            <li><img src={Logout} alt="" />Sign out</li>
          </ul>
        </div>
      </div>
      <div className="main">
        {display === 'dashboard' && <StudentDashboardComponent />}
        {display === 'wallet' && <StudentWalletComponent />}
        {display === 'exam' && <StudentExamComponent />}
        {display === 'compliment' && <StudentComplainComponent />}
      </div>

      <div className='right-decor'>{/* this is just for right decor */}</div>
    </div>
  );
}

export default StudDashboard
