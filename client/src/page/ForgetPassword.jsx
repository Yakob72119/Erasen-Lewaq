import React, { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submit, setSubmit] = useState('');
    const [passWd, setPassWd] = useState('');

    const generatePassword = () => {
        const passwordLength = 8;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$_&';
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log('Generated Password:', password);
        return password;
    }

    

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

        const generatedPasswd = generatePassword();
        setPassWd(generatedPasswd)

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
                {/* {passWd} */}
            </div>
            
            <div className="right-decor">{/* this is just for right decor */}</div>

        </div>

    )
}

export default ForgetPassword
