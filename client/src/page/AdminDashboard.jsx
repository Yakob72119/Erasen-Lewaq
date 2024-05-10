import { useEffect, useState } from 'react'
import axios from 'axios'
import './style/EduDashboard.scss'
import './style/AdminDashboard.scss'
import erasenLweq from '../assets/erasenLweq.png'
import Home from '../assets/home.svg'
import Exam from '../assets/exam.svg'
import User from '../assets/user.svg'
import Cv from '../assets/cv.svg'
import Payment from '../assets/payment.svg'
import Compliment from '../assets/customer.svg';
import Fqa from '../assets/faq.svg'
import Setting from '../assets/setting.svg'
import Logout from '../assets/logout.svg'
import Home2 from '../assets/home2.svg';
import AdminDashboardCom from '../components/AdminDashboardComponent'
import Admincv from '../components/Admincv'
import AdminUser from '../components/AdminUser'
import AdminExam from '../components/AdminExam'
import AdminPayment from '../components/AdminPayment'
import AdminSetting from '../components/AdminSetting'
import AdminCompliment from "../components/AdminCompliment";
import { Link } from 'react-router-dom'
import AdminFqa from '../components/AdminFqa'

const AdminDashboard = () => {
    const [navBar, setNavBar] = useState('side-nav')
    const [display, setDisplay] = useState('dashboard')
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

    const handleUser = () => {
        setDisplay('user')
    }

    const handleCv = () => {
        setDisplay('cv')
    }

    const handlePayment = () => {
        setDisplay('payment')
    }

    const handleCompliment = () => {
        setDisplay('compliment');
    };

    const handleFqa = () => {
        setDisplay('fqa')
    }

    const handleSetting = () => {
        setDisplay('setting')
    }

    const handleSignOut = async () => {
        try {
            await axios.get('http://localhost:3000/user/logout');
            sessionStorage.clear(); // Clear session storage
            setAuthenticated(false); // Update authentication state
            setFname(''); // Clear the user's name
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className='admin-dashboard Registration edu-dashboard'>
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
                        <li className={display === 'exam' && 'currentClass'} onClick={handleExam}><img src={Exam} alt="" />Exams</li>
                        <li className={display === 'user' && 'currentClass'} onClick={handleUser}><img src={User} alt="" />User</li>
                        <li className={display === 'cv' && 'currentClass'} onClick={handleCv}><img src={Cv} alt="" />CV</li>
                        <li className={display === 'payment' && 'currentClass'} onClick={handlePayment}><img src={Payment} alt="" />Payment</li>
                        <li className={display === 'compliment' ? 'currentClass' : ''} onClick={handleCompliment}><img src={Compliment} alt="" />Compliment</li>
                        <li className={display === 'fqa' && 'currentClass'} onClick={handleFqa}><img src={Fqa} alt="" />FQA</li>
                    </ul>
                </div>
                <div className="setting">
                    <ul>
                        <li className={display === 'setting' && 'currentClass'} onClick={handleSetting}><img src={Setting} alt="" />Setting</li>
                        <li onClick={handleSignOut}><img src={Logout} alt="" />Sign out</li>
                    </ul>
                </div>
            </div>

            <div className="main">
                {display === 'dashboard' && <AdminDashboardCom />}
                {display === 'exam' && <AdminExam />}
                {display === 'user' && <AdminUser />}
                {display === 'cv' && <Admincv />}
                {display === 'payment' && <AdminPayment />}
                {display === 'compliment' && <AdminCompliment />}
                {display === 'fqa' && <AdminFqa />}
                {display === 'setting' && <AdminSetting />}
            </div>
            <div className='right-decor'>{/* this is just for right decor */}</div>
        </div>
    )
}

export default AdminDashboard
