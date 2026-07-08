import { useEffect, useState } from 'react';
import {
  BookFill,
  BoxSeamFill,
  BrushFill,
  ClipboardHeartFill,
  EyeFill,
  FileEarmarkCheckFill,
  Recycle,
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
      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <h3 style={{ margin: 0, color: '#f7f7f7', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.95rem', fontWeight: 800 }}>
          {project.title}
        </h3>
        <p style={{ margin: 0, color: '#b2b2b2', fontSize: '0.88rem', lineHeight: 1.65, flex: 1 }}>
          {project.description}
        </p>
        {project.courseProject && (
          <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>📚 Course Project</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
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
        {(!project.courseProject && project.liveLink) || project.codeLink ? (
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
            {!project.courseProject && project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-link">Live</a>
            )}
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
      description: 'A design page showcasing perfumes from Amore Luxe store. Created using React.js, purely frontend.',
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
    <section id="projects" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
      <div style={{ width: 'min(1200px, calc(100% - 3rem))', margin: '0 auto' }}>

        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem', color: '#f7f7f7' }}>
          My <span className="gold-text">Projects</span>
        </h2>
        <p style={{ textAlign: 'center', color: '#b2b2b2', maxWidth: '720px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}>
          A showcase of my work and the projects I've built throughout my journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default MyProjects;