import React, { useState } from 'react'

const AdminPaymentPay = () => {
    const testData = ['0', '1', '2']
    const [deleteCurrent, setDeleteCurrent] = useState('hide')
   

    const handleDeleteOpen = () => {
        setDeleteCurrent('show');

    }

    const handleDeleteClose = () => {
        setDeleteCurrent('hide');
    }

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
                <button className='btnDelete' onClick={handleDeleteOpen}>Delete</button>
            </div>
        </div>
    ));
    return (
        <>
            {paymentDeclaration}
            <div className={`add-new-admin ${deleteCurrent}`}>
                <button onClick={handleDeleteClose} className='close'>Close</button>

                <div className="newAdminForm">
                    <p>Are You sure you want to delet this cvs?</p>
                </div>
                <div className="btn-message">
                    <input type="submit" value="Delete" className="deleteBtn" id="forBtn" />
                </div>
            </div>
        </>
    )
}

export default AdminPaymentPay
