import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AdminExamHis from './AdminExamHis'

const AdminExam = () => {
    const [depart, setDepart] = useState('')
    const [examControl, setExamControl] = useState('show')
    const [historyControl, setHistoryControl] = useState('hide')
    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const navigate = useNavigate();


    const handleExam = () => {
        setExamControl('show');
        setHistoryControl('hide');
    }

    const handleHistory = () => {
        setExamControl('hide');
        setHistoryControl('show');
    }



    const handleFilterChange = (event) => {
        const { value } = event.target;
        setDepart(value);
    };

    const handleFilter = () => {
        const filtered = exams.filter(exam => exam.department.toLowerCase().includes(depart.toLowerCase()));
        setFilteredExams(filtered);
    };

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

    useEffect(() => {
        setFilteredExams(exams);
    }, [exams]);

    const handleViewClick = (_id, link) => {
        console.log(_id, link)
        navigate(`/exam-view?_id=${_id}&link=${link}`);

    };

     const examDeclaration = filteredExams.map((exam, index) => (
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
        <div className='admin-exam'>
            <div className="navbars">
                <div className="nav-btns">
                    <button className='exam-nav' onClick={handleExam}>Exams</button>
                    <button className='history-nav' onClick={handleHistory}>History</button>
                </div>
                <div className="filters">
                    <input
                        type='text'
                        name='depart'
                        className='input'
                        placeholder='Department'
                        value={depart}
                        onChange={handleFilterChange}
                    />
                    <button className='btnFilter' onClick={handleFilter}>Filter</button>
                </div>
            </div>

            <div className={`exams ${examControl}`}>
                {examDeclaration}
            </div>

        </div>
    )
}

export default AdminExam
