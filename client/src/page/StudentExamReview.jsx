import React, { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png'
import './style/ExamReview.scss'



const StudentExamReview = () => {
  const fortest = [1, 2, 3, 4];
  const [selectedRadio, setselectedRadio] = useState('');

  const handleSelectedRadio = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setselectedRadio(value);
  };

  const ExamView = fortest.map((index) => (
    <div className='exam' key={index}>
      <div className="que">
        <p className='question-no'>Q {fortest[index - 1]}</p>
        <p className='question'>Question: What is the primary goal of software testing?</p>
      </div>
      <div className='answers'>
        <label className='radioGroup'>
          <input
            type='radio'
            name='s'
            value='a'
            checked={selectedRadio === 'a'}
            onChange={handleSelectedRadio}
          />
          To ensure that the software meets all functional requirements.
        </label>
        <label className='radioGroup correctAnswer'>
          <input
            type='radio'
            name='b'
            value='b'
            checked={selectedRadio === 'b'}
            onChange={handleSelectedRadio}
          />
          To identify and fix all defects in the software.
        </label>
        <label className='radioGroup'>
          <input
            type='radio'
            name='c'
            value='c'
            checked={selectedRadio === 'c'}
            onChange={handleSelectedRadio}
          />
          To validate that the software behaves as expected under different conditions.
        </label>
        <label className='radioGroup wrongAnswer'>
          <input
            type='radio'
            name='d'
            value='d'
            checked={selectedRadio === 'd'}
            onChange={handleSelectedRadio}
          />
          To increase the complexity of the software development process.
        </label>
      </div>
    </div>
  ));
  return (
    <div className='exam-review exam-page '>
      <div className="left-decor"></div>
      {ExamView}
      <img className="logo" src={erasenLweq} alt="" />
    </div>
  )
}

export default StudentExamReview
