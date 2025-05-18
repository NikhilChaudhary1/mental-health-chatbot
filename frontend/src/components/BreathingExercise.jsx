import { useState, useEffect } from 'react';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(0);
  const [totalCycles, setTotalCycles] = useState(0);
  
  // Breathing exercise timings (in seconds)
  const timing = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2
  };
  
  // Start/stop the breathing exercise
  const toggleExercise = () => {
    if (isActive) {
      setIsActive(false);
      setPhase('inhale');
      setCount(0);
    } else {
      setIsActive(true);
    }
  };
  
  // Handle the breathing phases
  useEffect(() => {
    let interval;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          // Move to next phase when current phase completes
          if (prevCount >= timing[phase] - 1) {
            switch (phase) {
              case 'inhale':
                setPhase('hold');
                return 0;
              case 'hold':
                setPhase('exhale');
                return 0;
              case 'exhale':
                setPhase('rest');
                return 0;
              case 'rest':
                setPhase('inhale');
                setTotalCycles(prev => prev + 1);
                return 0;
              default:
                return 0;
            }
          }
          return prevCount + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, phase]);
  
  // Calculate circle animation based on current phase
  const getCircleStyle = () => {
    const baseSize = 150;
    let size;
    
    switch (phase) {
      case 'inhale':
        // Circle grows during inhale
        size = baseSize + (count / timing.inhale) * 50;
        return {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: '#7986CB',
          opacity: 0.9
        };
      case 'hold':
        // Circle stays at maximum size during hold
        size = baseSize + 50;
        return {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: '#4DB6AC',
          opacity: 0.9
        };
      case 'exhale':
        // Circle shrinks during exhale
        size = baseSize + 50 - (count / timing.exhale) * 50;
        return {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: '#9575CD',
          opacity: 0.8
        };
      case 'rest':
        // Circle stays at minimum size during rest
        return {
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          backgroundColor: '#4FC3F7',
          opacity: 0.7
        };
      default:
        return {
          width: `${baseSize}px`,
          height: `${baseSize}px`
        };
    }
  };
  
  return (
    <div className="breathing-exercise">
      <h3>Breathing Exercise</h3>
      <p className="breathing-desc">
        Take a moment to breathe deeply and mindfully.
      </p>
      
      <div className="breathing-container">
        <div className="circle-container">
          <div 
            className="breathing-circle" 
            style={getCircleStyle()}
          >
            <span className="breathing-text">
              {isActive ? phase : 'Ready'}
            </span>
          </div>
        </div>
        
        {isActive && (
          <div className="breathing-instructions">
            <p>{phase === 'inhale' && 'Breathe in slowly...'}</p>
            <p>{phase === 'hold' && 'Hold your breath...'}</p>
            <p>{phase === 'exhale' && 'Breathe out slowly...'}</p>
            <p>{phase === 'rest' && 'Rest...'}</p>
            <div className="breathing-progress">
              <div 
                className="breathing-progress-bar"
                style={{ width: `${(count / timing[phase]) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="breathing-controls">
          <button 
            className={`breathing-button ${isActive ? 'stop' : 'start'}`}
            onClick={toggleExercise}
          >
            {isActive ? 'Stop' : 'Start Breathing Exercise'}
          </button>
          
          {totalCycles > 0 && !isActive && (
            <p className="breathing-stats">
              Completed {totalCycles} breathing cycles
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;