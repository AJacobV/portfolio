import React from 'react';

function AboutSection({ className = '', onClick }) {
  return (
    <div 
      id="about-section" 
      onClick={onClick}
      className={`bg-slate-800/60 shadow-lg shadow-black/20 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] transition-all duration-300 ${className}`}
    >
      {/* Decorative hover glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#38bdf8] rounded-full  filter blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      
      <div className="z-10 flex flex-col gap-3 md:gap-4 text-left">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          Personal Details
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed line-clamp-3">
          I graduated Cum Laude with a B.S. in Information Technology from the University of Santo Tomas. I am a passionate programmer with a knack for creating clean, user-friendly, and responsive websites.
        </p>
      </div>
      <div className="mt-4 text-sm text-[#38bdf8] font-bold group-hover:translate-x-1 transition-transform">
        Read more →
      </div>
    </div>
  );
}

export default AboutSection;
