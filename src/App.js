import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import MySkills from './components/MySkills';
import MyProjects from './components/MyProjects';
import ContactMe from './components/ContactMe';

import LazySection from './components/LazySection';
import WizApp from './components/wiz/WizApp';
import CICSApp from './components/CICSElect/CICSApp';
import JvTechApp from './components/jvtech/JvTechApp';
import Navbar from './components/Navbar';
import './App.css';

function PortfolioMain() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content visible">
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
