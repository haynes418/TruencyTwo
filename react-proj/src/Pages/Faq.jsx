import React from 'react';

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

export default FAQPage;
