import React, { useState } from 'react'

const AdminPayment = () => {

    const testData = ['0', '1', '2']

    const paymentDeclaration = testData.map((item, index) => (
        <div className="exam-declaration" key={index}>
            <div className='divOne'>
                <p>Educator: Akrem Muktar</p>
                <p>Education Status: PHD</p>
                <p>Experience : 12</p>
            </div>
            <div className='divTwo'>
                <p>Department: Software Engineering</p>
                <p>Time: 2:00</p>
                <p>Exam: <a href='#' target='_blanck'>click here</a></p>
            </div>
            <div className="controllers">
                <button className='btnView'>Pay</button>
            </div>
        </div>
    ));

    return (
        <div className='admin-payment admin-exam'>
            <div className='exams' >
                {paymentDeclaration}
            </div>
        </div>
    )

}

export default AdminPayment
