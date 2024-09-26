import React, { useState, useEffect } from 'react';
import './main.css';

export default function Main() {
  const workTime = 1500; // 25 minutes in seconds
  const breakTime = 300; // 5 minutes in seconds

  const [timeLeft, setTimeLeft] = useState(workTime); // Start with Pomodoro time
  const [isActive, setIsActive] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true); // True for Pomodoro, false for Break

  // Timer functionality
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert(isPomodoro ? 'Pomodoro session complete! Time for a break.' : 'Break complete! Back to work.');
      setIsActive(false);
      setTimeLeft(isPomodoro ? breakTime : workTime); // Reset the time for the next session
      setIsPomodoro(!isPomodoro); // Switch mode after timer runs out
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isPomodoro]);

  // Format time in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(isPomodoro ? workTime : breakTime); // Reset to the current mode's timer
  };

  const handleToggleMode = (mode) => {
    setIsActive(false); // Stop the current timer
    setIsPomodoro(mode === 'pomodoro'); // Set the mode based on the clicked part
    setTimeLeft(mode === 'pomodoro' ? workTime : breakTime); // Set timer based on mode
  };

  return (
    <div className="pomodoro-container">
      <h1>{isPomodoro ? 'Pomodoro Timer' : 'Break Timer'}</h1>

      {/* Custom Switch for Pomodoro and Break */}
      <div className="custom-switch">
        <div
          className={`switch-option ${isPomodoro ? 'active' : ''}`}
          onClick={() => handleToggleMode('pomodoro')}
        >
          Pomodoro
        </div>
        <div
          className={`switch-option ${!isPomodoro ? 'active' : ''}`}
          onClick={() => handleToggleMode('break')}
        >
          Break
        </div>
      </div>

      <div className="timer">
        {formatTime(timeLeft)}
      </div>

      <div className="buttons">
        <button onClick={handleStartPause}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
