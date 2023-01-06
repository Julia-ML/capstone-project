import React from "react";
import landingLogo from "../../static/images/landingLogo.jpg";
import Paper from '@mui/material/Paper';

//The Landing Page component displays when a user first accesses the website, it displays an image and a dexcription of services.
const LandingPage = () => {
    return (
        <Paper style={root}>
        <img className="landingLogo" src="../../static/images/landingLogo.jpg" />
        <div className="landing-page">
            <p>
                A tool created for developers by developers. 
            </p>
            <p >
                We know what it's like to have needless meetings cutting into valuable coding time, disrupting  your ability getting in the zone!
            </p>
            <p>
                That's where our Daily Standup Replacer comes in. One less meeting but with better results, you can:
            </p>
            <ul>
                <li>keep up with your teammates daily tasks in real time</li>
                <li>automate emails to keep your team up to date</li>
                <li>view metrics</li>
                <li>manage deadlines and document progress</li>
                <li>create and manage all tasks and projects</li>
                <li>make posts and socialize</li>
            </ul>
        </div>
        </Paper>
    )
}

export default LandingPage