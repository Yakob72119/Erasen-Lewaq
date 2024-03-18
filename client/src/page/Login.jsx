import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1>login</h1>
      <span>
      Don't have an account? 
      <Link to={'/information'}>Register</Link>
      </span>
    </div>
  )
}

export default Login
