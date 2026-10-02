import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AboutDetail({ isActive, onClose }) {
  const images = ["/profpic1.webp", "/profpic2.webp", "/profpic3.webp"];
  const [cards, setCards] = useState([0, 1, 2]);

  const handleShuffle = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const top = newCards.shift();
      newCards.push(top);
      return newCards;
    });
  };

  useEffect(() => {
    const interval = setInterval(handleShuffle, 3000);
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    {
      icon: (
        <svg className="w-8 h-8 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
          <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Z"/>
        </svg>
      ),
      label: 'Cum Laude',
      sub: 'B.S. Information Technology',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#38bdf8]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
          <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180-24h240v-80H480v80Z"/>
        </svg>
      ),
      label: '4+ Years',
      sub: 'Development Experience',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
      ),
      label: '7+ Projects',
      sub: 'Delivered End-to-End',
    },
  ];

  const techs = ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Java', 'PHP', 'ASP.NET', 'SQL', 'Tailwind CSS', 'Framer Motion', 'Git'];

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, type: 'spring', stiffness: 100, damping: 14 } }),
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
          className="fixed inset-0 z-50 bg-[#0a192f] flex items-center justify-center p-6 lg:p-10"
        >
          {/* ── Back button ── */}
          <button
            onClick={onClose}
            className="absolute top-6 left-8 text-white flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-widest">Back</span>
          </button>

          {/* ── Main Grid ── */}
          <div className="w-full h-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] grid-rows-1 gap-6">

            {/* ── LEFT: Photo stack ── */}
            <div
              className="relative flex items-center justify-center cursor-pointer h-full min-h-0"
              onClick={handleShuffle}
            >
              {cards.map((imgIndex, i) => {
                const isBack = i === cards.length - 1;
                return (
                  <motion.img
                    key={imgIndex}
                    src={images[imgIndex]}
                    alt={`Profile ${imgIndex + 1}`}
                    className="absolute w-[75%] h-[80%] object-cover rounded-3xl shadow-2xl border-2 border-white/20"
                    initial={false}
                    animate={{
                      scale: 1 - i * 0.07,
                      y: i * 24,
                      x: isBack ? [0, 220, 0] : 0,
                      rotate: isBack ? [0, 12, 0] : i * -2,
                      zIndex: cards.length - i,
                      opacity: 1 - i * 0.18,
                    }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                  />
                );
              })}
              <p className="absolute bottom-4 text-xs text-white/30 tracking-widest uppercase">Click to shuffle</p>
            </div>

            {/* ── RIGHT: 2-row content ── */}
            <div className="flex flex-col gap-5 h-full min-h-0 justify-center">

              {/* TOP ROW: Bio */}
              <motion.div
                custom={0} variants={cardVariants} initial="hidden" animate="show"
                className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/5 p-7 flex flex-col gap-3"
              >
                <h3 className="text-white uppercase tracking-[0.2em] text-lg font-extrabold flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#38bdf8]"></span>
                  Who I Am
                </h3>
                <p className="text-[#94a3b8] leading-relaxed text-sm lg:text-base">
                  Graduated <span className="font-bold text-[#38bdf8]">Cum Laude</span> with a B.S. in Information Technology from the{' '}
                  <span className="font-bold text-white">University of Santo Tomas</span>. Passionate programmer building clean, user-friendly web experiences. Started with Java and expanded to React, Node.js, PHP, SQL, and ASP.NET.
                </p>
                <p className="text-[#94a3b8] leading-relaxed text-sm lg:text-base">
                  Outside of code: hiking trails, digital art, and custom keyboards.
                </p>
              </motion.div>

              {/* MIDDLE ROW: Milestone stat cards */}
              <div className="grid grid-cols-3 gap-4">
                {milestones.map(({ icon, label, sub }, i) => (
                  <motion.div
                    key={label}
                    custom={i + 1} variants={cardVariants} initial="hidden" animate="show"
                    className="bg-gradient-to-br from-[#38bdf8]/10 to-[#0284c7]/10 backdrop-blur-xl rounded-2xl border border-[#38bdf8]/20 p-5 flex flex-col items-center text-center gap-2 hover:border-[#38bdf8]/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300"
                  >
                    <div>{icon}</div>
                    <p className="text-white font-extrabold text-xl lg:text-2xl">{label}</p>
                    <p className="text-[#94a3b8] text-xs">{sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* BOTTOM ROW: Tech stack */}
              <motion.div
                custom={4} variants={cardVariants} initial="hidden" animate="show"
                className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/5 p-6 flex flex-col gap-4"
              >
                <h4 className="text-[#38bdf8] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-slate-300 hover:border-[#38bdf8] hover:shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all duration-200 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AboutDetail;
