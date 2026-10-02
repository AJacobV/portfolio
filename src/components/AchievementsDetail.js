import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AchievementsDetail({ isActive, onClose }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ pointerEvents: isActive ? "auto" : "none" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 overflow-y-auto"
        >
          {/* Transparent click-away backdrop */}
          <div className="absolute inset-0 z-0" onClick={onClose} />
          
          <div className="relative z-10 w-full max-w-5xl bg-[#0f172a]/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white opacity-50 hover:opacity-100 transition-opacity z-50 text-3xl font-light"
            >
              &times;
            </button>

            {/* Left Side: Contact Info */}
            <div className="flex-1 bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-10 md:p-16 flex flex-col justify-center border-r border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8] filter blur-[120px] opacity-20 pointer-events-none rounded-full"></div>
              
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                Let's <span className="text-[#38bdf8]">Connect</span>
              </h3>
              <p className="text-[#94a3b8] text-lg mb-12">
                I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-400 font-medium">Email</h4>
                    <p className="text-lg font-bold">hello@valfiles.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-400 font-medium">Location</h4>
                    <p className="text-lg font-bold">Manila, Philippines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="flex-[1.5] p-10 md:p-16 flex flex-col justify-center">
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-400 tracking-wide uppercase">Your Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-400 tracking-wide uppercase">Your Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-400 tracking-wide uppercase">Subject</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" placeholder="Project Inquiry" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-400 tracking-wide uppercase">Message</label>
                  <textarea rows="5" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38bdf8] transition-colors resize-none" placeholder="Hello, I'd like to talk about..."></textarea>
                </div>

                <button className="mt-4 px-8 py-4 bg-[#38bdf8] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:bg-sky-400 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all duration-300">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AchievementsDetail;
