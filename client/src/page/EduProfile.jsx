import React, { useState } from 'react'
import './style/Profile.scss'
import { Link } from 'react-router-dom';
import erasenLweq from '../assets/erasenLweq.png'
import user from '../assets/teacher.svg'

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
  const [selectedRadio, setselectedRadio] = useState('');
  const [isCheck, SetIsCheck] = useState(false);
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [submit, setSubmit] = useState('');
  const [boyView, setBodyView] = useState('show')
  const [updateView, setUpdateiew] = useState('hide')

  const collages = ['Hramaya university', 'Addis Ababa university', 'Software Engineering', 'Computer Science']; // Corrected typo

  const residences = ['Harar', 'Addis Ababa'];
  const bank = ['CBE', 'Awash International Bank', 'Abyssinia Bank'];

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
      phone: '',
      collage: '',
      residence: '',
      bank: '',
      bankAcc: '',
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
        <Link className='back' to={'/'}>Back</Link>
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
              <p className='value'>Educator</p>
            </div>
            <div className="info">
              <p>Phone: </p>
              <p className='value'>+251936130427</p>
            </div>
            <div className="info">
              <p>Department: </p>
              <p className='value'>Haramaya University</p>
            </div>
            <div className="info">
              <p>Residence: </p>
              <p className='value'>Harar</p>
            </div>
            <div className="info">
              <p>Bank: </p>
              <p className='value'>CBE</p>
            </div>
            <div className="info">
              <p>Bank Account: </p>
              <p className='value'>12345678909</p>
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
              {...(submit && formData.fullName === '' && { required: true })}
            />

            <div className="contact">
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={'akremmuktar332@gmail.com'}
                disabled
                onChange={handleInputChange}
                {...(submit && formData.email === '' && { required: true })}
              />
              <div className="phoneNumber">
                <input
                  type='tel'
                  name='code'
                  className='code'
                  placeholder='+251'
                  value='+251'
                  onChange={handleInputChange}
                  disabled true
                />
                <input
                  type='tel'
                  name='phone'
                  className='phone'
                  placeholder='XXX XXX XXX'
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={9}
                  {...(submit && formData.phone === '' && { required: true })}
                />
              </div>
            </div>
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
              name='residence'
              id='comboResidence'
              value={formData.residence}
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
            <select
              className='input'
              name='bank'
              id='comboBank'
              value={formData.bank}
              onChange={handleInputChange}
              {...(submit && formData.bank === '' && { required: true })}>
              <option className='option' value=''>
                ~Bank~
              </option>
              {bank.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            <input
              type='number'
              name='bankAcc'
              placeholder='Bank Acccount'
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
            {error && <span style={{ color: errorStyle }}>{error}</span>}
            <input type="submit" value="Update" className="formBtn" id='forBtn' />
           
          </form>
        </div>

      </div>


    </div>
  )

}

export default EduProfile
