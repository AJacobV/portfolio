import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './CICSLogin.css';

function CICSLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFlipped, setIsFlipped] = useState(location.state?.isSignup || false);

  useEffect(() => {
    if (location.state?.isSignup !== undefined) {
      setIsFlipped(location.state.isSignup);
    }
  }, [location.state]);

  const handleAuth = (e) => {
    e.preventDefault();
    navigate('/cicselect/dashboard');
  };

  return (
    <div className="cics-login-wrapper3d">
      
      {/* Background Animated Elements */}
      <div className="cics-bg-mesh"></div>
      <div className="cics-bg-orb orb-1"></div>
      <div className="cics-bg-orb orb-2"></div>

      <div className="cics-nav-back3d">
        <Link to="/cicselect">← Back to Home</Link>
      </div>
      
      <div className={`cics-flip-container ${isFlipped ? 'flipped' : ''}`}>
        <div className="cics-flipper">
          
          {/* Front Face: Login */}
          <div className="cics-card-face cics-front">
            <div className="cics-card-content">
              <div className="cics-login-logo">
                <span>CICSelect</span>
              </div>
              <h1>Welcome Back</h1>
              <p className="cics-subtitle">Enter your details to securely log in.</p>
              
              <form onSubmit={handleAuth} className="cics-modern-form">
                <div className="cics-input-group">
                  <input type="text" id="login-studentid" required placeholder=" " maxLength={11} />
                  <label htmlFor="login-studentid">Student ID</label>
                </div>
                <div className="cics-input-group">
                  <input type="password" id="login-password" required placeholder=" " />
                  <label htmlFor="login-password">Password</label>
                </div>
                <button type="submit" className="cics-submit-btn">Log In</button>
              </form>

              <div className="cics-card-footer">
                <p>Don't have an account?</p>
                <button type="button" className="cics-switch-btn" onClick={() => setIsFlipped(true)}>
                  Create an Account
                </button>
              </div>
            </div>
          </div>

          {/* Back Face: Sign Up */}
          <div className="cics-card-face cics-back">
            <div className="cics-card-content">
              <div className="cics-login-logo">
                <span>CICSelect</span>
              </div>
              <h1>Join Us</h1>
              <p className="cics-subtitle">Create an account to participate in the elections.</p>
              
              <form onSubmit={handleAuth} className="cics-modern-form">
                <div className="cics-input-group">
                  <input type="text" id="signup-name" required placeholder=" " />
                  <label htmlFor="signup-name">Full Name</label>
                </div>
                <div className="cics-input-group">
                  <input type="text" id="signup-studentid" inputMode="numeric" required placeholder=" " maxLength={11} />
                  <label htmlFor="signup-studentid">Student Number</label>
                </div>
                <div className="cics-input-group">
                  <input type="email" id="signup-email" required placeholder=" " />
                  <label htmlFor="signup-email">Email Address</label>
                </div>
                <div className="cics-input-group">
                  <input type="password" id="signup-password" required placeholder=" " />
                  <label htmlFor="signup-password">Password</label>
                </div>
                <button type="submit" className="cics-submit-btn">Sign Up</button>
              </form>

              <div className="cics-card-footer">
                <p>Already a member?</p>
                <button type="button" className="cics-switch-btn" onClick={() => setIsFlipped(false)}>
                  Log In
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default CICSLogin;
