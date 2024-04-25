import React from 'react'

const AdminExamView = () => {
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
                <p>Time: 2:00</p>
                <p>Exam: <a href='#' target='_blanck'>click here</a></p>
            </div>
            <div className="controllers">
                <button className='btnView'>View</button>
            </div>
        </div>
    ));
    return (
        <>
            {examDeclaration}
        </>
    )
}

export default AdminExamView
