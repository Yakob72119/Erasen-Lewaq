import React from 'react'
import { Link } from 'react-router-dom'


const Result = () => {
    return (
        <div className="result">
            <h1>Abebe Bikila</h1>
            <p className='email'>abebebikila@gmail.com</p>
            <p className='exam-name'>Software Engineering Exam</p>
            <p className='amount-exam'>100 Questions</p>
            <p className='time-done'>in 1:39:43</p>
            <p className='mark'>80/100</p>
            <Link className='close' to={'/student-dashboard'}>Close</Link>
        </div>
    )
}

export default Result