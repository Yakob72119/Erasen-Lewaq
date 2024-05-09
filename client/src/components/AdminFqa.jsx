import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            setSubmit(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [submit]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setQuestionData({ ...questionData, [name]: value });
        setError('');
    };

    const handlePost = async (event) => {
        event.preventDefault();
        setSubmit(true);

        const emptyFields = Object.values(questionData).filter((value) => value === '');
        if (emptyFields.length > 0) {
            setError('All fields are required!');
            setErrorStyle('red');
            return;
        }

        try {
            await axios.post('http://localhost:3000/faq/post', questionData);
            setError('Post successful!');
            setErrorStyle('green');
            setQuestionData({ question: '', answer: '' }); // Clear form after successful post
            setSubmit(false);
        } catch (error) {
            console.error('Error posting FAQ:', error);
            setError('Error posting FAQ');
            setErrorStyle('red');
        }
    };

    return (
        <div className='admin-setting'>
            <div className="change">
                <h3>FAQ Post</h3>
                <form className="updateFrom">
                    <input
                        type="text"
                        name="question"
                        className="input"
                        placeholder="Question"
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
                        <button className="updateBtn" onClick={handlePost}>Post</button>
                        {error && <span style={{ color: errorStyle }}>{error}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminFqa;
