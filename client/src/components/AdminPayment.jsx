import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPayment = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [transferError, setTransferError] = useState(null);
    const [transferSuccess, setTransferSuccess] = useState(false); // Added state variable for transfer success

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/exam/getExamsByPaymentStatus/Pending');
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
                // Set error state for user feedback
                setTransferError('An error occurred while fetching exams. Please try again later.');
            }
        };

        fetchExams();
    }, []);

    const handleTransfer = async (examId, educatorId) => {
        try {
            // Set loading state to true to indicate transfer initiation is in progress
            setLoading(true);
    
            // Send a POST request to your backend to initiate the transfer process
            const response = await axios.post('http://localhost:3000/payment/transfer', { examId, educatorId });
    
            // Handle the response from the backend as needed
            console.log('Transfer initiated:', response.data);
    
            // Check if the transfer was successful (assuming the response structure has a success property)
        
                    setTransferSuccess(true);
            setTransferError(null);
        } catch (error) {
            console.error('Error initiating transfer:', error);
            // Set transfer error state to display appropriate message to the user
            setTransferError('An error occurred while initiating the transfer. Please try again later.');
        } finally {
            // Reset loading state after transfer process is complete (whether successful or not)
            setLoading(false);
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
                <button className='btnView' onClick={() => handleTransfer(exam._id, exam.educatorId)}>Pay</button>
            </div>
        </div>
    ));

    return (
        <div className='admin-payment admin-exam'>
            <div className='exams'>
                {transferSuccess && <p>Transfer successful!</p>} {/* Show success message if transfer is successful */}
                {transferError && <p>Error: {transferError}</p>} {/* Show error message if there's an error */}
                {paymentDeclaration}
            </div>
        </div>
    );
};

export default AdminPayment;
