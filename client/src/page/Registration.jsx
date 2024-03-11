import React, { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png'

const Registration = () => {

  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValueDepartment, setSelectedValueDepartment] = useState('');
  const [selectedValueCollage, setSelectedValueCollage] = useState('');
  const [selectedRadio, setselectedRadio] = useState('');
  const [isCheck, SetIsCheck] = useState(false)

  // Options for the combo box
  const options = [
    'Student',
    'Educator'
  ];

  const handleCheckboxChange = () => {
    if (isCheck) {
      SetIsCheck(false)
    } else {
      SetIsCheck(true)
    }
  }

  const handleSelectedRadio = (e) => {
    setselectedRadio(e.target.value);
  }

  const handleComboBoxChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  const handleComboBoxChangeDepartment = (event) => {
    setSelectedValueDepartment(event.target.value);
    console.log(event.target.value)
  };

  const handleComboBoxChangeCollage = (event) => {
    setSelectedValueCollage(event.target.value);
    console.log(event.target.value)
  };

  const handleSubmit = async (s) => {
    s.preventDefault();

    const formData = new FormData(s.target);
    console.log('Form Data:', formData);

    const firstName = formData.get('fullName');
    const userName = formData.get('userName');
    const email = formData.get('email');
    const department = formData.get('department');
    const collage = formData.get('collage');
    const gender = formData.get('gender');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');   
    // Perform further actions with the form data
    console.log({
      firstName,
      userName,
      email,
      department,
      collage,
      gender,
      password,
      confirmPassword
    });
}

  return (
    <div className='Registration'>
      <div className="left-decor">
        {/* this is just for left decor */}
      </div>

      {/* comboBox for choosing role   */}
      <div className="choose-user">
        <select className='input' name='eduLevel' id="combo" value={selectedValue} onChange={handleComboBoxChange}>
          <option className='option' value="">~Choose Role~</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {options}
            </option>
          ))}
        </select>
      </div>

      {/* container for all central components */}
      <div className="registration-container">
        <img src={erasenLweq} alt="EranseLewaq-logo" />
        <h1>Registration</h1>
        <form className='registerForm' onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" />
          <input type="text" name="userName" placeholder="User Name" />
          <input type="email" name="email" placeholder="Email" />
          <select className='input' name='department' id="comboDepartment" value={selectedValueDepartment} onChange={handleComboBoxChangeDepartment}>
            <option className='option' value="">~Department~</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select className='input' name='collage' id="comboCollage" value={selectedValueCollage} onChange={handleComboBoxChangeCollage}>
            <option className='option' value="">~University/Collage~</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="Gender">
            <label className='radioGroup'>
              <input type='radio' name='gender' value="Male" checked={selectedRadio === 'Male'} onChange={handleSelectedRadio} /><p>Male</p>
            </label>
            <label className='radioGroup'>
              <input type='radio' name='gender' value="Female" checked={selectedRadio === 'Female'} onChange={handleSelectedRadio} />Female
            </label>
          </div>
          <input type={isCheck ? "text" : "password"} name="password" placeholder="Password" />
          <input type={isCheck ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" />
          <div className='showPass'>
            <input
              type='checkbox'
              className='check'
              id='checkBox'
              checked={isCheck}
              onChange={() => handleCheckboxChange()}
            />
            <label htmlFor="checkBox" className='check-label'>Show me the password</label>
          </div>
          <input type="submit" value="Register" className="formBtn" id='forBtn' />
          <div className="redirect">
            <p>You have account? <a href='#'>Login</a></p>
          </div>
        </form>

      </div>

      <div className="right-decor">
        {/* this is just for right decor */}
      </div>
    </div>
  )
}

export default Registration
