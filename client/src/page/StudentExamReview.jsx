import React, { useState, useEffect } from 'react';
import erasenLweq from '../assets/erasenLweq.png';
import Home from '../assets/home2.svg';
import './style/ExamReview.scss';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const StudentExamReview = () => {
  const [exam, setExam] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchExamData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const examId = queryParams.get('examId');
      const userId = queryParams.get('userId');

      try {
        const response = await axios.get(`http://localhost:3000/examResult/exam/${examId}/user/${userId}`);
        setExam(response.data);
      } catch (error) {
        console.error('Error fetching exam data:', error);
      }
    };

    fetchExamData();
  }, [location.search]);

  if (!exam) {
    return <div>Loading...</div>;
  }

  const ExamView = exam.correctAnswers.map((answer, index) => (
    <div className='exam' key={index}>
      <div className="que">
        <p className='question-no'>Q {index + 1}</p>
        <p className='question'>Question: {answer.question}</p>
      </div>
      <div className='answers'>
        <label className={`radioGroup ${answer.correctAnswer === 'A' ? 'correctAnswer' : ''} ${answer.studentAnswer === 'A' && !answer.isCorrect ? 'wrongAnswer' : ''}`}>
          <input type='radio' name={`q${index}`} value='A' checked={answer.studentAnswer === 'A'} readOnly />
          {answer.correctAnswer === 'A' && <strong>(Correct)</strong>}
          A. Answer A
        </label>
        <label className={`radioGroup ${answer.correctAnswer === 'B' ? 'correctAnswer' : ''} ${answer.studentAnswer === 'B' && !answer.isCorrect ? 'wrongAnswer' : ''}`}>
          <input type='radio' name={`q${index}`} value='B' checked={answer.studentAnswer === 'B'} readOnly />
          {answer.correctAnswer === 'B' && <strong>(Correct)</strong>}
          B. Answer B
        </label>
        <label className={`radioGroup ${answer.correctAnswer === 'C' ? 'correctAnswer' : ''} ${answer.studentAnswer === 'C' && !answer.isCorrect ? 'wrongAnswer' : ''}`}>
          <input type='radio' name={`q${index}`} value='C' checked={answer.studentAnswer === 'C'} readOnly />
          {answer.correctAnswer === 'C' && <strong>(Correct)</strong>}
          C. Answer C
        </label>
        <label className={`radioGroup ${answer.correctAnswer === 'D' ? 'correctAnswer' : ''} ${answer.studentAnswer === 'D' && !answer.isCorrect ? 'wrongAnswer' : ''}`}>
          <input type='radio' name={`q${index}`} value='D' checked={answer.studentAnswer === 'D'} readOnly />
          {answer.correctAnswer === 'D' && <strong>(Correct)</strong>}
          D. Answer D
        </label>
      </div>
    </div>
  ));

  return (
    <div className='exam-review exam-page '>
      <div className="left-decor"></div>
      <Link to='/student-dashboard'><img className='toDashboard' src={Home} alt="" /></Link>
      {ExamView}
      <img className="logo" src={erasenLweq} alt="" />
    </div>
  );
}

export default StudentExamReview;
