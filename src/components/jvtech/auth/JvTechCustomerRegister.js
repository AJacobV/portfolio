import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useJvTech } from "../JvTechContext";
import {
  PersonFill,
  EnvelopeFill,
  ShieldLockFill,
  EyeFill,
  EyeSlashFill,
  ArrowLeft,
} from "react-bootstrap-icons";

export default function JvTechCustomerRegister() {
  const { registerCustomer, darkMode } = useJvTech();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Full name is required.";
    if (!form.username.trim()) e.username = "Username is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if (!form.confirm_password)
      e.confirm_password = "Please confirm your password.";
    else if (form.password !== form.confirm_password)
      e.confirm_password = "Passwords do not match.";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = registerCustomer({
        full_name: form.full_name,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/jvtech/login"), 1800);
      } else {
        setErrors({ submit: result.error });
      }
      setLoading(false);
    }, 400);
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      type: "text",
      icon: <PersonFill size={15} />,
      placeholder: "Enter your full name",
    },
    {
      key: "username",
      label: "Username",
      type: "text",
      icon: <PersonFill size={15} />,
      placeholder: "Choose a username",
    },
    {
      key: "email",
      label: "Email Address",
      type: "email",
      icon: <EnvelopeFill size={15} />,
      placeholder: "Enter your email",
    },
    {
      key: "password",
      label: "Password",
      type: showPass ? "text" : "password",
      icon: <ShieldLockFill size={15} />,
      placeholder: "Minimum 8 characters",
    },
    {
      key: "confirm_password",
      label: "Confirm Password",
      type: showPass ? "text" : "password",
      icon: <ShieldLockFill size={15} />,
      placeholder: "Repeat your password",
    },
  ];

  return (
    <div className={`jvtech-app${darkMode ? " dark" : ""}`}>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="w-full max-w-md">
          {/* Back link */}
          <Link
            to="/jvtech/login"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Login
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            {/* Header */}
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30">
                <PersonFill size={22} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Create Account
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Join JV TechHub Store
              </p>
            </div>

            {success ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-slate-900 dark:text-white text-lg">
                  Account Created!
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  Redirecting to login...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.submit && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm">
                    {errors.submit}
                  </div>
                )}
                {fields.map(({ key, label, type, icon, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        {icon}
                      </span>
                      <input
                        type={type}
                        value={form[key]}
                        onChange={handleChange(key)}
                        placeholder={placeholder}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 ${errors[key] ? "border-red-400 focus:ring-red-500/30 focus:border-red-500" : "border-slate-200 dark:border-slate-700 focus:ring-cyan-500/30 focus:border-cyan-500"}`}
                      />
                      {(key === "password" || key === "confirm_password") && (
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPass ? (
                            <EyeSlashFill size={14} />
                          ) : (
                            <EyeFill size={14} />
                          )}
                        </button>
                      )}
                    </div>
                    {errors[key] && (
                      <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm transition-all disabled:opacity-60 shadow-lg shadow-cyan-500/25 mt-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <PersonFill size={15} />
                  )}
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            )}

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/jvtech/login"
                className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
