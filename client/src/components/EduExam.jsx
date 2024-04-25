import React, { useState } from 'react'

const EduExam = () => {
    const [link, setLink] = useState('')
    const [submit, setSubmit] = useState(false);
    const testData = ['0', '1', '2']
    const [deleteCurrent, setDeleteCurrent] = useState('hide')


    const handleDeleteOpen = () => {
        setDeleteCurrent('showDelete');

    }

    const handleDeleteClose = () => {
        setDeleteCurrent('hideDelete');
    }
    const handleLinkChange = (event) => {
        const { value } = event.target;
        setLink(value);
    };

    const handleLink = (event) => {
        event.preventDefault();
        setSubmit(true);

        console.log(link);
        setLink('')
        setSubmit(false)
    }

    const examDeclaration = testData.map((item, index) => (
        <div className="exam-declaration" key={index}>
            <div className='divOne'>
                <p>Educator: Akrem Muktar</p>
                <p>Education Status: PHD</p>
            </div>
            <div className='divTwo'>
                <p>Department: Software Engineering</p>
                <p>Exam: <a href='#' target='_blanck'>click here</a></p>
            </div>
            <div className="controllers">
                <button className='btnDelete' onClick={handleDeleteOpen}>Delete</button>
            </div>
        </div>
    ));
    return (
        <div className='edu-exam admin-exam'>
            <div className="navbars">
                <div className="add-exam">
                    <input
                        type='text'
                        name='link'
                        className='input'
                        placeholder='Exam Link'
                        value={link}
                        onChange={handleLinkChange}
                        {...(submit && link === '' && { required: true })}
                    />
                    <button className='btnFilter' onClick={handleLink}>Add</button>
                </div>
            </div>


            <div className={`exams`}>
                {examDeclaration}
            </div>

            <div className={`add-new-admin ${deleteCurrent}`}>
                <button onClick={handleDeleteClose} className='close'>Close</button>

                <div className="newAdminForm">
                    <p>Are You sure you want to delet this cvs?</p>
                </div>
                <div className="btn-message">
                    <input type="submit" value="Delete" className="deleteBtn" id="forBtn" />
                </div>
            </div>

            <div className="page-number">
                <button className='preview'> &lt;&lt;</button>
                <button className='next'> &gt;&gt;</button>

            </div>
        </div>
    )
}

export default EduExam
