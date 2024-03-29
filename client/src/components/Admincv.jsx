import React from 'react'

const Admincv = () => {
  return (
    <div className='admin-cv'>
      <div className="navbars">
        <div className="schedule">
            <button>Application schedule</button>
        </div>
        <div className="filters">
            <button>Point</button>
            <button>Day</button>
            <button>Filter</button>
        </div>
      </div>
      <div className="delete-current">
        Delete Current search
      </div>
      <div className="cvS">
        <div className="cv-declaration">
            <ul>
                <li>EduStatus</li>
                <li>Experience</li>
                <li>Deprt</li>
                <li>glink</li>
            </ul>
            <div className="controllers">
                <button>Grade</button>
                <button>Delete</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Admincv
