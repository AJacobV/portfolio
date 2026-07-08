import { useEffect, useRef, useState } from 'react';

function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const closeTimerRef = useRef(null);

  // 3D Spatial Drag State
  const [rotation, setRotation] = useState({ x: 8, y: -8 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      
      setRotation(prev => {
        // Limit the rotation so it doesn't flip completely, e.g., between -45 and 45 degrees
        let newX = prev.x - dy * 0.5;
        let newY = prev.y + dx * 0.5;
        newX = Math.max(-45, Math.min(45, newX));
        newY = Math.max(-45, Math.min(45, newY));
        return { x: newX, y: newY };
      });
      setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, lastMousePos]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
    e.preventDefault(); // prevent text selection while dragging
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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
    closeTimerRef.current = setTimeout(() => setNavOpen(false), 3000);
  };

  return (
    <>
      {/* ── Navigation ── */}
      <nav
        className={`navbar ${navOpen ? 'open' : ''}`}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        <div className="nav-dots">
          <span /><span /><span />
        </div>
        <div className="nav-links">
          {['home', 'about', 'skills', 'projects', 'contact'].map((s) => (
            <button key={s} onClick={() => scrollToSection(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        id="home"
        className="relative flex flex-col justify-center min-h-screen overflow-hidden"
        style={{ padding: '7rem 0' }}
      >
        <div style={{ width: 'min(1200px, calc(100% - 3rem))', margin: '0 auto' }}>
          <div className="hero-layout">

            {/* Left – text */}
            <div className="hero-text" style={{ position: 'relative' }}>
              <p className="greeting fade-in" style={{ margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#b2b2b2', fontSize: '0.9rem' }}>
                Hello, I'm
              </p>
              <h1 className="name fade-in-delay" style={{ margin: 0, fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 0.96, textTransform: 'uppercase' }}>
                <span className="gold-text">Angelo Jacob A. Valeros</span>
              </h1>
              <h2 className="fade-in-delay-2" style={{ margin: '1rem 0 0', fontSize: 'clamp(1.35rem, 3vw, 2.25rem)', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#e10600', fontWeight: 700 }}>
                Web Developer &amp; Designer
              </h2>
              <p className="fade-in-delay-3" style={{ margin: '1rem 0 0', maxWidth: '38rem', color: '#b2b2b2', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Crafting beautiful and functional web experiences.
                <br />
                <span style={{ display: 'inline-block', marginTop: '0.75rem', color: '#f7f7f7', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  IT Student at UST
                </span>
              </p>
              <div className="fade-in-delay-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                  View My Work
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                  Contact Me
                </button>
                <a href="/Resume.pdf" download="Angelo_Valeros_Resume.pdf" className="btn btn-secondary">
                  Download Resume 📄
                </a>
              </div>
            </div>

            {/* Right – code window */}
            <div className="fade-in-delay-2 hero-window" style={{ perspective: '1200px' }}>
              <div
                className="code-window"
                style={{
                  maxWidth: '420px',
                  width: '100%',
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
                onMouseDown={handleMouseDown}
              >
                <div className="window-header">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="code-content" style={{ padding: '1rem 1.25rem', pointerEvents: 'none' }}>
                  <pre style={{ fontSize: '0.85rem', margin: 0, userSelect: 'none' }}>{`const developer = {\n  name: "Angelo Valeros",\n  university: "UST",\n  role: "Web Developer",\n  passion: "Adventure",\n  skills: ["React", "ASP.NET", "PHP"]\n};`}</pre>
                </div>
              </div>
            </div>

          </div>
        </div>


      </section>
    </>
  );
}

export default Home;