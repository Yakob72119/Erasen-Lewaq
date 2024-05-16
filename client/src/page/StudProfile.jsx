import React, { useState } from 'react'
import './style/Profile.scss'
import { Link } from 'react-router-dom';
import erasenLweq from '../assets/erasenLweq.png'
import user from '../assets/teacher.svg'




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
  const [selectedRadio, setselectedRadio] = useState('');
  const [isCheck, SetIsCheck] = useState(false);
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [submit, setSubmit] = useState('');
  const [boyView, setBodyView] = useState('show')
  const [updateView, setUpdateiew] = useState('hide')

  const departments = ['Software Engineering', 'Computer Science'];
  const collages = ['Haramaya University', 'Addis Ababa University'];

  const handleBodyClass = () => {
    if (boyView == 'show') {
      setBodyView('hide')
      setUpdateiew('show')
    }
  }


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

    if (boyView == 'hide') {
      setBodyView('show')
      setUpdateiew('hide')
    }

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

      console.log(response.data); 
      setFormData({
        fullName: '',
        department: '',
        collage: '',
        password: '',
        confirmPassword: '',
        gender: ''
      });
      setError('Registration successful'); // Provide feedback to the user
      setErrorStyle('green')
      setSubmit(false)
  };

  return (
    <div className='Profile'>
      <div className='nav'>
        <img src={erasenLweq} alt="Erasen-Lewaq Logo" />
        <Link className='back' to={'/student-dashboard'}>Back</Link>
      </div>

      <div className="body Registration" >
        <div className={`main-container ${boyView}`}>
          <div className="names">
            <img src={user} alt="" />
            <div className="name">
              <h1>Akrem Muktar</h1>
              <p>akremmuktar332@gmail.com</p>
            </div>
          </div>
          <div className="infos">
            <div className="info">
              <p>Role: </p>
              <p className='value'>Student</p>
            </div>
            <div className="info">
              <p>Department: </p>
              <p className='value'>Software Engineering</p>
            </div>
            <div className="info">
              <p>Collage: </p>
              <p className='value'>Haramaya University</p>
            </div>
            <div className="info">
              <p>Gender: </p>
              <p className='value'>Male</p>
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
            {...(submit && formData.fullName === '' && {required: true})}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value='akremmuktar332@gmail.com'
            disabled
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
          <input type='submit' value='Update' className='formBtn' />
          
        </form>
        </div>
      
      </div>


    </div>
  )
}

export default StudProfile
