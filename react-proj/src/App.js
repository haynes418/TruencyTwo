import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import ResourcePage from './Pages/Resources';


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
                "Daycare": { result: "Here are resources for daycare services.", path: "/childcare-daycare" },
                "Babysitters": { result: "Here are resources for babysitters.", path: "/childcare-babysitters" }
              }
            },
            "Transportation": {
              question: "Do you need assistance with public transport or carpool options?",
              choices: {
                "Public Transport": { result: "Here are public transport resources.", path: "/transportation-public" },
                "Carpool": { result: "Here are carpool resources.", path: "/transportation-carpool" }
              }
            },
            "Attendance Motivation": {
              question: "Do you need help with attendance goals or rewards?",
              choices: {
                "Goals": { result: "Here are resources for attendance goals.", path: "/attendance-goals" },
                "Rewards": { result: "Here are resources for attendance rewards.", path: "/attendance-rewards" }
              }
            },
            "Food Insecurity": {
              question: "Do you need help with affording groceries or finding food shelters?",
              choices: {
                "Groceries": { result: "Here are resources for groceries.", path: "/food-groceries" },
                "Food Shelters": { result: "Here are resources for food shelters.", path: "/food-shelters" }
              }
            },
            "Housing": {
              question: "Do you need help finding housing or paying rent?",
              choices: {
                "Finding Housing": { result: "Here are resources for finding housing.", path: "/housing-find" },
                "Paying Rent": { result: "Here are resources for rent assistance.", path: "/housing-rent" }
              }
            },
            "Mental Health": {
              question: "Do you need help with finding therapy or crisis hotlines?",
              choices: {
                "Therapy": { result: "Here are resources for therapy.", path: "/mentalhealth-therapy" },
                "Crisis Hotlines": { result: "Here are resources for crisis hotlines.", path: "/crisis-hotlines" }
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
    if (currentNode.choices[choice].path) {
      navigate(currentNode.choices[choice].path);
    } else {
      setCurrentNode(currentNode.choices[choice]);
    }
  };

  return (
    <div className="screen">
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
          If you need further assistance or cannot find the support you're looking for, we recommend contacting Urbana City Schools.
        </p>
      </div>
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
            <Link to="/faq" className="nav-link">FAQ</Link>
            <Link to="/" className="nav-link">Welcome Page</Link>
            <Link to="/resources" className="nav-link">Resources</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
          </nav>

          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
  
        </header>

        <main>
        <div className="welcome-container">
            <h2 className="welcome-message"></h2>
          </div>
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
          </div>
          } />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/chat" element={<DecisionTreeComponent node={decisionTree} />} />
            <Route path="/childcare-daycare" element={<div>Here are resources for daycare services.</div>} />
            <Route path="/childcare-babysitters" element={<div>Here are resources for babysitters.</div>} />
            <Route path="/transportation-public" element={<div>Here are public transport resources.</div>} />
            <Route path="/transportation-carpool" element={<div>Here are carpool resources.</div>} />
            <Route path="/attendance-goals" element={<div>Here are resources for attendance goals.</div>} />
            <Route path="/attendance-rewards" element={<div>Here are resources for attendance rewards.</div>} />
            <Route path="/food-groceries" element={<div>Here are resources for groceries.</div>} />
            <Route path="/food-shelters" element={<div>Here are resources for food shelters.</div>} />
            <Route path="/housing-find" element={<div>Here are resources for finding housing.</div>} />
            <Route path="/housing-rent" element={<div>Here are resources for rent assistance.</div>} />
            <Route path="/mentalhealth-therapy" element={<div>Here are resources for therapy.</div>} />
            <Route path="/crisis-hotlines" element={<div>Here are resources for crisis hotlines.</div>} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
};

export default App;
