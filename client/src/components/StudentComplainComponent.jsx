import React, { useState } from 'react'
import examT from '../assets/taken-exam.svg'
import Compliment from '../assets/complain.svg';


const StudentComplainComponent = () => {
  const [complainData, setComplainData] = useState({
    email: 'akremmuktar332@gmail.com',
    fullName: 'Akrem Muktar',
    examDepart: '',
    examId: '',
    complainBox: ''
  });
  const [submit, setSubmit] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComplainData({ ...complainData, [name]: value });

  };

  const handleComplainPost = (event) => {
    event.preventDefault();
    setSubmit(true);

    const emptyFields = Object.values(complainData).filter((value) => value === '');

    if (emptyFields.length > 0) {
      return;
    }

    console.log(complainData)
    setSubmit(false)
  }

  return (
    <div className='complain'>
      <img className='image-1' src={Compliment} alt="" />
      <img className='image-2' src={examT} alt="" />
      <h3>If You have any complain on the exam we provide you can told for us!</h3>
      <form className="complainForm" onSubmit={handleComplainPost}>
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
          value={complainData.email}
          disabled
          onChange={handleInputChange}
          {...(submit && complainData.email === '' && { required: true })}
        />

        <input
          type="text"
          name="fullName"
          className="input"
          placeholder="FullName"
          value={complainData.fullName}
          disabled
          onChange={handleInputChange}
          {...(submit && complainData.fullName === '' && { required: true })}
        />

        <input
          type="text"
          name="examDepart"
          className="input"
          placeholder="Exam Department"
          value={complainData.examDepart}
          onChange={handleInputChange}
          {...(submit && complainData.examDepart === '' && { required: true })}
        />

        <input
          type="text"
          name="examId"
          className="input"
          placeholder="Exam ID"
          value={complainData.examId}
          onChange={handleInputChange}
          {...(submit && complainData.examId === '' && { required: true })}
        />

        <textarea
          type="text"
          name="complainBox"
          className="input complainBox"
          placeholder="Write Your Complain hear..."
          value={complainData.complainBox}
          onChange={handleInputChange}
          {...(submit && complainData.complainBox === '' && { required: true })}
        />

        <input type="submit" value="Submit" className="input submitBtn" />
      </form>
    </div>
  )
}

export default StudentComplainComponent
