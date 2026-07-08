import { useState, useCallback } from 'react';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import MySkills from './components/MySkills';
import MyProjects from './components/MyProjects';
import ContactMe from './components/ContactMe';
import LoadingScreen from './components/LoadingScreen';
import CursorTracer from './components/CursorTracer';
import LazySection from './components/LazySection';
import './App.css';

function App() {
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

export default App;
