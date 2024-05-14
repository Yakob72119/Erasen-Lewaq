import React, { useState } from 'react'
import examT from '../assets/taken-exam.svg'
import examP from '../assets/passed-exam.svg'
import examF from '../assets/fail-exam.svg'
// import empty from '../assets/empty.svg'
import { Link } from 'react-router-dom';


const StudentDashboardComponent = () => {

  const [exams, setExams] = useState(['Software Engineering', 'computer since', 'Management', 'Accounting', 'Economics', 'Pharmacy', 'Medicine', 'Nursing', 'Medwife'])

  const examResult = exams.map((exam, index) => (
    <tbody className='body' key={index}>
      <tr>
        <td className='depart'>{exam}</td>
        <td className='examTime'>2:00:00</td>
        <td className='time'>1:30:12</td>
        <td className='examResult'>82</td>
        <td className='view'>
          <Link className='viewBtn' to={'/exam-review'}>view</Link>
        </td>
      </tr>
    </tbody>
  ));

  // const noExamPackage = () => {

  // }


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
        <table >
          <thead className='head'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Id</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          {examResult}
        </table>
        {/* <div className="no-result">
          <img src={empty} alt="" />
          <h2>To begin, please take an exam. Once completed, you can view your results here!</h2>
        </div> */}
      </div>
    </div>
  )
}

export default StudentDashboardComponent
