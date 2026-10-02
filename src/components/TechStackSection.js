import React, { useState } from 'react';
import { Search } from 'react-bootstrap-icons';

// Keyword → section mapping
const KEYWORD_MAP = [
  {
    section: 'about-section',
    keywords: [
      'about', 'who', 'me', 'bio', 'background', 'story', 'person',
      'profile', 'graduate', 'cum laude', 'ust', 'university', 'information technology',
      'hiking', 'keyboards', 'digital art', 'java', 'php',
    ],
  },
  {
    section: 'achievements-section',
    keywords: [
      'contact', 'email', 'reach', 'hire', 'message', 'inquiry',
      'hello', 'connect', 'available', 'location', 'manila', 'philippines',
      'opportunity', 'work', 'freelance',
    ],
  },
  {
    section: 'projects-section',
    keywords: [
      'project', 'portfolio', 'work', 'falcon', 'fis', 'amore', 'luxe',
      'lmd', 'dental', 'gawin', 'anv', 'encoding', 'react', 'node',
      'angular', 'asp.net', 'c#', 'sql', 'typescript', 'next', 'electron',
      'firebase', 'supabase', 'tailwind', 'prisma', 'fullstack', 'frontend',
      'ui', 'ux', 'capstone', 'internship', 'fleet', 'dispatch', 'fuel',
      'lost', 'found', 'incident', 'task', 'management', 'excel', 'desktop',
      'laravel', 'kotlin', 'java', 'php'
    ],
  },
];

function resolveSection(query) {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  for (const { section, keywords } of KEYWORD_MAP) {
    if (keywords.some((kw) => q.includes(kw) || kw.includes(q))) {
      return section;
    }
  }
  return null;
}

function TechStackSection({ className = '', onNavigate }) {
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const section = resolveSection(query);

    if (section && onNavigate) {
      setQuery('');
      setFeedback(null);
      onNavigate(section);
    } else {
      setFeedback(`No match for "${query}". Try: projects, about, contact.`);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSearch}
        className={`bg-slate-800/60 shadow-lg shadow-black/20 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-full md:rounded-[2rem] flex items-center px-4 md:px-6 relative shadow-inner overflow-hidden focus-within:border-[#38bdf8]/50 focus-within:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300 ${className}`}
      >
        {/* Blue circular search button */}
        <button
          type="submit"
          className="w-8 h-8 sm:w-10 sm:h-10 bg-[#38bdf8] rounded-full shadow-md flex items-center justify-center hover:bg-sky-500 transition-colors shrink-0 cursor-pointer"
          aria-label="Search"
        >
          <Search className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setFeedback(null); }}
          placeholder="What's on your mind?"
          className="flex-1 bg-transparent border-none outline-none px-4 text-white font-medium placeholder-slate-400 min-w-0"
        />
      </form>

      {/* Feedback toast */}
      {feedback && (
        <div className="absolute top-full left-0 mt-2 px-4 py-2 bg-slate-800 border border-white/10 rounded-xl text-sm text-slate-300 shadow-xl z-10 whitespace-nowrap">
          {feedback}
        </div>
      )}
    </div>
  );
}

export default TechStackSection;
