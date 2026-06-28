import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Config ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Dashboard",    to: "/dashboard"    },
  { label: "Saved Jobs",   to: "/saved-jobs"   },
  { label: "Applied Jobs", to: "/applied-jobs" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Logo = () => (
  <Link to="/dashboard" className="flex items-center gap-2.5 group select-none">
    <div className="
      relative w-9 h-9 rounded-xl flex items-center justify-center
      bg-gradient-to-br from-blue-600 to-indigo-600
      shadow-lg shadow-blue-900/40
      group-hover:shadow-blue-700/50 group-hover:scale-105
      transition-all duration-300
    ">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <BriefcaseIcon />
    </div>
    <span className="text-[1.15rem] font-bold tracking-tight leading-none">
      <span className="text-white">Job</span>
      <span className="text-blue-400">Nest</span>
    </span>
  </Link>
);

const NavLink = ({ to, label }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  return (
    <Link to={to} className={`
      relative text-sm font-medium px-1 py-1 transition-colors duration-200
      ${isActive ? "text-white" : "text-slate-400 hover:text-white"}
    `}>
      {label}
      <span className={`
        absolute -bottom-0.5 left-0 h-[2px] rounded-full
        bg-gradient-to-r from-blue-500 to-indigo-500
        transition-all duration-300
        ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}
      `} />
    </Link>
  );
};

const Avatar = ({ name = "U" }) => {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="
      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
      bg-gradient-to-br from-blue-600 to-indigo-600
      ring-2 ring-blue-500/30 ring-offset-2 ring-offset-slate-950
      text-white select-none
    ">
      {initials}
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const userName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className={`
        fixed top-0 left-0 right-0 z-50
        h-[70px] flex items-center
        px-4 sm:px-6 lg:px-8
        bg-slate-950/70 backdrop-blur-xl
        border-b border-white/[0.06]
        transition-all duration-300
        ${scrolled ? "shadow-[0_4px_32px_-4px_rgba(0,0,0,0.5)]" : ""}
      `}>
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-indigo-950/20" />

        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* LEFT — Logo */}
          <Logo />

          {/* CENTER — Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => <NavLink key={l.to} {...l} />)}
          </nav>

          {/* RIGHT — Actions */}
          <div className="flex items-center gap-2">

            {/* Notification Bell */}
            <button aria-label="Notifications" className="
              hidden sm:flex items-center justify-center
              w-9 h-9 rounded-xl
              text-slate-400 hover:text-white
              bg-white/[0.04] hover:bg-white/[0.08]
              border border-white/[0.06] hover:border-white/[0.12]
              transition-all duration-200 relative
            ">
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 ring-1 ring-slate-950 animate-pulse" />
            </button>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative hidden sm:block">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className={`
                  flex items-center gap-2 px-2.5 py-1.5 rounded-xl
                  bg-white/[0.04] hover:bg-white/[0.08]
                  border transition-all duration-200
                  ${profileOpen ? "border-blue-500/40 bg-white/[0.08]" : "border-white/[0.06] hover:border-white/[0.12]"}
                `}
              >
                <Avatar name={userName} />
                <span className="text-sm font-medium text-slate-300 hidden lg:block max-w-[96px] truncate">{userName}</span>
                <ChevronIcon open={profileOpen} />
              </button>

              {profileOpen && (
                <div className="
                  absolute right-0 top-[calc(100%+8px)] w-52 rounded-2xl overflow-hidden
                  bg-slate-900/95 backdrop-blur-xl
                  border border-white/[0.08]
                  shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6)]
                ">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <p className="text-sm font-semibold text-white truncate">{userName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Logged in</p>
                  </div>
                  <div className="p-1.5">
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="
                      flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300
                      hover:text-white hover:bg-white/[0.06] transition-colors duration-150
                    ">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      My Profile
                    </Link>
                    <div className="my-1 border-t border-white/[0.06]" />
                    <button onClick={handleLogout} className="
                      w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm
                      text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-150
                    ">
                      <LogoutIcon />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Logout — md+ */}
            <button onClick={handleLogout} className="
              hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium
              text-slate-400 hover:text-red-400
              bg-white/[0.04] hover:bg-red-500/10
              border border-white/[0.06] hover:border-red-500/20
              transition-all duration-200
            ">
              <LogoutIcon />
              <span className="hidden lg:inline">Logout</span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="
                md:hidden flex items-center justify-center
                w-9 h-9 rounded-xl
                text-slate-400 hover:text-white
                bg-white/[0.04] hover:bg-white/[0.08]
                border border-white/[0.06]
                transition-all duration-200
              "
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`
          md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Mobile Drawer */}
      <div className={`
        md:hidden fixed top-[70px] left-0 right-0 z-40
        transition-all duration-300 ease-in-out
        ${mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
      `}>
        <div className="mx-3 mt-2 rounded-2xl overflow-hidden bg-slate-900/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.06]">
            <Avatar name={userName} />
            <div>
              <p className="text-sm font-semibold text-white">{userName}</p>
              <p className="text-xs text-slate-500">Logged in</p>
            </div>
            <button aria-label="Notifications" className="ml-auto text-slate-400 hover:text-white relative">
              <BellIcon />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 ring-1 ring-slate-900" />
            </button>
          </div>
          <nav className="p-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link key={link.to} to={link.to} className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-white border border-blue-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"}
                `}>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-2 border-t border-white/[0.06]">
            <button onClick={handleLogout} className="
              w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
              text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150
            ">
              <LogoutIcon />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[70px]" />
    </>
  );
}