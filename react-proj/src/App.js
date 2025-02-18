import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Component for the Welcome Screen
const WelcomeScreen = () => (
  <div className="screen">
    <h2>Welcome to the Virtual Resource Guide</h2>
    <p>Explore helpful resources to improve your skills and knowledge.</p>
  </div>
);

// Component for Resources Page
const ResourcesPage = () => (
  <div className="screen">
    <h3>Resources</h3>
    <ul>
      {/* <li><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React Official Documentation</a></li>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">MDN JavaScript Docs</a></li>
      <li><a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer">FreeCodeCamp</a></li> */}
    </ul>
  </div>
);

// Component for Chat Page
const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="screen">
      <h3>Chat</h3>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className="chat-message">{msg}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Type a message..." 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

const App = () => {
  return (
  <Router>
        <div className="App">
          <header className="App-header">
            <h1>Virtual Resource Guide</h1>
            <nav>
              <Link to="/" className="nav-link">Welcome</Link>
              <Link to="/resources" className="nav-link">Resources</Link>
              <Link to="/chat" className="nav-link">ChatBox</Link>
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
}

export default App;
