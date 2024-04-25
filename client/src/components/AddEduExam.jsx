import React, { useEffect, useState } from 'react'

const AddEduExam = () => {
    const [examData, setExamData] = useState({
        time: '',
        link: ''
    });
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSubmit(false)
        }, 3000);

        return () => clearTimeout(timer);
    }, [submit]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setExamData({ ...examData, [name]: value });
    };


    const handleLink = (event) => {
        event.preventDefault();
        setSubmit(true);

        if (examData.time ==='' || examData.link === ''){
            return
        }

        console.log(examData);
        setExamData({
            time: '',
            link: ''
        })
        setSubmit(false)
    }
    return (
        <div className="add-exam">
            <div className="eduExamForm">
                <input
                    type='text'
                    name='time'
                    className='input'
                    placeholder='Time'
                    value={examData.time}
                    onChange={handleInputChange}
                    {...(submit && examData.time === '' && { required: true })}
                />
                <input
                    type='text'
                    name='link'
                    className='input'
                    placeholder='Exam Link'
                    value={examData.link}
                    onChange={handleInputChange}
                    {...(submit && examData.link === '' && { required: true })}
                />
                <button className='btnAdd' onClick={handleLink}>Add</button>
            </div>
        </div>
    )
}

export default AddEduExam
