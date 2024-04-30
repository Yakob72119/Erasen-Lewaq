import React, { useEffect, useState } from 'react'

const AdminSetting = () => {
    const [error, setError] = useState('');
    const [errorStyle, setErrorStyle] = useState('red');
    const [submit, setSubmit] = useState(false);
    const [updateData, setUpdateData] = useState({
        email: 'test',
        password: ''
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSubmit(false)
        }, 3000);

        return () => clearTimeout(timer);
    }, [submit]);

  

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
            setError('Insert Your Password to Delete!');
            setErrorStyle('red')
            return;
        }

        console.log(updateData);
        setError("update successfully!")
        setErrorStyle("Green")
        setUpdateData({
            email: 'test',
            password: ''
        })
        setSubmit(false)
    }

    return (
        <div className='admin-setting'>
            {/* this is for owner admin only  */}
           
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
