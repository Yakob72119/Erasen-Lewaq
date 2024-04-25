import React, { useState } from 'react'

const EduPayment = () => {
    const [depart, setDepart] = useState('')
    const testData = ['0', '1', '2']
    const [deleteCurrent, setDeleteCurrent] = useState('hide')
    const [examControl, setExamControl] = useState('show')
    const [historyControl, setHistoryControl] = useState('hide')
    const data = [
        ['Akrem Muktar', 'PHD', 'Seng', 'payed', '200'],
        ['Akrem Muktar', 'PHD', 'Seng', 'Deleted', '200'],
        ['Akrem Muktar', 'PHD', 'Seng', 'payed', '200']
    ];

    const handleExam = () => {
        setExamControl('show');
        setHistoryControl('hide');
    }

    const handleHistory = () => {
        setExamControl('hide');
        setHistoryControl('show');
    }

    const handleDeleteOpen = () => {
        setDeleteCurrent('showDelete');

    }


    const handleDeleteClose = () => {
        setDeleteCurrent('hideDelete');
    }

    

    const cvDeclaration = testData.map((item, index) => (
        <div className="exam-declaration" key={index}>
            <div className='divOne'>
                <p>Educator: Akrem Muktar</p>
                <p>Education Status: PHD</p>
            </div>
            <div className='divTwo'>
                <p>Department: Software Engineering</p>
                <p>Exam: <a href='#' target='_blanck'>click here</a></p>
            </div>
            <div className="controllers">
                <button className='btnView'>Ask Pay</button>
                <button className='btnDelete' onClick={handleDeleteOpen}>Delete</button>
            </div>
        </div>
    ));

    const dataView = data.map((item, index) => (
        <tbody className='body' key={item.id}>
            <tr>
                <td className='name'> {item[0]}</td>
                <td className='eduStatus'>{item[1]}</td>
                <td className='depart'>{item[2]}</td>
                <td className='examStates'>{item[3]}</td>
                <td className='examStates'>{item[4]}</td>

            </tr>
        </tbody>
    ));

    return (
        <div className='admin-payment admin-exam'>
            <div className="navbars">
                <div className="nav-btns">
                    <button className='exam-nav' onClick={handleExam}>payment</button>
                    <button className='history-nav' onClick={handleHistory}>History</button>
                </div>
            </div>

            <div className={`exams ${examControl}`}>
                {cvDeclaration}
            </div>

            <div className={`historys ${historyControl}`}>
                <table border={1}>
                    <thead className='head'>
                        <th>Name</th>
                        <th>Education</th>
                        <th>Department</th>
                        <th>Payment status</th>
                        <th>Amount</th>
                    </thead>
                    {dataView}
                </table>
            </div>

            <div className={`add-new-admin ${deleteCurrent}`}>
                <button onClick={handleDeleteClose} className='close'>Close</button>

                <div className="newAdminForm">
                    <p>Are You sure you want to delet this cvs?</p>
                </div>
                <div className="btn-message">
                    <input type="submit" value="Delete" className="deleteBtn" id="forBtn" />
                </div>
            </div>

            <div className="page-number">
                <button className='preview'> &lt;&lt;</button>
                <button className='next'> &gt;&gt;</button>

            </div>

        </div>
    )
    
}

export default EduPayment
