import React from 'react';

function ProjectsSection({ className = '', onClick }) {
  return (
    <div 
      id="projects-section"
      onClick={onClick}
      className={`bg-slate-800/60 shadow-lg shadow-black/20 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] transition-all duration-300 relative overflow-hidden ${className}`}
    >
      {/* Decorative hover glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#38bdf8] rounded-full  filter blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>

      <div className="flex justify-between items-center relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <svg className="w-6 h-6 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          Featured Projects
        </h2>
        <button className="text-sm font-bold text-[#38bdf8] hover:text-sky-400 transition hover:translate-x-1">View All →</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 relative z-10">
        {/* Project 1 */}
        <div className="bg-slate-800/80 border border-white/10 shadow-inner rounded-xl p-4 sm:p-5 flex flex-col gap-2 shadow-sm hover:border-[#38bdf8]/50 transition">
          <h3 className="font-bold text-white text-lg">Falcon Eye</h3>
          <p className="text-sm text-slate-300 line-clamp-2">Security and monitoring system prototype.</p>
        </div>
        
        {/* Project 2 */}
        <div className="bg-slate-800/80 border border-white/10 shadow-inner rounded-xl p-4 sm:p-5 flex flex-col gap-2 shadow-sm hover:border-[#38bdf8]/50 transition">
          <h3 className="font-bold text-white text-lg">FIS</h3>
          <p className="text-sm text-slate-300 line-clamp-2">An intelligent fleet management system.</p>
        </div>
        
        {/* Project 3 */}
        <div className="bg-slate-800/80 border border-white/10 shadow-inner rounded-xl p-4 sm:p-5 flex flex-col gap-2 shadow-sm hover:border-[#38bdf8]/50 transition">
          <h3 className="font-bold text-white text-lg">Amore Luxe</h3>
          <p className="text-sm text-slate-300 line-clamp-2">Luxury e-commerce platform.</p>
        </div>
        
        {/* Project 4 */}
        <div className="bg-slate-800/80 border border-white/10 shadow-inner rounded-xl p-4 sm:p-5 flex flex-col gap-2 shadow-sm hover:border-[#38bdf8]/50 transition">
          <h3 className="font-bold text-white text-lg">LMD Dental Hub</h3>
          <p className="text-sm text-slate-300 line-clamp-2">Dental clinic management portal.</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectsSection;
