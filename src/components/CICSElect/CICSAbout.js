import React from 'react';
import CICSNavbar from './CICSNavbar';
import CICSFooter from './CICSFooter';

function CICSAbout() {
  return (
    <>
      <CICSNavbar />
      <div style={{ padding: '100px 5%', minHeight: '60vh' }}>
        <h1 style={{ color: '#800000' }}>About Us</h1>
        <p>This is the About Us page for the CICSelect replica.</p>
      </div>
      <CICSFooter />
    </>
  );
}

export default CICSAbout;
