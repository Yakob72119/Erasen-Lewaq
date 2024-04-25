import React, { useEffect, useState } from 'react'
import './style/CvGrade.scss'
import erasenLweq from '../assets/erasenLweq.png';
import { Link } from 'react-router-dom';


const ExamView = () => {
    const [error, setError] = useState('');
    const [errorStyle, setErrorStyle] = useState('red');
    const [examData, setExamData] = useState({
        id: '',
        answer: '',
        question: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
    });
    const [submit, setSubmit] = useState(false);
    const [deleteCurrent, setDeleteCurrent] = useState('hide')


    const handleDeleteOpen = () => {
        setDeleteCurrent('show');

    }

    const handleDeleteClose = () => {
        setDeleteCurrent('hide');
    }

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
                    <button className='delete' onClick={handleDeleteOpen}>Delete</button>
                    <iframe width="100%" height="100%" src='https://www.google.com'></iframe>
                    <div className={`add-new-admin ${deleteCurrent}`}>
                        <button onClick={handleDeleteClose} className='close'>Close</button>

                        <div className="newAdminForm">
                            <p>Are You sure you want to delet this cvs?</p>
                        </div>
                        <div className="btn-message">
                            <input type="submit" value="Delete" className="delete" id="forBtn" />
                        </div>
                    </div>
                </div>
                <div className='exam-inputs'>
                    <p className='exam-no'>1</p>
                    <form className="examForm" onSubmit={handleExamPost}>
                        <div className="keys">
                            <input
                                type="text"
                                name="id"
                                className="input id"
                                placeholder="id-001"
                                value={examData.id}
                                disabled
                                onChange={handleInputChange}
                                {...(submit && examData.id === '' && { required: true })}
                            />

                            <input
                                type="text"
                                name="answer"
                                className="input answer"
                                placeholder="key"
                                value={examData.answer}
                                onChange={handleInputChange}
                                {...(submit && examData.answer === '' && { required: true })}
                            />
                        </div>

                        <textarea
                            type="text"
                            name="answer"
                            className="input question"
                            placeholder="Question"
                            value={examData.question}
                            onChange={handleInputChange}
                            {...(submit && examData.question === '' && { required: true })}
                        />

                        <textarea
                            type="text"
                            name="answer"
                            className="input a"
                            placeholder="A"
                            value={examData.answerA}
                            onChange={handleInputChange}
                            {...(submit && examData.answerA === '' && { required: true })}
                        />

                        <textarea
                            type="text"
                            name="answer"
                            className="input b"
                            placeholder="B"
                            value={examData.answerB}
                            onChange={handleInputChange}
                            {...(submit && examData.answerB === '' && { required: true })}
                        />

                        <textarea
                            type="text"
                            name="answer"
                            className="input c"
                            placeholder="C"
                            value={examData.answerC}
                            onChange={handleInputChange}
                            {...(submit && examData.answerC === '' && { required: true })}
                        />

                        <textarea
                            type="text"
                            name="answer"
                            className="input c"
                            placeholder="D"
                            value={examData.answerD}
                            onChange={handleInputChange}
                            {...(submit && examData.answerD === '' && { required: true })}
                        />

                        <div className="btn-message">
                            <input type="submit" value="Add" className="input AddBtn" id="forBtn" />
                            {error && <span style={{ color: errorStyle }}>{error}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExamView
