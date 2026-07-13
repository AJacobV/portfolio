import React, { useState } from 'react';
import WizNavbar from './WizNavbar';
import WizFooter from './WizFooter';

function Carousel({ title, items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numVisibleSlides = 4;
  const totalSlides = items.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIdx = (prevIndex + 1) % totalSlides;
      if (nextIdx >= totalSlides - numVisibleSlides + 1) {
        setTimeout(() => setCurrentIndex(0), 1000);
      }
      return nextIdx;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="wiz-carousel-section">
      <div className="wiz-carousel-content-1">{title}</div>
      <div className="wiz-carousel-img-container">
        <div className="wiz-carousel-wrapper">
          <div
            className="wiz-carousel-slide"
            style={{
              transform: `translateX(-${currentIndex * 25}%)`,
              transition: 'transform 0.5s ease',
            }}
          >
            {items.map((item, index) => (
              <div className="wiz-carousel-img" key={index}>
                <div className="img-wrapper">
                  <img src={`/wiz-assets/${item.img}`} alt={item.text} />
                </div>
                <div className="img-text">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide}>Next</button>
      </div>
    </div>
  );
}

function WizSubjects() {
  const mathItems = [
    { img: 'algebra.jpg', text: 'Algebra' },
    { img: 'calculus.jpg', text: 'Calculus' },
    { img: 'geometry.jpg', text: 'Geometry' },
    { img: 'arithmetic.jpg', text: 'Arithmetic' },
    { img: 'statistics.jpg', text: 'Statistics' },
    { img: 'integral.jpg', text: 'Integral' },
    { img: 'trigonometry.jpg', text: 'Trigonometry' },
    { img: 'algebra.jpg', text: 'Logic' },
  ];

  const scienceItems = [
    { img: 'chemistry.jpg', text: 'Chemistry' },
    { img: 'earth_science.jpg', text: 'Earth Science' },
    { img: 'astronomy.jpg', text: 'Astronomy' },
    { img: 'genetics.jpg', text: 'Genetics' },
    { img: 'physics.jpg', text: 'Physics' },
    { img: 'geology.jpg', text: 'Geology' },
    { img: 'forensics.jpg', text: 'Forensics' },
    { img: 'biology.jpg', text: 'Biology' },
  ];

  return (
    <>
      <WizNavbar isLoggedIn={sessionStorage.getItem('wiz_user') !== null} />
      
      <div className="qt-1-container" style={{ marginTop: '100px' }}>
        <div className="qt-1-content">
          <div className="qt-1-content2">
            Browse Helpful Websites, <br /> Keep Learning!
          </div>
          <div className="qt-1-content3">
            Here are some channels that might help you learn on the specific subjects your are struggling with.
          </div>
          <div style={{ marginTop: '20px', padding: '15px 20px', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '8px', borderLeft: '4px solid #512da8', fontSize: '14px', color: '#333', maxWidth: '600px' }}>
            <strong>Demo Notice:</strong> This subjects portal is a visual demonstration only. The carousels and categories below are static placeholders and do not link to real course content.
          </div>
        </div>
        <div className="qt-1-content-img">
            {/* Keeping empty just like original php */}
        </div>
      </div>

      <div className="qt-2-container" style={{ height: 'auto', paddingBottom: '50px' }}>
        <div className="qt-2-content">
          <Carousel title="Mathematics" items={mathItems} />
        </div>
      </div>

      <div className="qt-3-container" style={{ height: 'auto', paddingBottom: '50px' }}>
        <div className="qt-3-content">
          <Carousel title="Science" items={scienceItems} />
        </div>
      </div>

      <WizFooter />
    </>
  );
}

export default WizSubjects;
