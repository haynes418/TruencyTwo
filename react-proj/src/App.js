import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import ResourcePage from './Pages/Resources';
import ResourceUsage from './Pages/ResourceUsage';
import FAQPage from './Pages/Faq';
import LoginModal from './Pages/LoginModal';
import FileUpload from './Pages/FileUpload';


const decisionTree = {
  question: "This is going to take less than 5 minutes, all will remain anonymous. Do you wish to proceed?",
  choices: {
    "Yes": {
      question: "Are you worried about your child missing school?",
      choices: {
        "Yes": {
          question: "What is/may keep your child from school?",
          choices: {
            "Childcare": {
              question: "What type of care support are you looking for?",
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
              question: "Do you need help with school attendance, academic planning, or related legal matters?",
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
              question: "Do you need help paying rent?",
              choices: {
                // "Finding Housing": { result: "Here are resources for finding housing.", path: "/resources?topic=housing-find" },
                "Paying Rent": { result: "Here are resources for rent assistance.", path: "/resources?topic=housing-rent-payment" }
              }
            },
            "Mental Health": {
              question: "Do you need help with mental health support, therapy options, or crisis hotlines?",
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

const getButtonImage = (choice) => {
  const imageMap = {
    "Childcare": "https://t3.ftcdn.net/jpg/03/01/67/86/360_F_301678641_ZvIslaRRlpYOPS4oOL8CIcOtF7gLgOO6.jpg",
    "Transportation": "https://media.istockphoto.com/id/1395748040/photo/a-young-boy-getting-onto-a-school-bus-in-sunshine.jpg?s=612x612&w=0&k=20&c=YJwBRw2TOo_iIUdjE30lMbSVTlUfXoJ0ENzS9JP8gBU=",
    "Services": "https://t4.ftcdn.net/jpg/03/03/49/75/360_F_303497515_ZHOwfTtuo5sYpAeoqWRZnkXZNZDKZeMz.jpg",
    "Food Insecurity": "https://media.istockphoto.com/id/1469884547/photo/volunteers-help-to-draw-food-for-the-poor-who-are-waiting-to-receive-food-in-hunger.jpg?s=612x612&w=0&k=20&c=T3qVvgFtkLcwC24HOWdZl23ChaOor6fVk0_G2nzdtIU=",
    "Housing": "https://media.istockphoto.com/id/924928184/photo/social-housing.jpg?s=612x612&w=0&k=20&c=p7HNU_A6tNUIq4s3AUyVmLdJcwIzIo7-cWx_H87a0zE=",
    "Mental Health": "https://cdn.pixabay.com/photo/2022/07/15/18/27/mental-health-7323725_640.png",
    "Yes" : "https://t4.ftcdn.net/jpg/00/98/24/45/360_F_98244581_otL4Mr22a7X0YkGT4c4S4iyCAlioHA7w.jpg",
    "No" : "https://media.istockphoto.com/id/1074870300/vector/no-sign-red-thin-simple-isolated-vector.jpg?s=612x612&w=0&k=20&c=U2ZuZRARJDCvFDTIrB-CmWaY5a7iKtd7agdGyN-FAto=",
    "Daycare" : "https://media.istockphoto.com/id/1406495118/photo/mother-and-her-little-girl-drawing-together-at-home.jpg?s=612x612&w=0&k=20&c=KpxE8EV5lRkP8ncqdoy7pDSY1JLUWispW-DXaYIX5Ro=",
    "Adult" : "https://media.istockphoto.com/id/1011191318/photo/carer-pushing-senior-woman-in-wheelchair-outside-home.jpg?s=612x612&w=0&k=20&c=dCGFqEbdljeM6msa_fKmqnurvdEC2tWTaRxThvt2Yd4=",
    "Public Transport" : "https://media.istockphoto.com/id/889402258/photo/these-seats-need-to-be-filled.jpg?s=612x612&w=0&k=20&c=4zBhSi2Ar7hpQqsZHUsA9uRmIHJK2qmOE__M7LjfGP8=",
    "Carpool" : "https://t4.ftcdn.net/jpg/02/03/14/75/360_F_203147580_XN4qgvaFkZD6PtLMbYdSE39xnZFAYHsw.jpg",
    "Education" : "https://t3.ftcdn.net/jpg/03/25/13/44/360_F_325134428_Au0z61aShtXoDP6y2r9YLJkjIZj69r1A.jpg",
    "Planning" : "https://media.istockphoto.com/id/1074983828/photo/sharing-ideas-concepts-with-papernote-writing-strategy-on-wall-glass-office-business-marketing.jpg?s=612x612&w=0&k=20&c=q47Ot4HKOFzfSy5K03o_CuJtezZ_1RMjEID5DGVN2gw=",
    "Legal" : "https://t3.ftcdn.net/jpg/01/07/15/58/360_F_107155820_NCUA4CtCkIDXXHnKAlWVzUvRjfMe0k5D.jpg",
    "Groceries" : "https://media.istockphoto.com/id/1449032425/photo/shopping-bag-full-of-healthy-food-on-blue.jpg?s=612x612&w=0&k=20&c=856XpqRgq8Bj9Mr28VzAdW-iTyHEj_dW01m6SPPHsOU=",
    "Food Shelters" : "https://media.istockphoto.com/id/1448547403/photo/donations-from-a-generous-community.jpg?s=612x612&w=0&k=20&c=pV9hh6GhKIKxZAuHt4oNZ047XWzRcwB_28Bsfcgzy58=",
    "Paying Rent" : "https://media.istockphoto.com/id/1182212257/photo/pay-rent-note-in-calendar.jpg?s=612x612&w=0&k=20&c=eDnShhh1Z9BAAIgeChQTjY153gTRA7WD09ChcgQjgqw=",
    "Therapy" : "https://t4.ftcdn.net/jpg/02/47/99/85/360_F_247998574_L8dulZGkmyWCtGFniiHMeIP9DxUJDrWP.jpg",
    "Crisis Hotlines" : "https://www.dpcedcenter.org/wp-content/uploads/2022/08/Crisis-hotline-Aug2022.jpg",
    "Disability" : "https://disabilityin.org/wp-content/uploads/2023/12/JORD5050-scaled.jpg",

  };

  return imageMap[choice]; // default icon
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
          <button key={choice} onClick={() => handleChoice(choice)} className="image-button">
            <img src={getButtonImage(choice)} alt={choice} className="button-icon" />
            <span>{choice}</span>
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
                <Link to="/chat" className="nav-link">Resource Guide</Link>
                <button onClick={openLoginModal} className="nav-link"> Faculty Login</button> {}
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/" className="nav-link">Welcome Page</Link>
                <Link to="/faq" className="nav-link">FAQ</Link>
                <Link to="/resources" className="nav-link">Resources</Link>
                <Link to="/chat" className="nav-link">Resource Guide</Link>
                <Link to="/fileupload" className="nav-link">File Upload</Link>
                <Link to="/resourceusage" className="nav-link">Resource Usage Stats</Link>
                <button onClick={() => setIsAuthenticated(false)} className="nav-link">Logout</button>
              </>
            )}
          </nav>
        </header>

        <main>
  <Routes>
    <Route
      path="/"
      element={
        <div className="welcome-container">
          <h2 className="welcome-message">Welcome to the Virtual Resource Guide for Urbana!</h2>
          <p className="intro-text">
            This website serves as a Virtual Resource Guide for children facing truancy, offering tailored support for
            challenges. Users navigate through a decision tree to find relevant resources quickly based on their specific
            needs.
          </p>
          <div className="welcome-image-container">
            <img
              src="https://cmsv2-assets.apptegy.net/uploads/4045/file/3439722/588cee57-d079-4d12-a92f-0f46a78d2923.png"
              alt="urbana"
              className="welcome-image"
            />
          </div>

          <div className="attendance-section">
            <div className="section-card">
              <h3 className="attendance-title">Attendance Matters</h3>
              <p className="attendance-text">
                Regular school attendance is crucial for academic success. Students who attend school consistently are more
                likely to achieve higher grades, develop strong social skills, and create a foundation for future career
                opportunities. Use our website to ensure students have access to the resources they need to stay in school and
                succeed.
              </p>
            </div>
          </div>

          <div className="section-card">
          <h3 className="attendance-title">Why Attendance Is Important</h3>
          <ul className="attendance-facts">
            <li>🌟 Students who miss fewer than 9 days each year typically score higher on tests.</li>
            <li>🏫 Chronic absenteeism (missing 10% or more of school) is linked to lower reading levels by 3rd grade.</li>
            <li>🎓 Attendance is one of the top predictors of high school graduation and college readiness.</li>
            <li>💼 Good attendance builds strong work habits essential for future employment.</li>
          </ul>
          <div className="attendance-image-container">
          <img
            src="https://cdn7.dissolve.com/p/D430_35_335/D430_35_335_1200.jpg"
            alt="students attending class"
            className="attendance-image"
          />
        </div>

        </div>

          <div className="usage-section">
            <h4 className="website-text">How to Use This Website</h4>
            <ul className="tutorial-list">
              <li className="tutorial-item">1. Go to the "Resource Guide" Button on the navigation bar.</li>
              <li className="tutorial-item">2. Follow the prompts to answer questions about your child's challenges or needs.</li>
              <li className="tutorial-item">3. Based on your responses, the website will provide links to relevant resources.</li>
              <li className="tutorial-item">4. For more information, visit the "Resources" or "FAQ" pages from the navigation bar.</li>
              <li className="tutorial-item">5. If you have further questions, visit the "FAQ" page for common inquiries or contact Urbana City Schools.</li>
            </ul>
          </div>
        </div>
      }
    />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/resources" element={<ResourcePage />} />
    <Route path="/chat" element={<DecisionTreeComponent node={decisionTree} />} />
    <Route path="/resourceusage" element={<ResourceUsage />} />
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
