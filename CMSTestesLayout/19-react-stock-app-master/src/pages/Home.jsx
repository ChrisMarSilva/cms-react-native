import React from 'react';
import LandingCard from '../components/LandingCard/LandingCard.jsx';

function Home() {
    return (
        <>
            <h1>Welcome to Stock App</h1>
            <h3>This Website was built with React.js and designed with bootstrap</h3>
            <LandingCard 
            title="Analyze the world's most traded stocks"
            text="-Describe the api used to fetch stock value"
            />
            <LandingCard 
            title="Graphs built with..."
            text="tools used to build graph"
            />
            <LandingCard 
            title="Deployment on Heroku"
            text="Go into using heroku here"
            />
        </>
    )
}

export default Home;