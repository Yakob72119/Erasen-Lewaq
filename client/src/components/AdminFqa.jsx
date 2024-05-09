import React, { useEffect, useState } from 'react'

const AdminFqa = () => {
    const [error, setError] = useState('');
    const [errorStyle, setErrorStyle] = useState('red');
    const [submit, setSubmit] = useState(false);
    const [questionData, setQuestionData] = useState({
        question: '',
        answer: ''
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSubmit(false)
        }, 3000);

        return () => clearTimeout(timer);
    }, [submit]);



    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setError('');
    };



    const handleUpdate = async (event) => {
        event.preventDefault();
        setSubmit(true);

        const emptyFields = Object.values(questionData).filter((value) => value === '');
        if (emptyFields.length > 0) {
            setError('All fields are required!');
            setErrorStyle('red')
            return;
        }

        console.log(updateData);
        setError("Post successfully!")
        setErrorStyle("Green")
        setQuestionData({
            answer: '',
            question: ''
        })
        setSubmit(false)
    }
    return (
        <div className='admin-setting'>
            <div className="change">
                <h3>FQA Post</h3>
                <form className="updateFrom" >
                    <input
                        type="text"
                        name="question"
                        className="input"
                        placeholder="question"
                        value={questionData.question}
                        onChange={handleChange}
                        {...(submit && questionData.question === '' && { required: true })}
                    />

                    <textarea
                        type="text"
                        name="answer"
                        className="input answerInput"
                        placeholder="Answer..."
                        value={questionData.answer}
                        onChange={handleChange}
                        {...(submit && questionData.answer === '' && { required: true })}
                    />

                    <div className="btn-error">
                        <button className="updateBtn" onClick={handleUpdate}>Post</button>
                        {error && <span style={{ color: errorStyle }}>{error}</span>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminFqa
