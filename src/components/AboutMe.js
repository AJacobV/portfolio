import { useEffect, useState } from 'react';

function AboutMe() {
  const [currentProfilePic, setCurrentProfilePic] = useState(0);
  const profilePics = ['/profpic1.jpeg', '/profpic2.jpg', '/profpic3.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfilePic((prev) => (prev + 1) % profilePics.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">
          <span className="gold-text">About</span> Me
        </h2>
        <div className="about-content">
          <div className="about-image">
            <div className="image-frame">
              {profilePics.map((pic, index) => {
                const prevIndex = (currentProfilePic - 1 + profilePics.length) % profilePics.length;
                const isActive = index === currentProfilePic;
                const isPrev = index === prevIndex;
                const className = isActive ? 'active' : (isPrev ? 'back' : 'hidden');

                return (
                  <div key={index} className={`profile-image ${className}`}>
                    <img src={pic} alt="Angelo Valeros" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="about-text">
            <h3>Who I Am</h3>
            <p>
              I am a 4th year student at the <span className="gold-text">University of Santo Tomas</span> with a passion for technology and adventure.
              I started my programming journey with Java and have since expanded to PHP, React, Node.js, SQL, and ASP.
            </p>
            <p>
              I am a passionate web developer with a knack for creating clean, user-friendly, and responsive websites.
              When I'm not coding, you can find me exploring new hiking trails, dabbling in digital art, or building custom keyboards.
            </p>
            <div className="about-highlights">
              <div className="highlight">
                <span className="highlight-number">3</span>
                <span className="highlight-text">Years of Coding</span>
              </div>
              <div className="highlight">
                <span className="highlight-number">6</span>
                <span className="highlight-text">Projects Completed</span>
              </div>
            </div>
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;