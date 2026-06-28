import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 flex-shrink-0">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SalaryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 flex-shrink-0">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 flex-shrink-0">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FallbackLogo = ({ company }) => {
  const initials = (company || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-sm font-bold bg-gradient-to-br from-blue-400 to-indigo-400 bg-clip-text text-transparent">
        {initials}
      </span>
    </div>
  );
};

const MetaChip = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 text-xs text-slate-400">
    <span className="text-slate-500">{icon}</span>
    <span>{label}</span>
  </div>
);

const SkillTag = ({ label }) => (
  <span className="
    inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold
    bg-blue-500/10 border border-blue-500/20 text-blue-300
    hover:bg-blue-500/18 hover:border-blue-400/30
    transition-colors duration-150 cursor-default
  ">
    {label}
  </span>
);

// ─── JobCard ──────────────────────────────────────────────────────────────────

export default function JobCard({ job }) {
  const [saved,      setSaved]      = useState(false);
  const [imgError,   setImgError]   = useState(false);
  const [applyPress, setApplyPress] = useState(false);

  // Safely destructure with fallbacks
  const {
    title,
    company,
    location,
    salary,
    jobType,
    skills,
    logo,
    postedAt,
    sourceUrl
} = job || {};


  const handleApply = () => {
    setApplyPress(true);
    window.open(job.sourceUrl, "_blank");
    setTimeout(() => setApplyPress(false), 600);
};

  const showFallback  = !logo || imgError;
  const visibleSkills = skills.slice(0, 4);
  const extraCount    = skills.length - visibleSkills.length;

  return (
    <article className="
      group relative flex flex-col gap-4
      rounded-3xl p-5 sm:p-6
      bg-white/[0.04] backdrop-blur-xl
      border border-white/[0.08]
      shadow-[0_4px_32px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]
      hover:bg-white/[0.065]
      hover:border-blue-500/25
      hover:shadow-[0_8px_48px_-8px_rgba(59,130,246,0.18),inset_0_1px_0_rgba(255,255,255,0.07)]
      hover:scale-[1.012]
      transition-all duration-300 ease-out
    ">

      {/* ── Top: Logo + Title + Save ── */}
      <div className="flex items-start gap-4">

        {/* Company Logo */}
        <div className="
          relative flex-shrink-0 w-12 h-12 rounded-2xl overflow-hidden
          bg-white/[0.06] border border-white/[0.1]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
          group-hover:border-white/[0.15] transition-colors duration-300
        ">
          {showFallback
            ? <FallbackLogo company={company} />
            : <img src={logo} alt={`${company} logo`} onError={() => setImgError(true)} className="w-full h-full object-contain p-1.5" />
          }
        </div>

        {/* Title + Company */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg sm:text-xl leading-snug truncate mb-0.5">
            {title}
          </h3>
          <p className="text-slate-300 text-sm font-medium truncate">{company}</p>
        </div>

        {/* Save */}
        <button
          onClick={() => setSaved((v) => !v)}
          aria-label={saved ? "Unsave job" : "Save job"}
          className={`
            flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl
            border transition-all duration-200
            ${saved
              ? "bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-[0_0_12px_-2px_rgba(59,130,246,0.4)]"
              : "bg-white/[0.04] border-white/[0.08] text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30"}
          `}
        >
          <BookmarkIcon filled={saved} />
        </button>
      </div>

      {/* ── Meta ── */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <MetaChip icon={<LocationIcon />} label={location} />
        <MetaChip icon={<SalaryIcon />}   label={salary}   />
        <MetaChip icon={<ClockIcon />}    label={jobType}  />
      </div>

      {/* ── Skills ── */}
      {visibleSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {visibleSkills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
          {extraCount > 0 && (
            <span className="
              inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold
              bg-white/[0.04] border border-white/[0.08] text-slate-500
            ">
              +{extraCount} more
            </span>
          )}
        </div>
      )}

      {/* ── Divider ── */}
      <div className="h-px bg-white/[0.06]" />

      {/* ── Footer: time + buttons ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {postedAt && (
          <span className="text-xs text-slate-600 sm:flex-1">{postedAt}</span>
        )}
        <div className="flex gap-2.5 w-full sm:w-auto">

          {/* View Details */}
          <button className="
            flex-1 sm:flex-none
            inline-flex items-center justify-center gap-1.5
            h-10 px-4 rounded-xl
            text-sm font-semibold text-slate-300
            bg-white/[0.05] hover:bg-white/[0.09] hover:text-white
            border border-white/[0.08] hover:border-white/[0.16]
            transition-all duration-200
          ">
            View Details
            <ArrowIcon />
          </button>

          {/* Apply Now */}
          <button
            onClick={handleApply}
            className={`
              flex-1 sm:flex-none
              inline-flex items-center justify-center
              h-10 px-5 rounded-xl
              text-sm font-bold text-white
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-500 hover:to-indigo-500
              shadow-[0_4px_16px_-4px_rgba(99,102,241,0.45)]
              hover:shadow-[0_4px_24px_-4px_rgba(99,102,241,0.65)]
              active:scale-[0.97] transition-all duration-200
              relative overflow-hidden
              ${applyPress ? "scale-[0.97]" : ""}
            `}
          >
            <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-xl" />
            <span className="relative">Apply Now</span>
          </button>
        </div>
      </div>

      {/* Hover ring */}
      <div className="
        pointer-events-none absolute inset-0 rounded-3xl opacity-0
        group-hover:opacity-100 transition-opacity duration-300
        shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)]
      " />
    </article>
  );
}