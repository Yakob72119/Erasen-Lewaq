import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/EduDashboard.scss';
import './style/AdminDashboard.scss';
import erasenLweq from '../assets/erasenLweq.png';
import Cv from '../components/Cv';
import Wait from '../components/Wait';
import Reject from '../components/Reject'
import Home from '../assets/home.svg';
import Exam from '../assets/exam.svg';
import Payment from '../assets/payment.svg';
import User from '../assets/user.svg';
import Logout from '../assets/logout.svg';
import Home2 from '../assets/home2.svg';
import EduDashboardCom from '../components/EduDashboardComponent'
import EduExam from '../components/EduExam';
import EduPayment from '../components/EduPayment';

const EduDashboard = () => {
    const [navBar, setNavBar] = useState('side-nav');
    const [display, setDisplay] = useState('dashboard');
    const [authenticated, setAuthenticated] = useState(false);
    const [fname, setFname] = useState('');
    const [cvStatus, setCvStatus] = useState('');
    const [userId, setUserId] = useState('');
    const [hasCv, setHasCv] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fname = sessionStorage.getItem('fname');

        if (fname) {
            setAuthenticated(true);
            setFname(fname);
        } else {
            setAuthenticated(false);
            setFname('');
        }
    }, [authenticated, fname]);

    useEffect(() => {
        const fetchCvStatus = async () => {
            try {
                const userId = sessionStorage.getItem('_id');
                setUserId(userId);
                const response = await axios.get(`http://localhost:3000/cv/status/${userId}`);
                setCvStatus(response.data.status);
                setHasCv(response.data.status !== '');
            } catch (error) {
                console.error('Error fetching CV status:', error);
            }
        };

        fetchCvStatus();
    }, [userId, cvStatus, hasCv]);

    const handleNav = () => {
        setNavBar(navBar === 'side-nav' ? 'side-nav-show' : 'side-nav');
    };

    const handleDashboard = () => {
        setDisplay('dashboard');
    };

    const handleExam = () => {
        setDisplay('exam');
    };

    const handlePayment = () => {
        setDisplay('payment');
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/user/logout');
            sessionStorage.clear(); // Clear session storage
            setAuthenticated(false); // Update authentication state
            setFname(''); // Clear the user's name
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleCvSubmit = async (formData) => {
        try {
            await axios.post('http://localhost:3000/cv/submitCV', formData);
            navigate('/wait', { state: { message: 'Your CV is pending approval.' } });
        } catch (error) {
            console.error('Error submitting CV:', error);
        }
    };

    return (
        <div className='Registration edu-dashboard admin-dashboard '>
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
                        <li className={display === 'exam' ? 'currentClass' : ''} onClick={handleExam}><img src={Exam} alt="" />Exams</li>
                        <li className={display === 'payment' ? 'currentClass' : ''} onClick={handlePayment}><img src={Payment} alt="" />Payment</li>
                    </ul>
                </div>
                <div className="setting">
                    <ul>
                        <li><Link className='profile' to={'/educator-profile'}><img src={User} alt="" />Profile</Link></li>
                        <li onClick={handleLogout}><img src={Logout} alt="" />Sign out</li>
                    </ul>
                </div>
            </div>
            <div className="main">
                {hasCv && (
                    <>
                        {cvStatus === 'Accepted' && (
                            <>
                                {display === 'dashboard' && <EduDashboardCom />}
                                {display === 'exam' && <EduExam />}
                                {display === 'payment' && <EduPayment />}
                            </>
                        )}
                        {cvStatus === 'Pending' && <Wait message="Your CV is pending approval." />}
                        {cvStatus === 'Declined' && <Reject message="Your CV has been declined." />}
                    </>
                )}
                {!hasCv && <Cv onSubmit={handleCvSubmit} />}
                {/* <Reject /> */}
            </div>

            <div className='right-decor'>{/* this is just for right decor */}</div>
        </div>
    );
};

export default EduDashboard;
