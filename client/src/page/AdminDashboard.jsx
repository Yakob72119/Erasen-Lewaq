import {useState} from 'react'
import './style/EduDashboard.scss'
import erasenLweq from '../assets/erasenLweq.png'
import Home from '../assets/home.svg'
import Exam from '../assets/exam.svg'
import User from '../assets/user.svg'
import Cv from '../assets/cv.svg'
import Payment from '../assets/payment.svg'
import Setting from '../assets/setting.svg'
import Logout from '../assets/logout.svg'
import Bell from '../assets/notfication.svg'

const AdminDashboard = () => {
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
            <div className="scroll"></div>

            <div className="logo-profile">
                <img src={erasenLweq} alt="" />
                <img className='bell' src={Bell} alt="" />
                <span className='profile'>J</span>
            </div>
            <div className={navBar}>
                <span  onClick={handleNav} className='nav-btn'>|</span>
                <div className="option">
                    <ul>
                        <li><img src={Home} alt="" />Dashboard</li>
                        <li><img src={Exam} alt="" />Exams</li>
                        <li><img src={User} alt="" />User</li>
                        <li><img src={Cv} alt="" />CV</li>
                        <li><img src={Payment} alt="" />Payment</li>
                    </ul>
                </div>
                <div className="setting">
                    <ul>
                        <li><img src={Setting} alt="" />Setting</li>
                        <li><img src={Logout} alt="" />Sign out</li>
                    </ul>
                </div>
            </div>

            <div className="main">
                Admin
            </div>
            <div className='right-decor'>{/* this is just for right decor */}</div>
        </div>
    )
}

export default AdminDashboard
