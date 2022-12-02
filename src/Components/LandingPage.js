import React from "react";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate("/login")}>Login</button>
            <p>
                A tool created for developers by developers. 
            </p>
            <p>
                We know what it's like to have needless meetings cutting into valuable coding time, disrupting  your ability getting in the zone!
            </p>
            <p>
                That's where our Daily Standup replacer comes in. One less meeting but with better results, you can:
            </p>
            <ul>
                <li>-keep up with your teammates daily tasks in real time</li>
                <li>-automate email updates for your progress</li>
                <li>-*enter other functionality as we add it*</li>
            </ul>
        </div>
    )
}

export default LandingPage