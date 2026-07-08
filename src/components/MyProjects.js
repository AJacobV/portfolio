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
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, project.images.length]);

  const handleDotClick = (dotIndex) => {
    setCurrentImageIndex(dotIndex);
  };

  return (
    <div
      className="project-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image">
        {project.images.length > 0 ? (
          <>
            <div className="carousel">
              {project.images.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={`/${img}`}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  className={`carousel-image ${imgIndex === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
            {project.images.length > 1 && (
              <div className="carousel-dots">
                {project.images.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    className={`dot ${dotIndex === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleDotClick(dotIndex)}
                    aria-label={`Go to image ${dotIndex + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="project-icon">{project.icon}</span>
        )}
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.courseProject && <p className="course-note">📚 Course Project</p>}
        <div className="project-tech">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-links">
          {!project.courseProject && project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-link" title="View Live">
              Live
            </a>
          )}
          {project.codeLink && (
            <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="btn-link" title="View Code">
              Code
            </a>
          )}
        </div>
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
      description: 'A design page showcasing perfumes from Amore Luxe store founded by Alexandra Esmatao. Created using React.js, purely frontend.',
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
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">
          My <span className="gold-text">Projects</span>
        </h2>
        <p className="section-subtitle">
          A showcase of my work and the projects I've built throughout my journey
        </p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyProjects;