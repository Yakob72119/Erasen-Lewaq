import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminExamView = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch exams from the database when the component mounts
        const fetchExams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/exam/getAllExams'); // Replace the URL with your backend route
                setExams(response.data); // Assuming response.data contains an array of exams
            } catch (error) {
                console.error('Error fetching exams:', error);
                // Handle error
            }
        };

        fetchExams();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    const handleViewClick = (_id, link) => {
        console.log(_id, link)
        navigate(`/exam-view?_id=${_id}&link=${link}`);

    };

    const examDeclaration = exams.map((exam, index) => (
        <div className="exam-declaration" key={index}>
            <div className='divOne'>
                <p>Educator ID: {exam.educatorId}</p>
                <p>Exam ID: {exam._id}</p>
                <p>Status: {exam.status}</p>
            </div>
            <div className='divTwo'>
                <p>Department: {exam.department}</p>
                <p>Time: {exam.time}</p>
                <p>Exam: <a href={exam.link} target='_blank' rel='noopener noreferrer'>click here</a></p>
            </div>
            <div className="controllers">
                <button className='btnView' onClick={() => handleViewClick(exam._id, exam.link)}>View</button>
            </div>
        </div>
    ));

    return (
        <>
            {examDeclaration}
        </>
    );
};

export default AdminExamView;
