import React from 'react';

function Banner() {
  return (
    // Secondary color Black for banner, with a light blue accent border and cool mesh gradient
    <div className="relative w-full h-[25vh] bg-gradient-to-tr from-[#020617] via-[#0a192f] to-[#112240] border-b border-white/20 shrink-0 flex items-end justify-end p-6 md:p-12 overflow-hidden">
      {/* Abstract Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
    </div>
  );
}

export default Banner;
