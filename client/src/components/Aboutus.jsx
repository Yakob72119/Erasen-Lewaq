import React from 'react'
import erasenLweq from '../assets/erasenLweq.png'
import akrem from '../assets/akrem.jpg'
import picPerson01 from '../assets/yakoba.jpg'
import picPerson02 from '../assets/about-us.jpg'
import picPerson03 from '../assets/kidus.jpg'
import ekram from '../assets/ekram.jpg'


const Aboutus = () => {
  return (
    <div className='about'>
      <h1>About Us</h1>
      <div className='whoWeAre'>
        <img src={erasenLweq} alt="" />
        <div className="contents">
          <div className='content'>
            <h2>Who We Are</h2>
            <p>
              Erasen-Leweq is a forward-thinking educational platform dedicated to empowering students and educators. We specialize in providing a streamlined, user-friendly system for exit exam preparation and assessment, helping students succeed in their academic journeys while providing educators with opportunities to earn additional income and make a positive impact.
            </p>
          </div>
          <div className='content'>
            <h2>Our Culture</h2>
            <ul>
              <li><strong>Innovation:</strong> We embrace new ideas and technologies to continuously improve our platform and deliver the best possible experience for our users.</li>
              <li><strong>Collaboration:</strong> We foster a supportive community where students and educators can learn and grow together.</li>
              <li><strong>Integrity:</strong> We uphold the highest standards of honesty and transparency in all our interactions.</li>
              <li><strong>Excellence:</strong> We strive for excellence in everything we do, from our educational content to our customer support.</li>
            </ul>
          </div>
          <div className='content'>
            <h2>How We Work</h2>
            <ul>
              <li><strong>Personalized Learning:</strong> We tailor our exam preparation resources to each student's needs, offering customized study plans and practice tests.</li>
              <li><strong>Accessible and User-Friendly:</strong> Our platform is easy to navigate, making it simple for students and educators to access the tools they need.</li>
              <li><strong>Continuous Improvement:</strong> We listen to feedback from our community to continually refine our system and better serve our users.</li>
              <li><strong>Supportive Community:</strong> We offer dedicated support to both students and educators, ensuring they have the guidance and resources necessary to succeed.</li>
            </ul>
          </div>
        </div>
      </div>

      <h1>Our Dynamic Developers</h1>
      <div className="devs">
        <div className="dev">
          <img src={picPerson03} alt="" />
          <h2 >Kidus B.</h2>
          <p className='role'>Front-end Developer</p>
          <p>Kidus creates engaging frontend experiences, turning designs into reality.</p>
        </div>
        <div className="dev">
          <img src={akrem} alt="" />
          <h2>Akrem M.</h2>
          <p className='role'>Back-end Developer</p>
          <p>Akrem builds robust backend systems, focusing on performance and security.</p>
        </div>
        <div className="dev">
          <img src={picPerson01} alt="" />
          <h2 >Yakob B.</h2>
          <p className='role'>Full-Stack Developer</p>
          <p>Yakob demonstrates expertise in crafting and engineering resilient frontend and backend systems..</p>
        </div>
        <div className="dev">
          <img src={picPerson02} alt="" />
          <h2>Natenael N.</h2>
          <p className='role'> Tester</p>
          <p>Natenael ensures software quality through meticulous testing, enabling seamless user experiences.</p>
        </div>
        <div className="dev">
          <img src={ekram} alt="" />
          <h2 >Ekram A.</h2>
          <p className='role'>UX/UI Designer</p>
          <p>Ekream designs intuitive interfaces, prioritizing user needs and accessibility.</p>
        </div>
      </div>

      <h1>Contact</h1>
      <div className="contact">
        <p className='classic'>WE LIKE TO KNOW NEW PEOPLE</p>
        <p className='text'>Have a question, feedback, or just want to say hello? We'd love to hear from you! Fill out the form below or reach out to us directly via email or phone. Our dedicated team is here to assist you with any inquiries you may have.</p>
        <a className='link' href='https://t.me/erasen_leweq'>Get in touch</a>
      </div>
    </div>
  )
}

export default Aboutus
