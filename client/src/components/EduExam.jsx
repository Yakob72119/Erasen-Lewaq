import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddEduExam from './AddEduExam';

const EduExam = () => {
    const [exams, setExams] = useState([]);
    const [deleteCurrent, setDeleteCurrent] = useState('hide');
    const [hideShow, setHideShow] = useState('hideForm');

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const educatorId = sessionStorage.getItem('_id');
                const response = await axios.get(`http://localhost:3000/exam/getExamsByEducatorId/${educatorId}`);
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
                // Handle error
            }
        };

        fetchExams();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleDeleteOpen = () => {
        setDeleteCurrent('showDelete');
    };

    const handleDeleteClose = () => {
        setDeleteCurrent('hideDelete');
    };

    const handleOpen = () => {
        setHideShow('showForm');
    };

    const handleClose = () => {
        setHideShow('hideForm');
    };

    const handleDeleteExam = async (examId) => {
        try {
            await axios.delete(`http://localhost:3000/exam/deleteExam/${examId}`);
            setExams(exams.filter(exam => exam._id !== examId)); // Remove the deleted exam from the exams state
        } catch (error) {
            console.error('Error deleting exam:', error);
            // Handle error
        }
    };

    return (
        <div className='edu-exam admin-exam'>
            <div className="navbars nav-btns">
                <button onClick={handleOpen} className='addBtn'>+ Add new Admin</button>
            </div>

            <div className={`exams`}>
                {exams.map((exam, index) => (
                    <div className="exam-declaration" key={index}>
                        <div className='divOne'>
                            <p>Educator ID: {exam.educatorId}</p>
                            <p>Exam ID: {exam._id}</p>
                            <p>Status: {exam.status}</p>
                        </div>
                        <div className='divTwo'>
                            <p>Time: {exam.time}</p>
                            <p>Exam: <a href={exam.link} target='_blank' rel="noopener noreferrer">click here</a></p>
                        </div>
                        <div className="controllers">
                            <button 
                                className="btnDelete" 
                                style={{ backgroundColor: exam.status !== 'Pending' ? 'green' : '', cursor: exam.status !== 'Pending' ? 'not-allowed' : 'pointer' }} 
                                onClick={() => exam.status === 'Pending' && handleDeleteExam(exam._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`form-exam ${hideShow}`} >
                <button className='close' onClick={handleClose}>Close</button>
                <AddEduExam />
            </div>

            <div className={`add-new-admin ${deleteCurrent}`}>
                <button onClick={handleDeleteClose} className='close'>Close</button>

                <div className="newAdminForm">
                    <p>Are you sure you want to delete this exam?</p>
                </div>
                <div className="btn-message">
                    <input type="submit" value="Delete" className="deleteBtn" id="forBtn" />
                </div>
            </div>

            
        </div>
    );
};

export default EduExam;
