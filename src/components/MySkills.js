function MySkills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">
          My <span className="gold-text">Skills</span>
        </h2>
        <p className="section-subtitle">
          Technologies and programming languages I've learned throughout my education
        </p>

        <div className="skills-categories">
          <div className="category">
            <h3>Development</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              I can program using PHP, React, Node.js, SQL, and ASP.
            </p>
          </div>
          <div className="category">
            <h3>Design</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Creating beautiful user interfaces that combine aesthetics with functionality.
            </p>
          </div>
          <div className="category">
            <h3>Quality Assurance</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Ensuring software quality through systematic testing and bug identification.
            </p>
          </div>
        </div>

        <div className="skills-tags-container">
          <h3 className="skills-tags-title">Technologies & Tools</h3>
          <p>Languages I've learned:</p>
          <div className="skills-tags">
            <span className="skill-tag">React.js</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">PHP</span>
            <span className="skill-tag">ASP.NET</span>
            <span className="skill-tag">MySQL</span>
            <span className="skill-tag">Java</span>
            <span className="skill-tag">HTML/CSS</span>
            <span className="skill-tag">Laravel Framework</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MySkills;