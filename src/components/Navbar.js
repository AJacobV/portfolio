import { useState, useRef, useEffect } from 'react';
import { List } from 'react-bootstrap-icons';

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleNavMouseEnter = () => {
    if (window.innerWidth <= 768) return;
    setNavOpen(true);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleNavMouseLeave = () => {
    if (window.innerWidth <= 768) return;
    closeTimerRef.current = setTimeout(() => setNavOpen(false), 250); // fast close
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav
      className={`navbar ${navOpen ? 'open' : ''}`}
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
    >
      {/* Desktop Dots */}
      <div className="nav-dots desktop-only" onClick={toggleNav}>
        <span /><span /><span />
      </div>
      
      {/* Mobile Burger */}
      <div className="nav-burger mobile-only" onClick={toggleNav}>
        <List size={32} color="#e10600" />
      </div>

      <div className="nav-links">
        {['home', 'about', 'skills', 'projects', 'contact'].map((s) => (
          <button key={s} onClick={() => scrollToSection(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
