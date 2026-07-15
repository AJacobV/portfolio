import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BoxArrowRight,
  MoonFill,
  SunFill,
} from "react-bootstrap-icons";
import { useJvTech } from "../JvTechContext";

export default function JvTechCustomerLayout({ children, cartCount = 0 }) {
  const { currentUser, logout, darkMode, toggleDarkMode } = useJvTech();
  const user = currentUser;
  const navigate = useNavigate();

  const userName = user?.customer_name || user?.name || "Guest";
  const initial = userName.charAt(0).toUpperCase();

  function handleLogout() {
    logout();
    navigate("/jvtech/login");
  }

  return (
    <div
      className={`jvtech-app min-h-screen bg-gray-50 dark:bg-slate-950${darkMode ? " dark" : ""}`}
    >
      {/* ── Top Navbar ──────────────────────────────────────── */}
      <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* LEFT: Logo + brand */}
            <Link to="/jvtech/store" className="flex items-center gap-3 group">
              {/* Logo circle */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform duration-200 group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #0f2744, #0e7490)",
                }}
              >
                JV
              </div>
              {/* Brand text with cyan gradient */}
              <span
                className="font-bold text-base sm:text-lg bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #0e7490, #06b6d4)",
                }}
              >
                JV TechHub Store
              </span>
            </Link>

            {/* RIGHT: controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <SunFill size={16} /> : <MoonFill size={16} />}
              </button>

              {/* Username with avatar initial */}
              <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                  {initial}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-slate-200 max-w-[120px] truncate">
                  {userName}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Logout"
              >
                <BoxArrowRight size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
