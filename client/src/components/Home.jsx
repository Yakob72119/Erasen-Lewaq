import React from 'react'
import './style/home.scss'
import hero from '../assets/hero-bg.png'
import { Link } from 'react-router-dom';
import interFace from '../assets/interface.svg'
import learning from '../assets/learning.svg'
import onlineExam from '../assets/online-exam.svg'
import professionalMarketplace from '../assets/professional-marketplace.svg'
import student from '../assets/student.svg'
import teacher from '../assets/teacher.svg'
import picPerson01 from '../assets/pic-person-01.jpg'
import picPerson02 from '../assets/pic-person-02.jpg'
import picPerson03 from '../assets/pic-person-03.jpg'

const Home = () => {
  return (
    <div className='Home'>
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Welcome to Erasen-Leweq: Your Exam Prep Solution!
          </h1>
          <p>
            Ace your exit exam effortlessly with our comprehensive preparation system. Let's gear up for success together!

          </p>
          <Link className='register' to={'/information'}>Register Now  &gt;&gt;</Link>
        </div>
        <img src={hero} alt="" />
      </div>

      <div className="feature-section">
        <div className="feature-item">
          <img src={onlineExam} alt="" />
          <h1>Online Exam Preparation</h1>
          <p>
            Access to a wide range of model exams for comprehensive practice.
          </p>
        </div>
        <div className="feature-item">
          <img src={professionalMarketplace} alt="" />
          <h1>Educator Marketplace:</h1>
          <p> Where educators can showcase their expertise and sell exam </p>
        </div>
        <div className="feature-item">
          <img src={interFace} alt="" />
          <h1>User-Friendly Interface: </h1>
          <p>Intuitive design for easy navigation and seamless user experience.</p>
        </div>
        <div className="feature-item">
          <img src={learning} alt="" />
          <h1>Customizable Learning Paths: </h1>
          <p>Tailored exam prep based on individual needs and goals.</p>
        </div>

      </div>

      <div className="benefit">
        <img src={student} alt="" />

        <p>
          Prepare for your exam effortlessly or earn additional income with our user-friendly system. Whether you're a student gearing up for success or an educator seeking to empower your students, our platform provides the tools and support you need. Join us and simplify your journey towards exam readiness and academic achievement!
        </p>

        <img src={teacher} alt="" />
      </div>

      <div className="comments">
        <div className="title">
          <h1>Testimonials</h1>
          <p>WE ARE MORE THAN A DIGITAL COMPANY</p>
        </div>
        <div className='testimonials'>
          <div className="comment">
            <img src={picPerson01} alt="" />
            <p className='text'>Erasen-Leweq made my exam preparation so much smoother. The intuitive interface and well-structured materials helped me focus on what mattered most. Highly recommend!</p>
            <p className='name'>Yuri Y.</p>
          </div>
          <div className="comment">
            <img src={picPerson02} alt="" />
            <p className='text'>As an educator, using Erasen-Leweq has been a game-changer! The system allowed me to guide my students effectively while earning extra income. A win-win!</p>
            <p className='name'>Dorrie S.</p>
          </div>
          <div className="comment">
            <img src={picPerson03} alt="" />
            <p className='text'> I was nervous about my exit exam, but Erasen-Leweq's tailored approach and practice tests boosted my confidence. I passed with flying colors thanks to their support!
            </p>
            <p className='name'>Sven H.</p>
          </div>
        </div>
      </div>

      <div className="testIt">
        <p>If you want to test it yourself <br /><Link className='register' to={'/information'}>Register Now!</Link></p>
      </div>

    </div>
  )
}

export default Home
