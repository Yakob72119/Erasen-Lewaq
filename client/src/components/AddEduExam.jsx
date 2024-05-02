import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddEduExam = () => {
    const [examData, setExamData] = useState({
        time: '',
        link: ''
    });
    const [submit, setSubmit] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage('');
            setSubmit(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [submit]);

    const getEducatorData = () => {
        // Assuming you've stored the educator's ID and department in sessionStorage
        return {
            id: sessionStorage.getItem('_id'),
            department: sessionStorage.getItem('department')
        };
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Regex pattern to allow only numbers from 1 to 3, including decimal points
        const timePattern = /^\d{1}(\.\d{0,2})?$/;

        // Check if the input matches the pattern and falls within the range of 1 to 3
        if (name === 'time' && (timePattern.test(value) || value === '') && parseFloat(value) >= 1 && parseFloat(value) <= 3) {
            setExamData({ ...examData, [name]: value });
        } else if (name === 'link' && isValidGoogleDocsLink(value)) {
            setExamData({ ...examData, [name]: value });
        }
    };

    const isValidGoogleDocsLink = (link) => {
        // Regex pattern for a Google Docs link
        const googleDocsPattern = /^https?:\/\/(?:docs\.google\.com\/(?:document|spreadsheets|presentation|forms)\/d\/|drive\.google\.com\/(?:file\/d\/|open\?id=))(.*?)(?:\/edit)?(?:\?usp=sharing)?$/;
        return googleDocsPattern.test(link);
    };

    const handleLink = async (event) => {
        event.preventDefault();
        setSubmit(true);

        if (examData.time === '' || examData.link === '') {
            return;
        }

        try {
            // Retrieve the educator's ID and department from session data
            const { id, department } = getEducatorData();

            // Include the educator's ID in the exam data
            const examDataWithEducatorData = {
                ...examData,
                educatorId: id,
                department: department
            };
            // Send the POST request with the exam data including the educator's ID
            await axios.post('http://localhost:3000/exam/addExam', examDataWithEducatorData);
            setSuccessMessage('Successfully added!');
            setExamData({
                time: '',
                link: ''
            });
            setSubmit(false);
        } catch (error) {
            console.error('Error:', error.message);
            // Handle error
        }
    };

    return (
        <div className="add-exam">
            <div className="eduExamForm">
                <input
                    type='text'
                    name='time'
                    className='input'
                    placeholder='Time (1-3)'
                    value={examData.time}
                    onChange={handleInputChange}
                    {...(submit && (examData.time === '' || !/^\d{1}(\.\d{0,2})?$/.test(examData.time)) && { required: true })}
                />
                <input
                    type='text'
                    name='link'
                    className='input'
                    placeholder='Google Docs Link'
                    value={examData.link}
                    onChange={handleInputChange}
                    {...(submit && (examData.link === '' || !isValidGoogleDocsLink(examData.link)) && { required: true })}
                />
                <button className='btnAdd' onClick={handleLink}>Add</button>
                <span className="success-message">{successMessage}</span>
            </div>
        </div>
    );
};

export default AddEduExam;
