import { useState } from 'react';
import erasenLweq from '../assets/erasenLweq.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    collage: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const [selectedRadio, setselectedRadio] = useState('');
  const [isCheck, SetIsCheck] = useState(false);
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [submit, setSubmit] = useState('');

  const departments = ['Software Engineering', 'Computer Science'];
  const collages = ['Haramaya University', 'Addis Ababa University'];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error message when input changes
  };

  const handleCheckboxChange = () => {
    SetIsCheck(!isCheck);
  };

  const handleSelectedRadio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setselectedRadio(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    // Form validation
    const emptyFields = Object.values(formData).filter((value) => value === '');
    if (emptyFields.length > 0) {
      setError('All fields are required.');
      setErrorStyle('red')
      return;
    }

    if (formData.password.length < 6) {
      setError('The Password must be at least 6 characters long.');
      setErrorStyle('red')
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('The Passwords do not match.');
      setErrorStyle('red')
      return;
    }

    // Send form data to the backend
    try {
      const response = await axios.post('http://localhost:3000/student/register', formData);
      console.log(response.data); // Log the response from the backend
      setFormData({
        fullName: '',
        email: '',
        department: '',
        collage: '',
        password: '',
        confirmPassword: '',
        gender: ''
      });
      setError('Registration successful'); // Provide feedback to the user
      setErrorStyle('green')
      setSubmit(false)
    } catch (error) {
      console.error('Error registering user:', error.response.data.error);
      setError(error.response.data.error); // Display error message returned from the backend
      setErrorStyle('red')

    }
  };

  return (
    <div className='Registration'>
      <div className='left-decor'>{/* this is just for left decor */}</div>
      <div className='registration-container'>
        <img className='EranseLewaqLogo' src={erasenLweq} alt='EranseLewaq-logo' />
        <h1 className='title'>Registration</h1>
        <form className='registerForm' onSubmit={handleSubmit}>
          <input
            type='text'
            name='fullName'
            placeholder='Full Name'
            value={formData.fullName}
            onChange={handleInputChange}
            {...(submit && formData.fullName === '' && {required: true})}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
            {...(submit && formData.email === '' && {required: true})}

          />
          <select
            className='input'
            name='department'
            value={formData.department}
            onChange={handleInputChange}
            {...(submit && formData.department === '' && {required: true})}>
            <option value=''>~Department~</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <select
            className='input'
            name='collage'
            value={formData.collage}
            onChange={handleInputChange}
            {...(submit && formData.collage === '' && {required: true})}>
            <option value=''>~University/Collage~</option>
            {collages.map((collage) => (
              <option key={collage} value={collage}>
                {collage}
              </option>
            ))}
          </select>
          <input
            type={isCheck ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
            {...(submit && formData.password === '' && {required: true})}
          />
          <input
            type={isCheck ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            {...(submit && formData.confirmPassword === '' && {required: true})}
          />
          <div className={submit && formData.gender === '' ? 'error' : 'Gender'}>
            <label htmlFor='gender' {...(submit && formData.gender === '' && {required: true})}>Gender</label>
            <label className='radioGroup'>
              <input
                type='radio'
                name='gender'
                value='Male'
                checked={selectedRadio === 'Male'}
                onChange={handleSelectedRadio}
                {...(submit && formData.gender === '' && {required: true})}
              />
              Male
            </label>
            <label className='radioGroup'>
              <input
                type='radio'
                name='gender'
                value='Female'
                checked={selectedRadio === 'Female'}
                onChange={handleSelectedRadio}
                {...(submit && formData.gender === '' && {required: true})}
              />
              Female
            </label>
          </div>
          <div className='showPass'>
            <input
              type='checkbox'
              className='check'
              id='checkBox'
              checked={isCheck}
              onChange={handleCheckboxChange}
            />
            <label htmlFor='checkBox' className='check-label'>
              Show me the password
            </label>
          </div>
          {error && <span style={{ color: errorStyle }}>{error}</span>}
          <input type='submit' value='Register' className='formBtn' />
          <div className='redirect'>
            <p>
              You have an account? <Link className='ancr' to={'/login'}>Login</Link>
            </p>
          </div>
        </form>
      </div>
      <div className='right-decor'>{/* this is just for right decor */}</div>
    </div>
  );
};

export default Registration;
