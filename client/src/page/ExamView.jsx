import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import './style/CvGrade.scss';
import erasenLweq from '../assets/erasenLweq.png';

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
    const [deleteCurrent, setDeleteCurrent] = useState('hide');
    const [validGoogleDoc, setValidGoogleDoc] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const link = searchParams.get('link');
    const _id = searchParams.get('_id');
   

    useEffect(() => {
        const checkGoogleDocValidity = async () => {
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
        };

        if (link) {
            checkGoogleDocValidity();
        }
    }, [link]);

    const handleDeleteOpen = () => {
        setDeleteCurrent('show');
    };

    const handleDeleteClose = () => {
        setDeleteCurrent('hide');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSubmit(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [submit]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setExamData({ ...examData, [name]: value });
        setError('');
    };

    const handleExamPost = () => {
        // Handle posting exam data
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
                    <button className='delete' onClick={handleDeleteOpen}>Delete</button>
                    {validGoogleDoc ? (
                        <iframe title="Exam" width="100%" height="100%" src={link}></iframe>
                    ) : (
                        <p>{error}</p>
                    )}
                    <div className={`add-new-admin ${deleteCurrent}`}>
                        <button onClick={handleDeleteClose} className='close'>Close</button>

                        <div className="newAdminForm">
                            <p>Are You sure you want to delete this cvs?</p>
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
                            name="question"
                            className="input question"
                            placeholder="Question"
                            value={examData.question}
                            onChange={handleInputChange}
                            {...(submit && examData.question === '' && { required: true })}
                        />

                        <textarea
                            type="text"
                            name="answerA"
                            className="input a"
                            placeholder="A"
                            value={examData.answerA}
                            onChange={handleInputChange}
                            {...(submit && examData.answerA === '' && { required: true })}
                        />

                        <textarea
                            type="text"
                            name="answerB"
                            className="input b"
                            placeholder="B"
                            value={examData.answerB}
                            onChange={handleInputChange}
                            {...(submit && examData.answerB === '' && { required: true })}
                        />

                        <textarea
                            type="text"
                            name="answerC"
                            className="input c"
                            placeholder="C"
                            value={examData.answerC}
                            onChange={handleInputChange}
                            {...(submit && examData.answerC === '' && { required: true })}
                        />

                        <textarea
                            type="text"
                            name="answerD"
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
    );
};

export default ExamView;
