import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookFill,
  BoxSeamFill,
  BrushFill,
  ClipboardHeartFill,
  EyeFill,
  FileEarmarkCheckFill,
  Recycle,
  Truck,
} from 'react-bootstrap-icons';

const cardStyle = {
  background: 'rgba(14,14,14,0.88)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 24px 90px rgba(0,0,0,0.6)',
  backdropFilter: 'blur(12px)',
  borderRadius: '18px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
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
            if (rect.top >= 0 && rect.top < vh * 0.6) {
              return 'entering';
            }
          } else {
            if (rect.top > vh * 0.9) {
              return 'exiting';
            }
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

function ProjectCard({ project, index }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (isHovered && project.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 2000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isHovered, project.images.length]);

  return (
    <div
      style={{ ...cardStyle, animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel image area */}
      <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(145deg, rgba(225,6,0,0.12), rgba(255,255,255,0.03))' }}>
        {project.images.length > 0 ? (
          <>
            {project.images.map((img, imgIndex) => (
              <img
                key={imgIndex}
                src={`/${img}`}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                className={`carousel-image ${imgIndex === currentImageIndex ? 'active' : ''}`}
                style={project.imageStyle || {}}
              />
            ))}
            {project.images.length > 1 && (
              <div className="carousel-dots">
                {project.images.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    className={`dot ${dotIndex === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(dotIndex)}
                    aria-label={`Go to image ${dotIndex + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: '3.5rem', color: '#e10600' }}>
            {project.icon}
          </span>
        )}
      </div>

      {/* Text content */}
      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, position: 'relative' }}>
        {isHovered && (project.liveLink || project.internalLink) && (
          <div
            onClick={
              project.liveLink
                ? () => window.open(project.liveLink, '_blank', 'noopener noreferrer')
                : project.internalLink
                ? () => navigate(project.internalLink)
                : undefined
            }
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.55)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 'inherit',
              backdropFilter: 'blur(6px)',
              zIndex: 2,
              cursor: 'pointer',
            }}
          >
            {project.liveLabel || 'View Live Demo'}
          </div>
        )}
        <h3 style={{ margin: 0, color: '#f7f7f7', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.95rem', fontWeight: 800 }}>
          {project.title}
        </h3>
        <p style={{ margin: 0, color: '#b2b2b2', fontSize: '0.88rem', lineHeight: 1.65, flex: 1 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {project.tech.map((tech) => (
            <span
              key={tech}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                color: '#fff',
                background: 'rgba(225,6,0,0.08)',
                border: '1px solid rgba(225,6,0,0.25)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        {project.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.liveLink && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  color: '#f7f7f7',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {project.liveLabel || 'Live'}
              </span>
            )}
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  color: '#f7f7f7',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.codeLink ? (
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
            {project.codeLink && (
              <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn-link">Code</a>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MyProjects() {
  const [headerRef, headerPhase] = useScrollVisibility();
  const [cardsRef, cardsPhase] = useScrollVisibility();
  const [activeCategory, setActiveCategory] = useState('All');
  const [animationKey, setAnimationKey] = useState(0);

  const getAnimClass = (phase) =>
    phase === 'entering'
      ? 'scroll-fade entering'
      : phase === 'exiting'
      ? 'scroll-fade exiting'
      : 'scroll-fade enter-up';

  const projects = [
    {
      title: 'LMD Dental Hub',
      description: 'A secure and user-friendly admin side dental website created as a team effort for our Software Engineering Course.',
      tech: ['ASP.NET', 'Angular JS', 'C#', 'SQL'],
      icon: <ClipboardHeartFill />,
      images: ['LMDLogin.jpeg', 'LMDHome.jpeg', 'LMDContent.jpeg'],
      tags: ['Course Project'],
      category: 'Course Projects',
    },
    {
      title: 'WIZ',
      description: 'An online study platform where students can test their knowledge based on content they input.',
      tech: ['PHP', 'HTML & CSS'],
      icon: <BookFill />,
      images: ['WizLogin.jpeg', 'WizHome.jpeg', 'WizContent.jpeg'],
      liveLink: '/wiz',
      liveLabel: 'Demo',
      tags: ['Course Project'],
      category: 'Course Projects',
    },
    {
      title: 'CICSelect',
      description: 'An online voting platform for CICS students with secure voting system and real-time tallying.',
      tech: ['ASP.NET', 'Angular JS', 'C#', 'SQL'],
      icon: <FileEarmarkCheckFill />,
      images: ['CICSSelectHome.jpeg', 'CICSSelectContent.jpeg', 'CICSSelectAdmin.jpeg'],
      liveLink: '/cicselect',
      liveLabel: 'Demo',
      tags: ['Course Project'],
      category: 'Course Projects',
    },
    {
      title: 'UST rE-CYCLE',
      description: 'An online donation app for UST students with tracking system and ticketing system.',
      tech: ['Node.js', 'React', 'PostgreSQL'],
      icon: <Recycle />,
      images: ['USTreCycleLogin.jpeg', 'USTreCycleLoading.jpeg', 'USTreCycleHome.jpeg', 'USTreCycleAdmin.jpeg'],
      liveLink: 'https://ust-re-cycle.vercel.app',
      liveLabel: 'Demo',
      tags: ['Course Project'],
      category: 'Course Projects',
    },
    {
      title: 'Falcon Eye',
      description: 'A comprehensive school safety and incident management platform with real-time tracking and AI chatbot.',
      tech: ['React', 'Node.js', 'NoSQL', 'Firebase', 'BackBlaze'],
      icon: <EyeFill />,
      images: ['falconEye_dashboard.png', 'falconEye_heatmappage.png', 'falconEye_incidentreportpage.png', 'falconEye_lostandfountpage.png'],
      liveLink: 'https://falcon-eye.vercel.app',
      liveLabel: 'View Live',
      tags: ['LIVE'],
      category: 'Thesis Capstone',
    },
    {
      title: 'FIS - Fleet Intelligent System',
      description: 'FIS is a fleet tracking system that manages vehicles, monitor and track fuel logs, and give dispatch task to riders and drivers.',
      tech: ['React', 'Next.js', 'PostgreSQL', 'Supabase'],
      icon: <Truck />,
      images: ['fisadmin_dashboard.png', 'fisadmin_dispatch.png', 'fisadmin_login.png', 'fisadmin_fuel.png'],
      imageStyle: { transform: 'scale(1.25)' },
      tags: ['TypeScript'],
      category: 'Work Projects',
    },
    {
      title: 'Amore Luxe',
      description: 'A brochure site showcasing perfumes from Amore Luxe store. Created using React.js, purely frontend.',
      tech: ['React'],
      icon: <BrushFill />,
      images: ['AmoreLux_title.jpg', 'AmoreLux_featuredfragances.jpg', 'AmoreLux_menscollection.jpg', 'AmoreLux_womenscollection.jpg'],
      liveLink: 'https://amoreluxe.vercel.app',
      liveLabel: 'View Live',
      tags: [],
      category: 'Work Projects',
    },
    {
      title: 'JV TechHub',
      description: 'An inventory project created using Laravel Framework as a partial fulfillment of Web Application Development course.',
      tech: ['Laravel', 'MySQL'],
      icon: <BoxSeamFill />,
      images: ['JVTechHub_loginpage.png', 'JVTechHub_dashboard.png'],
      internalLink: '/jvtech',
      liveLabel: 'View demo of course project',
      tags: ['Demo', 'Course Project'],
      category: 'Course Projects',
    },
  ];
  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      setAnimationKey(prev => prev + 1);
    }
  };

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
      <div style={{ width: 'min(1200px, calc(100% - 3rem))', margin: '0 auto' }}>

        <div ref={headerRef} className={getAnimClass(headerPhase)}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem', color: '#f7f7f7' }}>
            My <span className="gold-text">Projects</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#b2b2b2', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            A showcase of my work and the projects I've built throughout my journey
          </p>

          <div className="project-filters">
            {['All', 'Course Projects', 'Work Projects'].map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div ref={cardsRef} className={getAnimClass(cardsPhase)}>
          <div
            key={animationKey}
            className="projects-grid-container fade-enter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#b2b2b2' }}>
                <p>No projects available in this category yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default MyProjects;