import React, { useState, useEffect } from 'react';
import '../styles/spinner.css'

const SpinnerWithCountdown = () => {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(countdown);
    }, [seconds]);

    return (
        <div className="spinner-container">
            <div 
            className="spinner"
            data-testid="spinner"
            ></div>
            <p>
                It is a free deployment, so please be patient...
                <br />
                <span className="countdown">{seconds}s</span>
            </p>
        </div>
    );
};

export default SpinnerWithCountdown;
