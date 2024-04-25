import React, { useState } from 'react'
import EduAskPayment from './EduAskPayment';
import EduHisPayment from './EduHisPayment';

const EduPayment = () => {
    const [examControl, setExamControl] = useState('show')
    const [historyControl, setHistoryControl] = useState('hide')
    

    const handleExam = () => {
        setExamControl('show');
        setHistoryControl('hide');
    }

    const handleHistory = () => {
        setExamControl('hide');
        setHistoryControl('show');
    }
    
   
    return (
        <div className='admin-payment admin-exam'>
            <div className="navbars">
                <div className="nav-btns">
                    <button className='exam-nav' onClick={handleExam}>payment</button>
                    <button className='history-nav' onClick={handleHistory}>History</button>
                </div>
            </div>

            <div className={`exams ${examControl}`}>
                <EduAskPayment />
            </div>

            <div className={`historys ${historyControl}`}>
                <EduHisPayment />
            </div>

           

            <div className="page-number">
                <button className='preview'> &lt;&lt;</button>
                <button className='next'> &gt;&gt;</button>

            </div>

        </div>
    )
    
}

export default EduPayment
