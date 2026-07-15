import React, { useState, useEffect } from "react";
import { useJvTech } from "../JvTechContext";
import {
  PersonFill,
  EnvelopeFill,
  ShieldLockFill,
  KeyFill,
} from "react-bootstrap-icons";

export default function JvTechProfile() {
  const { currentUser, updateProfile } = useJvTech();
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setForm({
        full_name: currentUser.full_name || currentUser.customer_name || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
      });
    }
  }, [currentUser]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.full_name.trim()) return setError("Full Name is required");
    if (!form.email.trim()) return setError("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("Invalid email format");
    if (currentUser.portal === "admin" && !form.username.trim())
      return setError("Username is required");
    if (form.password && form.password.length < 8)
      return setError("Password must be at least 8 characters");

    setLoading(true);
    setTimeout(() => {
      const updates = { ...form };
      if (currentUser.portal === "customer") {
        updates.customer_name = form.full_name;
        delete updates.full_name;
        delete updates.username;
      }
      if (!form.password) delete updates.password;

      updateProfile(updates);
      setForm((prev) => ({ ...prev, password: "" }));
      setError("");
      showToast("Profile updated successfully!");
      setLoading(false);
    }, 500);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Recently";
    return new Date(dateStr).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className="absolute top-0 right-0 z-50 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 jvtech-fade-in dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center shadow-sm relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-[#0f2744] to-[#0e7490] opacity-20 dark:opacity-40"></div>

            <div className="relative z-10">
              <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#0f2744] to-[#0e7490] flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-cyan-900/20 mb-4 border-4 border-white dark:border-slate-900">
                {(currentUser.full_name || currentUser.customer_name || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {currentUser.full_name || currentUser.customer_name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
                {currentUser.email}
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {currentUser.portal === "admin" ? (
                  currentUser.role === "admin" ? (
                    <ShieldLockFill className="text-purple-500" />
                  ) : (
                    <PersonFill className="text-blue-500" />
                  )
                ) : (
                  <PersonFill className="text-cyan-500" />
                )}
                <span className="uppercase tracking-wider">
                  {currentUser.portal === "admin"
                    ? currentUser.role
                    : "Customer"}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-left space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Member since
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {formatDate(currentUser.created_at)}
                </span>
              </div>
              {currentUser.portal === "admin" && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Username
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {currentUser.username}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Edit Profile
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Update your personal information and password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <PersonFill className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={form.full_name}
                      onChange={(e) =>
                        setForm({ ...form, full_name: e.target.value })
                      }
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                {currentUser.portal === "admin" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Username
                    </label>
                    <div className="relative">
                      <PersonFill className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={form.username}
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>
                )}

                <div
                  className={
                    currentUser.portal === "customer" ? "md:col-span-2" : ""
                  }
                >
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeFill className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Change Password
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Leave this blank if you don't want to change your password.
                </p>

                <div className="max-w-md">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <KeyFill className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      placeholder="Minimum 8 characters"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-70 flex items-center justify-center min-w-[140px]"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
