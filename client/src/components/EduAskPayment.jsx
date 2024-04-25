import React, { useState } from 'react'

const EduAskPayment = () => {
    const testData = ['0', '1', '2']

  
    const examDeclaration = testData.map((item, index) => (
        <div className="exam-declaration" key={index}>
            <div className='divOne'>
                <p>Educator: Akrem Muktar</p>
                <p>Education Status: PHD</p>
                <p>Experience : 12</p>
            </div>
            <div className='divTwo'>
                <p>Department: Software Engineering</p>
                <p>Exam: <a href='#' target='_blanck'>click here</a></p>

                <p>Status: Pending...</p>
            </div>
            <div className="controllers">
                <button className='btnView'>Ask Pay</button>
            </div>
        </div>
    ))
    return (
        <>
        {examDeclaration}
        </>
    )
}

export default EduAskPayment
