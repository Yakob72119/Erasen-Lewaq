import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import erasenLweq from '../assets/erasenLweq.png';
import menu from '../assets/menu.svg';
import HomeIcon from '../assets/home.svg';
import Logout from '../assets/logout.svg';

const Header = ({ onButtonClick, handleClass }) => {
  const [menuCls, setMenuCls] = useState('nav-bar');
  const [currentClass, setCurrentClass] = useState('');
  const [visible, setVisible] = useState('hide');
  const [authenticated, setAuthenticated] = useState(false);
  const [fname, setFname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (handleClass === 'home') {
      setCurrentClass('home');
    } else if (handleClass === 'resource') {
      setCurrentClass('resource');
    } else if (handleClass === 'about') {
      setCurrentClass('about');
    } else if (handleClass === 'faq') {
      setCurrentClass('faq');
    } else {
      setCurrentClass('');
    }
  }, [handleClass]);

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

  const handleMenu = () => {
    setMenuCls(menuCls === 'nav-bar' ? 'nav-bar-show' : 'nav-bar');
  };

  const handleOptions = () => {
    setVisible(visible === 'hide' ? 'show' : 'hide');
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/user/logout');
      sessionStorage.clear(); // Clear session storage
      setAuthenticated(false); // Update authentication state
      setFname(''); // Clear the user's name
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDashboardClick = () => {
    const role = sessionStorage.getItem('role');
    if (role === 'educator') {
      navigate('/educator-dashboard');
    } else if (role === 'student') {
      navigate('/student-dashboard');
    } else if (role === 'admin') {
      navigate('/admin-dashboard');
    }
  };

  return (
    <div className={menuCls}>
      <div className="logo">
        <img src={erasenLweq} alt="Erasen-Lewaq Logo" />
      </div>
      <div className="links">
        <ul>
          <li>
            <button
              className={`link ln ${currentClass === 'home' ? 'active' : ''}`}
              onClick={() => onButtonClick('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`link ln ${currentClass === 'resource' ? 'active' : ''}`}
              onClick={() => onButtonClick('resource')}
            >
              Resource
            </button>
          </li>
          <li>
            <button
              className={`link ln ${currentClass === 'about' ? 'active' : ''}`}
              onClick={() => onButtonClick('about')}
            >
              About
            </button>
          </li>
          <li>
            <button
              className={`link ln ${currentClass === 'faq' ? 'active' : ''}`}
              onClick={() => onButtonClick('faq')}
            >
              FQA
            </button>
          </li>
          <li className="prof">
            {authenticated ? (
              <div className="profile">
                <button className="link btn" onClick={handleOptions}>
                  {fname}
                </button>
                <div className={`lists ${visible}`}>
                  <button onClick={handleDashboardClick}>
                    <img src={HomeIcon} alt="Dashboard" />
                    Dashboard
                  </button>
                  <button onClick={handleLogout}>
                    <img src={Logout} alt="Logout" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link className="link btn" to="/login">
                Login
              </Link>
            )}
            <img src={menu} className="hMenu" onClick={handleMenu} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
