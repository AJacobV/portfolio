import { useState, useCallback } from 'react';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import MySkills from './components/MySkills';
import MyProjects from './components/MyProjects';
import ContactMe from './components/ContactMe';
import LoadingScreen from './components/LoadingScreen';
import CursorTracer from './components/CursorTracer';
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
      <main className={`main-content ${contentVisible ? 'visible' : ''}`}>
        <CursorTracer active={!loading} />
        <Home />
        <AboutMe />
        <MySkills />
        <MyProjects />
        <ContactMe />
      </main>
    </div>
  );
}

export default App;
