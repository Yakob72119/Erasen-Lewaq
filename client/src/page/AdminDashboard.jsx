import {useState} from 'react'
import './style/EduDashboard.scss'
import './style/AdminDashboard.scss'
import erasenLweq from '../assets/erasenLweq.png'
import Home from '../assets/home.svg'
import Exam from '../assets/exam.svg'
import User from '../assets/user.svg'
import Cv from '../assets/cv.svg'
import Payment from '../assets/payment.svg'
import Setting from '../assets/setting.svg'
import Logout from '../assets/logout.svg'
import Bell from '../assets/notfication.svg'
import Admincv from '../components/Admincv'
import AdminUser from '../components/AdminUser'

const AdminDashboard = () => {
    const [navBar, setNavBar] = useState('side-nav')
    const [display, setDisplay] = useState('dashboard')

    const handleNav = () => {
        if(navBar === 'side-nav') {
            setNavBar('side-nav-show')
        } else {
            setNavBar('side-nav')
        }
    }

    const handleCv = () => {
        setDisplay('cv')
    }

    const handleUser = () => {
        setDisplay('user')
    }
    
    const handleDashboard = () => {
        setDisplay('dashboard')
    }
    
    return (
        <div className='admin-dashboard Registration edu-dashboard'>
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
                        <li className={display === 'dashboard' && 'currentClass'} onClick={handleDashboard}><img src={Home} alt="" />Dashboard</li>
                        <li><img src={Exam} alt="" />Exams</li>
                        <li className={display === 'user' && 'currentClass'} onClick={handleUser}><img src={User} alt="" />User</li>
                        <li className={display === 'cv' && 'currentClass'} onClick={handleCv}><img src={Cv} alt="" />CV</li>
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
                {display === 'cv' && <Admincv />}
                {display === 'user' && <AdminUser />}
                {display === 'dashboard' && 'dashboard'}
            </div>
            <div className='right-decor'>{/* this is just for right decor */}</div>
        </div>
    )
}

export default AdminDashboard
