import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import erasenLweq from '../assets/erasenLweq.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isCheck, SetIsCheck] = useState(false);
  const [error, setError] = useState('');
  const [submit, setSubmit] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleCheckboxChange = () => {
    SetIsCheck(!isCheck); // Toggle the value of isCheck
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmit(true);

    const emptyFields = Object.values(formData).filter((value) => value === '');
    if (emptyFields.length > 0) {
      setError('All fields are required.');
      return;
    }

    if (formData.password.length < 6) {
      setError('The Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/login', formData);
      console.log(response);
      if (response.data.success) {
        if (response.data.role === 'educator') {
          history.push('/educator-dashboard');
        } else if (response.data.role === 'student') {
          history.push('/student-dashboard');
        } else {
          history.push('/admin-dashboard');
        }
      } else {
        setError('Failed to login. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login');
    }
  };

  return (
    <div className="login">
      <div className="left-decor">{/* this is just for left decor */}</div>

      {/* container for all central components */}
      <div className="registration-container">
        <img className="EranseLewaqLogo" src={erasenLweq} alt="EranseLewaq-logo" />
        <h1 className="title">Registration</h1>
        <form className="registerForm" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            {...(submit && formData.email === '' && { required: true })}
          />

          <input
            type={isCheck ? 'text' : 'password'}
            name="password"
            className="input"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            {...(submit && formData.password === '' && { required: true })}
          />

          <div className="showPass">
            <input
              type="checkbox"
              className="check"
              id="checkBox"
              checked={isCheck}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkBox" className="check-label">
              Show me the password
            </label>
          </div>
          {error && <span style={{ color: 'red' }}>{error}</span>}
          <input type="submit" value="Login" className="formBtn" id="forBtn" />
          <div className="redirect">
            <p>
              You Don't have account? <Link className="ancr" to={'/information'}>Register</Link>
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


Login.propTypes = {
  history: PropTypes.object.isRequired 
};

export default Login;
