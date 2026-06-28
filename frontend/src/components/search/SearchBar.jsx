import { useState, useCallback, useRef, useEffect } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

// ─── Config ───────────────────────────────────────────────────────────────────

const FILTER_PILLS = [
  { id: "remote",   label: "Remote"    },
  { id: "fulltime", label: "Full Time" },
  { id: "react",    label: "React"     },
  { id: "nodejs",   label: "Node.js"   },
  { id: "hybrid",   label: "Hybrid"    },
  { id: "python",   label: "Python"    },
];

const SUGGESTIONS = [
  "Frontend Developer",
  "Full Stack Engineer",
  "React Developer",
  "Node.js Engineer",
  "Product Designer",
  "Data Scientist",
];

// ─── Filter Pill ──────────────────────────────────────────────────────────────

const FilterPill = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`
      inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold
      border transition-all duration-200 select-none whitespace-nowrap
      ${selected
        ? "bg-blue-600/20 border-blue-500/50 text-blue-300 shadow-[0_0_12px_-2px_rgba(59,130,246,0.3)]"
        : "bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.14]"}
    `}
  >
    {selected && <CheckIcon />}
    {label}
  </button>
);

// ─── SearchBar ────────────────────────────────────────────────────────────────

export default function SearchBar({ jobCount = 1240, onSearch, onFilterChange }) {
  const [query,       setQuery]       = useState("");
  const [selected,    setSelected]    = useState(new Set());
  const [focused,     setFocused]     = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);

  const inputRef = useRef(null);
  const wrapRef  = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setShowSuggest(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const togglePill = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      if (typeof onFilterChange === "function") onFilterChange([...next]);
      return next;
    });
  }, [onFilterChange]);

  const handleSearch = () => {
    setShowSuggest(false);
    if (typeof onSearch === "function") {
      onSearch({ query: query.trim(), filters: [...selected] });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") { setShowSuggest(false); inputRef.current?.blur(); }
  };

  const filteredSuggestions = SUGGESTIONS.filter(
    (s) => query.length > 0 && s.toLowerCase().includes(query.toLowerCase())
  );

  const hasFilters = selected.size > 0 || query.length > 0;

  return (
    <section className="relative w-full bg-slate-950 pt-8 pb-10 px-4 sm:px-6">

      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-80 h-64 rounded-full bg-blue-700/8 blur-[90px]" />
        <div className="absolute -top-10 right-1/4 w-72 h-56 rounded-full bg-indigo-700/8 blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
            <SparkleIcon />
            Updated daily with new opportunities
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3 leading-tight">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Dream Job
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
            Explore thousands of opportunities from top companies worldwide.
          </p>
        </div>

        {/* Glass Search Card */}
        <div className="
          rounded-3xl p-5 sm:p-6
          bg-white/[0.04] backdrop-blur-xl
          border border-white/[0.08]
          shadow-[0_8px_48px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]
        ">

          {/* Input + Button Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">

            {/* Search Input */}
            <div ref={wrapRef} className="relative flex-1">
              <span className={`
                absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200
                ${focused ? "text-blue-400" : "text-slate-500"}
              `}>
                <SearchIcon />
              </span>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggest(true); }}
                onFocus={() => { setFocused(true); setShowSuggest(true); }}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Search jobs, companies, skills..."
                autoComplete="off"
                className="
                  w-full h-14 pl-12 pr-10 rounded-2xl
                  bg-white/[0.05] hover:bg-white/[0.07]
                  border border-white/[0.08]
                  text-white placeholder:text-slate-500 text-sm font-medium
                  outline-none
                  focus:bg-white/[0.07] focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-200
                "
              />

              {query.length > 0 && (
                <button
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <CloseIcon />
                </button>
              )}

              {/* Autocomplete */}
              {showSuggest && filteredSuggestions.length > 0 && (
                <div className="
                  absolute top-[calc(100%+6px)] left-0 right-0 z-50 rounded-2xl overflow-hidden
                  bg-slate-900/95 backdrop-blur-xl border border-white/[0.08]
                  shadow-[0_16px_48px_-8px_rgba(0,0,0,0.7)]
                ">
                  {filteredSuggestions.map((s) => (
                    <button
                      key={s}
                      onMouseDown={(e) => { e.preventDefault(); setQuery(s); setShowSuggest(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 text-left"
                    >
                      <SearchIcon className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="
                h-14 px-8 rounded-2xl font-semibold text-sm text-white whitespace-nowrap
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-500 hover:to-indigo-500
                active:scale-[0.97]
                shadow-[0_4px_20px_-4px_rgba(99,102,241,0.5)]
                hover:shadow-[0_4px_28px_-4px_rgba(99,102,241,0.7)]
                transition-all duration-200
                flex items-center gap-2 relative overflow-hidden
              "
            >
              <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-2xl" />
              <SearchIcon className="w-4 h-4" />
              <span>Search Jobs</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mb-5" />

          {/* Filter Pills + Jobs Count */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest mr-1 hidden sm:block">
              Filter
            </span>
            {FILTER_PILLS.map((pill) => (
              <FilterPill
                key={pill.id}
                label={pill.label}
                selected={selected.has(pill.id)}
                onClick={() => togglePill(pill.id)}
              />
            ))}
            {hasFilters && (
              <button
                onClick={() => { setSelected(new Set()); setQuery(""); }}
                className="
                  inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium
                  text-slate-500 hover:text-red-400
                  bg-white/[0.03] hover:bg-red-500/10
                  border border-white/[0.06] hover:border-red-500/20
                  transition-all duration-150
                "
              >
                <CloseIcon className="w-3 h-3" />
                Clear
              </button>
            )}

            {/* Jobs Found Badge */}
            <div className="sm:ml-auto mt-1 sm:mt-0">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-bold text-blue-300 tabular-nums">
                  {jobCount.toLocaleString()} Jobs Found
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}