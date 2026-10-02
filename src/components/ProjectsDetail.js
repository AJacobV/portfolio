import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProjectsDetail({ isActive, onClose }) {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const isScrolling = useRef(false);
  const lastDelta = useRef(0);

  React.useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setImageIndex(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isActive]);

  const projects = [
    {
      title: "Falcon Eye",
      context: "Capstone",
      images: [
        "/falconEye_dashboard.png",
        "/falconEye_heatmappage.png",
        "/falconEye_incidentreportpage.png",
        "/falconEye_lostandfoundpage.png"
      ],
      desc: "Lost and Found and Incident reporting system with integrated heatmap that displays incidents in real-time. Equipped with Noupe Ai chatbot and Admin dashboard for managing incidents, lost and found items, and user accounts.",
      goal: "To provide a platform for users to report incidents and lost and found items.",
      position: "Full Stack developer",
      tech: ["Node.js", "React.js", "NoSQL - Firebase", "Cloud - Blackblaze", "Noupe - Ai Chattbot"]
    },
    {
      title: "FIS",
      context: "Internship project in Asceoft",
      images: [
        "/fisadmin_dashboard.png",
        "/fisadmin_dispatch.png",
        "/fisadmin_fuel.png",
        "/fisadmin_login.png"
      ],
      desc: "An intelligent fleet management system for tracking vehicles, optimizing routes, and monitoring fuel consumption in real-time.",
      goal: "To monitor fuel consumption and improve dispatch efficiency.",
      position: "Frontend-developer",
      tech: ["Next.js", "React.js", "Tailwind CSS", "Prisma ORM", "PostgreSQL - Supabase", "Leaflet.js - Interactive Maps", "PWA"]
    },
    {
      title: "Amore Luxe",
      context: "Client",
      images: [
        "/AmoreLux_title.jpg",
        "/AmoreLux_featuredfragances.jpg",
        "/AmoreLux_menscollection.jpg",
        "/AmoreLux_womenscollection.jpg"
      ],
      desc: "A  brochure website that showcases fragrances and products, designed to provide a premium shopping experience for customers.",
      goal: "Showcase the brand's products and enhance online presence with a visually appealing and user-friendly interface.",
      position: "UI/UX developer",
      tech: ["React.js", "HTML & CSS"]
    },
    {
      title: "LMD Dental Hub",
      context: "Software Engineering Project Course",
      images: [
        "/LMDContent.jpeg",
        "/LMDHome.jpeg",
        "/LMDLogin.jpeg"
      ],
      desc: "Dental clinic management portal for patient appointments, digital dental chart, and patient management.",
      goal: "Modernize clinic operations and eliminate paper-based patient records.",
      position: "Fullstack developer",
      tech: ["ASP.NET", "C#", "Angular.js", "SQL"]
    },
    {
      title: "GAWIN",
      context: "Personal project",
      images: [],
      desc: "Task management and productivity web application designed to help users track progress, see each others tasks, and set reminders.",
      goal: "To provide a simple yet effective tool for individuals to manage tasks and improve productivity.",
      position: "Fullstack developer",
      tech: ["Typescript", "Next.js", "React.js", "Tailwind CSS", "Prisma ORM", "PostgreSQL - Supabase"]
    },
    {
      title: "ANV Encoding app",
      context: "Client",
      images: [],
      desc: "A local desktop utility providing a structured data entry interface. It uses an existing Excel file as its database, allowing users to encode rows and fetch live calculations entirely offline.",
      goal: "To hasten and make it easier for the user to encode the values inside an excel file that has mutiple sheets; provide live calculations and summary in numbers, and display recent activity that the user encoded.",
      position: "Fullstack developer",
      tech: ["Electron", "Vite", "React.js", "Typescript", "Tailwind CSS", "Node.js", "exceljs"]
    }
  ];

  const N = projects.length;
  const angle = 360 / N;
  const halfAngle = angle / 2;
  const parentBaseOffset = 90 - halfAngle;
  
  const tanHalf = Math.tan(halfAngle * Math.PI / 180);
  const clipYOffset = 50 * tanHalf;
  const dynamicClipPath = `polygon(50% 50%, 100% ${50 - clipYOffset}%, 100% ${50 + clipYOffset}%)`;

  const activeIndex = ((virtualIndex % projects.length) + projects.length) % projects.length;

  const handleWheel = (e) => {
    const currentDelta = Math.abs(e.deltaY);
    const isAccelerating = currentDelta > lastDelta.current;
    lastDelta.current = currentDelta;

    if (isScrolling.current) return;
    
    if (isAccelerating && currentDelta > 20) {
      if (e.deltaY > 0) {
        isScrolling.current = true;
        setVirtualIndex(prev => prev + 1);
        setTimeout(() => isScrolling.current = false, 500);
      } else {
        isScrolling.current = true;
        setVirtualIndex(prev => prev - 1);
        setTimeout(() => isScrolling.current = false, 500);
      }
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a192f] overflow-hidden"
          style={{ pointerEvents: isActive ? "auto" : "none" }}
          onWheel={(e) => { e.stopPropagation(); handleWheel(e); }}
        >
          {/* LEFT SIDE: Rotating Ring */}
          <div 
            className="absolute top-0 bottom-0 left-0 w-full pointer-events-auto z-0 cursor-pointer group"
            onWheel={handleWheel}
            onClick={() => setModalProject(projects[activeIndex])}
            style={{ maskImage: 'linear-gradient(to right, black 20%, transparent 60%)', WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 60%)' }}
          >
            {/* The Solid Blue Ring */}
            <motion.div 
              className="absolute rounded-full bg-[#0a192f] shadow-[0_0_100px_rgba(56,189,248,0.4)] group-hover:shadow-[0_0_150px_rgba(56,189,248,0.7)] group-hover:border-[#38bdf8]/60 overflow-hidden border-4 border-[#38bdf8]/30 transition-shadow duration-500"
              style={{ 
                width: '200vh', 
                height: '200vh',
                top: '50%',
                left: '-125vh',
                marginTop: '-100vh'
              }} 
              animate={{ rotate: parentBaseOffset - virtualIndex * angle }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Image Slices */}
              {projects.map((p, i) => {
                const isSpotlight = activeIndex === i;
                const currentImage = p.images && p.images.length > 0 
                  ? (isSpotlight ? p.images[imageIndex % p.images.length] : p.images[0]) 
                  : null;

                return (
                  <div 
                    key={`img-${i}`}
                    className={`absolute inset-0 z-0 ${isSpotlight ? 'cursor-pointer hover:brightness-110 transition-all' : ''}`}
                    style={{ 
                      transform: `rotate(${i * angle - parentBaseOffset}deg)`,
                      clipPath: dynamicClipPath
                    }}
                    onClick={() => isSpotlight && setModalProject(p)}
                  >
                    <AnimatePresence mode="popLayout">
                      {currentImage && (
                        <motion.img 
                          key={currentImage}
                          src={currentImage} 
                          alt={p.title} 
                          initial={{ opacity: 0, filter: "blur(0px)" }}
                          animate={{ opacity: 0.5, filter: "blur(2px)" }}
                          exit={{ opacity: 0, filter: "blur(0px)" }}
                          transition={{ duration: 1 }}
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[100vh] object-cover" 
                          style={{ objectPosition: 'center' }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Dividers */}
              {projects.map((p, i) => (
                <div 
                  key={`div-${i}`} 
                  className="absolute top-0 left-1/2 w-0 h-1/2 border-l-2 border-white/40 origin-bottom z-10 pointer-events-none"
                  style={{ transform: `translateX(-50%) rotate(${i * angle}deg)` }}
                />
              ))}

              {/* Content inside segments */}
              {projects.map((p, i) => (
                <div 
                  key={`text-${i}`} 
                  className="absolute top-0 left-1/2 w-0 h-1/2 origin-bottom flex justify-center z-20 pointer-events-none"
                  style={{ transform: `translateX(-50%) rotate(${i * angle + halfAngle}deg)` }}
                >
                  <div 
                    className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-300 -rotate-90 origin-center ${activeIndex === i ? 'scale-110 opacity-100' : 'scale-90 opacity-50'}`}
                  >
                    <div className={`whitespace-nowrap text-3xl lg:text-4xl font-black ${activeIndex === i ? 'text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]' : 'text-white/70 drop-shadow-md'}`}>
                      {p.title}
                    </div>
                  </div>
                </div>
              ))}

            </motion.div>
          </div>

          {/* RIGHT SIDE: Details */}
          <div className="w-full md:w-1/2 h-full ml-auto flex flex-col justify-center p-8 lg:p-16 relative z-10 pointer-events-none">
            <h3 className="text-[#38bdf8] uppercase tracking-[0.3em] text-sm md:text-base mb-2 font-bold opacity-80 flex items-center gap-3">
              <span className="w-12 h-[2px] bg-[#38bdf8]"></span>
              Project Deep Dive
            </h3>
            {projects[activeIndex].context && (
              <p className="text-gray-400 text-sm tracking-widest uppercase mb-8 ml-16 font-semibold">
                {projects[activeIndex].context}
              </p>
            )}
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                  },
                  exit: { opacity: 0, transition: { duration: 0.2 } }
                }}
                className="flex flex-col gap-6 max-w-2xl pointer-events-auto"
              >
                
                <motion.div variants={{
                  hidden: { opacity: 0, x: 30, filter: "blur(10px)" },
                  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 120, damping: 14 } },
                  exit: { opacity: 0, x: -30, filter: "blur(10px)" }
                }} className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-[#38bdf8]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-500">
                  <h4 className="text-[#38bdf8] font-bold text-sm md:text-base mb-3 uppercase tracking-widest flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    The Use
                  </h4>
                  <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">{projects[activeIndex].desc}</p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <motion.div variants={{
                    hidden: { opacity: 0, x: 30, filter: "blur(10px)" },
                    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 120, damping: 14 } },
                    exit: { opacity: 0, x: -30, filter: "blur(10px)" }
                  }} className="group flex-[2] bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-[#38bdf8]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-500">
                    <h4 className="text-[#38bdf8] font-bold text-sm md:text-base mb-3 uppercase tracking-widest flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      The Goal
                    </h4>
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">{projects[activeIndex].goal}</p>
                  </motion.div>

                  <motion.div variants={{
                    hidden: { opacity: 0, x: 30, filter: "blur(10px)" },
                    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 120, damping: 14 } },
                    exit: { opacity: 0, x: -30, filter: "blur(10px)" }
                  }} className="group flex-1 bg-gradient-to-br from-[#38bdf8]/10 to-[#0284c7]/10 backdrop-blur-xl p-8 rounded-3xl border border-[#38bdf8]/20 shadow-2xl flex flex-col justify-center items-center text-center hover:bg-[#38bdf8]/20 hover:border-[#38bdf8]/50 transition-all duration-500">
                    <h4 className="text-[#38bdf8] font-bold text-sm mb-2 uppercase tracking-widest">My Role</h4>
                    <p className="text-white font-bold text-lg md:text-xl">{projects[activeIndex].position}</p>
                  </motion.div>
                </div>

                <motion.div variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
                  exit: { opacity: 0, y: 20 }
                }} className="mt-4">
                  <h4 className="text-slate-400 font-medium text-sm md:text-base mb-4 uppercase tracking-widest">Tech Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {projects[activeIndex].tech.map(t => (
                      <span key={t} className="px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 hover:border-[#38bdf8] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] rounded-full text-sm font-semibold text-slate-200 transition-all duration-300 cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Modal Gallery */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-8 overflow-y-auto"
          >
            <button 
              onClick={() => setModalProject(null)}
              className="absolute top-8 left-8 md:top-12 md:left-12 text-white flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity z-50 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span className="text-xl font-bold tracking-widest uppercase mt-1">Back</span>
            </button>
            <div className="w-full max-w-7xl mx-auto py-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-12 text-center drop-shadow-lg">
                {modalProject.title} <span className="text-[#38bdf8] font-normal">Gallery</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {modalProject.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`${modalProject.title} screenshot ${idx + 1}`} 
                    className="w-full h-auto rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10" 
                  />
                ))}
              </div>
              
              {modalProject.images.length === 0 && (
                <div className="text-white text-2xl w-full text-center opacity-50 mt-20">
                  No images available for this project.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

export default ProjectsDetail;
