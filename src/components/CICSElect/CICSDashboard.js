import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { House, ListCheck, FileText, Gear, BoxArrowRight, Globe, ShieldLock, InfoCircle, FileEarmarkText, Envelope, ChevronRight } from 'react-bootstrap-icons';
import './CICSDashboard.css';

function CICSDashboard() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Open by default for desktop layout
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    navigate('/cicselect');
  };

  return (
    <div className="cics-dash-wrapper">
      {/* Top Navbar */}
      <nav className="cics-dash-navbar">
        <div className="cics-dash-nav-wrapper">
          <div className="cics-dash-menu-icon">
            <input 
              id="cics-burger-checkbox" 
              type="checkbox" 
              checked={isMenuOpen} 
              onChange={() => setIsMenuOpen(!isMenuOpen)} 
            />
            <label className="cics-burger" htmlFor="cics-burger-checkbox">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <div className="cics-dash-logo">CICSelect</div>
        </div>
      </nav>

      {/* Sidebar / Popup Menu */}
      <div className={`cics-popup-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="cics-sidebar-header">
          <h3>Jacob Valeros</h3>
        </div>
        <ul>
          <li>
            <div className="cics-menu-item">
              <button 
                className={`cics-navigation-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => { setActiveTab('dashboard'); }}
              >
                <House size={18} className="cics-nav-icon" /> Dashboard
              </button>
            </div>
          </li>
          <li>
            <div className="cics-menu-item">
              <button 
                className={`cics-navigation-btn ${activeTab === 'vote' ? 'active' : ''}`}
                onClick={() => { setActiveTab('vote'); }}
              >
                <ListCheck size={18} className="cics-nav-icon" /> Vote
              </button>
            </div>
          </li>
          <li>
            <div className="cics-menu-item">
              <button 
                className={`cics-navigation-btn ${activeTab === 'votersGuidelines' ? 'active' : ''}`}
                onClick={() => { setActiveTab('votersGuidelines'); }}
              >
                <FileText size={18} className="cics-nav-icon" /> Voters Guideline
              </button>
            </div>
          </li>
          <li>
            <div className="cics-menu-item">
              <button 
                className={`cics-navigation-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => { setActiveTab('settings'); }}
              >
                <Gear size={18} className="cics-nav-icon" /> Settings
              </button>
            </div>
          </li>
        </ul>
        
        <div className="cics-menu-item cics-logout-wrapper">
          <button className="cics-navigation-btn cics-logout-btn" onClick={handleLogout}>
            <BoxArrowRight size={18} className="cics-nav-icon" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`cics-main-content ${isMenuOpen ? 'menu-open' : ''}`}>
        
        <div className="cics-left-content">
          
          {activeTab === 'dashboard' && (
            <>
              <div className="cics-tab-content cics-dashboard-card">
                <h1>Dashboard</h1>
                <p>Welcome to CICS VOTE</p>
              </div>

              <div className="cics-tab-content cics-voting-process-card">
                <h2>Voting Process</h2>
                <p>Follow these steps to participate in the voting process:</p>
                <ul className="cics-process-list">
                  <li>
                    <span className="cics-step-number">1</span>
                    Go to the votes tab by clicking the upper right icon menu.
                  </li>
                  <li>
                    <span className="cics-step-number">2</span>
                    Wait for the administrator to start the voting session.
                  </li>
                  <li>
                    <span className="cics-step-number">3</span>
                    Vote for your desired candidate by clicking the vote button. Vote wisely!
                  </li>
                  <li>
                    <span className="cics-step-number">4</span>
                    All candidates that you have voted for will be highlighted. Once finished, submit your votes by clicking the submit button at the bottom of the page.
                  </li>
                  <li>
                    <span className="cics-step-number">5</span>
                    Wait for the results to load.
                  </li>
                </ul>
              </div>

              <div className="cics-tab-content cics-results-card">
                <h2>Results</h2>
                <p>Results are not yet finalized...</p>
                <div className="cics-status-circle"></div>
              </div>
            </>
          )}

          {activeTab === 'vote' && (
            <div className="cics-tab-content cics-vote-tab">
              <h1 className="cics-main-title">You May Now Cast Your Votes!</h1>

              <section className="cics-vote-section">
                <h2 className="cics-section-title">President</h2>
                <p className="cics-candidate-count">Number of Candidates: 2</p>
                <div className="cics-card-container">
                  <div className="cics-candidate-card">
                    <h3 className="cics-card-name">Alice Johnson</h3>
                    <p className="cics-card-role">President</p>
                    <button className="cics-vote-btn">Vote</button>
                  </div>
                  <div className="cics-candidate-card">
                    <h3 className="cics-card-name">Bob Smith</h3>
                    <p className="cics-card-role">President</p>
                    <button className="cics-vote-btn">Vote</button>
                  </div>
                </div>
              </section>

              <section className="cics-vote-section">
                <h2 className="cics-section-title">Vice President</h2>
                <p className="cics-candidate-count">Number of Candidates: 1</p>
                <div className="cics-card-container">
                  <div className="cics-candidate-card">
                    <h3 className="cics-card-name">Charlie Davis</h3>
                    <p className="cics-card-role">Vice President</p>
                    <button className="cics-vote-btn">Vote</button>
                  </div>
                </div>
              </section>

              <div className="cics-submit-container">
                <button className="cics-submit-votes-btn">Submit Votes</button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="cics-tab-content cics-settings-tab">
              <div className="cics-settings-container">
                <div className="cics-settings-column">
                  <h2>Account</h2>
                  <ul className="cics-settings-list">
                    <li>
                      <button className="cics-settings-link">
                        <span className="cics-icon-circle"><Globe size={18} /></span> MyUSTe Portal <span className="cics-right-arrow"><ChevronRight size={16} /></span>
                      </button>
                    </li>
                    <li>
                      <button className="cics-settings-link">
                        <span className="cics-icon-circle"><ShieldLock size={18} /></span> Change Password <span className="cics-right-arrow"><ChevronRight size={16} /></span>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="cics-settings-column">
                  <h2>Links</h2>
                  <ul className="cics-settings-list">
                    <li>
                      <button className="cics-settings-link">
                        <span className="cics-icon-circle"><InfoCircle size={18} /></span> About Us <span className="cics-right-arrow"><ChevronRight size={16} /></span>
                      </button>
                    </li>
                    <li>
                      <button className="cics-settings-link">
                        <span className="cics-icon-circle"><FileEarmarkText size={18} /></span> Terms of Service <span className="cics-right-arrow"><ChevronRight size={16} /></span>
                      </button>
                    </li>
                    <li>
                      <button className="cics-settings-link">
                        <span className="cics-icon-circle"><ShieldLock size={18} /></span> Privacy Policy <span className="cics-right-arrow"><ChevronRight size={16} /></span>
                      </button>
                    </li>
                    <li>
                      <button className="cics-settings-link">
                        <span className="cics-icon-circle"><Envelope size={18} /></span> Contact Us <span className="cics-right-arrow"><ChevronRight size={16} /></span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'votersGuidelines' && (
            <div className="cics-tab-content cics-voters-guidelines-card-real">
              <div className="cics-guideline-container">
                <div className="cics-background-image-container">
                  <div className="cics-guideline-image-placeholder"></div>
                </div>
                <h1>VOTERS GUIDELINE</h1>
                <ul className="cics-guideline-list">
                  <li><span className="cics-step-number">1</span> Before voting, take the time to research the candidates and issues on the ballot.</li>
                  <li><span className="cics-step-number">2</span> Make sure you are eligible to vote in the election.</li>
                  <li><span className="cics-step-number">3</span> Make sure you understand the voting procedure for the online voting system.</li>
                  <li><span className="cics-step-number">4</span> Read the instructions carefully before voting.</li>
                  <li><span className="cics-step-number">5</span> Make sure you understand the candidates and their positions on the issues.</li>
                  <li><span className="cics-step-number">6</span> Choose your candidate carefully.</li>
                  <li><span className="cics-step-number">7</span> If you are unsure of how to vote, ask a friend or relative for help.</li>
                  <li><span className="cics-step-number">8</span> Double-check your choices before submitting your votes.</li>
                  <li><span className="cics-step-number">9</span> Make sure you have a secure connection when voting.</li>
                  <li><span className="cics-step-number">10</span> Keep your vote private. Do not share your vote with anyone.</li>
                  <li><span className="cics-step-number">11</span> Make sure you understand the deadlines for the election.</li>
                  <li><span className="cics-step-number">12</span> Follow the voting guidelines set by your local election office.</li>
                  <li><span className="cics-step-number">13</span> Report any problems or concerns you have about the voting process.</li>
                  <li><span className="cics-step-number">14</span> Thank you for participating!</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {activeTab === 'dashboard' && (
          <div className="cics-right-column">
            <div className="cics-tab-content cics-calendar-card">
              <h2>Calendar</h2>
              <div className="cics-calendar-wrapper">
                <iframe 
                  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FManila&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0" 
                  style={{ border: "solid 1px #777" }} 
                  width="100%" 
                  height="400" 
                  frameBorder="0" 
                  scrolling="no" 
                  title="CICSelect Calendar">
                </iframe>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default CICSDashboard;
