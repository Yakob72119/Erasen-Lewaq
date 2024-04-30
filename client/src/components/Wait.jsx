import React from 'react'
import wait from '../assets/wait.jpg'
const Wait = ({message}) => {
  return (
    <div className='wait'>
      <img src={wait} alt="" className='image-wait-time'/>
      <p className='message'>
        <p>{message}</p> <br />
        Thank you for submitting your CV form. Your request is being reviewed by our team. We appreciate your patience. <br />Due to the review process, it may take some time before you receive confirmation. Please allow up to  1-5 business days for a response.
      </p>
      <p className='support'>If you have any urgent inquiries or concerns, please feel free to contact our support team at <a href="#">Erasen-lewaq Support Team</a>.</p>
    </div>
  )
}

export default Wait
