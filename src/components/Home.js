import { useEffect, useState } from 'react';

const developerCodeString = `const programmer = {\n  name: "Angelo Valeros",\n  university: "UST",\n  role: "Programmer",\n  passion: "Adventure",\n  skills: ["React", "ASP.NET", "PHP"]\n};`;

function Home() {
  // 3D Spatial Drag State
  const [rotation, setRotation] = useState({ x: 8, y: -8 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Typewriter state
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    let index = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedCode(developerCodeString.slice(0, index + 1));
        index++;
        if (index >= developerCodeString.length) clearInterval(interval);
      }, 50); 
      return () => clearInterval(interval);
    }, 800); 
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      
      setRotation(prev => {
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
    e.preventDefault();
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
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
                Programmer &amp; Designer
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
                <a href="/Valeros_Angelo_Jacob-CV.pdf" download="Valeros_Angelo_Jacob-CV.pdf" className="btn btn-secondary">
                  Download CV
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
                <div className="code-content" style={{ padding: '1rem 1.25rem', pointerEvents: 'none', position: 'relative' }}>
                  {/* Invisible placeholder to define the container's final size */}
                  <pre style={{ visibility: 'hidden', fontSize: '0.85rem', margin: 0, userSelect: 'none' }}>
                    {developerCodeString}
                  </pre>
                  {/* Visible animated text */}
                  <pre style={{ position: 'absolute', top: '1rem', left: '1.25rem', fontSize: '0.85rem', margin: 0, userSelect: 'none' }}>
                    {displayedCode}
                    <span className="typing-caret"></span>
                  </pre>
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