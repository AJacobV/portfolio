import { Routes, Route } from 'react-router-dom';
import WizHome from './WizHome';
import WizLogin from './WizLogin';
import WizSubjects from './WizSubjects';
import WizPublicQuizzes from './WizPublicQuizzes';
import WizMyQuizzes from './WizMyQuizzes';
import WizBanner from './WizBanner';
import './WizApp.css';
import { useEffect } from 'react';

function WizApp() {
  // Ensure strict isolation by adding a wrapper class
  useEffect(() => {
    document.title = "WIZ - Quiz Maker";
    return () => {
      document.title = "My Portfolio"; // Reset on unmount
    };
  }, []);

  return (
    <div className="wiz-replica-container">
      <WizBanner />
      <Routes>
        <Route path="/" element={<WizHome />} />
        <Route path="login" element={<WizLogin />} />
        <Route path="subjects" element={<WizSubjects />} />
        <Route path="public-quizzes" element={<WizPublicQuizzes />} />
        <Route path="my-quizzes" element={<WizMyQuizzes />} />
      </Routes>
    </div>
  );
}

export default WizApp;
