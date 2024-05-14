import React, { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submit, setSubmit] = useState('');


    const handleInputChange = (event) => {
        setEmail(event.target.value);
        setError('');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmit(true);

        if (email === '') {
            setError('The Email field is required.');
            return;
        }

        console.log(email)
        setEmail('')
        setSubmit(false)


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
                        {...(submit && email === '' && { required: true })}
                    />

                    {error && <span style={{ color: 'red' }}>{error}</span>}
                    <input type="submit" value="Forget Password" className="formBtn" id="forBtn" />
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
            <div className="warning">
                This is For student and educator only, if you are Admin contact the admin that added you before.
            </div>
            <div className="right-decor">{/* this is just for right decor */}</div>

        </div>

    )
}

export default ForgetPassword
