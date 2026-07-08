import { useEffect, useState, useRef } from 'react';

const sectionStyle = {
  position: 'relative',
  zIndex: 1,
  padding: '7rem 0',
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
            if (rect.top < vh * 0.1 && rect.bottom > 0) {
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

const cardStyle = {
  background: 'rgba(14,14,14,0.88)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 24px 90px rgba(0,0,0,0.6)',
  backdropFilter: 'blur(12px)',
  borderRadius: '14px',
  padding: '1.25rem 1.5rem',
  position: 'relative',
  overflow: 'visible',
};

function MySkills() {
  const [headerRef, headerPhase] = useScrollVisibility();
  const [cardsRef, cardsPhase] = useScrollVisibility();

  const categories = [
    {
      title: 'Development',
      desc: 'PHP, React, Node.js, SQL, and ASP.',
    },
    {
      title: 'Design',
      desc: 'Beautiful UIs combining aesthetics with functionality.',
    },
    {
      title: 'Quality Assurance',
      desc: 'Systematic testing and bug identification.',
    },
    {
      title: 'Technologies & Tools',
      tags: ['React.js', 'Node.js', 'PHP', 'ASP.NET', 'MySQL', 'Java', 'HTML/CSS', 'Laravel'],
    },
  ];

  const getAnimClass = (phase) =>
    phase === 'entering'
      ? 'scroll-fade entering'
      : phase === 'exiting'
      ? 'scroll-fade exiting'
      : 'scroll-fade enter-up';

  return (
    <section id="skills" style={sectionStyle}>
      <div style={{ width: 'min(1200px, calc(100% - 3rem))', margin: '0 auto' }}>

        {/* Section header */}
        <div ref={headerRef} className={getAnimClass(headerPhase)} style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem', color: '#f7f7f7' }}>
            My <span className="gold-text">Skills</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#b2b2b2', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            Technologies and programming languages I've learned throughout my education
          </p>
        </div>

        {/* Diagonal category cards - skewed line */}
        <div
          ref={cardsRef}
          className={`skills-cards ${getAnimClass(cardsPhase)}`}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch', // ensures all cards are same height
            flexWrap: 'nowrap',    // strictly one line
            gap: '1.5rem',
            marginBottom: '2rem',
            overflow: 'visible',   // prevent cropping of skewed edges
            padding: '20px 40px',  // horizontal padding to compress cards and fit skew
          }}
        >
          {categories.map(({ title, desc, tags }, i) => (
            <div
              key={title}
              style={{
                ...cardStyle,
                flex: '1 1 0',
                minHeight: '320px', // expand the height of the cards
                transform: 'skewX(-12deg)',
                transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms ease',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // center content vertically in the taller cards
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'skewX(-12deg) scale(1.05) translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(225, 6, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'skewX(-12deg)';
                e.currentTarget.style.boxShadow = '0 24px 90px rgba(0,0,0,0.6)';
              }}
            >
              {/* Un-skew the inner content so text remains readable */}
              <div style={{ transform: 'skewX(12deg)' }}>
                <h3 style={{ margin: '0 0 1rem', color: '#f7f7f7', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '1rem', fontWeight: 800 }}>
                  {title}
                </h3>
                {desc && (
                  <p style={{ margin: 0, color: '#b2b2b2', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
                )}
                {tags && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0.35rem 0.8rem',
                          borderRadius: '999px',
                          fontSize: '0.8rem',
                          color: '#fff',
                          background: 'rgba(225,6,0,0.08)',
                          border: '1px solid rgba(225,6,0,0.25)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default MySkills;
