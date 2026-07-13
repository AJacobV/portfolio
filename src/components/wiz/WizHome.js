import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import WizNavbar from './WizNavbar';
import WizFooter from './WizFooter';
import heroImg from '../../assets/wiz/hero.png';
import mchoiceImg from '../../assets/wiz/Mchoice.gif';
import idenImg from '../../assets/wiz/Iden.png';

function WizHome() {
  const contentRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (el.dataset.anim === 'top') {
              el.style.animation = 'slideInFromTop 1s ease forwards';
            } else if (el.dataset.anim === 'right') {
              el.style.animation = 'slideInFromRight 1s ease forwards';
            } else if (el.dataset.anim === 'left') {
              el.style.animation = 'slideInFromLeft 1s ease forwards';
            } else if (el.dataset.anim === 'bottom') {
              el.style.animation = 'slideInFromBottom 1s ease forwards';
            }
            el.style.opacity = '1';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  return (
    <>
      <WizNavbar isLoggedIn={false} />
      <div className="qt-1-container" style={{ marginTop: '150px' }}>
        <div className="qt-1-content" style={{ opacity: 1, animation: 'slideInFromLeft 1s ease forwards' }}>
          <div className="qt-1-content1">Quiz Maker</div>
          <div className="qt-1-content2">
            Empower Curiosity, <br /> Craft Quizzes!
          </div>
          <div className="qt-1-content3">
            Fuel your passion for knowledge with our easy-to-use quiz creation platform. Craft quizzes to challenge, entertain, and inspire others. Unlock interactive education!
          </div>
          <div className="cta-button">
            <Link to="/wiz/login">
              <button className="cta-btn">Get Started</button>
            </Link>
          </div>
        </div>
        <div className="qt-1-content-img" style={{ opacity: 1 }}>
          <img src={heroImg} alt="Quiz Maker Platform" style={{ width: '400px', maxWidth: '100%', height: 'auto' }} />
        </div>
      </div>

      <div className="qt-2-container" style={{ height: '160dvh' }}>
        <div className="qt-2-content">
          <div className="qt-2-content-1" ref={addToRefs} data-anim="top">
            Create any kind of Quiz
          </div>
          <div className="qt-2-content-2" ref={addToRefs} data-anim="top">
            With 2 different question types
          </div>
          
          <div className="qt-2-qtype-1">
            <div className="qt-2-qtype-1-img" ref={addToRefs} data-anim="left">
              <img src={mchoiceImg} style={{ width: '450px', maxWidth: '100%', height: 'auto' }} alt="Multiple Choice" />
            </div>
            <div className="qt-2-qtype-1-content" ref={addToRefs} data-anim="right">
              <div className="qt-2-qtype-1-title">Multiple Choice</div>
              <div className="qt-2-qtype-1-desc">
                Create dynamic multiple choice quizzes effortlessly. Add
                unlimited choices, customize questions, and provide instant
                feedback to enhance learning and engagement. Perfect for educators, trainers, and content creators!
              </div>
            </div>
          </div>
          
          <div className="qt-2-qtype-2">
            <div className="qt-2-qtype-2-img" ref={addToRefs} data-anim="right">
              <img src={idenImg} style={{ width: '380px', maxWidth: '100%', height: 'auto' }} alt="Identification" />
            </div>
            <div className="qt-2-qtype-2-content" ref={addToRefs} data-anim="left">
              <div className="qt-2-qtype-2-title">Identification</div>
              <div className="qt-2-qtype-2-desc">
                Create challenging identification type questions. Create a custom question, and set the correct answer.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <WizFooter />
    </>
  );
}

export default WizHome;
