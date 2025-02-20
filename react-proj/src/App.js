import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import ResourcePage from './Pages/Resources';

// Component for the Welcome Screen
const WelcomeScreen = () => (
  <div className="screen">
    <h2>Welcome to the Virtual Resource Guide</h2>
    <p>Explore helpful resources to improve your skills and knowledge.</p>
  </div>
);

// Component for Decision Tree Chat Page
const ChatPage = () => {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <h3>What resources are you looking for?</h3>
      <div className="button-container">
        <button onClick={() => navigate('/childcare')}>Childcare</button>
        <button onClick={() => navigate('/transportation')}>Transportation</button>
        <button onClick={() => navigate('/attendance-motivation')}>Attendance Motivation</button>
        <button onClick={() => navigate('/food-insecurity')}>Food Insecurity</button>
        <button onClick={() => navigate('/housing')}>Housing</button>
        <button onClick={() => navigate('/mental-health')}>Mental Health</button>
        <button onClick={() => navigate('/unsure')}>Unsure</button>
      </div>
    </div>
  );
};

// Component for Unsure Page
const UnsurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <h3>Would you like to remain anonymous?</h3>
      <div className="button-container">
        <button onClick={() => navigate('/anonymous-yes')}>Yes</button>
        <button onClick={() => navigate('/anonymous-no')}>No</button>
      </div>
    </div>
  );
};

// Component for Anonymous Response Pages
const AnonymousResponse = ({ response }) => (
  <div className="screen">
    <h3>You selected: {response}</h3>
  </div>
);

// Individual Resource Pages
const ResourcePages = ({ title }) => (
  <div className="screen">
    <h3>{title}</h3>
    <p>Information and resources related to {title.toLowerCase()}.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Virtual Resource Guide</h1>
          <nav>
            <Link to="/" className="nav-link">Welcome</Link>
            <Link to="/resources" className="nav-link">Resources</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/childcare" element={<ResourcePage title="Childcare" />} />
            <Route path="/transportation" element={<ResourcePage title="Transportation" />} />
            <Route path="/attendance-motivation" element={<ResourcePage title="Attendance Motivation" />} />
            <Route path="/food-insecurity" element={<ResourcePage title="Food Insecurity" />} />
            <Route path="/housing" element={<ResourcePage title="Housing" />} />
            <Route path="/mental-health" element={<ResourcePage title="Mental Health" />} />
            <Route path="/unsure" element={<UnsurePage />} />
            <Route path="/anonymous-yes" element={<AnonymousResponse response="Yes" />} />
            <Route path="/anonymous-no" element={<AnonymousResponse response="No" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
