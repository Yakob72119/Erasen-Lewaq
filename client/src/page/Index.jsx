import React from 'react'
import erasenLweq from '../assets/erasenLweq.png'
import { Link } from 'react-router-dom';
import '../App.scss'



const Index = () => {
    return (
        <div className='homePage'>
            <div className="nav-bar">
                <div className="logo">
                    <img src={erasenLweq} alt="Erasen-Lewaq Logo" />
                </div>
                <div className="links">
                    <ul>
                        <li><a className='link ln' href="#">Home</a></li>
                        <li><a className='link ln' href="#">About</a></li>
                        <li><a className='link ln' href="#">Resource</a></li>
                        <li><a className='link ln' href="#">Contact</a></li>
                        <li><Link className='link btn' to={'/login'}>Login</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Index
