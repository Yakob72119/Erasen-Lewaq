import React from 'react'
import { Link } from 'react-router-dom'
const RegisterInfo = () => {
  return (
    <div>
      <h1>Info to Register</h1>
      <Link to={'/register'}>Student</Link>
      <Link to={'/educator-registration'}>Educator</Link>
    </div>
  )
}

export default RegisterInfo
