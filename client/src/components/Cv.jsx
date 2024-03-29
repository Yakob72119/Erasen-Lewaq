import React, { useState } from 'react'


const Cv = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        eduStatus: '',
        experience: '',
        department: '',
        gLink: ''
    });
    const [error, setError] = useState('');
    const [errorStyle, setErrorStyle] = useState('red');
    const [submit, setSubmit] = useState('');

    const eduStatus = ['Degree', 'Masters', 'PHD']; // Corrected typo

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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

        console.log(formData)
        setError('Submitted');
        
        setErrorStyle('green')
        setFormData({
            fullName: '',
            eduStatus: '',
            experience: '',
            department: '',
            gLink: ''
        });
        setSubmit(false)
        // Send form data to the backend

    };

    return (
        <div className='cv'>
            <form className='cvForm' onSubmit={handleSubmit}>
                <h1 className='title'>CV Form</h1>
                <input
                    type='text'
                    name='fullName'
                    className='input'
                    placeholder='Full Name'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    {...(submit && formData.fullName === '' && { required: true })}
                />
                <select
                    className='input'
                    name='eduStatus'
                    id='comboEduStatus'
                    value={formData.eduStatus}
                    onChange={handleInputChange}
                    {...(submit && formData.eduStatus === '' && { required: true })}>
                    <option className='option' value=''>
                        ~Education Status~
                    </option>
                    {eduStatus.map((eduStatus) => (
                        <option key={eduStatus} value={eduStatus}>
                            {eduStatus}
                        </option>
                    ))}
                </select>
                <input
                    type='number'
                    name='experience'
                    className='input'
                    placeholder='Experience(Year)'
                    value={formData.experience}
                    onChange={handleInputChange}
                    {...(submit && formData.experience === '' && { required: true })}
                />
                <input
                    type='text'
                    name='department'
                    placeholder='Department'
                    className='input'
                    value={formData.department}
                    onChange={handleInputChange}
                    {...(submit && formData.department === '' && { required: true })}
                />
                <input
                    type='text'
                    name='gLink'
                    placeholder='Google Doc link of work'
                    className='input'
                    value={formData.gLink}
                    onChange={handleInputChange}
                    {...(submit && formData.gLink === '' && { required: true })}
                />

                {error && <span style={{ color: errorStyle, fontWeight: 900 }}>{error}</span>}
                <input type="submit" value="Submit" className="formBtn" id='forBtn' />
                <a href="#" className='examp'>Example of Google Doc form</a>

            </form>
        </div>
    )
}

export default Cv
