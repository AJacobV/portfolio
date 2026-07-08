import { EnvelopeFill, Facebook, Github, TelephoneFill } from 'react-bootstrap-icons';

function ContactMe() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">
            Contact <span className="gold-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Let's connect! Feel free to reach out for opportunities, collaborations, or just a chat.
          </p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon"><EnvelopeFill /></div>
                <h3>Email</h3>
                <p><br />angelojacob.valeros.cics@ust.edu.ph</p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=angelojacob.valeros.cics@ust.edu.ph&su=Inquiry&body=Hello%2C%20we%27ve%20had%20a%20chance%20to%20explore%20your%20internship%20portfolio%20and%20would%20love%20to%20connect%20with%20you%20to%20talk%20more%20about%20your%20work%20and%20potential%20opportunities."
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send an Email
                </a>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><TelephoneFill /></div>
                <h3>Phone</h3>
                <p>(63) 995 498 4281</p>
                <a href="tel:+639954984281" className="contact-link">
                  Call Me
                </a>
              </div>
            </div>
            <div className="social-links">
              <h3>Find Me On</h3>
              <div className="social-icons">
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

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-logo">
              <span className="gold-text">Angelo Jacob A. Valeros</span>
            </p>
            <p className="footer-text">Web Developer & Designer</p>
            <div className="footer-links">
              <button onClick={() => scrollToSection('home')}>Home</button>
              <button onClick={() => scrollToSection('about')}>About</button>
              <button onClick={() => scrollToSection('skills')}>Skills</button>
              <button onClick={() => scrollToSection('projects')}>Projects</button>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </div>
            <p className="copyright">
              © 2025 Angelo Jacob A. Valeros. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ContactMe;