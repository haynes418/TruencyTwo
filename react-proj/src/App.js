import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import ResourcePage from './Pages/Resources';


const decisionTree = {
  question: "What resources are you looking for? All responses will remain anonymous",
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
    },
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

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Virtual Resource Guide</h1>
          <p>This website serves as a Virtual Resource Guide for children facing truancy, offering tailored support for challenges. Users navigate through a decision tree to find relevant resources quickly based on their specific needs.</p>
          <nav>
            <Link to="/" className="nav-link">Welcome</Link>
            <Link to="/resources" className="nav-link">Resources</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to the Virtual Resource Guide</h2>} />
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
