import { useEffect, useState, useRef } from 'react';
import { EnvelopeFill, Facebook, Github, TelephoneFill } from 'react-bootstrap-icons';

const sectionStyle = {
  position: 'relative',
  zIndex: 1,
  padding: '4rem 0 7rem',
};

const containerStyle = {
  width: 'min(1200px, calc(100% - 3rem))',
  margin: '0 auto',
};



const iconBoxStyle = {
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  background: 'rgba(225,6,0,0.14)',
  display: 'grid',
  placeItems: 'center',
  color: '#e10600',
  fontSize: '1.25rem',
  flexShrink: 0,
};

function useScrollVisibility() {
  const ref = useRef(null);
  const [phase, setPhase] = useState('hidden');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          setPhase('entering');
        }
      },
      { threshold: [0, 0.15, 0.5, 1], rootMargin: '0px' }
    );

    observer.observe(el);

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrollY = window.scrollY;
        const scrollingDown = scrollY > lastScrollY.current;
        lastScrollY.current = scrollY;

        setPhase((prev) => {
          if (scrollingDown) {
            if (rect.top < vh * -0.4) {
              return 'exiting';
            }
            if (rect.top >= 0 && rect.top < vh * 0.6) {
              return 'entering';
            }
          } else {
            if (rect.top >= 0 && rect.top < vh * 0.7) {
              return 'entering';
            }
            if (prev === 'exiting' && rect.top > vh * 0.3) {
              return 'entering';
            }
          }
          return prev;
        });

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [ref, phase];
}

function ContactMe() {
  const [headerRef, headerPhase] = useScrollVisibility();
  const [contentRef, contentPhase] = useScrollVisibility();
  const [footerRef, footerPhase] = useScrollVisibility();

  const getAnimClass = (phase) =>
    phase === 'entering'
      ? 'scroll-fade entering'
      : phase === 'exiting'
      ? 'scroll-fade exiting'
      : 'scroll-fade enter-up';

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Contact Section ── */}
      <section id="contact" style={sectionStyle}>
        <div style={containerStyle}>

          <div ref={headerRef} className={getAnimClass(headerPhase)}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem', color: '#f7f7f7' }}>
              Contact <span className="gold-text">Me</span>
            </h2>
            <p style={{ textAlign: 'center', color: '#b2b2b2', maxWidth: '720px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}>
              Let's connect! Feel free to reach out for opportunities, collaborations, or just a chat.
            </p>
          </div>

          {/* Two-column: contact info | social */}
          <div ref={contentRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch ${getAnimClass(contentPhase)}`}>

            {/* Left – Direct Contact */}
            <div 
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.95) 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(225,6,0,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 35px 70px rgba(225,6,0,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.6)'; }}
            >
              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ ...iconBoxStyle, width: '4rem', height: '4rem', fontSize: '1.5rem', background: 'rgba(225,6,0,0.1)' }}><EnvelopeFill /></div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: '#f7f7f7', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.95rem', fontWeight: 800 }}>Email</h3>
                  <p style={{ margin: '0.25rem 0 0.75rem', color: '#b2b2b2', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                    angelojacob.valeros.cics@ust.edu.ph
                  </p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=angelojacob.valeros.cics@ust.edu.ph&su=Inquiry"
                    className="contact-link"
                    style={{ alignSelf: 'flex-start', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Send an Email
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)' }} />

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ ...iconBoxStyle, width: '4rem', height: '4rem', fontSize: '1.5rem', background: 'rgba(225,6,0,0.1)' }}><TelephoneFill /></div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: '#f7f7f7', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.95rem', fontWeight: 800 }}>Phone</h3>
                  <p style={{ margin: '0.25rem 0 0.75rem', color: '#b2b2b2', fontSize: '0.9rem' }}>(63) 995 498 4281</p>
                  <a href="tel:+639954984281" className="contact-link" style={{ alignSelf: 'flex-start', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                    Call Me
                  </a>
                </div>
              </div>
            </div>

            {/* Right – Socials */}
            <div 
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.95) 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(225,6,0,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 35px 70px rgba(225,6,0,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.6)'; }}
            >
              <h3 style={{ margin: 0, color: '#f7f7f7', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.15rem', fontWeight: 900, textAlign: 'center' }}>
                Connect With Me
              </h3>
              <p style={{ margin: 0, color: '#b2b2b2', fontSize: '0.95rem', textAlign: 'center', maxWidth: '85%', lineHeight: 1.6 }}>
                Follow my journey or check out my latest open-source projects on these platforms.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                <a href="https://github.com/AJacobV" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub" style={{ width: '4.5rem', height: '4.5rem', fontSize: '2rem' }}>
                  <Github />
                </a>
                <a href="https://www.facebook.com/angelojacob.valeros" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook" style={{ width: '4.5rem', height: '4.5rem', fontSize: '2rem' }}>
                  <Facebook />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer ref={footerRef} className={getAnimClass(footerPhase)} style={{ position: 'relative', zIndex: 1, paddingBottom: '3rem' }}>
        <div style={containerStyle}>
          <div style={{
            background: 'linear-gradient(180deg, rgba(20,20,20,0.4) 0%, rgba(10,10,10,0.8) 100%)',
            borderTop: '1px solid rgba(225,6,0,0.3)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)'
          }}>
            {/* Top Logo / Name Area */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <span className="gold-text">Angelo Jacob</span>
              </h2>
              <p style={{ margin: 0, fontSize: '1rem', color: '#b2b2b2', letterSpacing: '0.05em' }}>Programmer &amp; Designer</p>
            </div>

            {/* Links Area */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem'
            }}>
              {['home', 'about', 'skills', 'projects', 'contact'].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollToSection(s)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#f7f7f7',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(225,6,0,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(225,6,0,0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            {/* Bottom Copyright Area */}
            <div style={{
              width: '100%',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>
                © {new Date().getFullYear()} Angelo Jacob A. Valeros. All Rights Reserved.
              </p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#555' }}>
                Designed and built with passion.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ContactMe;