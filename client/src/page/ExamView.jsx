import React, { useEffect, useState } from 'react'
import './style/CvGrade.scss'
import erasenLweq from '../assets/erasenLweq.png';
import { Link } from 'react-router-dom';


const ExamView = () => {
    const [error, setError] = useState('');
    const [errorStyle, setErrorStyle] = useState('red');
    const [examData, setExamData] = useState({
        answer: '',
        question: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
    });
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSubmit(false)
        }, 5000);

        return () => clearTimeout(timer);
    }, [submit]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...examData, [name]: value });
        setError('');
    };

    const handleExamPost = () => {

    }

    return (
        <div className='exam-view cv-grade'>
            <div className="nav">
                <div className="logo">
                    <img src={erasenLweq} alt="" />
                    <h1>Exam View</h1>
                </div>
                <Link className='close-btn' to={'/admin-dashboard'}>Back</Link>
            </div>

            <div className="exam-body grade-body">
                <div className="exam resume">
                    <iframe width="100%" height="100%" src='https://www.google.com'></iframe>

                </div>
                <div className='exam-inputs'>
                    <p className='exam-no'>1</p>
                    <form className="examForm" onSubmit={handleExamPost}>
                        <input
                            type="text"
                            name="answer"
                            className="input answer"
                            placeholder="key"
                            value={examData.answer}
                            onChange={handleInputChange}
                            {...(submit && examData.answer === '' && { required: true })}
                        />

                        <input
                            type="text"
                            name="answer"
                            className="input question"
                            placeholder="Question"
                            value={examData.question}
                            onChange={handleInputChange}
                            {...(submit && examData.question === '' && { required: true })}
                        />

                        <input
                            type="text"
                            name="answer"
                            className="input a"
                            placeholder="A"
                            value={examData.answerA}
                            onChange={handleInputChange}
                            {...(submit && examData.answerA === '' && { required: true })}
                        />

                        <input
                            type="text"
                            name="answer"
                            className="input b"
                            placeholder="B"
                            value={examData.answerB}
                            onChange={handleInputChange}
                            {...(submit && examData.answerB === '' && { required: true })}
                        />

                        <input
                            type="text"
                            name="answer"
                            className="input c"
                            placeholder="C"
                            value={examData.answerC}
                            onChange={handleInputChange}
                            {...(submit && examData.answerC === '' && { required: true })}
                        />

<input
                            type="text"
                            name="answer"
                            className="input c"
                            placeholder="D"
                            value={examData.answerD}
                            onChange={handleInputChange}
                            {...(submit && examData.answerD === '' && { required: true })}
                        />

                        <div className="btn-message">
                            <input type="submit" value="Add" className="AddBtn" id="forBtn" />
                            {error && <span style={{ color: errorStyle }}>{error}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExamView
