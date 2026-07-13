import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeFill, TelephoneFill } from 'react-bootstrap-icons';

function WizFooter() {
  return (
    <footer className="wiz-footer">
      <div className="wiz-footer-container">
        <div className="wiz-footer-content">
          <div className="wiz-footer-col wiz-brand-col">
            <img src="/wiz-assets/wizlogo.png" alt="WIZ Logo" className="wiz-footer-logo" />
            <p className="wiz-footer-tagline">Empower Curiosity, Craft Quizzes!</p>
          </div>
          
          <div className="wiz-footer-col">
            <h4>Contact Us</h4>
            <div className="wiz-footer-item">
              <EnvelopeFill className="wiz-footer-icon" /> info@wiz.com
            </div>
            <div className="wiz-footer-item">
              <TelephoneFill className="wiz-footer-icon" /> +63 (555) 123-4567
            </div>
          </div>

          <div className="wiz-footer-col">
            <h4>Support</h4>
            <div className="wiz-footer-item">
              <TelephoneFill className="wiz-footer-icon" /> +63 (555) 987-6543
            </div>
          </div>

          <div className="wiz-footer-col">
            <h4>Quick Links</h4>
            <div className="wiz-footer-item">
              <Link to="/wiz" className="wiz-abt-us">About Us</Link>
            </div>
          </div>
        </div>
        <hr className="wiz-footer-hr" />
        <p className="wiz-footer-copyright">&copy; 2026 WIZ. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default WizFooter;
