import React, { useEffect, useState } from 'react'

const AdminSetting = () => {
    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')
    const [errorAdmin, setErrorAdmin] = useState('');
    const [error, setError] = useState('');
    const [errorStyle, setErrorStyle] = useState('red');
    const [submit, setSubmit] = useState(false);
    const [updateData, setUpdateData] = useState({
        name: '',
        email: 'test',
        password: ''
    });

    const generatePassword = () => {
        const passwordLength = 8;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$_&';
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setErrorAdmin('')
            setSubmit(false)
        }, 3000);

        return () => clearTimeout(timer);
    }, [submit]);

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        setError('');
    };

    const handleAdminChange = (event) => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setError('');
    };

    const handleAdminUpdate = async (event) => {
        event.preventDefault();
        setSubmit(true);

        if (email === '') {
            setErrorAdmin('Insert Your Password to Delete!');
            setErrorStyle('red')
            return;
        }

        setPasswd(generatePassword());

        console.log(email);
        setErrorAdmin("update successfully!")
        setErrorStyle("Green")
        setEmail('')
        setSubmit(false)
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        setSubmit(true);

        const emptyFields = Object.values(updateData).filter((value) => value === '');
        if (emptyFields.length > 0) {
            setError('Insert Your Password to Delete!');
            setErrorStyle('red')
            return;
        }

        console.log(updateData);
        setError("update successfully!")
        setErrorStyle("Green")
        setUpdateData({
            name: '',
            email: 'test',
            password: ''
        })
        setSubmit(false)
    }

    return (
        <div className='admin-setting'>
            {/* this is for owner admin only  */}
            <div className="change-admin-password">
                <h3>Change Admin Password</h3>
                <form className="updateFrom" >
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        {...(submit && email === '' && { required: true })}
                    />

                    <div className="btn-error">
                        <button className="updateBtn" onClick={handleAdminUpdate}>update</button>
                        {errorAdmin && <span style={{ color: errorStyle }}>{errorAdmin}</span>}
                        <span className='passwd'> {passwd}</span>

                    </div>
                </form>
            </div>
            <div className="change">
                <h3>Update Your Name and Password</h3>
                <form className="updateFrom" >
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={updateData.email}
                        disabled
                    />
                    <input
                        type="text"
                        name="name"
                        className="input"
                        placeholder="Name"
                        value={updateData.name}
                        onChange={handleAdminChange}
                        {...(submit && updateData.name === '' && { required: true })}
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="password"
                        value={updateData.password}
                        onChange={handleAdminChange}
                        {...(submit && updateData.password === '' && { required: true })}
                    />

                    <div className="btn-error">
                        <button className="updateBtn" onClick={handleUpdate}>update</button>
                        {error && <span style={{ color: errorStyle }}>{error}</span>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminSetting
