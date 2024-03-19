import React from 'react'
import { Link } from 'react-router-dom'
import erasenLweq from '../assets/erasenLweq.png'


const RegisterInfo = () => {
  return (
    <div className='info-register'>
      <div className="logo-container">
        <img src={erasenLweq} alt="" />
      </div>
      <div className="info-container">
        <h1>In Erasen Lewaq, our system offers registration options for both educators and students. Upon selecting 'Educator', you will be redirected to the Educator Dashboard after submitting your CV (Resume). Alternatively, selecting 'Student' will enroll you as a student.</h1>
      </div>
      <div className="btn-container">
        <Link className='link' to={'/register'}>Student</Link>
        <Link className='link' to={'/educator-registration'}>Educator</Link>
      </div>
    </div>
  )
}

export default RegisterInfo
