import React, { useState } from 'react'
import EduAskPayment from './EduAskPayment';

const EduPayment = () => {
    const [examControl, setExamControl] = useState('show')
    const [historyControl, setHistoryControl] = useState('hide')
    

    const handleExam = () => {
        setExamControl('show');
        setHistoryControl('hide');
    }

   
    
   
    return (
        <div className='admin-payment admin-exam'>
            <div className="navbars">
                <div className="nav-btns">
                    <button className='exam-nav' onClick={handleExam}>payment</button>
                </div>
            </div>

            <div className={`exams ${examControl}`}>
                <EduAskPayment />
            </div>


        </div>
    )
    
}

export default EduPayment
