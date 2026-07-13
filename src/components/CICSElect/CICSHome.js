import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CICSNavbar from './CICSNavbar';
import CICSFooter from './CICSFooter';
import './CICSHome.css';

import registerImg from '../../assets/cicselect/registernow.png';
import bodyImg from '../../assets/cicselect/body.jpg';
import faqImg from '../../assets/cicselect/smolfaq.png';
import voteImg from '../../assets/cicselect/votewise.png';

import secureIcon from '../../assets/cicselect/secure-icon.png';
import voteIcon from '../../assets/cicselect/vote-icon.png';
import resultsIcon from '../../assets/cicselect/results-icon.png';

function CICSHome() {
  const navigate = useNavigate();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroContent = [
    {
      heading: "Online Voting System",
      paragraph: "Let's make voting and elections easy for you. This is designed to ensure a secured voting session.",
      button: true,
      image: registerImg
    },
    {
      heading: "Secured and Trusted",
      paragraph: "No need to worry about security. This website aims to provide a secure way for voters to cast their votes.",
      button: false,
      image: bodyImg
    },
    {
      heading: "Visit our FAQ page",
      paragraph: "Got any questions? You can visit our FAQ page in the top part of the page.",
      button: false,
      image: faqImg
    },
    {
      heading: "Vote wisely!",
      paragraph: "'The vote is precious. It is almost sacred. It Is the most powerful nonviolent tool we have in a democracy' - John Lewis",
      button: false,
      image: voteImg
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroContent.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [heroContent.length]);

  return (
    <>
      <CICSNavbar />

      <div className="cics-hero-section">
        <div className="cics-hero-text-content">
          <h1>{heroContent[currentHeroIndex].heading}</h1>
          <p>{heroContent[currentHeroIndex].paragraph}</p>
          {heroContent[currentHeroIndex].button && (
            <button className="cics-hero-button" onClick={() => navigate('/cicselect/login', { state: { isSignup: true } })}>
              Register as a Voter
            </button>
          )}
        </div>
        <div className="cics-hero-image-container">
          {heroContent.map((item, index) => (
            <img 
              key={index}
              className={`cics-hero-image ${index === currentHeroIndex ? 'active' : ''}`}
              src={item.image}
              alt="Voting illustration"
            />
          ))}
        </div>
      </div>

      <div className="cics-body-content">
        <div className="cics-step-container">
          <div className="cics-box">
            <p className="cics-step-left">Step 1</p>
            <span className="cics-step-title">Sign Up</span>
            <p className="cics-step-desc">Create an account on this system to vote</p>
            <button className="cics-step-btn" onClick={() => navigate('/cicselect/login', { state: { isSignup: true } })}>Register as a Voter</button>
          </div>
        </div>
        <div className="cics-step-containertwo">
          <div className="cics-box">
            <p className="cics-step-left">Step 2</p>
            <span className="cics-step-title">Vote</span>
            <p className="cics-step-desc">Vote for your preferred candidate</p>
            <button className="cics-step-btn">Vote</button>
          </div>
        </div>
        <div className="cics-step-containerthree">
          <div className="cics-box">
            <p className="cics-step-left">Step 3</p>
            <span className="cics-step-title">View Results</span>
            <p className="cics-step-desc">View election results of various</p>
            <button className="cics-step-btn">View</button>
          </div>
        </div>
      </div>

      <div className="cics-body-secondcontent">
        <div className="cics-quote-inner">
          <p className="cics-blkQuote">Making you decision-making process more modern, safe, and efficient.</p>
          <p className="cics-blkDescription">Upgrade from manual ballot counting to an online election system without jeopardizing the integrity of your vote</p>
        </div>
      </div>

      <div className="cics-body-thirdcontent">
        <div className="cics-features-section">
          <h2 className="cics-features-title">Our Features</h2>
          <p className="cics-features-description">
            We provide an online voting system that exceeds expectations, from secure polling software to the management of complex virtual voting events.
          </p>
          <div className="cics-features-grid">
            <div className="cics-feature">
              <div className="cics-feature-icon">
                <img src={secureIcon} alt="Secured Platform Icon" />
              </div>
              <h3 className="cics-feature-title">Secured Platform</h3>
              <p className="cics-feature-desc">With our system, your data is secured</p>
            </div>
            <div className="cics-feature">
              <div className="cics-feature-icon">
                <img src={voteIcon} alt="Vote Online Icon" />
              </div>
              <h3 className="cics-feature-title">Vote Online</h3>
              <p className="cics-feature-desc">In just a few clicks, you can vote for your preferred candidates</p>
            </div>
            <div className="cics-feature">
              <div className="cics-feature-icon">
                <img src={resultsIcon} alt="Real Time Results Icon" />
              </div>
              <h3 className="cics-feature-title">Real Time Results</h3>
              <p className="cics-feature-desc">View real-time voting results and scores of each candidate</p>
            </div>
          </div>
        </div>
      </div>

      <CICSFooter />
    </>
  );
}

export default CICSHome;
