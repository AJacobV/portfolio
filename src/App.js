import { useEffect, useState } from 'react';
import {
  BookFill,
  BoxSeamFill,
  BrushFill,
  CircleFill,
  ClipboardHeartFill,
  CupHotFill,
  Database,
  EnvelopeFill,
  EyeFill,
  Facebook,
  FileEarmarkCheckFill,
  Github,
  PersonCircle,
  Recycle,
  TelephoneFill
} from 'react-bootstrap-icons';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [closeTimer, setCloseTimer] = useState(null);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleNavMouseEnter = () => {
    setNavOpen(true);
    // Clear any existing timer
    if (closeTimer) {
      clearTimeout(closeTimer);
      setCloseTimer(null);
    }
  };

  const handleNavMouseLeave = () => {
    // Set a 3-second timer to close the nav
    const timer = setTimeout(() => {
      setNavOpen(false);
    }, 3000);
    setCloseTimer(timer);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setNavOpen(false);
    // Clear timer when clicking a link
    if (closeTimer) {
      clearTimeout(closeTimer);
      setCloseTimer(null);
    }
  };

  const skills = [
    { name: 'React', level: 90, icon: <CircleFill /> },
    { name: 'Node.js', level: 85, icon: <CircleFill /> },
    { name: 'PHP', level: 85, icon: <CircleFill /> },
    { name: 'ASP.NET', level: 80, icon: <CircleFill /> },
    { name: 'SQL', level: 85, icon: <Database /> },
    { name: 'Java', level: 75, icon: <CupHotFill /> },
    { name: 'HTML/CSS', level: 95, icon: <BrushFill /> },
    { name: 'Git', level: 80, icon: <BoxSeamFill /> },
  ];

  const projects = [
    {
      title: 'LMD Dental Hub',
      description: 'A secure and user-friendly admin side dental website created as a team effort for our Software Engineering Course.',
      tech: ['ASP.NET', 'MySQL'],
      image: <ClipboardHeartFill />,
    },
    {
      title: 'WIZ',
      description: 'An online study platform where students can test their knowledge based on content they input.',
      tech: ['PHP', 'MySQL'],
      image: <BookFill />,
    },
    {
      title: 'CICSelect',
      description: 'An online voting platform for CICS students with secure voting system and real-time tallying.',
      tech: ['ASP.NET', 'MySQL'],
      image: <FileEarmarkCheckFill />,
    },
    {
      title: 'UST rE-CYCLE',
      description: 'An online donation app for UST students with tracking system and secure payment integration.',
      tech: ['Node.js', 'React', 'PostgreSQL'],
      image: <Recycle />,
    },
    {
      title: 'Falcon Eye',
      description: 'A comprehensive school safety and incident management platform with real-time tracking and AI chatbot.',
      tech: ['React', 'Node.js', 'Firebase', 'Socket.IO'],
      image: <EyeFill />,
    },
  ];

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      {/* Navigation */}
      <nav 
        className={`navbar ${navOpen ? 'open' : ''}`}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        <div className="nav-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('home')}>Home</button>
          <button onClick={() => scrollToSection('about')}>About</button>
          <button onClick={() => scrollToSection('skills')}>Skills</button>
          <button onClick={() => scrollToSection('projects')}>Projects</button>
          <button onClick={() => scrollToSection('contact')}>Contact</button>
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="greeting fade-in">Hello, I'm</p>
            <h1 className="name fade-in-delay">
              <span className="gold-text">Angelo Jacob A. Valeros</span>
            </h1>
            <h2 className="title fade-in-delay-2">Web Developer & Designer</h2>
            <p className="subtitle fade-in-delay-3">
              Crafting beautiful and functional web experiences.
              <br />
              <span className="major">IT Student at UST</span>
            </p>
            <div className="hero-buttons fade-in-delay-4">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="hero-visual fade-in-delay-2">
            <div className="code-window">
              <div className="window-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="code-content">
                <pre>
{`const developer = {
  name: "Angelo Valeros",
  university: "UST",
  role: "Web Developer",
  passion: "Adventure",
  skills: ["React", "ASP.NET", "PHP"]
};`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">
            <span className="gold-text">About</span> Me
          </h2>
          <div className="about-content">
            <div className="about-image">
              <div className="image-frame">
                <div className="placeholder-image">
                  <PersonCircle />
                </div>
                <div className="frame-decoration"></div>
              </div>
            </div>
            <div className="about-text">
              <h3>Who I Am</h3>
              <p>
                I am a 4th year student at the <span className="gold-text">University of Santo Tomas</span> with a passion for technology and adventure. 
                I started my programming journey with Java and have since expanded to PHP, React, Node.js, SQL, and ASP.
              </p>
              <p>
                I am a passionate web developer with a knack for creating clean, user-friendly, and responsive websites. 
                When I'm not coding, you can find me exploring new hiking trails, dabbling in digital art, or building custom keyboards.
              </p>
              <div className="about-highlights">
                <div className="highlight">
                  <span className="highlight-number">3+</span>
                  <span className="highlight-text">Years of Coding</span>
                </div>
                <div className="highlight">
                  <span className="highlight-number">15+</span>
                  <span className="highlight-text">Projects Completed</span>
                </div>
                <div className="highlight">
                  <span className="highlight-number">10+</span>
                  <span className="highlight-text">Technologies</span>
                </div>
              </div>
              <a href="#contact" className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}>
                Let's Connect
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">
            My <span className="gold-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and programming languages I've learned throughout my education
          </p>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skill-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  >
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="skills-categories">
            <div className="category">
              <h3>Development</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>I can program using PHP, React, Node.js, SQL, and ASP.</p>
              <div className="tags">
                <span>PHP</span>
                <span>React</span>
                <span>Node.js</span>
                <span>SQL</span>
                <span>ASP.NET</span>
              </div>
            </div>
            <div className="category">
              <h3>Design</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>Creating beautiful user interfaces that combine aesthetics with functionality.</p>
              <div className="tags">
                <span>UI/UX</span>
                <span>Figma</span>
                <span>Responsive Design</span>
              </div>
            </div>
            <div className="category">
              <h3>Quality Assurance</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>Ensuring software quality through systematic testing and bug identification.</p>
              <div className="tags">
                <span>Testing</span>
                <span>Debugging</span>
                <span>Process Improvement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">
            My <span className="gold-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my work and the projects I've built throughout my journey
          </p>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.title} 
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image">
                  <span>{project.image}</span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <button className="btn-icon" title="View Live">
                      🔗
                    </button>
                    <button className="btn-icon" title="View Code">
                      💻
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">
            Contact <span className="gold-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Let's connect! Feel free to reach out for opportunities, collaborations, or just a chat.
          </p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon"><EnvelopeFill /></div>
                <h3>Email</h3>
                <p>angelojacob.valeros.cics@ust.edu.ph</p>
                <a href="mailto:angelojacob.valeros.cics@ust.edu.ph" className="contact-link">
                  Send an Email
                </a>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><TelephoneFill /></div>
                <h3>Phone</h3>
                <p>(63) 995 498 4281</p>
                <a href="tel:+639954984281" className="contact-link">
                  Call Me
                </a>
              </div>
            </div>
            <div className="social-links">
              <h3>Find Me On</h3>
              <div className="social-icons">
                <a href="https://github.com/AJacobV" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
                  <Github />
                </a>
                <a href="https://www.facebook.com/angelojacob.valeros" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook">
                  <Facebook />
                </a>
              </div>
            </div>
            <form className="contact-form">
              <h3>Send Me a Message</h3>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message ✉️
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-logo">
              <span className="gold-text">Angelo Jacob A. Valeros</span>
            </p>
            <p className="footer-text">
              Web Developer & Designer
            </p>
            <div className="footer-links">
              <button onClick={() => scrollToSection('home')}>Home</button>
              <button onClick={() => scrollToSection('about')}>About</button>
              <button onClick={() => scrollToSection('skills')}>Skills</button>
              <button onClick={() => scrollToSection('projects')}>Projects</button>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </div>
            <p className="copyright">
              © 2025 Angelo Jacob A. Valeros. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
