import React, { useState, useEffect } from 'react';
import './style/Profile.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import erasenLweq from '../assets/erasenLweq.png';
import user from '../assets/teacher.svg';

const EduProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collage: '',
    residence: '',
    bank: '',
    bankAcc: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const [selectedRadio, setSelectedRadio] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [submit, setSubmit] = useState('');
  const [boyView, setBodyView] = useState('show');
  const [updateView, setUpdateView] = useState('hide');

  const collages = ['Haramaya University', 'Addis Ababa University']; // Corrected typo

  const residences = ['Harar', 'Addis Ababa'];
  const banks = ['CBE', 'Awash International Bank', 'Abyssinia Bank'];

  useEffect(() => {
    // Function to fetch educator data
    const fetchEducatorData = async () => {
      try {
        const educatorId = sessionStorage.getItem('_id');
        if (!educatorId) {
          throw new Error('No educator ID found in session storage');
        }
        const response = await axios.get(`http://localhost:3000/educator/profile/${educatorId}`); // Adjust the API endpoint as needed
        const data = response.data;

        setFormData({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          collage: data.collage,
          residence: data.residence,
          bank: data.bank,
          bankAcc: data.bankAcc,
          password: '', // Keep passwords empty for security reasons
          confirmPassword: '',
          gender: data.gender
        });
        setSelectedRadio(data.gender);
      } catch (error) {
        console.error('Error fetching educator data:', error);
        setError('Failed to fetch educator data.');
        setErrorStyle('red');
      }
    };

    fetchEducatorData();
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
    setIsCheck(!isCheck);
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
      const educatorId = sessionStorage.getItem('_id');
      if (!educatorId) {
        throw new Error('No educator ID found in session storage');
      }

      // Prepare the data for the update
      const updatedData = {
        fullName: formData.fullName,
        phone: formData.phone,
        collage: formData.collage,
        residence: formData.residence,
        bank: formData.bank,
        bankAcc: formData.bankAcc,
        gender: formData.gender
      };

      // Only include password field if it is provided
      if (formData.password) {
        updatedData.password = formData.password;
      }

      const response = await axios.put(`http://localhost:3000/educator/profile/${educatorId}`, updatedData);
      setError('Profile updated successfully');
      setErrorStyle('green');
    } catch (error) {
      console.error('Error updating educator data:', error);
      setError('Failed to update educator data.');
      setErrorStyle('red');
    }
  };

  return (
    <div className='Profile'>
      <div className='nav'>
        <img src={erasenLweq} alt="Erasen-Lewaq Logo" />
        <Link className='back' to={'/educator-dashboard'}>Back</Link>
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
              <p className='value'>Educator</p>
            </div>
            <div className="info">
              <p>Phone: </p>
              <p className='value'>{formData.phone}</p>
            </div>
            <div className="info">
              <p>Collage: </p>
              <p className='value'>{formData.collage}</p>
            </div>
            <div className="info">
              <p>Residence: </p>
              <p className='value'>{formData.residence}</p>
            </div>
            <div className="info">
              <p>Bank: </p>
              <p className='value'>{formData.bank}</p>
            </div>
            <div className="info">
              <p>Bank Account: </p>
              <p className='value'>{formData.bankAcc}</p>
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
              type='tel'
              name='phone'
              placeholder='Phone'
              value={formData.phone}
              onChange={handleInputChange}
              {...(submit && formData.phone === '' && { required: true })}
            />
            <select
              className='input'
              name='collage'
              value={formData.collage}
              onChange={handleInputChange}
              {...(submit && formData.collage === '' && { required: true })}>
              <option value=''>~Collage~</option>
              {collages.map((collage) => (
                <option key={collage} value={collage}>
                  {collage}
                </option>
              ))}
            </select>
            <select
              className='input'
              name='residence'
              value={formData.residence}
              onChange={handleInputChange}
              {...(submit && formData.residence === '' && { required: true })}>
              <option value=''>~Residence~</option>
              {residences.map((residence) => (
                <option key={residence} value={residence}>
                  {residence}
                </option>
              ))}
            </select>
            <select
              className='input'
              name='bank'
              value={formData.bank}
              onChange={handleInputChange}
              {...(submit && formData.bank === '' && { required: true })}>
              <option value=''>~Bank~</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            <input
              type='number'
              name='bankAcc'
              placeholder='Bank Account'
              value={formData.bankAcc}
              onChange={handleInputChange}
              {...(submit && formData.bankAcc === '' && { required: true })}
            />
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
            <div className='Gender'>
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
            {error && <span style={{ color: errorStyle }}>{error}</span>}
            <input type='submit' value='Update' className='formBtn' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EduProfile;
