import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminExam = () => {
    const [depart, setDepart] = useState('')
    const [examControl, setExamControl] = useState('show')
    // const [filterControl, setFilterControl] = useState('hide')
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();


    const handleExam = () => {
        setExamControl('show');
        setHistoryControl('hide');
    }

    const handleFilterChange = (event) => {
        const { value } = event.target;
        setDepart(value);
    };

    const handleFilter = () => {
        console.log(depart);

        setDepart('');
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

    const data = [
        ['Akrem Muktar', 'PHD', 'Seng', 'Deleted'],
        ['Akrem Muktar', 'PHD', 'Seng', 'Deleted'],
        ['Akrem Muktar', 'PHD', 'Seng', 'Accepted']
    ];

    const dataView = data.map((item, index) => (
        <tbody className='body' key={item.id}>
            <tr>
                <td className='name'> {item[0]}</td>
                <td className='eduStatus'>{item[1]}</td>
                <td className='depart'>{item[2]}</td>
                <td className='examStates'>{item[3]}</td>

            </tr>
        </tbody>
    ));



    return (
        <div className='admin-exam'>
            <div className="navbars">
                <div className="nav-btns">
                    <button className='exam-nav' onClick={handleExam}>Exams</button>
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
            <div className="page-number">
                <button className='preview'> &lt;&lt;</button>
                <button className='next'> &gt;&gt;</button>

            </div>

        </div>
    )
}

export default AdminExam
