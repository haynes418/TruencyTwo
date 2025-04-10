import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import ResourcePage from './Pages/Resources';
import LoginModal from './Pages/LoginModal'; // Import the LoginModal component


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
                "Babysitters": { result: "Here are resources for babysitters.", path: "/resources?topic=child" }
              }
            },
            "Transportation": {
              question: "Do you need assistance with public transport or carpool options?",
              choices: {
                "Public Transport": { result: "Here are public transport resources.", path: "/resources?topic=transportation" },
                "Carpool": { result: "Here are carpool resources.", path: "/resources?topic=transportation" }
              }
            },
            "Attendance Motivation": {
              question: "Do you need help with attendance goals or rewards?",
              choices: {
                "Goals": { result: "Here are resources for attendance goals.", path: "/resources?topic=attendance-goals" },
                "Rewards": { result: "Here are resources for attendance rewards.", path: "/resources?topic=attendance-rewards" }
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
                "Finding Housing": { result: "Here are resources for finding housing.", path: "/resources?topic=housing-find" },
                "Paying Rent": { result: "Here are resources for rent assistance.", path: "/resources?topic=housing-rent" }
              }
            },
            "Mental Health": {
              question: "Do you need help with finding therapy or crisis hotlines?",
              choices: {
                "Therapy": { result: "Here are resources for therapy.", path: "/resources?topic=mental-health" },
                "Crisis Hotlines": { result: "Here are resources for crisis hotlines.", path: "/resources?topic=crisis-hotlines" }
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
  const navigate = useNavigate();

  const handleChoice = (choice) => {
    if(currentNode.choices[choice].path){
      navigate(currentNode.choices[choice].path);
    } else {
      setCurrentNode(currentNode.choices[choice]);
    }
  };

  return (
    <div className="screen">
      <button onClick = {() => navigate(-1)} className="Back-button">Back</button>
      <h3>{currentNode.question || currentNode.result}</h3>
      {currentNode.choices ? (
        <div className="button-container">
          {Object.keys(currentNode.choices).map((choice) => (
            <button key={choice} onClick={() => handleChoice(choice)}>
              {choice}
            </button>
          ))}
        </div>
      ) : (
        <p>{currentNode.result}</p>
      )}
    </div>
  );
};

const FAQPage = () => {
  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3 className="faq-question">1. What is the purpose of this Virtual Resource Guide?</h3>
        <p className="faq-answer">
          This website is designed to support children facing truancy and their families by providing access to resources that address challenges such as childcare, transportation, attendance motivation, food insecurity, housing, and mental health. It also helps guide users to services that can assist with specific needs.
        </p>
      </div>
      
      <div className="faq-item">
        <h3 className="faq-question">2. How do I get started using the guide?</h3>
        <p className="faq-answer">
          To start using the guide, click on the "Chat" button on the navigation bar. You will be guided through a series of questions to help identify your needs, and the website will suggest relevant resources.
        </p>
      </div>

      <div className="faq-item">
        <h3 className="faq-question">3. Is the information I provide kept confidential?</h3>
        <p className="faq-answer">
          Yes, all responses and information provided through the chat are completely anonymous. Your privacy is important to us.
        </p>
      </div>

      <div className="faq-item">
        <h3 className="faq-question">4. Can I access resources without going through the chat?</h3>
        <p className="faq-answer">
          Yes, you can directly visit the "Resources" page from the navigation bar to see a list of available support services without interacting with the chat.
        </p>
      </div>

      <div className="faq-item">
        <h3 className="faq-question">5. How accurate and up-to-date are the resources?</h3>
        <p className="faq-answer">
          We regularly review and update our resources to ensure they are accurate and relevant. However, we recommend checking the official websites of the services listed for the most current information.
        </p>
      </div>

      <div className="faq-item">
        <h3 className="faq-question">6. Who can I contact if I need more assistance?</h3>
        <p className="faq-answer">
          If you need further assistance or cannot find the support you're looking for, we recommend contacting your child's school.
        </p>
      </div>

      <div className="faq-item">
        <h3 className="faq-question">7. What is mediation?</h3>
        <p className="faq-answer">
        Truancy mediation is a process where a neutral mediator facilitates a discussion between a student, their parents, and school staff to address attendance issues and collaboratively develop solutions to improve school attendance.
        </p>
      </div>
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
                <button onClick={openLoginModal} className="nav-link">Login</button> {}
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/" className="nav-link">Welcome Page</Link>
                <Link to="/faq" className="nav-link">FAQ</Link>
                <Link to="/resources" className="nav-link">Resources</Link>
                <Link to="/chat" className="nav-link">Chat</Link>
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
