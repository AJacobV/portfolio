import React from 'react';
import Banner from './components/Banner';
import Profile from './components/Profile';
import AboutSection from './components/AboutSection';
import AchievementsSection from './components/AchievementsSection';
import TechStackSection from './components/TechStackSection';
import ProjectsSection from './components/ProjectsSection';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-white flex flex-col">
      
      {/* Header Area */}
      <div className="relative shrink-0">
        <Banner />
        <Profile />
      </div>

      {/* Content Grid */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pt-16 sm:pt-20 md:pt-28 pb-8 flex flex-col min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 flex-1 min-h-0">
          
          {/* Column 1: Left */}
          <div className="flex flex-col gap-6 md:gap-8 h-full min-h-0">
            <AboutSection />
            <AchievementsSection />
          </div>
          
          {/* Column 2: Middle */}
          <div className="flex flex-col h-full min-h-0">
            <TechStackSection />
          </div>
          
          {/* Column 3: Right */}
          <div className="flex flex-col h-full min-h-0">
            <ProjectsSection />
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default App;
