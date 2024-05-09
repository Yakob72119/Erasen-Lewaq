import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUser = () => {
  const roles = ['Admin', 'Student', 'Educator'];
  const [selectedValue, setSelectedValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [submit, setSubmit] = useState(false);
  const [addAdmin, setAddAdmin] = useState('hide');
  const [adminPass, setAdminPass] = useState('hideDelete');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [selectedValue, currentPage]);

  const fetchUsers = async () => {
    try {
      const url = `http://localhost:3000/user/getUsers?role=${selectedValue.toLowerCase()}&page=${currentPage}&limit=15`;
      const response = await axios.get(url);
      setUsers(response.data.users);
      setTotalPages(Math.ceil(response.data.totalCount / 15));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      password: ''
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
    console.log('Generated Password:', password);
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


  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setPasswd('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    const { name, email } = formData;
    if (!name || !email) {
      setError('All fields are required!');
      setErrorStyle('red');
      return;
    }

    const generatedPassword = generatePassword();
    setFormData({ ...formData, password: generatedPassword });

    try {
      const response = await axios.post('http://localhost:3000/user/registerAdmin', {
        name,
        email,
        password: generatedPassword,
        role: 'admin'
      });

      setFormData({ ...formData, password: generatedPassword });
      setError('Admin registered successfully!');
      setErrorStyle('green');
    } catch (error) {
      console.error('Error registering admin:', error);
      setError('Error registering admin');
      setErrorStyle('red');
    } finally {
      resetForm();
      setSubmit(false);
    }
  };


  const handleDelete = async (event) => {
    event.preventDefault();
  }

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value === 'All' ? '' : value);
  };

  const dataView = Array.isArray(users) ? (
    users.map((user) => (
      <tbody className='body' key={user._id}>
        <tr>
          <td className='name'>{user.fname}</td>
          <td className='email'>{user.email}</td>
          <td className='_id'>{user._id}</td>
          <td className='role'>{user.password}</td>
          <td className='password'>{user.role}</td>
          <td className='payment'>
            <button onClick={handleDeleteOpen}>Delete</button>
          </td>
        </tr>
      </tbody>
    ))
  ) : (
    <p>No users found</p>
  );


  return (
    <div className='admin-user admin-cv'>
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
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Id</th>
              <th>Password</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
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
            <input type="submit" value="Register" className="formBtn" id="registerBtn" />
            {error && <span style={{ color: errorStyle }}>{error}</span>}
            <p className='password'>Password: {formData.password}</p>
          </div>
        </form>
      </div>

      <div className={`add-new-admin ${adminPass}`}>
        <button onClick={handleDeleteClose} className='close'>Close</button>
          <div className="newAdminForm">
            <p>Are You sure you want to delet this cvs?</p>
          </div>
          <div className="btn-message">
            <input type="submit" value="Delete" className="deleteBtn" id="forBtn" onClick={handleDelete}/>
          </div>
      </div>
      <div className="page-number">
        <button className='preview' onClick={handlePrevPage}> &lt;&lt;</button>
        <span>Page {currentPage}</span>
        <button className='next' onClick={handleNextPage}> &gt;&gt;</button>
      </div>
    </div>
  )
}

export default AdminUser;
