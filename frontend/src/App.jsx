import { useState, useEffect, useRef } from 'react'
import MoodTracker from './components/MoodTracker'
import BreathingExercise from './components/BreathingExercise'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [showResources, setShowResources] = useState(false);
  const [showWellnessTools, setShowWellnessTools] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Fetch mental health resources when component mounts
  useEffect(() => {
    fetchResources();
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch mental health resources from the API
  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resources');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  // Send message to chatbot API
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      content: inputMessage,
      role: 'user'
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Get conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Send request to backend
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Add AI response to chat
        const botMessage = {
          content: data.reply,
          role: 'assistant'
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        console.error('Error from API:', data.error);
        
        // Add error message to chat
        const errorMessage = {
          content: 'Sorry, I encountered an error. Please try again.',
          role: 'assistant'
        };
        
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      const errorMessage = {
        content: 'Sorry, I encountered an error connecting to the server. Please check your connection.',
        role: 'assistant'
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle mood selection
  const handleMoodSelect = (mood) => {
    // Send the mood to the chatbot
    const moodMessage = `I'm feeling ${mood} today.`;
    setInputMessage(moodMessage);
    // Automatically send the message
    setTimeout(() => {
      sendMessage({ preventDefault: () => {} });
    }, 300);
  };

  // Add welcome message when chat starts
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        content: "Hello, I'm your mental health support assistant. How are you feeling today? Remember, I'm here to listen and offer support, but I'm not a replacement for professional help.",
        role: 'assistant'
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MindfulChat</h1>
        <div className="header-buttons">
          <button 
            className="wellness-button"
            onClick={() => setShowWellnessTools(!showWellnessTools)}
          >
            {showWellnessTools ? 'Hide Wellness Tools' : 'Wellness Tools'}
          </button>
          <button 
            className="resources-button"
            onClick={() => setShowResources(!showResources)}
          >
            {showResources ? 'Hide Resources' : 'Crisis Resources'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="chat-container">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-bubble">
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-bubble typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="input-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              disabled={isLoading}
              className="message-input"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputMessage.trim()}
              className="send-button"
            >
              Send
            </button>
          </form>
        </section>

        {showWellnessTools && (
          <aside className="wellness-panel">
            <h2>Wellness Tools</h2>
            <div className="wellness-tools">
              <MoodTracker onMoodSelect={handleMoodSelect} />
              <BreathingExercise />
            </div>
          </aside>
        )}
        
        {showResources && (
          <aside className="resources-panel">
            <h2>Crisis Resources</h2>
            <ul className="resources-list">
              {resources.map((resource, index) => (
                <li key={index} className="resource-item">
                  <h3>{resource.name}</h3>
                  <p>{resource.description}</p>
                  <p><strong>Contact:</strong> {resource.contact}</p>
                  <a href={resource.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </main>

      <footer className="app-footer">
        <p>
          This is an AI assistant for mental health support. 
          If you're experiencing a mental health emergency, please contact a professional 
          or call a crisis hotline immediately.
        </p>
      </footer>
    </div>
  )
}

export default App
