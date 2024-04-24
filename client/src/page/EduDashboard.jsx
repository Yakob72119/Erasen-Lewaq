import { useState } from 'react'
import './style/EduDashboard.scss'
import './style/AdminDashboard.scss'
import erasenLweq from '../assets/erasenLweq.png'
import Cv from '../components/Cv'
import Wait from '../components/Wait'
import Home from '../assets/home.svg'
import Exam from '../assets/exam.svg'
import Payment from '../assets/payment.svg'
import Logout from '../assets/logout.svg'
import Bell from '../assets/notfication.svg'
import EduExam from '../components/EduExam'
import EduPayment from '../components/EduPayment'


const EduDashboard = () => {
    const [navBar, setNavBar] = useState('side-nav')
    const [display, setDisplay] = useState('dashboard')

    const handleNav = () => {
        if (navBar === 'side-nav') {
            setNavBar('side-nav-show')
        } else {
            setNavBar('side-nav')
        }
    }

    const handleDashboard = () => {
        setDisplay('dashboard')
    }
    const handleExam = () => {
        setDisplay('exam')
    }
    const handlePayment= () => {
        setDisplay('payment')
    }


    return (
        <div className='Registration edu-dashboard admin-dashboard '>
            <div className="scroll"></div>

            <div className="logo-profile">
                <img src={erasenLweq} alt="" />
                <img className='bell' src={Bell} alt="" />
                <span className='profile'>J</span>
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
                {/* <Cv /> */}
                {/* <Wait />*/}
                {display === 'dashboard' && 'dashboard'}
                {display === 'exam' && <EduExam />}
                {display === 'payment' && <EduPayment />}
            </div>
            <div className='right-decor'>{/* this is just for right decor */}</div>
        </div>
    )
}

export default EduDashboard
