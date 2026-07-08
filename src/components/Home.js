import { useEffect, useRef, useState } from 'react';

function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setNavOpen(false);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleNavMouseEnter = () => {
    setNavOpen(true);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleNavMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setNavOpen(false);
    }, 3000);
  };

  return (
    <>
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
        </div>
      </nav>

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
                <pre>{`const developer = {
  name: "Angelo Valeros",
  university: "UST",
  role: "Web Developer",
  passion: "Adventure",
  skills: ["React", "ASP.NET", "PHP"]
};`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;