import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';
import examAvater from '../assets/exam-avater.png';

const StudentExamComponent = () => {
  const [myExams, setMyExams] = useState([]);
  const [suggestedExams, setSuggestedExams] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const fetchMyExams = async () => {
    try {
      const studentId = sessionStorage.getItem('_id');

      // Fetch my exams
      const myExamsResponse = await axios.get(`http://localhost:3000/exam/${studentId}/exams`);
      setMyExams(myExamsResponse.data.exams);
    } catch (error) {
      console.error('Error fetching my exams:', error);
    }
  };

  const fetchSuggestedExams = async () => {
    try {
      const studentId = sessionStorage.getItem('_id');
      const studentDepartment = sessionStorage.getItem('department');

      // Fetch suggested exams based on student's department
      const suggestedResponse = await axios.get(`http://localhost:3000/exam/suggested?studentId=${studentId}&department=${studentDepartment}`);
      console.log("suggested exam", suggestedResponse.data)
      setSuggestedExams(suggestedResponse.data);
    } catch (error) {
      console.error('Error fetching suggested exams:', error);
    }
  };

  useEffect(() => {
    fetchSuggestedExams();
    fetchMyExams();
  }, []);

  const buyExam = async (examId, amount) => {
    try {
      const studentId = sessionStorage.getItem('_id');
      await axios.post(`http://localhost:3000/exam/buy`, {
        studentId,
        amount,
        examId
      });

      // If no error occurs, refresh exams
      fetchMyExams();
      fetchSuggestedExams();
    } catch (error) {
      // Check if the error message indicates insufficient balance
      if (error.response && error.response.data && error.response.data.message === 'Insufficient balance') {
        // Show an alert to the user
        alert('Insufficient balance. Please recharge your account.');
      } else {
        // Log other errors to the console
        console.error('Error buying exam:', error);
      }
    }
  };

  const handleTakeExam = (examId) => {
    const userId = sessionStorage.getItem('_id');
    // Use navigate function to navigate to the desired page
    navigate(`/exam-page?examId=${examId}&userId=${userId}`);

  };

  const myExamElements = myExams.map((exam, index) => (
    <div key={index} className="exam">
      <h1>Package</h1>
      <img src={examAvater} alt="" />
      <div className="exam-info">
        <p>Department: {exam.department}</p>
        <p>Exam Id: {exam._id}</p>
        <button onClick={() => handleTakeExam(exam._id)}>Take Exam</button>
      </div>
    </div>
  ));

  const suggestedExamElements = suggestedExams.map((exam, index) => (
    <div key={index} className="exam">
      <h1>Package</h1>
      <img src={examAvater} alt="" />
      <div className="exam-info">
        <p>Department: {exam.department}</p>
        <p>Amount: {exam.payment_status === 'paid' ? 'Already Purchased' : "100 coins"}</p>
        <button onClick={() => buyExam(exam._id, 100)}>Buy</button>
      </div>
    </div>
  ));

  return (
    <div className='package-exams'>
      <div className="my-exam">
        <h2>My Exam</h2>
        <div className="exams">
          {myExamElements}
        </div>
      </div>
      <div className="suggested-exam">
        <h2>Suggested Exam</h2>
        <div className="exams">
          {suggestedExamElements}
        </div>
      </div>
    </div>
  );
};

export default StudentExamComponent;
