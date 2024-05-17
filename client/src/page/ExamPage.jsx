import React, { useState, useEffect } from 'react';
import axios from 'axios';
import erasenLweq from '../assets/erasenLweq.png';
import { Link } from 'react-router-dom';
import './style/Exampage.scss';

const ExamPage = () => {
    const [examDetails, setExamDetails] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [nextButtonText, setNextButtonText] = useState('Next');
    const [examCompleted, setExamCompleted] = useState(false);
    const [examResult, setExamResult] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(null); // State for countdown timer
    const [timerInterval, setTimerInterval] = useState(null); // Interval reference for countdown timer
    const [timeUsed, setTimeUsed] = useState(0); // State to track the time used
    const [countingUp, setCountingUp] = useState(false); // State to track counting direction

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const examId = searchParams.get('examId');

                console.log('Fetching exam details...');
        
                // Fetch exam details including questions and answers
                const examResponse = await axios.get(`http://localhost:3000/exam/${examId}`);
                
                if (!examResponse.data) {
                    // Handle the case where data is undefined
                    console.error('Error: Exam data is undefined');
                    return;
                }
        
                setExamDetails(examResponse.data);

                console.log('Exam details:', examResponse.data);
        
                // Fetch questions for the exam
                const questionsResponse = await axios.get(`http://localhost:3000/exam/${examId}/questions`);
                
                if (!questionsResponse.data) {
                    // Handle the case where questions are undefined
                    console.error('Error: Questions are undefined');
                    return;
                }
        
                // Map questions to include the correctAnswer field
                const questionsWithAnswers = questionsResponse.data.map(question => ({
                    ...question,
                    correctAnswer: question.answer // Set correctAnswer from the answer field
                }));
        
                setQuestions(questionsWithAnswers);

                // Start countdown timer based on exam time
                const examTimeInMinutes = parseInt(examResponse.data.time);
                startCountdown(examTimeInMinutes);
            } catch (error) {
                console.error('Error fetching exam details:', error);
            }
        };
        
        fetchExamDetails();
    }, []);

    const startCountdown = (minutes) => {
        const endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + minutes);
    
        const interval = setInterval(() => {
            const currentTime = new Date();
            let timeDiff = endTime - currentTime;
    
            // Check if the time is up
            if (timeDiff <= 0) {
                clearInterval(timerInterval); // Stop the countdown timer
                timeDiff = Math.abs(timeDiff); // Get the absolute value of time difference for negative countdown
                setCountingUp(true); // Set counting direction to up when time is up
            }
    
            const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);
            setTimeRemaining(`${minutesRemaining}:${secondsRemaining.toString().padStart(2, '0')}`);
        }, 1000);
    
        setTimerInterval(interval); // Save interval reference
    };

    const handleSelectedRadio = (e) => {
        const { name, value } = e.target;
        setSelectedAnswers({ ...selectedAnswers, [name]: value });
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        setNextButtonText('Next');
    };

    const handleNextQuestion = () => {
        // Check if the current question has a selected answer
        if (!selectedAnswers[currentQuestion._id]) {
            // Display an alert or perform any other action to prompt the user to select an answer
            alert('Please select an answer before proceeding to the next question.');
            return; // Exit the function if an answer is not selected
        }
    
        // Check if the current question is the second-to-last question
        if (currentQuestionIndex === questions.length - 2) {
            setNextButtonText('Done');
        }
    
        // Check if the last question is reached
        if (currentQuestionIndex === questions.length - 1) {
            console.log('Selected Answer:', selectedAnswers[currentQuestion._id]);
            console.log('Correct Answer:', currentQuestion.correctAnswer);
            handleSubmit(); // Call handleSubmit when the last question is reached
        } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };
    
    const handleSubmit = async () => {
        try {
            let answeredQuestionsCount = 0;
            let correctAnswersCount = 0;
            const results = []; // Array to store results for each question
            
            // Compare selected answers with correct answers and count correct answers and answered questions
            questions.forEach(question => {
                const studentAnswer = selectedAnswers[question._id];
                const isCorrect = studentAnswer === question.correctAnswer;
                
                results.push({
                    questionId: question._id,
                    question: question.question,
                    correctAnswer: question.correctAnswer,
                    studentAnswer,
                    isCorrect
                });
    
                // Count answered questions
                if (studentAnswer) {
                    answeredQuestionsCount++;
                    if (isCorrect) {
                        correctAnswersCount++;
                    }
                }
            });
    
            const resultMessage = `Your result is ${correctAnswersCount}/${answeredQuestionsCount}`;
            
            setExamCompleted(true);
            setExamResult(resultMessage);
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };
    
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion ? selectedAnswers[currentQuestion._id] : null;

    if (!examDetails || questions.length === 0) {
        return <div>Loading...</div>;
    }

    console.log('Rendering ExamPage...');
    return (
        <div className='exam-page'>
            <div className="left-decor"></div>

            <div className="info">
                <p className='name'>{examDetails.name}</p>
                <p className='exam-name'>{examDetails.department} Exam</p>
                <p className='amount-exam'>{questions.length} Questions</p>
                <p className='time-remain' style={{color: countingUp ? 'red' : 'green'}}>{countingUp ? `Extra Time: ${timeRemaining}` : `Time Remaining: ${timeRemaining}`}</p>
            </div>

            <div className="exam">
                <div className="que">
                    <p className='question-no'>{`Q ${currentQuestionIndex + 1}`}</p>
                    {currentQuestion && (
                        <p className='question'>{`Question: ${currentQuestion.question}`}</p>
                    )}
                </div>
                <div className='answers'>
                    {['A', 'B', 'C', 'D'].map((option) => (
                        <label key={option} className={`radioGroup ${selectedAnswer === option ? 'selected' : ''}`}>
                            <input
                                type='radio'
                                name={currentQuestion._id}
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={handleSelectedRadio}
                            />
                            {currentQuestion && currentQuestion[`choice${option}`]}
                        </label>
                    ))}
                </div>
                <div className="btn">
                    <button className='previous' onClick={handlePreviousQuestion}>Previous</button>
                    <button className='next' onClick={handleNextQuestion}>{nextButtonText}</button>
                </div>
            </div>

            {examCompleted && (
                <div className="result">
                    <h1>{examDetails.name}</h1>
                    <p className='email'>{sessionStorage.getItem('email')}</p>
                    <p className='exam-name'>{examDetails.department} Exam</p>
                    <p className='amount-exam'>{questions.length} Questions</p>
                    <p className='time-done'>Time's Up!</p>
                    <p className='time-used'>{`Time Used: ${timeUsed} minutes`}</p>
                    <p className='mark'> {examResult}</p> {/* Display exam result */}
                    <Link className='close' to={'/student-dashboard'}>Close</Link>
                </div>
            )}

            <img className="logo" src={erasenLweq} alt="" />
        </div>
    );
};

export default ExamPage;
