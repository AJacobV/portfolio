import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  HouseDoorFill,
  PeopleFill,
  BoxSeamFill,
  PersonFill,
  CartFill,
  ClipboardDataFill,
  CurrencyDollar,
  FileTextFill,
  GearFill,
  BoxArrowRight,
  List,
  MoonFill,
  SunFill,
  Search,
  BellFill,
  XLg,
  PersonCircle,
} from "react-bootstrap-icons";
import { useJvTech } from "../JvTechContext";

/* ── Nav definition ────────────────────────────────────────── */
const NAV_SECTIONS = [
  {
    label: "MAIN MENU",
    items: [
      {
        to: "/jvtech/dashboard",
        icon: HouseDoorFill,
        label: "Dashboard",
        roles: ["admin", "employee"],
      },
      {
        to: "/jvtech/users",
        icon: PeopleFill,
        label: "Users",
        roles: ["admin"],
      },
    ],
  },
  {
    label: "INVENTORY",
    items: [
      {
        to: "/jvtech/shop",
        icon: CartFill,
        label: "Shop / POS",
        roles: ["admin", "employee"],
      },
      {
        to: "/jvtech/products",
        icon: BoxSeamFill,
        label: "Products",
        roles: ["admin", "employee"],
      },
      {
        to: "/jvtech/customers",
        icon: PersonFill,
        label: "Customers",
        roles: ["admin", "employee"],
      },
    ],
  },
  {
    label: "SALES HISTORY",
    items: [
      {
        to: "/jvtech/transactions",
        icon: CurrencyDollar,
        label: "Transactions",
        roles: ["admin", "employee"],
      },
      {
        to: "/jvtech/sales",
        icon: ClipboardDataFill,
        label: "Sales",
        roles: ["admin", "employee"],
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        to: "/jvtech/logs",
        icon: FileTextFill,
        label: "Logs",
        roles: ["admin"],
      },
    ],
  },
];

/* ── Helpers ───────────────────────────────────────────────── */
function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ── Component ─────────────────────────────────────────────── */
export default function JvTechAdminLayout({
  children,
  pageTitle = "Dashboard",
}) {
  const {
    currentUser,
    logout,
    darkMode,
    toggleDarkMode,
    products = [],
    customers = [],
  } = useJvTech();
  const user = currentUser;
  const role = currentUser?.role;
  const navigate = useNavigate();
  const location = useLocation();

  /* sidebar collapse */
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("jvtech_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  /* mobile sidebar overlay */
  const [mobileOpen, setMobileOpen] = useState(false);

  /* search */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  /* user dropdown */
  const [userDropOpen, setUserDropOpen] = useState(false);
  const userDropRef = useRef(null);

  /* ── Effects ─────────────────────────────────────────────── */
  useEffect(() => {
    try {
      localStorage.setItem("jvtech_sidebar_collapsed", String(collapsed));
    } catch {
      /* noop */
    }
  }, [collapsed]);

  /* search */
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }

    const matchedProducts = (products || [])
      .filter((p) => p.name?.toLowerCase().includes(q))
      .slice(0, 4)
      .map((p) => ({
        type: "product",
        label: p.name,
        sub: `₱${p.price ?? "—"}`,
        to: "/jvtech/products",
      }));

    const matchedCustomers = (customers || [])
      .filter((c) => c.name?.toLowerCase().includes(q))
      .slice(0, 4)
      .map((c) => ({
        type: "customer",
        label: c.name,
        sub: c.email ?? "",
        to: "/jvtech/customers",
      }));

    setSearchResults([...matchedProducts, ...matchedCustomers]);
    setSearchOpen(true);
  }, [searchQuery, products, customers]);

  /* close dropdowns on outside click */
  useEffect(() => {
    function handle(e) {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
      if (userDropRef.current && !userDropRef.current.contains(e.target))
        setUserDropOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  /* ── Derived ─────────────────────────────────────────────── */
  const sidebarW = collapsed ? "w-[72px]" : "w-[288px]";
  const userName = user?.full_name || user?.name || "User";
  const userRole = role ?? "employee";
  const initials = getInitials(userName);

  const roleBadgeClass =
    userRole === "admin"
      ? "bg-purple-600 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase font-semibold"
      : "bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase font-semibold";

  function handleLogout() {
    logout();
    navigate("/jvtech/login");
  }

  /* ── Sidebar content (shared between desktop + mobile) ───── */
  function SidebarContent({ onClose }) {
    return (
      <div
        className={`jvtech-gradient-sidebar flex flex-col h-full ${onClose ? "w-[288px]" : sidebarW} transition-all duration-300 overflow-hidden jvtech-sidebar`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo circle */}
            <div
              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              style={{
                background: "linear-gradient(135deg, #0f2744, #0e7490)",
              }}
            >
              JV
            </div>
            {(!collapsed || onClose) && (
              <span className="text-white font-semibold text-sm truncate">
                JV TechHub
              </span>
            )}
          </div>
          {onClose ? (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <XLg size={16} />
            </button>
          ) : (
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            >
              <List size={18} />
            </button>
          )}
        </div>

        {/* User mini-profile */}
        <div
          className={`flex items-center gap-3 px-3 py-3 border-b border-white/10 shrink-0 ${collapsed && !onClose ? "justify-center" : ""}`}
        >
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs shadow">
              {initials}
            </div>
            {/* online dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900 block" />
          </div>
          {(!collapsed || onClose) && (
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">
                {userName}
              </p>
              <span className={roleBadgeClass}>{userRole}</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV_SECTIONS.map((section) => {
            const visibleItems = section.items.filter((item) =>
              item.roles.includes(userRole),
            );
            if (!visibleItems.length) return null;
            return (
              <div key={section.label} className="mb-2">
                {(!collapsed || onClose) && (
                  <p className="text-slate-500 text-[9px] font-semibold uppercase tracking-widest px-4 py-1.5">
                    {section.label}
                  </p>
                )}
                {visibleItems.map((item) => {
                  const isActive = location.pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 mx-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative
                        ${
                          isActive
                            ? "bg-cyan-500/20 text-white"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }
                        ${collapsed && !onClose ? "justify-center px-3" : "pl-5 pr-3"}
                      `}
                    >
                      {/* active indicator dot */}
                      {isActive && (
                        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 jvtech-pulse-glow" />
                      )}
                      <Icon size={17} className="shrink-0" />
                      {(!collapsed || onClose) && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Bottom: Profile + Logout */}
        <div className="border-t border-white/10 px-2 py-3 shrink-0 space-y-1">
          <Link
            to="/jvtech/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all
              ${collapsed && !onClose ? "justify-center" : ""}
            `}
          >
            <GearFill size={17} className="shrink-0" />
            {(!collapsed || onClose) && <span>Profile</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all
              ${collapsed && !onClose ? "justify-center" : ""}
            `}
          >
            <BoxArrowRight size={17} className="shrink-0" />
            {(!collapsed || onClose) && <span>Logout</span>}
          </button>
        </div>
      </div>
    );
  }

  /* ── Render ───────────────────────────────────────────────── */
  return (
    <div className={`jvtech-app${darkMode ? " dark" : ""}`}>
      {/* Root fixed container */}
      <div className="fixed inset-0 flex flex-row overflow-hidden bg-gray-50 dark:bg-slate-950">
        {/* ── Desktop Sidebar ──────────────────────────────── */}
        <aside
          className={`hidden md:flex flex-col shrink-0 ${sidebarW} transition-all duration-300`}
        >
          <SidebarContent />
        </aside>

        {/* ── Mobile Sidebar Overlay ───────────────────────── */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            {/* drawer */}
            <div
              className="absolute left-0 top-0 h-full z-50 jvtech-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* ── Main area ────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Top Bar */}
          <header className="jvtech-topbar shrink-0 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center px-4 gap-4">
            {/* Hamburger (mobile only) */}
            <button
              className="md:hidden text-slate-600 dark:text-slate-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <List size={22} />
            </button>

            {/* Page title */}
            <div className="min-w-0">
              <h1 className="text-base font-semibold text-gray-900 dark:text-white leading-tight truncate">
                {pageTitle}
              </h1>
              <p className="text-xs text-gray-400 dark:text-slate-500 leading-tight">
                Welcome back, {userName}
              </p>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            <div ref={searchRef} className="relative hidden sm:block">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 rounded-xl px-3 py-2 w-56">
                <Search size={14} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products, customers…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setSearchOpen(true)}
                  className="bg-transparent text-sm text-gray-700 dark:text-slate-200 placeholder-gray-400 outline-none w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }}
                  >
                    <XLg
                      size={12}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    />
                  </button>
                )}
              </div>

              {/* Dropdown */}
              {searchOpen && (
                <div className="absolute top-full mt-2 left-0 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 z-50 overflow-hidden jvtech-fade-in">
                  {searchResults.length === 0 ? (
                    <p className="text-xs text-gray-400 px-4 py-3">
                      No results found.
                    </p>
                  ) : (
                    searchResults.map((r, i) => (
                      <Link
                        key={i}
                        to={r.to}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <span
                          className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full ${r.type === "product" ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300" : "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"}`}
                        >
                          {r.type}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                            {r.label}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {r.sub}
                          </p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle dark mode"
            >
              {darkMode ? <SunFill size={16} /> : <MoonFill size={16} />}
            </button>

            {/* User avatar dropdown */}
            <div ref={userDropRef} className="relative">
              <button
                onClick={() => setUserDropOpen((v) => !v)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow">
                  {initials}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-slate-200">
                  {userName}
                </span>
              </button>

              {userDropOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 z-50 overflow-hidden jvtech-fade-in">
                  <Link
                    to="/jvtech/profile"
                    onClick={() => setUserDropOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <PersonCircle size={16} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <BoxArrowRight size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 flex-1 jvtech-fade-in">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
