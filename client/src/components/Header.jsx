import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import erasenLweq from '../assets/erasenLweq.png'
import menu from '../assets/menu.svg'
import Home from '../assets/home.svg'
import User from '../assets/user.svg'
import Logout from '../assets/logout.svg'

const Header = ({ onButtonClick, handleClass }) => {
    const [menuCls, setMenuCls] = useState('nav-bar')
    const [currentClass, setCurrentClass] = useState('');
    const [visible, setVisible ] = useState('hide')


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

    const handleMenu = () => {
        if (menuCls === 'nav-bar') {
            setMenuCls('nav-bar-show')
        } else {
            setMenuCls('nav-bar')
        }
    }

    const handleOptions = () => {
      if (visible === 'hide') {
        setVisible('show')
    } else {
        setVisible('hide')
    }
    }

    return (
        <div className={menuCls}>
            <div className="logo">
                <img src={erasenLweq} alt="Erasen-Lewaq Logo" />
            </div>
            <div className="links">
                <ul>
                    <li><button className={`link ln ${currentClass === 'home' ? 'active' : ''}`} onClick={() => onButtonClick('home')}>Home</button></li>
                    <li><button className={`link ln ${currentClass === 'resource' ? 'active' : ''}`} onClick={() => onButtonClick('resource')}>Resource</button></li>
                    <li><button className={`link ln ${currentClass === 'about' ? 'active' : ''}`} onClick={() => onButtonClick('about')}>About</button></li>
                    <li><button className={`link ln ${currentClass === 'faq' ? 'active' : ''}`} onClick={() => onButtonClick('faq')}>FAQ</button></li>

                    <li className='prof'>
                        {/* <Link className='link btn' to={'/login'}>Login</Link> */}
                        <div className='profile'>
                          <button className='link btn' onClick={handleOptions}>Akrem</button>
                          <div className={`lists ${visible}`}>
                            <button><img src={Home} alt="" />Dashboard</button>
                            <button><img src={User} alt="" />Profile</button>
                            <button><img src={Logout} alt="" />Logout</button>
                          </div>
                        </div>
                        <img src={menu} className='hMenu' onClick={handleMenu} />
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Header
