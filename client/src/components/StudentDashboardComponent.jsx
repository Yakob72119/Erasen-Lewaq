import React, { useState, useEffect } from 'react';
import axios from 'axios';
import examT from '../assets/taken-exam.svg';
import examP from '../assets/passed-exam.svg';
import examF from '../assets/fail-exam.svg';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboardComponent = () => {
  const [examResults, setExamResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamResults = async () => {
      try {
        const userId = sessionStorage.getItem('_id');
        const response = await axios.get(`http://localhost:3000/examResult/exam-submissions/${userId}`);
        setExamResults(response.data);
      } catch (error) {
        console.error('Error fetching exam results:', error);
      }
    };

    fetchExamResults();
  }, []);

  
  const handleViewClick = (examId) => {
    navigate(`/exam-review?examId=${examId}&userId=${sessionStorage.getItem('_id')}`);
  };

  const examResultRows = examResults.map((result) => (
    <tbody className='body' key={result._id}>
      <tr>
        <td className='depart'>{result.examId.department}</td>
        <td className='examTime'>{result.examId.time}</td>
        <td className='time'>{result.timeUsed.toFixed(2)}</td>
        <td className='examResult'>{result.examResult}</td>
        <td className='status'>{result.status}</td>
        <td className='view'>
          <button className='viewBtn' onClick={() => handleViewClick(result.examId._id)}>View</button>
        </td>
      </tr>
    </tbody>
  ));

  const attemptedExams = examResults.length;
  const passedExams = examResults.filter(result => result.status === 'Passed').length;
  const failedExams = examResults.filter(result => result.status === 'Failed').length;

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <div className="result-analysis">
        <div className="exam-point exam-taken">
          <div className="part-img">
            <img src={examT} alt="" />
          </div>
          <div className="part-text">
            <p className="point">{attemptedExams}</p>
            <p className="text">Attempted Exams</p>
          </div>
        </div>
        <div className="exam-point exam-passed">
          <div className="part-img">
            <img src={examP} alt="" />
          </div>
          <div className="part-text">
            <p className="point">{passedExams}</p>
            <p className="text">Exams Passed</p>
          </div>
        </div>
        <div className="exam-point exam-fail">
          <div className="part-img">
            <img src={examF} alt="" />
          </div>
          <div className="part-text">
            <p className="point">{failedExams}</p>
            <p className="text">Exams Failed</p>
          </div>
        </div>
      </div>
      <div className='result'>
        <table>
          <thead className='head'>
            <tr>
              <th>Department</th>
              <th>Exam Time</th>
              <th>Used Time</th>
              <th>Result</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          {examResultRows}
        </table>
      </div>
    </div>
  );
};

export default StudentDashboardComponent;
