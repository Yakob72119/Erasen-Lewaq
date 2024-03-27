import React from 'react'
// import { Link } from 'react-router-dom';
import '../App.scss'
import Header from '../components/Header';
import { Link } from 'react-router-dom';



const Index = () => {
    return (
        <div className='homePage'>
            <Header/> 
            <Link to={'/educator-dashboard'}>dashboard</Link>
        </div>
    )
}

export default Index
