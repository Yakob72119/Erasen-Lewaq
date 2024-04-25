import React, { useEffect, useState } from 'react'
import AddEduExam from './AddEduExam'

const EduExam = () => {
    const testData = ['0', '1', '2']
    const [deleteCurrent, setDeleteCurrent] = useState('hide')
    const [hideShow, setHideShow] = useState('hideForm')
  

  

    const handleDeleteOpen = () => {
        setDeleteCurrent('showDelete');

    }

    const handleDeleteClose = () => {
        setDeleteCurrent('hideDelete');
    }


    const handleOpen = () => {
        setHideShow('showForm');
    }

    const handleClose = () => {
        setHideShow('hideForm')
    }

  


    const examDeclaration = testData.map((item, index) => (
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
                <button className='btnDelete' onClick={handleDeleteOpen}>Delete</button>
            </div>
        </div>
    ));
    return (
        <div className='edu-exam admin-exam'>
            <div className="navbars nav-btns">
                <button onClick={handleOpen} className='addBtn '>+ Add new Admin</button>
            </div>

            <div className={`exams`}>
                {examDeclaration}
            </div>

            <div className={`form-exam ${hideShow}`} >
                <button className='close' onClick={handleClose}>Close</button>

                <AddEduExam />
            </div>

            <div className={`add-new-admin ${deleteCurrent}`}>
                <button onClick={handleDeleteClose} className='close'>Close</button>

                <div className="newAdminForm">
                    <p>Are You sure you want to delete this exam?</p>
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

export default EduExam
