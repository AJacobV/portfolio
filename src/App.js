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
  Recycle,
  TelephoneFill
} from 'react-bootstrap-icons';
import './App.css';

function ProjectCard({ project, index }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered && project.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, project.images.length]);

  const handleDotClick = (dotIndex) => {
    setCurrentImageIndex(dotIndex);
  };

  return (
    <div 
      className="project-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image">
        {project.images.length > 0 ? (
          <>
            <div className="carousel">
              {project.images.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={`/${img}`}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  className={`carousel-image ${imgIndex === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
            {project.images.length > 1 && (
              <div className="carousel-dots">
                {project.images.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    className={`dot ${dotIndex === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleDotClick(dotIndex)}
                    aria-label={`Go to image ${dotIndex + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="project-icon">{project.icon}</span>
        )}
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.courseProject && (
          <p className="course-note">📚 Course Project</p>
        )}
        <div className="project-tech">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          {!project.courseProject && project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-link" title="View Live">
              Live
            </a>
          )}
          {project.codeLink && (
            <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn-link" title="View Code">
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [closeTimer, setCloseTimer] = useState(null);
  const [currentProfilePic, setCurrentProfilePic] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const profilePics = ['/profpic1.jpeg', '/profpic2.jpg', '/profpic3.jpg'];

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }

    // Check if user has visited before
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // First visit - show loading animation
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        setLoadingProgress(progress);
        
        if (progress === 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('hasVisited', 'true');
          }, 500);
        }
      }, 200);
    } else {
      // Not first visit - skip loading
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Auto-scroll profile pictures
    const interval = setInterval(() => {
      setCurrentProfilePic((prev) => (prev + 1) % profilePics.length);
    }, 4000);
    return () => clearInterval(interval);
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
      icon: <ClipboardHeartFill />,
      images: ['LMDLogin.jpeg', 'LMDHome.jpeg', 'LMDContent.jpeg'],
      courseProject: true,
    },
    {
      title: 'WIZ',
      description: 'An online study platform where students can test their knowledge based on content they input.',
      tech: ['PHP', 'MySQL'],
      icon: <BookFill />,
      images: ['WizLogin.jpeg', 'WizHome.jpeg', 'WizContent.jpeg'],
      courseProject: true,
    },
    {
      title: 'CICSelect',
      description: 'An online voting platform for CICS students with secure voting system and real-time tallying.',
      tech: ['ASP.NET', 'MySQL'],
      icon: <FileEarmarkCheckFill />,
      images: ['CICSSelectHome.jpeg', 'CICSSelectContent.jpeg', 'CICSSelectAdmin.jpeg'],
      courseProject: true,
    },
    {
      title: 'UST rE-CYCLE',
      description: 'An online donation app for UST students with tracking system and ticketing system.',
      tech: ['Node.js', 'React', 'PostgreSQL'],
      icon: <Recycle />,
      images: ['USTreCycleLogin.jpeg', 'USTreCycleLoading.jpeg', 'USTreCycleHome.jpeg', 'USTreCycleAdmin.jpeg'],
      liveLink: 'https://ust-re-cycle.vercel.app',
    },
    {
      title: 'Falcon Eye',
      description: 'A comprehensive school safety and incident management platform with real-time tracking and AI chatbot.',
      tech: ['React', 'Node.js', 'Firebase', 'Socket.IO'],
      icon: <EyeFill />,
      images: ['falconEye_dashboard.png', 'falconEye_heatmappage.png', 'falconEye_incidentreportpage.png', 'falconEye_lostandfountpage.png'],
      liveLink: 'https://falconeye.school',
    },
    {
      title: 'Amore Luxe',
      description: 'A design page showcasing perfumes from Amore Luxe store founded by Alexandra Esmatao. Created using React.js, purely frontend.',
      tech: ['React'],
      icon: <BrushFill />,
      images: ['AmoreLux_title.jpg', 'AmoreLux_featuredfragances.jpg', 'AmoreLux_menscollection.jpg', 'AmoreLux_womenscollection.jpg'],
      liveLink: 'https://amoreluxe.vercel.app',
    },
    {
      title: 'JV TechHub',
      description: 'An inventory project created using Laravel Framework as a partial fulfillment of Web Application Development course.',
      tech: ['Laravel', 'PHP', 'PostgreSQL'],
      icon: <BoxSeamFill />,
      images: ['JVTechHub_loginpage.png', 'JVTechHub_dashboard.png'],
      liveLink: 'https://jvtechhub2.onrender.com',
    },
  ];

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      {/* Loading Animation */}
      {loading && (
        <div className={`loading-screen ${darkMode ? 'dark' : 'light'}`}>
          <div className="loading-content">
            <div className="logo-container">
              <div className="logo-circle">
                <span className="logo-initial">AV</span>
              </div>
              <div className="loading-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
            </div>
            <h2 className="loading-text">Angelo Valeros</h2>
            <div className="loading-bar-container">
              <div 
                className="loading-bar" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="loading-subtitle">Crafting Excellence</p>
          </div>
        </div>
      )}

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
              <a 
                href="/Resume.pdf" 
                download="Angelo_Valeros_Resume.pdf"
                className="btn btn-secondary"
              >
                Download Resume 📄
              </a>
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
                {profilePics.map((pic, index) => {
                  const prevIndex = (currentProfilePic - 1 + profilePics.length) % profilePics.length;
                  const isActive = index === currentProfilePic;
                  const isPrev = index === prevIndex;
                  const className = isActive ? 'active' : (isPrev ? 'back' : 'hidden');
                  
                  return (
                    <div key={index} className={`profile-image ${className}`}>
                      <img src={pic} alt="Angelo Valeros" />
                    </div>
                  );
                })}
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
                  <span className="highlight-number">3</span>
                  <span className="highlight-text">Years of Coding</span>
                </div>
                <div className="highlight">
                  <span className="highlight-number">6</span>
                  <span className="highlight-text">Projects Completed</span>
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
          
          <div className="skills-categories">
            <div className="category">
              <h3>Development</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>I can program using PHP, React, Node.js, SQL, and ASP.</p>
            </div>
            <div className="category">
              <h3>Design</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>Creating beautiful user interfaces that combine aesthetics with functionality.</p>
            </div>
            <div className="category">
              <h3>Quality Assurance</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>Ensuring software quality through systematic testing and bug identification.</p>
            </div>
          </div>

          <div className="skills-tags-container">
            <h3 className="skills-tags-title">Technologies & Tools</h3>
            <p>Languages I've learned:</p>
            <div className="skills-tags">
              <span className="skill-tag">React.js</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">PHP</span>
              <span className="skill-tag">ASP.NET</span>
              <span className="skill-tag">MySQL</span>
              <span className="skill-tag">Java</span>
              <span className="skill-tag">HTML/CSS</span>
              <span className="skill-tag">Laravel Framework</span>
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
              <ProjectCard key={project.title} project={project} index={index} />
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
                <p><br />angelojacob.valeros.cics@ust.edu.ph</p>
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=angelojacob.valeros.cics@ust.edu.ph&su=Inquiry&body=Hello%2C%20we%27ve%20had%20a%20chance%20to%20explore%20your%20internship%20portfolio%20and%20would%20love%20to%20connect%20with%20you%20to%20talk%20more%20about%20your%20work%20and%20potential%20opportunities."
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
