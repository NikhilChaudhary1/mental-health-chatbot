import { useState, useEffect } from 'react';

const moodOptions = [
  { value: 'great', emoji: '😄', label: 'Great' },
  { value: 'good', emoji: '🙂', label: 'Good' },
  { value: 'okay', emoji: '😐', label: 'Okay' },
  { value: 'sad', emoji: '😔', label: 'Sad' },
  { value: 'terrible', emoji: '😢', label: 'Terrible' }
];

const MoodTracker = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  // Load mood history from localStorage on component mount
  useEffect(() => {
    const savedMoods = localStorage.getItem('moodHistory');
    if (savedMoods) {
      setMoodHistory(JSON.parse(savedMoods));
    }
  }, []);

  // Handle mood selection
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    
    const newMoodEntry = {
      mood: mood,
      timestamp: new Date().toISOString()
    };
    
    // Update mood history
    const updatedHistory = [...moodHistory, newMoodEntry].slice(-7); // Keep last 7 entries
    setMoodHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
    
    // Notify parent component
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="mood-tracker">
      <h3>How are you feeling today?</h3>
      
      <div className="mood-options">
        {moodOptions.map((mood) => (
          <button
            key={mood.value}
            className={`mood-button ${selectedMood === mood.value ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(mood.value)}
            title={mood.label}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
      </div>
      
      {moodHistory.length > 0 && (
        <div className="mood-history">
          <h4>Your Recent Moods</h4>
          <div className="mood-history-chart">
            {moodHistory.map((entry, index) => {
              const moodInfo = moodOptions.find(m => m.value === entry.mood);
              return (
                <div key={index} className="mood-history-item">
                  <span className="mood-history-emoji">{moodInfo?.emoji}</span>
                  <span className="mood-history-date">{formatDate(entry.timestamp)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;