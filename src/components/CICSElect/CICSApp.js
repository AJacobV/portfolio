import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CICSHome from './CICSHome';
import CICSLogin from './CICSLogin';
import CICSDashboard from './CICSDashboard';
import CICSAbout from './CICSAbout';
import CICSContact from './CICSContact';
import CICSFaq from './CICSFaq';
import './CICSApp.css';

function CICSApp() {
  return (
    <div className="cics-replica-container">
      <Routes>
        <Route path="/" element={<CICSHome />} />
        <Route path="/login" element={<CICSLogin />} />
        <Route path="/dashboard" element={<CICSDashboard />} />
        <Route path="/about" element={<CICSAbout />} />
        <Route path="/contact" element={<CICSContact />} />
        <Route path="/faqs" element={<CICSFaq />} />
        <Route path="*" element={<CICSHome />} />
      </Routes>
    </div>
  );
}

export default CICSApp;
