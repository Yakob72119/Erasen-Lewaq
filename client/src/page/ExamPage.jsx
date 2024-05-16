import React from 'react'
import erasenLweq from '../assets/erasenLweq.png'
import './style/Exampage.scss'
import Exam from '../components/Exam'
import Result from '../components/Result'



const ExamPage = () => {


    return (
        <div className='exam-page'>
            <div className="left-decor"></div>

            <div className="info">
                <p className='name'>Abebe Bikila</p>
                <p className='exam-name'>Software Engineering Exam</p>
                <p className='amount-exam'>100 Questions</p>
                <p className='time-remain'>1:39:43</p>
            </div>

            <Exam />
            {/* <Result /> */}


            <img className="logo" src={erasenLweq} alt="" />

        </div>
    )
}

export default ExamPage
