import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './style/CvGrade.scss';
import erasenLweq from '../assets/erasenLweq.png';

const ExamView = () => {
    const [error, setError] = useState('');
    const [errorStyle, setErrorStyle] = useState('red');
    const [examData, setExamData] = useState({
        id: '',
        answer: '',
        question: '',
        choiceA: '',
        choiceB: '',
        choiceC: '',
        choiceD: '',
    });
    const [submit, setSubmit] = useState(false);
    const [deleteCurrent, setDeleteCurrent] = useState('hide');
    const [validGoogleDoc, setValidGoogleDoc] = useState(false);
    const [questions, setQuestions] = useState([]);

    const answerKey = ['A', 'B', 'C', 'D'];

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const link = searchParams.get('link');
    const _id = searchParams.get('_id');
    const navigate = useNavigate();

    const checkGoogleDocValidity = useCallback(async () => {
        try {
            const response = await fetch(link);
            if (response.ok && response.url.includes('docs.google.com')) {
                setValidGoogleDoc(true);
            } else {
                setValidGoogleDoc(false);
                setError('This is not a valid Google Docs link.');
                setErrorStyle('red');
            }
        } catch (error) {
            console.error('Error checking Google Docs link validity:', error);
            setValidGoogleDoc(false);
            setError('An error occurred while validating the link.');
            setErrorStyle('red');
        }
    }, [link]);

    useEffect(() => {
        if (link) {
            checkGoogleDocValidity();
        }
    }, [link, checkGoogleDocValidity]);

    useEffect(() => {
        setExamData({
            id: _id || '',
            answer: '',
            question: '',
            choiceA: '',
            choiceB: '',
            choiceC: '',
            choiceD: '',
        });
    }, [_id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSubmit(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [submit]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setExamData(prevData => ({ ...prevData, [name]: value }));
        setError('');
    };

    const handleExamAdd = (event) => {
        event.preventDefault();
        setSubmit(true);
        if (Object.values(examData).some(value => value === '')) {
            setError('All fields are required.');
            setErrorStyle('red');
            return;
        }
        const newQuestion = { ...examData };
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
        setExamData({
            id: _id || '',
            answer: '',
            question: '',
            choiceA: '',
            choiceB: '',
            choiceC: '',
            choiceD: '',
        });
        setError('');
    };

    const handleExamDone = async () => {
        try {
            console.log(questions)
            const response = await axios.post('http://localhost:3000/question/add', questions);
            navigate('/admin-dashboard');
            console.log('Response:', response.data);

        } catch (error) {
            console.error('Error saving exam questions:', error);
            setError('Error saving exam questions. Please try again.');
            setErrorStyle('red');
        }
    };

    const handleDecline = async () => {
        try {
            await axios.put(`http://localhost:3000/exam/${_id}`, { status: 'Declined' });
            navigate('/admin-dashboard');
            // You can add additional logic here such as redirecting or updating state
        } catch (error) {
            console.error('Error declining exam:', error);
            setError('Error declining exam. Please try again.');
            setErrorStyle('red');
        }
    };

    return (
        <div className='cv-grade'>
            <div className="nav">
                <div className="logo">
                    <img src={erasenLweq} alt="" />
                    <h1>Exam View</h1>
                </div>
                <Link className='close-btn' to={'/admin-dashboard'}>Back</Link>
            </div>

            <div className="exam-body grade-body">
                <div className="exam resume">
                    <button className='delete' onClick={() => setDeleteCurrent('show')}>Decline</button>
                    {validGoogleDoc ? (
                        <iframe title="Exam" width="100%" height="100%" src={link}></iframe>
                    ) : (
                        <p>{error}</p>
                    )}
                    <div className={`add-new-admin ${deleteCurrent}`}>
                        <button onClick={() => setDeleteCurrent('hide')} className='close'>Close</button>

                        <div className="newAdminForm">
                            <p>Are You sure you want to delete this cvs?</p>
                        </div>
                        <div className="btn-message">
                            <button className="delete" onClick={handleDecline}>Decline</button>
                        </div>
                    </div>
                </div>
                <div className='exam-inputs'>
                    <p className='exam-no'>{questions.length + 1}</p>
                    <form className="examForm" onSubmit={handleExamAdd}>
                        <div className="keys">
                            <input
                                type="text"
                                name="id"
                                className="input id"
                                placeholder="id-001"
                                value={examData.id}
                                onChange={handleInputChange}
                            />

                            <select
                                name="answer"
                                className="input answer"
                                value={examData.answer}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Key</option>
                                {answerKey.map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <textarea
                            type="text"
                            name="question"
                            className="input question"
                            placeholder="Question"
                            value={examData.question}
                            onChange={handleInputChange}
                        />

                        <textarea
                            type="text"
                            name="choiceA" // Change name to match backend
                            className="input a"
                            placeholder="A"
                            value={examData.choiceA} // Change value to match state variable
                            onChange={handleInputChange}
                        />

                        <textarea
                            type="text"
                            name="choiceB" // Change name to match backend
                            className="input b"
                            placeholder="B"
                            value={examData.choiceB} // Change value to match state variable
                            onChange={handleInputChange}
                        />

                        <textarea
                            type="text"
                            name="choiceC" // Change name to match backend
                            className="input c"
                            placeholder="C"
                            value={examData.choiceC} // Change value to match state variable
                            onChange={handleInputChange}
                        />

                        <textarea
                            type="text"
                            name="choiceD" // Change name to match backend
                            className="input d"
                            placeholder="D"
                            value={examData.choiceD} // Change value to match state variable
                            onChange={handleInputChange}
                        />


                        <div className="btn-message">
                            <input type="submit" value="Add" className="input AddBtn" id="forBtn" />
                            <button type='button' className="input AddBtn" id="forBtn" onClick={handleExamDone}>Done</button>
                            {error && <span style={{ color: errorStyle }}>{error}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExamView;
