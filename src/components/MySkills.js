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

const containerCardStyle = {
  background: 'rgba(14,14,14,0.88)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 24px 90px rgba(0,0,0,0.6)',
  backdropFilter: 'blur(12px)',
  borderRadius: '18px',
  padding: '4rem',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
};

function MySkills() {
  const [headerRef, headerPhase] = useScrollVisibility();
  const [contentRef, contentPhase] = useScrollVisibility();

  /*
  const categories = [
    {
      title: 'Development',
      desc: 'Web application, brochure site, and mobile application',
    },
    {
      title: 'Design',
      desc: 'Beautiful UIs combining aesthetics with functionality.',
    },
    {
      title: 'Quality Assurance',
      desc: 'Systematic testing and bug identification.',
    }
  ];
  */

  const tagSections = [
    { name: 'Front-end', tags: ['React', 'Angular.js', 'Tailwind', 'Typescript', 'Javascript', 'HTML & CSS'] },
    { name: 'Back-end', tags: ['PHP', 'Node.js', 'Next.js', 'SQL', 'PostgreSQL', 'NoSQL'] },
    { name: 'Frameworks', tags: ['ASP.NET', 'Laravel'] },
    { name: 'BaaS', tags: ['Firebase', 'Supabase', 'Blackblaze'] },
    { name: 'PaaS', tags: ['Vercel', 'Render'] },
    { name: 'Mobile', tags: ['Flutter'] }
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

        {/* Big Single Container */}
        <div ref={contentRef} className={getAnimClass(contentPhase)} style={containerCardStyle}>
          
          <h3 style={{ textAlign: 'center', margin: '0 0 4rem', fontSize: '1.8rem', color: '#f7f7f7', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Tech & Tools
          </h3>

          <div style={{ position: 'relative', padding: '1rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
              {tagSections.map((sec, i) => (
                <div key={sec.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 150px', maxWidth: '220px', position: 'relative' }}>
                    
                    <h4 style={{ margin: '0', color: '#f7f7f7', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'center', position: 'relative' }}>
                      {sec.name}
                      {/* The glowing dot under the category */}
                      <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e10600', boxShadow: '0 0 10px #e10600', zIndex: 2 }}></div>
                    </h4>
                    
                    {/* The vertical branch line dropping from category through the tags */}
                    <div style={{ position: 'absolute', top: '1.2rem', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', width: '2px', background: 'linear-gradient(to bottom, rgba(225,6,0,0.6) 0%, rgba(225,6,0,0.05) 100%)', zIndex: 1 }}></div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%', marginTop: '2.5rem', zIndex: 2 }}>
                      {sec.tags.map((tag, tagIdx) => {
                        const isLeft = tagIdx % 2 === 0;
                        return (
                          <div key={tag} style={{ display: 'flex', width: '100%', position: 'relative' }}>
                            {/* Horizontal connector line */}
                            <div style={{
                              position: 'absolute',
                              top: '50%',
                              [isLeft ? 'right' : 'left']: '50%',
                              width: '1.5rem',
                              height: '2px',
                              backgroundColor: 'rgba(225,6,0,0.4)',
                              transform: 'translateY(-50%)'
                            }}></div>
                            
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', paddingRight: '1.5rem' }}>
                              {isLeft && (
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '0.35rem 0.9rem',
                                    borderRadius: '999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    color: '#fff',
                                    background: '#151515',
                                    border: '1px solid rgba(225,6,0,0.3)',
                                    whiteSpace: 'nowrap',
                                    transition: 'transform 200ms ease, box-shadow 200ms ease',
                                    cursor: 'default',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(225, 6, 0, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                  }}
                                >
                                  {tag}
                                </span>
                              )}
                            </div>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '1.5rem' }}>
                              {!isLeft && (
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '0.35rem 0.9rem',
                                    borderRadius: '999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    color: '#fff',
                                    background: '#151515',
                                    border: '1px solid rgba(225,6,0,0.3)',
                                    whiteSpace: 'nowrap',
                                    transition: 'transform 200ms ease, box-shadow 200ms ease',
                                    cursor: 'default',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(225, 6, 0, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                  }}
                                >
                                  {tag}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>


        </div>

      </div>
    </section>
  );
}

export default MySkills;
