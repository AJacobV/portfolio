import React from 'react';
import { Link } from 'react-router-dom';
import './CICSFooter.css';

function CICSFooter() {
  return (
    <div className="cics-homepage-footer">
      <div className="cics-wave-containerfooter">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="cics-footer-wave">
          <path fill="#780D1D" fillOpacity="1" d="M0,0L80,48C160,96,320,192,480,213.3C640,235,800,181,960,154.7C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      <div className="cics-footer-content">
        <div className="cics-footer-logo">
          <span>CICS</span>
        </div>

        <ul className="cics-footer-links">
          <li><Link to="/cicselect/privacy">Privacy Policy</Link></li>
          <li><Link to="/cicselect/terms">Terms of Use</Link></li>
          <li><Link to="/cicselect/contact">Contact Us</Link></li>
        </ul>

        <div className="cics-social-media">
          <span>Follow CICS Student Council:</span>
          <a href="https://www.facebook.com/USTICSSC" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </a>
          <a href="https://x.com/USTICSSC" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CICSFooter;
