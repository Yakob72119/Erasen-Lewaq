import React from 'react'
import denyed from '../assets/denyed.svg'
import rejected from '../assets/rejected.svg'

const Reject = () => {
    return (
        <div className='reject'>
            <img src={denyed} alt="" className='denyed'/>
            <img src={rejected} alt="" className='reject'/>
            <p className='message'>
                <p></p> <br />
                We regret to inform you that your CV submission has been rejected. Our team has carefully reviewed your application, and unfortunately, we are unable to proceed with your candidacy at this time.
                <br />
                Thank you for your interest in our company. We appreciate the time and effort you put into your application. We encourage you to continue your job search and wish you the best of luck in your future endeavors.

            </p>
            <p className='support'>If you have any urgent inquiries or concerns, please feel free to contact our support team at <a href="#">Erasen-lewaq Support Team</a>.</p>
        </div>
    )
}

export default Reject
