import React, { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png'
import { Link } from 'react-router-dom'
import './style/Exampage.scss'



const ExamPage = () => {
    const [selectedRadio, setselectedRadio] = useState('');

    const handleSelectedRadio = (e) => {
        const { name, value } = e.target;
        // setFormData({ ...formData, [name]: value });
        setselectedRadio(value);
    };

    return (
        <div className='exam-page'>
            <div className="left-decor"></div>

            <div className="info">
                <p className='name'>Abebe Bikila</p>
                <p className='exam-name'>Software Engineering Exam</p>
                <p className='amount-exam'>100 Questions</p>
                <p className='time-remain'>1:39:43</p>
            </div>

            <div className="exam">
                <div className="que">
                    <p className='question-no'>Q 8</p>
                    <p className='question'>Question: What is the primary goal of software testing?</p>
                </div>
                <div className='answers'>
                    <label className={`radioGroup ${selectedRadio === 'a' ? 'selected' : ''}`}>
                        <input
                            type='radio'
                            name='s'
                            value='a'
                            checked={selectedRadio === 'a'}
                            onChange={handleSelectedRadio}
                        />
                        To ensure that the software meets all functional requirements.
                    </label>
                    <label className={`radioGroup ${selectedRadio === 'b' ? 'selected' : ''}`}>
                        <input
                            type='radio'
                            name='b'
                            value='b'
                            checked={selectedRadio === 'b'}
                            onChange={handleSelectedRadio}
                        />
                        To identify and fix all defects in the software.
                    </label>
                    <label className={`radioGroup ${selectedRadio === 'c' ? 'selected' : ''}`}>
                        <input
                            type='radio'
                            name='c'
                            value='c'
                            checked={selectedRadio === 'c'}
                            onChange={handleSelectedRadio}
                        />
                        To validate that the software behaves as expected under different conditions.
                    </label>
                    <label className={`radioGroup ${selectedRadio === 'd' ? 'selected' : ''}`}>
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
                <div className="btn">
                    <button className='previous'>Previous</button>
                    <button className='next'>Next</button>
                </div>
            </div>

            <div className="result">
                <h1>Abebe Bikila</h1>
                <p className='email'>abebebikila@gmail.com</p>
                <p className='exam-name'>Software Engineering Exam</p>
                <p className='amount-exam'>100 Questions</p>
                <p className='time-done'>in 1:39:43</p>
                <p className='mark'>80/100</p>
                <Link className='close' to={'/student-dashboard'}>Close</Link>
            </div>


            <img className="logo" src={erasenLweq} alt="" />

        </div>
    )
}

export default ExamPage
