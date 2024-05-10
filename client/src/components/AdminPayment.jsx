import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPayment = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/exam/getExamsByPaymentStatus/Pending');
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
                // Handle error
            }
        };

        fetchExams();
    }, []);

    const handlePay = async (examId, educatorId) => {
        try {
            // Send a POST request to your backend to initiate the payment process
            const response = await axios.post('http://localhost:3000/payment/pay', { examId, educatorId });
            // Redirect to the Chapa payment page
            window.location.href = response.data.data.checkout_url;
        } catch (error) {
            console.error('Error initiating payment:', error);
            // Handle error
        }
    };

    const paymentDeclaration = exams.map((exam, index) => (
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
                {/* Pass both examId and educatorId to handlePay function */}
                <button className='btnView' onClick={() => handlePay(exam._id, exam.educatorId)}>Pay</button>
            </div>
        </div>
    ));

    return (
        <div className='admin-payment admin-exam'>
            <div className='exams'>
                {paymentDeclaration}
            </div>
        </div>
    );
};

export default AdminPayment;
