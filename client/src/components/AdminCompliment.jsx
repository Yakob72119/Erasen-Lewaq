import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCompliment = () => {
    const [compliments, setCompliments] = useState([]);

    useEffect(() => {
        // Fetch complaints when the component mounts
        axios.get('http://localhost:3000/complaint/getAllComplaints')
            .then(response => {
                setCompliments(response.data);
            })
            .catch(error => {
                console.error('Error fetching complaints:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <div className='admin-compliment'>
            {compliments.map((compliment, index) => (
                <div key={index} className="compliment">
                    <div className="examId">
                    Complainant Gmail : {compliment.email}
                    </div>
                    <div className="complimentText">
                      Exam Id :  {compliment.examId}
                    </div>
                    <div className="examId">
                      Department : {compliment.examDepart}
                    </div>
                    <div className="complimentText">
                      Complaint : {compliment.complainBox}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminCompliment;
