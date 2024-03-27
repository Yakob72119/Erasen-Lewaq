import {useState} from 'react'
import './style/EduDashboard.scss'
import erasenLweq from '../assets/erasenLweq.png'
import Cv from '../components/Cv'


const EduDashboard = () => {
    const [navBar, setNavBar] = useState('side-nav')

    const handleNav = () => {
        if(navBar === 'side-nav') {
            setNavBar('side-nav-show')
        } else {
            setNavBar('side-nav')
        }
    }
    
    return (
        <div className='Registration edu-dashboard'>
            <div className="logo-profile">
                <img src={erasenLweq} alt="" />
                <span className='profile'>J</span>
            </div>
            <div className={navBar}>
                <span  onClick={handleNav} className='nav-btn'>|</span>
                <div className="option">
                    <ul>
                        <li>Dashboard</li>
                        <li>Exams</li>
                        <li>Payment</li>
                    </ul>
                </div>
                <div className="setting">
                    <ul>
                        <li>Setting</li>
                        <li>Sign out</li>
                    </ul>
                </div>
            </div>

            <div className="main">
                <Cv />
            </div>
            <div className='right-decor'>{/* this is just for right decor */}</div>
        </div>
    )
}

export default EduDashboard
