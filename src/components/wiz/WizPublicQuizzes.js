import React, { useState } from 'react';
import WizNavbar from './WizNavbar';
import WizFooter from './WizFooter';
import WizAlertModal from './WizAlertModal';

function WizPublicQuizzes() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const publicQuizzes = [
    { category: 'Basic Math', title: 'Addition & Subtraction' },
    { category: 'Basic Math', title: 'Multiplication Tables' },
    { category: 'Basic Math', title: 'Fractions Basics' },
    { category: 'Basic Math', title: 'Basic Geometry' },
    { category: 'Basic Math', title: 'Word Problems' },

    { category: 'History Trivia', title: 'World War II' },
    { category: 'History Trivia', title: 'Ancient Rome' },
    { category: 'History Trivia', title: 'US Presidents' },
    { category: 'History Trivia', title: 'Industrial Revolution' },
    { category: 'History Trivia', title: 'Cold War Era' },

    { category: 'Science 101', title: 'The Solar System' },
    { category: 'Science 101', title: 'Human Body' },
    { category: 'Science 101', title: 'Periodic Table Basics' },
    { category: 'Science 101', title: 'Plant Biology' },
    { category: 'Science 101', title: 'Physics Fundamentals' },
  ];

  return (
    <>
      <WizNavbar isLoggedIn={sessionStorage.getItem('wiz_user') !== null} />
      
      <div className="wiz-yq-container">
        <div className="wiz-yq-content">    
          <div className="wiz-yq-content-1">
            <h1 style={{ color: '#512da8' }}>Available Quizzes</h1>
          </div>

          <div className="wiz-quiz-container">
            <ul className="wiz-quiz-list">
              {publicQuizzes.map((quiz, index) => (
                <li className="wiz-quiz-item" key={index}>
                  <span>{quiz.category} - {quiz.title}</span>
                  <div className="wiz-btn-wrapper">
                    <button className="wiz-btn-custom" style={{ marginLeft: '10px' }} onClick={() => setIsAlertOpen(true)}>
                      Take Quiz
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="wiz-yq-3-container"></div>

      <WizFooter />

      <WizAlertModal 
        isOpen={isAlertOpen} 
        onClose={() => setIsAlertOpen(false)} 
        title="Demo Notice" 
        message="Taking quizzes is disabled in this frontend replica. In the real application, you would be able to participate in interactive quizzes here!" 
      />
    </>
  );
}

export default WizPublicQuizzes;
