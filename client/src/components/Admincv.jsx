import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admincv = () => {
  const [schedule, setSchedule] = useState('days');
  const [cvDeclaration, setCvDeclaration] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    startDate: '',
    endDate: ''
  });
  const [filterData, setFilterData] = useState({
    point: '',
    depart: ''
  });
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [cvData, setCvData] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [deleteCurrent, setDeleteCurrent] = useState('hide')

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
      setSubmit(false)
    }, 5000);

    return () => clearTimeout(timer);
  }, [submit]);

  const handleDeleteOpen = () => {
    setDeleteCurrent('showDelete');

  }

  const handleDeleteClose = () => {
    setDeleteCurrent('hideDelete');
  }


  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const handleSchedule = () => {
    if (scheduleData.startDate === '' || scheduleData.endDate === '') {
      setError('All Fields are Required!');
      setErrorStyle('red');

      setTimeout(() => {
        setError('');
      }, 3000);
    } else {
      setError('Scheduled Successfully!');
      setErrorStyle('green');
      console.log(scheduleData);
      setScheduleData({
        startDate: '',
        endDate: ''
      });

      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleFilter = async () => {
    try {
      const { depart  } = filterData;
      const response = await axios.get(`http://localhost:3000/cv/filter?department=${depart}`);
      const filteredCvs = response.data;
      const cvDeclarations = generateCvDeclarations(filteredCvs);
      setCvDeclaration(cvDeclarations);
  } catch (error) {
      console.error('Error filtering CVs:', error);
      setError('Error filtering CVs');
      setErrorStyle('red');
  }
  };

  const handleScheduleShow = () => {
    setSchedule('daysShow');
  };

  const handleScheduleHide = () => {
    setSchedule('days');
  };

  

  const redirectToResultPage = (gLink, _id) => {
    navigate(`/cv-grade?gLink=${gLink}&_id=${_id}`);
  };



  const handleDeleteCV = async (cvId) => {
    try {
      await axios.delete(`http://localhost:3000/cv/deleteCV/${cvId}`);

      // Filter out the deleted CV from cvDeclaration immediately
      const updatedCvDeclaration = cvDeclaration.filter(cv => cv._id !== cvId);
      setCvDeclaration(updatedCvDeclaration);
    } catch (error) {
      console.error('Error deleting CV:', error);
      setError('Error deleting CV');
      setErrorStyle('red');
    }
  };


  const generateCvDeclarations = (cvData) => {
    return cvData.map((cv, index) => (
      <div className="cv-declaration" key={index}>
        <div className='divOne'>
          <p>Education Status: {cv.eduStatus}</p>
          <p>Experience: {cv.experience} Year</p>
          <p>Status: {cv.status}</p>
        </div>
        <div className='divTwo'>
          <p>Department: {cv.department}</p>
          <p>Resume: <a href={cv.gLink} target='_blanck'>click here</a></p>
        </div>
        <div className="controllers">
          {cv.value !== null ? (
            <button className='btnGrade'>{cv.value}</button>
          ) : (
            <button className='btnGrade' onClick={() => redirectToResultPage(cv.gLink, cv._id)}>Grade</button>
          )}
          {/* Pass cv._id to handleDeleteCV */}
          <button className='btnDelete' onClick={() => handleDeleteCV(cv._id, index)}>Delete</button>
        </div>
      </div>
    ));
  };

  const handleDeleteCurrentSearch = async () => {
    try {

      const cvIds = cvData.map(cv => String(cv._id));
      await axios.post('http://localhost:3000/cv/deleteMultipleCVs', { cvIds });

      setCvDeclaration([]);
    } catch (error) {
      console.error('Error deleting all rendered CVs:', error);
      setError('Error deleting all rendered CVs');
      setErrorStyle('red');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cv/getCVs', { params: { limit: 10 } });
        const fetchedCvData = response.data;
        const cvDeclarations = generateCvDeclarations(fetchedCvData);
        setCvDeclaration(cvDeclarations);
        setCvData(fetchedCvData);
      } catch (error) {
        console.error('Error fetching CV data:', error);
        setError('Error fetching CV data');
        setErrorStyle('red');
      }
    };

    fetchData();
  }, []);

  return (
    <div className='admin-cv' >
      <div className="navbars">
        <div className="schedule">
          <button  className='scheduleBtn' onClick={handleScheduleShow}>Application schedule</button>
          <div className={schedule}>
            <button style={{background:'red'}} onClick={handleScheduleHide}>Close</button>
            <label htmlFor="startDate">From</label>
            <input
              type='date'
              name='startDate'
              className='input'
              value={scheduleData.startDate}
              onChange={handleInputChange}
            />
            <label htmlFor="ednDate">To</label>
            <input
              type='date'
              name='endDate'
              className='input'
              value={scheduleData.endDate}
              onChange={handleInputChange}
            />
            <span style={{ color: errorStyle }}>{error}</span>
            <button className='btnSchedule' onClick={handleSchedule}>Schedule</button>
          </div>
        </div>
        <div className="filters">
          <input
            type='text'
            name='depart'
            className='input dayDate'
            placeholder='Department'
            value={filterData.depart}
            onChange={handleFilterChange}
          />
          <button className='btnFilter' onClick={handleFilter}>Filter</button>
          <div className="delete-current">
            {/* Add onClick handler for deleting current search */}
            <button onClick={handleDeleteOpen}>Delete Current search</button>

          </div>
        </div>
      </div>

      <div className="cvS">
        {cvDeclaration}
      </div>

      <div className={`add-new-admin ${deleteCurrent}`}>
        <button onClick={handleDeleteClose} className='close'>Close</button>

        <div className="newAdminForm">
          <p>Are You sure you want to delet this cvs?</p>
        </div>
        <div className="btn-message">
          <input onClick={handleDeleteCurrentSearch} type="submit" value="Delete" className="deleteBtn" id="forBtn" />

        </div>


      </div>

      <div className="page-number">
        <button className='preview'> &lt;&lt; Previous</button>
        <button className='next'>Next &gt;&gt;</button>

      </div>
    </div>
  );
};

export default Admincv;
