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

const cardStyle = {
  background: 'rgba(14,14,14,0.88)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 24px 90px rgba(0,0,0,0.6)',
  backdropFilter: 'blur(12px)',
  borderRadius: '18px',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  position: 'relative',
  overflow: 'hidden',
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
          <div ref={contentRef} className={`grid grid-cols-1 lg:grid-cols-[1fr_0.55fr] gap-6 items-start ${getAnimClass(contentPhase)}`}>

            {/* Left – contact cards stacked */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Email */}
              <div style={cardStyle}>
                <div style={iconBoxStyle}><EnvelopeFill /></div>
                <h3 style={{ margin: 0, color: '#f7f7f7', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.95rem', fontWeight: 800 }}>Email</h3>
                <p style={{ margin: 0, color: '#b2b2b2', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                  angelojacob.valeros.cics@ust.edu.ph
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=angelojacob.valeros.cics@ust.edu.ph&su=Inquiry&body=Hello%2C%20we%27ve%20had%20a%20chance%20to%20explore%20your%20internship%20portfolio%20and%20would%20love%20to%20connect%20with%20you%20to%20talk%20more%20about%20your%20work%20and%20potential%20opportunities."
                  className="contact-link"
                  style={{ alignSelf: 'flex-start' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send an Email
                </a>
              </div>

              {/* Phone */}
              <div style={cardStyle}>
                <div style={iconBoxStyle}><TelephoneFill /></div>
                <h3 style={{ margin: 0, color: '#f7f7f7', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.95rem', fontWeight: 800 }}>Phone</h3>
                <p style={{ margin: 0, color: '#b2b2b2', fontSize: '0.9rem' }}>(63) 995 498 4281</p>
                <a href="tel:+639954984281" className="contact-link" style={{ alignSelf: 'flex-start' }}>
                  Call Me
                </a>
              </div>
            </div>

            {/* Right – socials card */}
            <div style={cardStyle}>
              <h3 style={{ margin: 0, color: '#f7f7f7', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.95rem', fontWeight: 800 }}>
                Find Me On
              </h3>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
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

      {/* ── Footer ── */}
      <footer ref={footerRef} className={getAnimClass(footerPhase)} style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', fontWeight: 800 }}>
              <span className="gold-text">Angelo Jacob A. Valeros</span>
            </p>
            <p style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', color: '#b2b2b2' }}>Web Developer &amp; Designer</p>
            <div className="footer-links" style={{ marginBottom: '1.5rem' }}>
              {['home', 'about', 'skills', 'projects', 'contact'].map((s) => (
                <button key={s} onClick={() => scrollToSection(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#b2b2b2' }}>
              © 2025 Angelo Jacob A. Valeros. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ContactMe;