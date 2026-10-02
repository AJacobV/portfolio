import React from 'react';

function AchievementsSection({ className = '', onClick }) {
  return (
    <div 
      id="achievements-section"
      onClick={onClick}
      className={`bg-slate-800/60 shadow-lg shadow-black/20 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col gap-4 text-left group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] transition-all duration-300 relative overflow-hidden ${className}`}
    >
      {/* Decorative hover glow */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#818cf8] rounded-full  filter blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      <h2 className="text-xl md:text-2xl font-bold text-white relative z-10 flex items-center gap-2">
        <svg className="w-5 h-5 text-[#818cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        Contact Me
      </h2>
      <ul className="text-xs md:text-sm text-slate-300 flex-1 flex flex-col justify-around relative z-10 pt-2 pb-1">
        <li className="flex items-center gap-3">
          <svg className="w-5 h-5 text-yellow-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <span className="font-medium line-clamp-2">bocajvaleros@gmail.com</span>
        </li>
        <li className="flex items-center gap-3">
          <svg className="w-5 h-5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span className="font-medium">Quezon City, Fairview, Philippines</span>
        </li>
        <li className="flex items-center gap-3">
          <svg className="w-5 h-5 text-[#38bdf8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          <span className="font-medium">Open to opportunities</span>
        </li>
      </ul>
    </div>
  );
}

export default AchievementsSection;
