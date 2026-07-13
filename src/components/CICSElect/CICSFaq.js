import React from 'react';
import CICSNavbar from './CICSNavbar';
import CICSFooter from './CICSFooter';

function CICSFaq() {
  return (
    <>
      <CICSNavbar />
      <div style={{ padding: '100px 5%', minHeight: '60vh' }}>
        <h1 style={{ color: '#800000' }}>FAQs</h1>
        <p>This is the FAQ page for the CICSelect replica.</p>
      </div>
      <CICSFooter />
    </>
  );
}

export default CICSFaq;
