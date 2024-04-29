import { useState, useEffect } from 'react';
import axios from 'axios';
import erasenLweq from '../assets/erasenLweq.png';
import { Link, useLocation } from 'react-router-dom';
import './style/CvGrade.scss';

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
    const [submit, setSubmit] = useState('');
    const [validGoogleDoc, setValidGoogleDoc] = useState(false);
    const [cvId, setCvId] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const gLink = searchParams.get('gLink');
    const _id = searchParams.get('_id');

    useEffect(() => {
        const checkGoogleDocValidity = async () => {
            try {
                const response = await fetch(gLink);
                if (response.ok && response.url.includes('docs.google.com')) {
                    setValidGoogleDoc(true);
                } else {
                    setValidGoogleDoc(false);
                    setError('Incorrect Google Docs link.');
                    setErrorStyle('red');
                }
            } catch (error) {
                console.error('Error checking Google Docs link validity:', error);
                setValidGoogleDoc(false);
                setError('An error occurred while validating the link.');
                setErrorStyle('red');
            }
        };

        if (gLink) {
            checkGoogleDocValidity();
        }

        setCvId(_id); // Set cvId from the _id parameter
    }, [gLink, _id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (!isNaN(value) && value >= 0 && value <= 5) {
            setGradeData({ ...gradeData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmit(true);

        const emptyFields = Object.values(gradeData).filter((value) => value === '');
        if (emptyFields.length > 0) {
            setError('All fields are required.');
            setErrorStyle('red');
            return;
        }
        if (!validGoogleDoc) {
            setError('Please provide a valid Google Docs link.');
            setErrorStyle('red');
            return;
        }

        try {
            const { reference, skill, ethical, professional, expertise } = gradeData;
            const totalValue = parseInt(reference) + parseInt(skill) + parseInt(ethical) + parseInt(professional) + parseInt(expertise);

            const response = await axios.put(`http://localhost:3000/cv/updateCvValue/${cvId}`, { value: totalValue });
            console.log(response.data); // Assuming the response contains updated CV data

            setError("Graded successfully!");
            setErrorStyle("green");
        } catch (error) {
            console.error('Error updating CV:', error);
            setError('Error updating CV');
            setErrorStyle('red');
        }
    };

    return (
        <div className='cv-grade'>
            <div className="nav">
                <div className="logo">
                    <img src={erasenLweq} alt="" />
                    <h1>CV-Grade</h1>
                </div>
                <Link className='close-btn' to={'/admin-dashboard'}>Back</Link>
            </div>
            <div className="grade-body">
                <div className="resume">
                    {validGoogleDoc ? (
                        <iframe width="100%" height="100%" src={gLink}></iframe>
                    ) : (
                        <p>{error}</p>
                    )}
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
                            {error && <span style={{ color: errorStyle }}>{error}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CvGrade;
