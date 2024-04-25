import React, { useState } from 'react'
import AdminPaymentPay from './AdminPaymentPay'
import AdminPaymentHis from './AdminPaymentHis'

const AdminPayment = () => {
    const [depart, setDepart] = useState('')
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


    const handleFilterChange = (event) => {
        const { value } = event.target;
        setDepart(value);
    };

    const handleFilter = () => {
        console.log(depart);

        setDepart('');
    };



    

    return (
        <div className='admin-payment admin-exam'>
            <div className="navbars">
                <div className="nav-btns">
                    <button className='exam-nav' onClick={handleExam}>payment</button>
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
                <AdminPaymentPay />
            </div>

            <div className={`historys ${historyControl}`}>
                <AdminPaymentHis />
            </div>



            <div className="page-number">
                <button className='preview'> &lt;&lt;</button>
                <button className='next'> &gt;&gt;</button>

            </div>

        </div>
    )

}

export default AdminPayment
