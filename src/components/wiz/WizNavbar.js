import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WizAlertModal from './WizAlertModal';

function WizNavbar({ isLoggedIn }) {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('wiz_user');
    navigate('/wiz');
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <nav className="wiz-navbar" id="main-navbar">
        <div className="logo">
          <Link to="/wiz" className="logo">
            <img src="/wiz-assets/wizlogo.png" alt="Wiz Logo.png" className="wiz-logo" style={{ width: '80px' }} />
          </Link>
        </div>
        <ul>
          <li><Link to="/wiz/my-quizzes" className="quizzes-li">My Quizzes</Link></li>
          <li><Link to="/wiz/subjects" className="quizzes-li">Subjects</Link></li>
          <li><Link to="/wiz/public-quizzes" className="quizzes-li">Public Quizzes</Link></li>
        </ul>
        <div className="search-container">
          <form id="search_form" onSubmit={handleSearch}>
            <input type="text" id="search_query" name="search_query" placeholder="Search for quizzes" />
            <button type="submit" style={{ display: 'none' }}>Search</button>
          </form>
        </div>
        <div className="auth">
          {isLoggedIn ? (
            <>
              <button className="login-btn" onClick={() => setIsAlertOpen(true)} style={{ marginRight: '10px' }}>Create Quiz</button>
              <button className="signup-btn" style={{ background: 'none', border: 'none', fontSize: '16px' }} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/wiz/login" state={{ isSignup: true }} className="signup-btn">Signup</Link>
              <Link to="/wiz/login" className="login-btn">Login</Link>
            </>
          )}
        </div>
      </nav>

      <WizAlertModal 
        isOpen={isAlertOpen} 
        onClose={() => setIsAlertOpen(false)} 
        title="Demo Notice" 
        message="Creating quizzes is disabled in this frontend replica. In the real application, you would be able to build dynamic quizzes here!" 
      />
    </>
  );
}

export default WizNavbar;
