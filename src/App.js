import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Banner from './components/Banner';
import Profile from './components/Profile';
import AboutSection from './components/AboutSection';
import AchievementsSection from './components/AchievementsSection';
import TechStackSection from './components/TechStackSection';
import ProjectsSection from './components/ProjectsSection';
import AboutDetail from './components/AboutDetail';
import AchievementsDetail from './components/AchievementsDetail';
import ProjectsDetail from './components/ProjectsDetail';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [origin, setOrigin] = useState("50% 50%"); 
  
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleWheel = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const getOriginForElement = (elId) => {
    const el = document.getElementById(elId);
    const wrapper = document.getElementById("zoom-wrapper");
    if (el && wrapper) {
      let top = 0;
      let left = 0;
      let curr = el;
      while (curr && curr !== wrapper) {
        top += curr.offsetTop;
        left += curr.offsetLeft;
        curr = curr.offsetParent;
      }
      return `${left + el.offsetWidth / 2}px ${top + el.offsetHeight / 2}px`;
    }
    return null;
  };

  const handleZoomTo = (sectionId) => {
    const newOrigin = getOriginForElement(sectionId);
    if (newOrigin) {
      setOrigin(newOrigin);
    }
    
    setTimeout(() => {
      let sectionCode = null;
      if (sectionId === "about-section") sectionCode = "about";
      if (sectionId === "achievements-section") sectionCode = "achievements";
      if (sectionId === "projects-section") sectionCode = "projects";
      setActiveSection(sectionCode);
    }, 50);
  };

  const handleClose = () => {
    setActiveSection(null);
  };

  const navItems = [
    { 
      id: null, 
      label: "Home",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor"><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/></svg>
    },
    { 
      id: "about", 
      label: "Who I Am",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>
    },
    { 
      id: "achievements", 
      label: "Milestones",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
    },
    { 
      id: "projects", 
      label: "Projects",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h400l160 160v400q0 33-23.5 56.5T680-160H160Zm0-80h520v-360H520v-160H160v520Zm0 0v-520 520Z"/></svg>
    },
  ];

  return (
    <div className="h-screen w-full overflow-hidden bg-[#0a192f] relative">
      
      {/* BACKGROUND LAYER: The whole page zooming in */}
      <motion.div 
        id="zoom-wrapper"
        className="h-screen w-full overflow-hidden flex flex-col will-change-transform"
        animate={{ 
          scale: activeSection ? 4 : 1, 
          opacity: activeSection ? 0 : 1,
          pointerEvents: activeSection ? 'none' : 'auto'
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformOrigin: origin }}
      >
        {/* Ambient Glow Effects */}
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[40vw] bg-[#38bdf8] rounded-[100%] filter blur-[100px] opacity-20 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[70vw] bg-[#818cf8] rounded-[100%] filter blur-[100px] opacity-10 pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative shrink-0">
          <Banner />
          <Profile />
        </div>
        <div className="flex-1 w-full pl-6 pr-16 md:pl-12 md:pr-24 pt-20 sm:pt-24 md:pt-32 pb-8 flex flex-col min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 flex-1 min-h-0">
            
            {/* Left Column (1/3 width) */}
            <div className="flex flex-col gap-6 md:gap-8 h-full min-h-0 md:col-span-1">
              <AboutSection 
                className="flex-[3] cursor-pointer" 
                onClick={() => handleZoomTo("about-section")}
              />
              <AchievementsSection 
                className="flex-[2] cursor-pointer" 
                onClick={() => handleZoomTo("achievements-section")}
              />
            </div>
            
            {/* Right Column (2/3 width) */}
            <div className="flex flex-col gap-6 md:gap-8 h-full min-h-0 md:col-span-2">
              <TechStackSection className="h-12 sm:h-16 md:h-20 shrink-0" onNavigate={handleZoomTo} />
              <ProjectsSection 
                className="flex-1 cursor-pointer" 
                onClick={() => handleZoomTo("projects-section")}
              />
            </div>

          </div>
        </div>
      </motion.div>

      {/* FOREGROUND LAYERS */}
      <AboutDetail isActive={activeSection === "about"} onClose={handleClose} />
      <AchievementsDetail isActive={activeSection === "achievements"} onClose={handleClose} />
      <ProjectsDetail isActive={activeSection === "projects"} onClose={handleClose} />

      {/* RIGHT EDGE NAVIGATION CONTAINER (Invisible Hover Zone) */}
      <div 
        className="fixed right-0 top-0 w-24 h-full z-[290]"
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
      />

      {/* RIGHT EDGE NAVIGATION ITEMS */}
      <div 
        className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-[300]"
      >
        {navItems.map((item) => (
          <motion.div 
            key={item.id || 'home'}
            className="cursor-pointer p-2"
            onClick={() => {
              if (item.id === null) handleClose();
              else handleZoomTo(`${item.id}-section`);
            }}
            whileHover={{ rotate: [0, -20, 20, -20, 20, 0] }}
            transition={{ duration: 0.5 }}
          >
            <div className={`transition-all duration-300 ${activeSection === item.id ? 'text-[#38bdf8] scale-125 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]' : 'text-slate-500 hover:text-white'}`}>
              {item.icon}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

export default App;
