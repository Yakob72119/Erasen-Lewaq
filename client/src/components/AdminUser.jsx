import React, { useEffect, useState } from 'react'


const AdminUser = () => {
  const roles = ['Admin', 'Student', 'Educator'];
  const [passwd, setPasswd] = useState('');
  const data = [
    ['Akrem Muktar', 'akremmuktar332@gmail.com', 'Male', 'Student'],
    ['Yakob Beshah', 'yakobe@gmail.com', 'Male', 'Admin'],
    ['Natenael Niguse', 'natiman@gmail.com', 'Male', 'Educator'],
  ];
  const [selectedValue, setSelectedValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ' '
  });
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [submit, setSubmit] = useState(false);
  const [addAdmin, setAddAdmin] = useState('hide')
  const [adminPass, setAdminPass] = useState('hideDelete')

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
      setSubmit(false)
    }, 5000);

    return () => clearTimeout(timer);
  }, [submit]);

  const handleOpen = () => {
    setAddAdmin('show');
  }

  const handleDeleteOpen = () => {
    setAdminPass('showDelete');

  }

  const handleClose = () => {
    setAddAdmin('hide');
    setFormData({
      name: '',
      email: '',
      password: ' '
    })
  }

  const handleDeleteClose = () => {
    setAdminPass('hideDelete');
    
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

  const handleDeleteInputChange = (event) => {
    const { value } = event.target;
    setPasswd(value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    const emptyFields = Object.values(formData).filter((value) => value === '');
    if (emptyFields.length > 0) {
      setError('All fields are required!');
      setErrorStyle('red')
      return;
    }

    formData.password = generatePassword();

    console.log(formData);
    setError("Grade successfully!")
    setErrorStyle("Green")
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    setSubmit(true);

    if (passwd === '') {
      setError('Insert Your Password to Delete!');
      setErrorStyle('red')
      return;
    }

    console.log(passwd);
    setError("delete successfully!")
    setErrorStyle("Green")
    setPasswd('')
    setSubmit(false)

  }

  const handleFilterChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  const dataView = data.map((item, index) => (
    <tbody className='body' key={item.id}>
      <tr>
        <td className='name'> {item[0]}</td>
        <td className='email'>{item[1]}</td>
        <td className='gender'>{item[2]}</td>
        <td className='role'>{item[3]}</td>
        <td className='payment'>
          <button onClick={handleDeleteOpen}>Delete</button>
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
        <table border={1}>
          <thead className='head'>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>
          </thead>
          {dataView}
        </table>
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

      <div className={`add-new-admin ${adminPass}`}>
        <button onClick={handleDeleteClose} className='close'>Close</button>

        <form className="newAdminForm" onSubmit={handleDelete}>

          <input
            type="password"
            name="password"
            className="input"
            placeholder="password"
            value={passwd}
            onChange={handleDeleteInputChange}
            {...(submit && passwd === '' && { required: true })}
          />

          <div className="btn-message">
            <input type="submit" value="Delete" className="deleteBtn" id="forBtn" />
            {error && <span style={{ color: errorStyle }}>{error}</span>}
          </div>
        </form>

      </div>
      <div className="page-number">
        <button className='preview'> &lt;&lt;</button>
        <button className='next'> &gt;&gt;</button>

      </div>
    </div>
  )
}

export default AdminUser
