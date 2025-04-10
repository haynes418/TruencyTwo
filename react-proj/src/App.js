import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import ResourcePage from './Pages/Resources';
import FAQPage from './Pages/Faq';
import LoginModal from './Pages/LoginModal';
import FileUpload from './Pages/FileUpload';


const decisionTree = {
  question: "This is gonna take less than 5 minutes, all will remain anonymous. Do you wish to proceed?",
  choices: {
    "Yes": {
      question: "Are you worried about your child missing school?",
      choices: {
        "Yes": {
          question: "What is/may keep your child from school?",
          choices: {
            "Childcare": {
              question: "Do you need help finding daycare or babysitters?",
              choices: {
                "Daycare": { result: "Here are resources for daycare services.", path: "/resources?topic=child" },
                "Adult": { result: "Here are resources for babysitters.", path: "/resources?topic=senior" }
              }
            },
            "Transportation": {
              question: "Do you need assistance with public transport or carpool options?",
              choices: {
                "Public Transport": { result: "Here are public transport resources.", path: "/resources?topic=transportation-commute" },
                "Carpool": { result: "Here are carpool resources.", path: "/resources?topic=transportation-carpool" }
              }
            },
            "Services": {
              question: "Do you need help with attendance goals or rewards?",
              choices: {
                "Education": { result: "Here are resources for attendance goals.", path: "/resources?topic=community-education" },
                "Planning": { result: "Here are resources for attendance rewards.", path: "/resources?topic=planning" },
                "Legal": { result: "Here are resources for legal services.", path: "/resources?topic=legal-law" }
              }
            },
            "Food Insecurity": {
              question: "Do you need help with affording groceries or finding food shelters?",
              choices: {
                "Groceries": { result: "Here are resources for groceries.", path: "/resources?topic=food-groceries" },
                "Food Shelters": { result: "Here are resources for food shelters.", path: "/resources?topic=food-shelters" }
              }
            },
            "Housing": {
              question: "Do you need help finding housing or paying rent?",
              choices: {
                // "Finding Housing": { result: "Here are resources for finding housing.", path: "/resources?topic=housing-find" },
                "Paying Rent": { result: "Here are resources for rent assistance.", path: "/resources?topic=housing-rent-payment" }
              }
            },
            "Mental Health": {
              question: "Do you need help with finding therapy or crisis hotlines?",
              choices: {
                "Therapy": { result: "Here are resources for therapy.", path: "/resources?topic=mental-health" },
                "Crisis Hotlines": { result: "Here are resources for crisis hotlines.", path: "/resources?topic=crisis-hotlines" },
                "Disability": { result: "Here are resources for disabled children.", path: "/resources?topic=disabled" }
              }
            }
          }
        },
        "No": { result: "Redirecting to the welcome page.", path: "/" }
      }
    },
    "No": { result: "Redirecting to the welcome page.", path: "/" }
  }
};


const DecisionTreeComponent = ({ node }) => {
  const [currentNode, setCurrentNode] = useState(node);
  const [history, setHistory] = useState([]); // Track previous nodes
  const navigate = useNavigate();

  const handleChoice = (choice) => {
    if (currentNode.choices[choice].path) {
      // If there's a path, navigate to it
      navigate(currentNode.choices[choice].path);
    } else {
      // Otherwise, set the current node and save the previous node to history
      setHistory([...history, currentNode]); 
      setCurrentNode(currentNode.choices[choice]);
    }
  };

  const handleRecall = () => {
    if (history.length > 0) {
      // Pop the last node from the history and set it as the current node
      const previousNode = history[history.length - 1];
      setHistory(history.slice(0, -1)); // Remove the last node from history
      setCurrentNode(previousNode);
    }
  };

  return (
    <div className="screen">
      <h3 className="button-container">{currentNode.question || currentNode.result}</h3>
      {currentNode.choices ? (
        <div className="button-container">
          {Object.keys(currentNode.choices).map((choice) => (
            <button key={choice} onClick={() => handleChoice(choice)}>
              {choice}
            </button>
          ))}
          {/* Conditionally render the Recall button based on history */}
          {history.length > 0 && (
            <button onClick={handleRecall} className="Recall-button">Back</button>
          )}
        </div>
      ) : (
        <p>{currentNode.result}</p>
      )}
    </div>
  );
};


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);  // State to manage modal visibility

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            {!isAuthenticated && (
              <>
                <Link to="/" className="nav-link">Welcome Page</Link>
                <Link to="/faq" className="nav-link">FAQ</Link>
                <Link to="/resources" className="nav-link">Resources</Link>
                <Link to="/chat" className="nav-link">Chat</Link>
                <button onClick={openLoginModal} className="nav-link">Login</button> {}
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/" className="nav-link">Welcome Page</Link>
                <Link to="/faq" className="nav-link">FAQ</Link>
                <Link to="/resources" className="nav-link">Resources</Link>
                <Link to="/chat" className="nav-link">Chat</Link>
                <Link to="/fileupload" className="nav-link">File Upload</Link>
                <button onClick={() => setIsAuthenticated(false)} className="nav-link">Logout</button>
              </>
            )}
          </nav>
        </header>

        <main>
          <Routes>
          <Route path="/" element={<div className="welcome-container">
            <h2 className="welcome-message">Welcome to the Virtual Resource Guide for Urbana!</h2>
            <p>This website serves as a Virtual Resource Guide for children facing truancy, offering tailored support for challenges. Users navigate through a decision tree to find relevant resources quickly based on their specific needs.</p>
            <img src="https://cmsv2-assets.apptegy.net/uploads/4045/file/3439722/588cee57-d079-4d12-a92f-0f46a78d2923.png" alt="urbana" className="welcome-image" />
            <div className="attendance-section">
              <h3 className="attendance-title">Attendance Matters</h3>
              <p className="attendance-text">Regular school attendance is crucial for academic success. Students who attend school consistently are more likely to achieve higher grades, develop strong social skills, and create a foundation for future career opportunities. Use our website to ensure students have access to the resources they need to stay in school and succeed.</p>
              <h4 className="website-text">How to Use This Website</h4>
              <p className="tutorial-text">1. Go to the "Chat" Button on the navigation bar.</p>
              <p className="tutorial-text">2. Follow the prompts to answer questions about the challenges or needs your child may be facing.</p>
              <p className="tutorial-text">3. Based on your responses, the website will provide links to relevant resources.</p>
              <p className="tutorial-text">4. If you would like more information, visit the "Resources" or "FAQ" pages from the navigation bar.</p>
              <p className="tutorial-text">5. If you still have questions, you can always visit the "FAQ" page for commonly asked questions or contact Urbana City Schools.</p>

            </div>
          </div>} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/chat" element={<DecisionTreeComponent node={decisionTree} />} />
            <Route path="/fileupload" element={<FileUpload />} />
          </Routes>
        </main>

        {/* Render the modal */}
        <LoginModal 
          showModal={showLoginModal} 
          closeModal={closeLoginModal} 
          setIsAuthenticated={setIsAuthenticated} 
        />
      </div>
    </Router>
  );
};


export default App;
