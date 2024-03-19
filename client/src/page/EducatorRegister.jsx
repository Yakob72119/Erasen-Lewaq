import { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png'
import axios from 'axios';
import { Link } from 'react-router-dom';


const EducatorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    collage: '',
    residence: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const [selectedRadio, setselectedRadio] = useState('');
  const [isCheck, SetIsCheck] = useState(false);
  const [error, setError] = useState('');
  const [submit, setSubmit] = useState('');

  const collages = ['Hramaya university', 'Addis Ababa university', 'Software Engineering', 'Computer Science']; // Corrected typo

  const residences = ['Harar', 'Addis Ababa'];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    SetIsCheck(!isCheck); // Toggle the value of isCheck
  };

  const handleSelectedRadio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setselectedRadio(value); // Use the current value, not formData.gender
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

    if (formData.password !== formData.confirmPassword) {
      setError('The Passwords do not match.');
      return;
    }

    setError('');

    // Send form data to the backend
    try {
      const response = await axios.post('/api/students/register', formData); // Corrected endpoint URL
      console.log(response.data); // Log the response from the backend
      // Reset form after successful registration (if needed)
      setFormData({
        fullName: '',
        email: '',
        collage: '',
        residence: '',
        password: '',
        confirmPassword: '',
        gender: ''
      });
      setError('Registration successful'); // Provide feedback to the user
    } catch (error) {
      console.error('Error registering user:', error);
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className='Registration'>
      <div className='left-decor'>{/* this is just for left decor */}</div>

      {/* container for all central components */}
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
            {...(submit && formData.fullName === '' && { required: true })}
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
            {...(submit && formData.email === '' && { required: true })}
          />
          <select
            className='input'
            name='collage'
            id='comboCollage'
            value={formData.collage}
            onChange={handleInputChange}
            {...(submit && formData.collage === '' && { required: true })}>
            <option className='option' value=''>
              ~Current Collage/Department~
            </option>
            {collages.map((collage) => (
              <option key={collage} value={collage}>
                {collage}
              </option>
            ))}
          </select>
          <select
            className='input'
            name='department'
            id='comboDepartment'
            value={formData.department}
            onChange={handleInputChange}
            {...(submit && formData.residence === '' && { required: true })}>
            <option className='option' value=''>
              ~Residence~
            </option>
            {residences.map((residence) => (
              <option key={residence} value={residence}>
                {residence}
              </option>
            ))}
          </select>
          <input
            type={isCheck ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
            {...(submit && formData.password === '' && { required: true })}
          />
          <input
            type={isCheck ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            {...(submit && formData.confirmPassword === '' && { required: true })}
          />
          <div className={submit && formData.gender === '' ? 'error' : 'Gender'}>
            <label htmlFor='gender'>Gender</label>
            <label className='radioGroup'>
              <input
                type='radio'
                name='gender'
                value='Male'
                checked={selectedRadio === 'Male'}
                onChange={handleSelectedRadio}
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
          {error && <span style={{ color: "red" }}>{error}</span>}
          <input type="submit" value="Register" className="formBtn" id='forBtn' />
          <div className="redirect">
            <p>You have account?  <Link className='ancr' to={'/login'}>Login</Link> </p>
          </div>
        </form>
      </div>

      <div className='right-decor'>{/* this is just for right decor */}</div>
    </div>
  );
};

export default EducatorRegister
