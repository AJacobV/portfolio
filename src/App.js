import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import MySkills from './components/MySkills';
import MyProjects from './components/MyProjects';
import ContactMe from './components/ContactMe';
import LoadingScreen from './components/LoadingScreen';
import CursorTracer from './components/CursorTracer';
import LazySection from './components/LazySection';
import WizApp from './components/wiz/WizApp';
import CICSApp from './components/CICSElect/CICSApp';
import JvTechApp from './components/jvtech/JvTechApp';
import Navbar from './components/Navbar';
import './App.css';

function PortfolioMain() {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleLoadingDone = useCallback(() => {
    setLoading(false);
    setContentVisible(true);
  }, []);

  return (
    <div className="App">
      {loading && <LoadingScreen onDone={handleLoadingDone} />}
      <CursorTracer active={!loading} />
      <Navbar />
      <main className={`main-content ${contentVisible ? 'visible' : ''}`}>
        <Home />

        <LazySection rootMargin="300px 0px">
          <AboutMe />
        </LazySection>

        <LazySection rootMargin="400px 0px">
          <MySkills />
        </LazySection>

        <LazySection rootMargin="400px 0px">
          <MyProjects />
        </LazySection>

        <LazySection rootMargin="400px 0px">
          <ContactMe />
        </LazySection>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioMain />} />
        <Route path="/wiz/*" element={<WizApp />} />
        <Route path="/cicselect/*" element={<CICSApp />} />
        <Route path="/jvtech/*" element={<JvTechApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
