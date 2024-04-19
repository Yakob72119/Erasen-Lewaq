import React, { useState } from 'react'
import examAvater from '../assets/exam-avater.png'

const Resource = () => {
  const [exams, setExams] = useState(['Software Engineering', 'computer since', 'Management', 'Accounting', 'Economics', 'Pharmacy', 'Medicine', 'Nursing'])


  const examPackage = exams.map((exam, index) => (
    <div key={index} className="exam">
      <h1>Package</h1>
      <img src={examAvater} alt="" />
      <div className="exam-info">
        <p>Department: {exam}</p>
        <p>Payment: 49 birr</p>
        <button>Buy</button>
      </div>
    </div>
  ));
  return (
    <div className='Resource'>
      <div className="exams">
        {examPackage}
      </div>
    </div>
  )
}

export default Resource
