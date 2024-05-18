import React, { useState } from 'react';
import erasenLweq from '../assets/erasenLweq.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [passwordResetMessage, setPasswordResetMessage] = useState('');

    const handleInputChange = (event) => {
        setEmail(event.target.value);
        setError('');
        setPasswordResetMessage('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email === '') {
            setError('The Email field is required.');
            return;
        }

        try {
            setSubmitting(true);
            const response = await axios.post('http://localhost:3000/email/forget-password', { email });
            setPasswordResetMessage(response.data.message);
            setEmail('');
        } catch (error) {
            console.error('Error:', error);
            setError('Error resetting password. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='login'>
            <div className="left-decor">{/* this is just for left decor */}</div>
            <div className='registration-container'>
                <img className="EranseLewaqLogo" src={erasenLweq} alt="EranseLewaq-logo" />
                <h1 className="title">Forget Password</h1>
                <form className="registerForm" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={handleInputChange}
                        required
                    />
                    {error && <span style={{ color: 'red' }}>{error}</span>}
                    {passwordResetMessage && <span style={{ color: 'green' }}>{passwordResetMessage}</span>}
                    <button type="submit" disabled={submitting} className="formBtn" id="forBtn">
                        {submitting ? 'Sending...' : 'Forget Password'}
                    </button>
                    <div className="redirect">
                        <p>
                            If you remember your Password Back to <Link className="ancr" to={'/login'}>Login</Link>
                        </p>
                        <p>
                            Back to <Link className="ancr" to={'/'}>Home</Link>
                        </p>
                    </div>
                </form>
            </div>
            <div className="right-decor">{/* this is just for right decor */}</div>
        </div>
    );
};

export default ForgetPassword;
