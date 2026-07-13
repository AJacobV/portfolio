import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WizNavbar from './WizNavbar';
import WizFooter from './WizFooter';
import WizAlertModal from './WizAlertModal';

function WizMyQuizzes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, title: '', message: '' });

  useEffect(() => {
    const user = sessionStorage.getItem('wiz_user');
    if (user) {
      setIsLoggedIn(true);
      const quizzes = JSON.parse(sessionStorage.getItem('wiz_quizzes')) || [];
      setMyQuizzes(quizzes);
    }
  }, []);

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      const updatedQuizzes = [...myQuizzes];
      updatedQuizzes.splice(index, 1);
      setMyQuizzes(updatedQuizzes);
      sessionStorage.setItem('wiz_quizzes', JSON.stringify(updatedQuizzes));
    }
  };

  const showTakeQuizDemoAlert = () => {
    setAlertConfig({
      isOpen: true,
      title: 'Demo Notice',
      message: 'Taking quizzes is disabled in this frontend replica. In the real application, you would be able to participate in interactive quizzes here!'
    });
  };

  const showCreateQuizDemoAlert = () => {
    setAlertConfig({
      isOpen: true,
      title: 'Demo Notice',
      message: 'Creating quizzes is disabled in this frontend replica. In the real application, you would be able to build dynamic quizzes here!'
    });
  };

  if (!isLoggedIn) {
    return (
      <>
        <WizNavbar isLoggedIn={false} />
        <div style={{ backgroundColor: '#c9d6ff', background: 'linear-gradient(to right, #e2e2e2, #c9d6ff)', height: '100dvh' }}>
          <div className="wiz-quiz-bg">
            <div className="wiz-center-container">
              <h1>Please <Link to="/wiz/login" style={{ color: '#512da8' }}>sign up or login</Link></h1>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <WizNavbar isLoggedIn={true} />
      
      <div className="wiz-yq-container">
        <div className="wiz-yq-content">
          <div className="wiz-yq-content-1">
            <h1 style={{ color: '#512da8' }}>Your Quizzes</h1>
          </div>

          {myQuizzes.length > 0 ? (
            <div className="wiz-quiz-container">
              <ul className="wiz-quiz-list">
                {myQuizzes.map((quiz, index) => (
                  <li className="wiz-quiz-item" key={index}>
                    <span>{quiz.title}</span>
                    <div className="wiz-btn-wrapper">
                      <button className="wiz-btn-custom" style={{ marginLeft: '10px' }} onClick={showTakeQuizDemoAlert}>
                        Take Quiz
                      </button>
                      <button className="wiz-btn-danger" style={{ marginLeft: '10px' }} onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <div className="wiz-yq-no-cont">
                <div className="wiz-yq-no-1">
                  You don't have available quizzes yet.
                </div>
              </div>
              <div className="wiz-yq-btn-cont">
                <button className="cta-btn" role="button" onClick={showCreateQuizDemoAlert}>Start Creating</button>
              </div>
            </>
          )}
        </div>
      </div>

      <WizFooter />

      <WizAlertModal 
        isOpen={alertConfig.isOpen} 
        onClose={() => setAlertConfig({ ...alertConfig, isOpen: false })} 
        title={alertConfig.title} 
        message={alertConfig.message} 
      />
    </>
  );
}

export default WizMyQuizzes;
