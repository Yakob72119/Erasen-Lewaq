import React, { useState } from 'react'


const AdminUser = () => {
  const roles = ['Admin', 'Student', 'Educator'];
  const data = ['Admin', 'Student', 'Educator'];
  const [selectedValue, setSelectedValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ' '
  });
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [submit, setSubmit] = useState('');
  const [addAdmin, setAddAdmin] = useState('hide')

  const handleOpen = () => {
    setAddAdmin('show');
  }

  const handleClose = () => {
    setAddAdmin('hide');
  }


  const generatePassword = () => {
    const passwordLength = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$_&';
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    const emptyFields = Object.values(formData).filter((value) => value === '');
    if (emptyFields.length > 0) {
      setError('All fields are required.');
      setErrorStyle('red')
      return;
    }

    formData.password = generatePassword();

    console.log(formData);
    setError("Grade successfully!")
    setErrorStyle("Green")
  }

  const handleFilterChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  const dataView = data.map((item, index) => (
    <tbody key={item.id}>
      <tr>
        <td className='rono'> {item.id_nu}</td>
        <td className='name'>{item.firstName} {item.lastName}</td>
        <td className='email'>{item.userEmail}</td>
        <td className='telename'>{item.telebirrName}</td>
        <td className='educ'>{item.eduLevel}</td>
        <td className='adr'>{item.country}, {item.city}</td>
        <td className='birth'>{item.birthDate}</td>
        <td className='gender'>{item.gender}</td>
        <td className='payment'>
          <input
            type='checkbox'
            checked={item.payment}
            onChange={() => handleCheckboxChange(item.id)}
          />
          {item.payment ? <>payed</> : <>notPayed</>}
        </td>
      </tr>
    </tbody>
  ));

  return (
    <div className='admin-user'>
      <div className="filter">
        <button onClick={handleOpen} className='addBtn'>+ Add new Admin</button>
        <select
          className='filter-items'
          name='role'
          onChange={handleFilterChange}>
          <option value=''>All</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className="data">

      </div>
      <div className={`add-new-admin ${addAdmin}`}>
        <button onClick={handleClose} className='close'>Close</button>
        <form className="newAdminForm" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            className="input"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            {...(submit && formData.name === '' && { required: true })}
          />
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            {...(submit && formData.email === '' && { required: true })}
          />

          <div className="btn-message">
            <input type="submit" value="Register" className="formBtn" id="forBtn" />
            {error && <span style={{ color: errorStyle }}>{error}</span>}
            <p className='password'>Password: {formData.password}</p>
          </div>


        </form>
      </div>
    </div>
  )
}

export default AdminUser
