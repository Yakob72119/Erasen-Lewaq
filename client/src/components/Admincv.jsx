import React, { useEffect, useState } from 'react'

const Admincv = () => {
  const [schedule, setSchedule] = useState('days')
  const [cvDeclaration, setCvDeclaration] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    startDate: '',
    endDate: ''
  })
  const [filterData, setFilterData] = useState({
    department: '',
    point: '',
    day: ''
  })
  const [error, setError] = useState('')
  const [errorStyle, setErrorStyle] = useState('red')

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
      setError("All Field are Required!")
      setErrorStyle('red');

      setTimeout(() => {
        setError('');
      }, 3000);
    }
    else {
      setError("Scheduled Successfully!")
      setErrorStyle('green')
      console.log(scheduleData)
      setScheduleData(
        {
          startDate: '',
          endDate: ''
        });

      setTimeout(() => {
        setError('');
      }, 3000);
    }


  }

  const handleFilter = () => {
    console.log(filterData)

    setScheduleData(
      {
        point: '',
        day: ''
      }
    )
  }

  const handleScheduleShow = () => {
    setSchedule(schedule === 'days' ? 'daysShow' : 'days')
  }

  const generateCvDeclarations = () => {
    const declarations = [];
    for (let i = 0; i < 5; i++) {
      declarations.push(
        <div className="cv-declaration" key={i}>
          <div className='divOne'>
            <p>Education Status: PHD</p>
            <p>Experience: 12 Year</p>
          </div>
          <div className='divTwo'>
            <p>Department: Software Engineering</p>
            <p>Resume: <a href="#">click hear</a></p>
          </div>
          <div className="controllers">
            <button className='btnGrade'>Grade</button>
            <button className='btnDelete'>Delete</button>
          </div>
        </div>

      );
    }

    return declarations;
  }

  useEffect(() => {
    setCvDeclaration(generateCvDeclarations())
  }, [])

  return (
    <div className='admin-cv'>
      <div className="navbars">
        <div className="schedule">
          <button className='scheduleBtn' onClick={handleScheduleShow}>Application schedule</button>
          <div className={schedule}>
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
            name='department'
            className='input point'
            placeholder='Department'
            value={filterData.department}
            onChange={handleFilterChange}
          />
          <input
            type='number'
            name='point'
            className='input point'
            placeholder='Point'
            value={filterData.point}
            onChange={handleFilterChange}
          />
          <input
            type='date'
            name='day'
            className='input dayDate'
            placeholder='Day'
            value={filterData.day}
            onChange={handleFilterChange}
          />
          <button className='btnFilter' onClick={handleFilter}>Filter</button>
          <div className="delete-current">
            <button>Delete Current search</button>
          </div>
        </div>
      </div>

      <div className="cvS">
        {cvDeclaration}
      </div>
    </div>
  )
}

export default Admincv
