import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchExams = async (setExams) => {
    try {
        const educatorId = sessionStorage.getItem('_id');
        const response = await axios.get(`http://localhost:3000/exam/getExamsByEducatorIdAndStatus/${educatorId}/Accepted`);
        setExams(response.data);
    } catch (error) {
        console.error('Error fetching exams:', error);
        // Handle error
    }
};

const EduAskPayment = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        fetchExams(setExams);
    }, []);

    const handleAskPayment = async (examId) => {
        try {
            await axios.put(`http://localhost:3000/exam/updatePaymentStatus/${examId}`, { payment_status: "Pending" });
            // Refresh exams after updating payment status
            fetchExams(setExams);
        } catch (error) {
            console.error('Error updating payment status:', error);
            // Handle error
        }
    };

    return (
        <>
            {exams.map((exam, index) => (
                <div className="exam-declaration" key={index}>
                    <div className='divOne'>
                        <p>Educator ID: {exam.educatorId}</p>
                        <p>Exam ID: {exam._id}</p>
                        <p>Status: {exam.status}</p>
                        <p>Payment status: {exam.payment_status}</p>
                    </div>
                    <div className='divTwo'>
                         <p>Department: {exam.department}</p>
                        <p>Time: {exam.time}</p>
                        <p>Exam: <a href={exam.link} target='_blank' rel="noopener noreferrer">click here</a></p>
                    </div>
                    <div className="controllers">
                        {exam.payment_status === "Not payed" && (
                            <button className='btnView' onClick={() => handleAskPayment(exam._id)}>Ask Pay</button>
                        )}
                        {exam.payment_status === "Pending" && (
                            <button className='btnView' style={{ backgroundColor: 'yellow' }} disabled>Pending</button>
                        )}
                        {exam.payment_status === "Payed" && (
                            <button className='btnView' style={{ backgroundColor: 'green' }} disabled>Payed</button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default EduAskPayment;
