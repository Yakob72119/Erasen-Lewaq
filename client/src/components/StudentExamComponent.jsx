import React, { useState } from 'react'
import examAvater from '../assets/exam-avater.png'

const StudentExamComponent = () => {
  const [exams, setExams] = useState(['Software Engineering', 'computer since', 'Management', 'Accounting', 'Economics', 'Pharmacy', 'Medicine', 'Nursing'])

  const examMy = exams.map((exam, index) => (
    <div key={index} className="exam">
      <h1>Package</h1>
      <img src={examAvater} alt="" />
      <div className="exam-info">
        <p>Department: {exam}</p>
        <p>Heigh Scour: 89</p>
        <button>Take</button>
      </div>
    </div>
  ));

  const examPackage = exams.map((exam, index) => (
    <div key={index} className="exam">
      <h1>Package</h1>
      <img src={examAvater} alt="" />
      <div className="exam-info">
        <p>Department: {exam}</p>
        <p>Payment: 49 birr </p>
        <button>Buy</button>
      </div>
    </div>
  ));
  return (
    <div className='package-exams'>
      <div className="my-exam">
        <h2>My Exam</h2>
        <div className="exams">
          {examMy}
        </div>
      </div>
      <div className="suggested-exam">
        <h2>Suggested Exam</h2>
        <div className="exams">
          {examPackage}
        </div>
      </div>
    </div>
  )
}

export default StudentExamComponent
