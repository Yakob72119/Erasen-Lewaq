import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AdminSetting = () => {
    const [error, setError] = useState('');
    const [errorStyle, setErrorStyle] = useState('red');
    const [submit, setSubmit] = useState(false);
    const [updateData, setUpdateData] = useState({
        email: '',
        password: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch email from sessionStorage
        const userEmail = sessionStorage.getItem('email');
        setUpdateData({ ...updateData, email: userEmail || '' }); // Prefill email if available
    }, []); // Only runs once when component mounts

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSubmit(false);
            setSuccessMessage(''); // Clear success message after a delay
        }, 3000);

        return () => clearTimeout(timer);
    }, [submit, successMessage]);

    const handleAdminChange = (event) => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setError('');
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setSubmit(true);

        const emptyFields = Object.values(updateData).filter((value) => value === '');
        if (emptyFields.length > 0) {
            setError('Insert Your Password to Update!');
            setErrorStyle('red');
            return;
        }

        try {
            // Send a PUT request to update password
            await axios.put('http://localhost:3000/user/updatePassword', updateData);
            setError('');
            setSuccessMessage('Password updated successfully'); // Set success message
            setUpdateData({ ...updateData, password: '' }); // Clear password field
            setSubmit(false);
        } catch (error) {
            console.error('Error updating password:', error);
            setError('Error updating password');
            setErrorStyle('red');
        }
    };

    return (
        <div className='admin-setting'>
            <div className="change">
                <h3>Update Your Password</h3>
                <form className="updateFrom">
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={updateData.email}
                        disabled
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="New Password"
                        value={updateData.password}
                        onChange={handleAdminChange}
                        {...(submit && updateData.password === '' && { required: true })}
                    />

                    <div className="btn-error">
                        <button className="updateBtn" onClick={handleUpdate}>Update</button>
                        {error && <span style={{ color: errorStyle }}>{error}</span>}
                        {successMessage && <span style={{ color: 'green' }}>{successMessage}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSetting;
