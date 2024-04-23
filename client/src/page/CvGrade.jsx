import React, { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png';
import { Link } from 'react-router-dom';
import './style/CvGrade.scss'

const CvGrade = () => {
    const [gradeData, setGradeData] = useState({
        reference: '',
        skill: '',
        ethical: '',
        professional: '',
        expertise: ''
    });
    const [error, setError] = useState('');
    const [errorStyle, setErrorStyle] = useState('red');


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (!isNaN(value) && value >= 0 && value <= 5) {
            setGradeData({ ...gradeData, [name]: value });
        }
        // setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmit(true);

        const emptyFields = Object.values(gradeData).filter((value) => value === '');
        if (emptyFields.length > 0) {
            setError('All fields are required.');
            setErrorStyle('red')
            return;
        }

        console.log(gradeData);
        setError("Grade successfully!")
        setErrorStyle("Green")
    }


    const [submit, setSubmit] = useState('');
    return (
        <div className='cv-grade'>
            <div className="nav">
                <div className="logo">
                    <img src={erasenLweq} alt="" />
                    <h1>CV-Grade</h1>
                </div>
                <Link className='close-btn' to={'/admin-dashboard'}>Back</Link>
            </div>
            <div className="resume">
                <iframe width="100%" height="100%s" src="https://drive.google.com/file/d/1-ZUvf99VfE15Tm84G4llEMULcr6cRlKX/view?usp=sharing" frameborder="0"></iframe>
            </div>
            <div className="grade">
                <form className="cvGradeForm" onSubmit={handleSubmit}>
                    <div className="grade-items">
                        <p>References and Recommendations</p>
                        <input
                            type="number"
                            name="reference"
                            className="input"
                            placeholder="0"
                            value={gradeData.reference}
                            onChange={handleInputChange}
                            {...(submit && gradeData.reference === '' && { required: true })}
                        />
                    </div>
                    <div className="grade-items">
                        <p>Communication Skills</p>
                        <input
                            type="number"
                            name="skill"
                            className="input"
                            placeholder="0"
                            value={gradeData.skill}
                            onChange={handleInputChange}
                            {...(submit && gradeData.skill === '' && { required: true })}
                        />
                    </div>
                    <div className="grade-items">
                        <p>Professionalism and Ethical Conduct</p>
                        <input
                            type="number"
                            name="ethical"
                            className="input"
                            placeholder="0"
                            value={gradeData.ethical}
                            onChange={handleInputChange}
                            {...(submit && gradeData.ethical === '' && { required: true })}
                        />
                    </div>
                    <div className="grade-items">
                        <p>Professional Development and Contributions</p>
                        <input
                            type="number"
                            name="professional"
                            className="input"
                            placeholder="0"
                            value={gradeData.professional}
                            onChange={handleInputChange}
                            {...(submit && gradeData.professional === '' && { required: true })}
                        />
                    </div>
                    <div className="grade-items">
                        <p>Subject Expertise</p>
                        <input
                            type="number"
                            name="expertise"
                            className="input"
                            placeholder="0"
                            value={gradeData.expertise}
                            onChange={handleInputChange}
                            {...(submit && gradeData.expertise === '' && { required: true })}
                        />
                    </div>

                    <div className="btn-message">
                        <input type="submit" value="Grade" className="formBtn" id="forBtn" />
                        {error && <span style={{ color: errorStyle}}>{error}</span>}

                    </div>


                </form>
            </div>
        </div>

    )
}

export default CvGrade
