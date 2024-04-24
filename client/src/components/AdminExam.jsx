import React, { useState } from 'react'

const AdminExam = () => {
    const [depart, setDepart] = useState('')
    const testData = ['0', '1', '2']
    const [deleteCurrent, setDeleteCurrent] = useState('hide')
    const [examControl, setExamControl] = useState('show')
    const [historyControl, setHistoryControl] = useState('hide')
    const data = [
        ['Akrem Muktar', 'PHD', 'Seng', 'Deleted'],
        ['Akrem Muktar', 'PHD', 'Seng', 'Deleted'],
        ['Akrem Muktar', 'PHD', 'Seng', 'Accepted']
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

    const handleFilterChange = (event) => {
        const { value } = event.target;
        setDepart(value);
    };

    const handleFilter = () => {
        console.log(depart);

        setDepart('');
    };

    const examDeclaration = testData.map((item, index) => (
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
                <button className='btnView'>View</button>
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

            </tr>
        </tbody>
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

            <div className={`historys ${historyControl}`}>
                <table border={1}>
                    <thead className='head'>
                        <th>Name</th>
                        <th>Education</th>
                        <th>Department</th>
                        <th>Exam status</th>
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

export default AdminExam
