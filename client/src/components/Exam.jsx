import React, { useState } from 'react'

const Exam = () => {
    const [selectedRadio, setselectedRadio] = useState('');

    const handleSelectedRadio = (e) => {
        const { name, value } = e.target;
        // setFormData({ ...formData, [name]: value });
        setselectedRadio(value);
    };
    return (
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

    )
}

export default Exam
