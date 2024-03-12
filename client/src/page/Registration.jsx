import React, { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png'

const Registration = () => {
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    email: '',
    department: '',
    collage: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const [selectedRadio, setselectedRadio] = useState('');
  const [isCheck, SetIsCheck] = useState(false)
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("")


  // Options for the combo box
  const options = [
    'Student',
    'Educator'
  ];

  const departments = [
    'Software Engineering',
    'Computer Since'
  ]

  const collages = [
    'Haramaya University',
    'Addis Ababa University'
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  };

  const handleCheckboxChange = () => {
    if (isCheck) {
      SetIsCheck(false)
    } else {
      SetIsCheck(true)
    }
  }

  const handleSelectedRadio = (e) => {
    const { name, value} = e.target;
    setFormData({...formData, [name]:value});
    setselectedRadio(formData.gender);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmit(true)

    const emptyFields = Object.values(formData).filter(value => value === '');
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

    setError('')

    // Perform further actions with the form data
    console.log(formData);
  }

  return (
    <div className='Registration'>
      <div className="left-decor">
        {/* this is just for left decor */}
      </div>



      {/* container for all central components */}
      <div className="registration-container">
        <img className='EranseLewaqLogo' src={erasenLweq} alt="EranseLewaq-logo" />
        <h1 className='title'>Registration</h1>
        <form className='registerForm' onSubmit={handleSubmit}>
          {/* comboBox for choosing role   */}
          <div className="choose-user">
            <select className='role' name='role' id="combo" 
            value={formData.role} onChange={handleInputChange} 
            {...(submit && formData.role === '' && { required: true })}>
              <option className='option' value="">~Choose Role~</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            {...(submit && formData.fullName === '' && { required: true })} />
         
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            {...(submit && formData.email === '' && { required: true })} />
          <select className='input' name='department' id="comboDepartment" value={formData.department} onChange={handleInputChange} {...(submit && formData.department === '' && { required: true })}>
            <option className='option' value="">~Department~</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <select className='input' name='collage' id="comboCollage"
            value={formData.collage} onChange={handleInputChange}
            {...(submit && formData.collage === '' && { required: true })}>
            <option className='option' value="">~University/Collage~</option>
            {collages.map((collage) => (
              <option key={collage} value={collage}>
                {collage}
              </option>
            ))}
          </select>

          <input
            type={isCheck ? "text" : "password"}
            name="password" placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            {...(submit && formData.password === '' && { required: true })} />
          <input
            type={isCheck ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            {...(submit && formData.confirmPassword === '' && { required: true })} />
          <div className={submit && formData.gender === '' ? 'error' : 'Gender'}>
            <label htmlFor="gender">Gender</label>
            <label className='radioGroup'>
              <input
                type='radio'
                name='gender'
                value="Male"
                checked={selectedRadio === 'Male'}
                onChange={handleSelectedRadio}/>Male
            </label>
            <label className='radioGroup'>
              <input
                type='radio'
                name='gender'
                value="Female"
                checked={selectedRadio === 'Female'}
                onChange={handleSelectedRadio}
                {...(submit && formData.gender === '' && { required: true })} />Female
            </label>
          </div>
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
          {error && <span style={{ color: "red" }}>{error}</span>}
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
