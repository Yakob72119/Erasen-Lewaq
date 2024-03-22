import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import erasenLweq from '../assets/erasenLweq.png'
import menu from '../assets/menu.svg'

const Header = () => {
    const [menuCls, setMenuCls] = useState('nav-bar')

    const handleMenu = () => {
        if (menuCls === 'nav-bar'){
            setMenuCls('nav-bar-show')
        } else {
            setMenuCls('nav-bar')
        }
    }

    return (
        <div className={menuCls}>
            <div className="logo">
                <img src={erasenLweq} alt="Erasen-Lewaq Logo" />
            </div>
            <div className="links">
                <ul>
                    <li><a className='link ln' href="#">Home</a></li>
                    <li><a className='link ln' href="#">About</a></li>
                    <li><a className='link ln' href="#">Resource</a></li>
                    <li><a className='link ln' href="#">Contact</a></li>
                    <li className='prof'>
                        <Link className='link btn' to={'/login'}>Login</Link>
                        <img src={menu} className='hMenu' onClick={handleMenu}/>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Header
