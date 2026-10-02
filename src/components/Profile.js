import React from 'react';

function Profile() {
  return (
    <div className="absolute left-6 md:left-12 bottom-0 translate-y-[50%] z-10 flex flex-row items-end gap-4">
      {/* Profile Avatar with Light blue accent border */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-[#112240] border-2 border-[#38bdf8] shadow-sm flex items-center justify-center overflow-hidden shrink-0">
        <img src="/profpic1.webp" alt="Avatar" className="w-full h-full object-cover" />
      </div>

      {/* Two blue buttons */}
      <div className="flex flex-row gap-3 pb-2 sm:pb-4 md:pb-6">
        <button className="px-4 py-1 sm:px-5 sm:py-2 bg-[#38bdf8] text-white text-xs sm:text-sm font-bold rounded-full shadow-sm hover:bg-sky-500 transition-colors border border-white/20">
          Download CV
        </button>
        <button className="px-4 py-1 sm:px-5 sm:py-2 bg-[#38bdf8] text-white text-xs sm:text-sm font-bold rounded-full shadow-sm hover:bg-sky-500 transition-colors border border-white/20">
          View projects
        </button>
      </div>
    </div>
  );
}

export default Profile;
