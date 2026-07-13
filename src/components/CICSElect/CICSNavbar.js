import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CICSNavbar.css';

function CICSNavbar() {
  const navigate = useNavigate();

  return (
    <div className="cics-wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="cics-wave-svg">
        <path fill="#800000" fillOpacity="1" d="M0,160L60,149.3C120,139,240,117,360,117.3C480,118,600,128,720,117.3C840,107,960,85,1080,80C1200,75,1320,85,1380,90L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
      </svg>

      <div className="cics-navbar-content">
        <div className="cics-logo">
          <Link to="/cicselect">CICSelect</Link>
        </div>

        <ul className="cics-nav-links">
          <li><Link to="/cicselect">Home</Link></li>
          <li><Link to="/cicselect/about">About</Link></li>
          <li><Link to="/cicselect/contact">Contact Us</Link></li>
          <li><Link to="/cicselect/faqs">FAQs</Link></li>
        </ul>

        <div className="cics-auth-buttons">
          <button className="cics-btn-login" onClick={() => navigate('/cicselect/login', { state: { isSignup: false } })}>Log in</button>
          <button className="cics-btn-register" onClick={() => navigate('/cicselect/login', { state: { isSignup: true } })}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default CICSNavbar;
