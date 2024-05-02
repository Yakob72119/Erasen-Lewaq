import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EduAskPayment = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const educatorId = sessionStorage.getItem('_id');
               
                const response = await axios.get(`http://localhost:3000/exam/getExamsByEducatorIdAndStatus/${educatorId}/Pending`);
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
                // Handle error
            }
        };

        fetchExams();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <>
            {exams.map((exam, index) => (
                <div className="exam-declaration" key={index}>
                    <div className='divOne'>
                        <p>Educator ID: {exam.educatorId}</p>
                        <p>Exam ID: {exam._id}</p>
                        <p>Status: {exam.status}</p>
                    </div>
                    <div className='divTwo'>
                         <p>Department: {exam.department}</p>
                        <p>Time: {exam.time}</p>
                        <p>Exam: <a href={exam.link} target='_blank' rel="noopener noreferrer">click here</a></p>
                    </div>
                    <div className="controllers">
                        <button className='btnView'>Ask Pay</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default EduAskPayment;
