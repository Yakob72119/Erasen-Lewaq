import React, { useState, useEffect } from 'react';
import './style/Profile.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import erasenLweq from '../assets/erasenLweq.png';
import user from '../assets/teacher.svg';

const StudProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    collage: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const [selectedRadio, setSelectedRadio] = useState('');
  const [isCheck, SetIsCheck] = useState(false);
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [submit, setSubmit] = useState('');
  const [boyView, setBodyView] = useState('show');
  const [updateView, setUpdateView] = useState('hide');

  const departments = ['Software Engineering', 'Computer Science'];
  const collages = ['Haramaya University', 'Addis Ababa University'];

  useEffect(() => {
    // Function to fetch student data
    const fetchStudentData = async () => {
      try {
        const studentId = sessionStorage.getItem('_id');
        if (!studentId) {
          throw new Error('No student ID found in session storage');
        }
        const response = await axios.get(`http://localhost:3000/student/profile/${studentId}`); // Adjust the API endpoint as needed
        const data = response.data;

        setFormData({
          fullName: data.fullName,
          email: data.email,
          department: data.department,
          collage: data.collage,
          password: '', // Keep passwords empty for security reasons
          confirmPassword: '',
          gender: data.gender
        });
        setSelectedRadio(data.gender);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch student data.');
        setErrorStyle('red');
      }
    };

    fetchStudentData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleBodyClass = () => {
    if (boyView === 'show') {
      setBodyView('hide');
      setUpdateView('show');
    }
  };

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
    setSelectedRadio(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    if (boyView === 'hide') {
      setBodyView('show');
      setUpdateView('hide');
    }

    // Form validation
    const emptyFields = Object.values(formData).filter((value) => value === '');
    if (emptyFields.length > 0) {
      setError('All fields are required.');
      setErrorStyle('red');
      return;
    }

    if (formData.password.length < 6 && formData.password !== '') {
      setError('The Password must be at least 6 characters long.');
      setErrorStyle('red');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('The Passwords do not match.');
      setErrorStyle('red');
      return;
    }

    try {
      const studentId = sessionStorage.getItem('_id');
      if (!studentId) {
        throw new Error('No student ID found in session storage');
      }

      // Prepare the data for the update
      const updatedData = {
        fullName: formData.fullName,
        department: formData.department,
        collage: formData.collage,
        gender: formData.gender
      };

      // Only include password fields if they are provided
      if (formData.password) {
        updatedData.password = formData.password;
      }

      const response = await axios.put(`http://localhost:3000/student/profile/${studentId}`, updatedData);
      setError('Profile updated successfully');
      setErrorStyle('green');
    } catch (error) {
      console.error('Error updating student data:', error);
      setError('Failed to update student data.');
      setErrorStyle('red');
    }
  };

  return (
    <div className='Profile'>
      <div className='nav'>
        <img src={erasenLweq} alt="Erasen-Lewaq Logo" />
        <Link className='back' to={'/student-dashboard'}>Back</Link>
      </div>

      <div className="body Registration">
        <div className={`main-container ${boyView}`}>
          <div className="names">
            <img src={user} alt="User Avatar" />
            <div className="name">
              <h1>{formData.fullName}</h1>
              <p>{formData.email}</p>
            </div>
          </div>
          <div className="infos">
            <div className="info">
              <p>Role: </p>
              <p className='value'>Student</p>
            </div>
            <div className="info">
              <p>Department: </p>
              <p className='value'>{formData.department}</p>
            </div>
            <div className="info">
              <p>Collage: </p>
              <p className='value'>{formData.collage}</p>
            </div>
            <div className="info">
              <p>Gender: </p>
              <p className='value'>{formData.gender}</p>
            </div>

            <button onClick={handleBodyClass}>Edit Profile</button>

          </div>
        </div>

        <div className='right-decor'>{/* this is just for right decor */}</div>
      </div>

      <div className={`update Registration ${updateView}`}>
        <div className='registration-container'>
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
              disabled
              onChange={handleInputChange}
              {...(submit && formData.email === '' && { required: true })}
            />
            <select
              className='input'
              name='department'
              value={formData.department}
              onChange={handleInputChange}
              {...(submit && formData.department === '' && { required: true })}>
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
              {...(submit && formData.collage === '' && { required: true })}>
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
              <label htmlFor='gender' {...(submit && formData.gender === '' && { required: true })}>Gender</label>
              <label className='radioGroup'>
                <input
                  type='radio'
                  name='gender'
                  value='Male'
                  checked={selectedRadio === 'Male'}
                  onChange={handleSelectedRadio}
                  {...(submit && formData.gender === '' && { required: true })}
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
                  {...(submit && formData.gender === '' && { required: true })}
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
            <input type='submit' value='Update' className='formBtn' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudProfile;
