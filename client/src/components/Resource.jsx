import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import examAvater from '../assets/exam-avater.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Resource = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/exam/getAllExams'); // Use Axios to make the GET request
        setExams(response.data); // Access response data directly
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  const handleBuyClick = () => {
    // Check if user is authenticated and has the role of "student"
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const role = sessionStorage.getItem('role');

    if (isAuthenticated === 'true' && role === 'student') {
      // Redirect to student dashboard if authenticated
      navigate('/student-dashboard');
    } else {
      // Redirect to login page if not authenticated or not a student
      navigate('/login');
    }
  };

  const examPackage = exams.map((exam, index) => (
    <div key={index} className="exam">
      <h1>Package</h1>
      <img src={examAvater} alt="Exam Avatar" />
      <div className="exam-info">
        <p>Department: {exam.department}</p>
        <p>Amount: 100 Coins</p>
        <button onClick={handleBuyClick}>Buy</button> {/* Attach onClick event handler */}
      </div>
    </div>
  ));

  return (
    <div className="Resource">
      <div className="exams">
        {examPackage}
      </div>
    </div>
  );
};

export default Resource;
