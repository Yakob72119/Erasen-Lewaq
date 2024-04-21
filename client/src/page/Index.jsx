import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
import '../App.scss'
import Header from '../components/Header';
import Home from '../components/Home';
import Resource from '../components/Resource';
import Aboutus from '../components/Aboutus';
import Faq from '../components/Faq'
import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';
import toTop from '../assets/to-top.svg'


const Index = () => {
    const [navigate, setNavigate] = useState('')
    const [currentScreen, setCurrentScreen] = useState('home')
    const [activeClass, setActiveClass] = useState('home')
    const [isVisible, setIsVisible] = useState(false);

    const handleNavigate = (navType) => {
        setNavigate(navType);
    }

    // Function to handle scroll event
    const handleScroll = () => {
        // Show the button when the user scrolls down more than 100px
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Function to handle click event
    const handleClick = () => {
        // Smoothly scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Add a scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // This effect will run when activeEffect changes
        if (navigate === 'home') {
            setCurrentScreen('home');
            setActiveClass('home')

            // Add your logic for Effect 1
        }


        if (navigate === 'resource') {
            setCurrentScreen('resource');
            setActiveClass('resource')
        }

        if (navigate === 'about') {
            setCurrentScreen('about');
            setActiveClass('about')
        }

        if (navigate === 'faq') {
            setCurrentScreen('faq');
            setActiveClass('faq')
        }



    }, [navigate, currentScreen]);

    console.log(activeClass)

    return (
        <div className='homePage'>
            <div id='top'></div>
            <Header onButtonClick={handleNavigate} handleClass={activeClass} />
            {currentScreen === 'home' && <Home />}
            {currentScreen === 'resource' && <Resource />}
            {currentScreen === 'about' && <Aboutus />}
            {currentScreen === 'faq' && <Faq />}
            <Footer />

            <button className={`scroll-to-top-btn ${isVisible ? 'show' : 'hide'}`}
                onClick={handleClick}><img src={toTop} alt="" /></button>


            {/* <Link to={'/educator-dashboard'}>dashboard</Link>
            <Link to={'/admin-dashboard'}>a-dashboard</Link> */}
        </div>
    )
}

export default Index
