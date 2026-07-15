import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useJvTech } from "../JvTechContext";
import {
  EyeFill,
  EyeSlashFill,
  ShieldLockFill,
  PersonFill,
  MoonFill,
  SunFill,
  BarChartFill,
  ShieldCheck,
  LightningChargeFill,
} from "react-bootstrap-icons";

export default function JvTechLogin() {
  const { login, darkMode, toggleDarkMode } = useJvTech();
  const navigate = useNavigate();

  const [mode, setMode] = useState("customer"); // 'customer' | 'staff'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError("Username / Email is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(
        username.trim(),
        password,
        mode === "staff" ? "admin" : "customer",
      );
      if (result.success) {
        if (mode === "customer") {
          navigate("/jvtech/customer-portal");
        } else {
          navigate("/jvtech/dashboard");
        }
      } else {
        setError(result.error || "Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className={`jvtech-app${darkMode ? " dark" : ""}`}>
      <div className="min-h-screen flex font-['Inter',system-ui,sans-serif]">
        {/* Left Side - Branding with Logo as Hero */}
        <div className="hidden lg:flex lg:w-1/2 jvtech-animated-bg relative overflow-hidden">
          {/* Background Elements */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
            {/* Large Logo as Hero */}
            <div className="jvtech-float mb-8">
              <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden jvtech-pulse-glow border-4 border-white/20">
                <img
                  src="/jvtech/images/logo.png"
                  alt="JV TechHub"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Tagline */}
            <div className="text-center max-w-md">
              <p className="text-cyan-100 text-xl xl:text-2xl font-light mb-2">
                Inventory & Sales
              </p>
              <p className="text-white/60 text-lg">Management System</p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <BarChartFill className="w-4 h-4 text-cyan-300" />
                <span className="text-white/80 text-sm font-medium">
                  Analytics
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                <span className="text-white/80 text-sm font-medium">
                  Secure
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <LightningChargeFill className="w-4 h-4 text-cyan-300" />
                <span className="text-white/80 text-sm font-medium">Fast</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50 dark:bg-slate-950">
          <div className="w-full max-w-md relative">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-block">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-cyan-500/30 shadow-xl shadow-cyan-500/20 mx-auto mb-3">
                  <img
                    src="/jvtech/images/logo.png"
                    alt="JV TechHub"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Inventory & Sales Management
                </p>
              </div>
            </div>

            {/* Header with Dark Mode Toggle */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Welcome back
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Sign in to continue
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl text-slate-500 hover:text-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm border border-slate-200 dark:border-slate-800"
              >
                {darkMode ? (
                  <SunFill className="w-5 h-5" />
                ) : (
                  <MoonFill className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Login Mode Tabs */}
            <div className="flex mb-6 bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setMode("customer");
                  setError("");
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  mode === "customer"
                    ? "bg-white dark:bg-slate-950 shadow-sm text-emerald-600 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <PersonFill className="w-4 h-4" /> Customer
              </button>
              <button
                onClick={() => {
                  setMode("staff");
                  setError("");
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  mode === "staff"
                    ? "bg-white dark:bg-slate-950 shadow-sm text-cyan-600 dark:text-cyan-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <ShieldLockFill className="w-4 h-4" /> Staff / Admin
              </button>
            </div>

            {/* Login Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-8">
              {/* Error Messages */}
              {error && (
                <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 dark:text-red-400 font-bold">
                        !
                      </span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username / Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {mode === "customer" ? "Email Address" : "Username"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <PersonFill className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type={mode === "customer" ? "email" : "text"}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={
                        mode === "customer"
                          ? "Enter your email"
                          : "Enter your username"
                      }
                      required
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
                        mode === "customer"
                          ? "focus:ring-emerald-500/20 focus:border-emerald-500"
                          : "focus:ring-cyan-500/20 focus:border-cyan-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <ShieldLockFill className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className={`w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 transition-all ${
                        mode === "customer"
                          ? "focus:ring-emerald-500/20 focus:border-emerald-500"
                          : "focus:ring-cyan-500/20 focus:border-cyan-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      {showPass ? (
                        <EyeSlashFill className="w-5 h-5" />
                      ) : (
                        <EyeFill className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className={`w-4 h-4 rounded border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 ${
                        mode === "customer"
                          ? "text-emerald-500 focus:ring-emerald-500"
                          : "text-cyan-500 focus:ring-cyan-500"
                      }`}
                    />
                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                      Remember me
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center gap-2 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed ${
                    mode === "customer"
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 focus:ring-emerald-500/50 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
                      : "bg-gradient-to-r from-[#0f2744] to-[#0e7490] hover:from-[#0a1628] hover:to-[#0891b2] focus:ring-cyan-500/50 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30"
                  }`}
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ShieldLockFill className="w-5 h-5" />
                  )}
                  {mode === "customer"
                    ? "Sign in to Shop"
                    : "Sign in to Dashboard"}
                </button>
              </form>
            </div>

            {/* Demo Credentials Box */}
            <div
              className={`mt-6 p-4 rounded-2xl border ${
                mode === "customer"
                  ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/50"
                  : "bg-cyan-50/50 dark:bg-cyan-900/10 border-cyan-100 dark:border-cyan-800/50"
              }`}
            >
              <p
                className={`text-sm font-bold mb-1 ${
                  mode === "customer"
                    ? "text-emerald-800 dark:text-emerald-400"
                    : "text-cyan-800 dark:text-cyan-400"
                }`}
              >
                Demo credentials:
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                {mode === "customer"
                  ? "Email: test@gmail.com"
                  : "Username: admin@gmail.com"}{" "}
                <br />
                Password: password123
              </p>
            </div>

            {/* Register Link (Customer Only) */}
            {mode === "customer" && (
              <div className="mt-6 text-center">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/jvtech/register"
                    className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                &copy; {new Date().getFullYear()} JV TechHub. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
