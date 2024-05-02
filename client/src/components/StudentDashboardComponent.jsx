import React, { useState } from 'react'
import examT from '../assets/taken-exam.svg'
import examP from '../assets/passed-exam.svg'
import examF from '../assets/fail-exam.svg'
import empty from '../assets/empty.svg'

const StudentDashboardComponent = () => {

  const [exams, setExams] = useState(['Software Engineering', 'computer since', 'Management', 'Accounting', 'Economics', 'Pharmacy', 'Medicine', 'Nursing'])

  const examResult = exams.map((exam, index) => (
    <div key={index} className="exam-result">
      <h1>Examp Result</h1>
      <div className="exam-result-info">
        <p>Department: {exam}</p>
        <p>Result: 76</p>
        <span>01/01/2001</span>
      </div>
    </div>
  ));

  const noExamPackage = () => {

  }


  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <div className="result-analysis">
        <div className="exam-point exam-taken">
          <div className="part-img">
            <img src={examT} alt="" />
          </div>
          <div className="part-text">
            <p className="point">20</p>
            <p className="text">Attempted Exams</p>
          </div>
        </div>
        <div className="exam-point exam-passed">
          <div className="part-img">
            <img src={examP} alt="" />
          </div>
          <div className="part-text">
            <p className="point">16</p>
            <p className="text">Exams Passed</p>
          </div>
        </div>
        <div className="exam-point exam-fail">
          <div className="part-img">
            <img src={examF} alt="" />
          </div>
          <div className="part-text">
            <p className="point">4</p>
            <p className="text">Exams Failed</p>
          </div>
        </div>
      </div>
      <div className='result'>
        {/* {examResult} */}
        <div className="no-result">
          <img src={empty} alt="" />
          <h2>To begin, please take an exam. Once completed, you can view your results here!</h2>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboardComponent
