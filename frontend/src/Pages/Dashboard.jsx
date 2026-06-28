import { useState, useEffect } from "react";
import Navbar   from "../components/layout/Navbar";
import SearchBar from "../components/search/SearchBar";
import JobList  from "../components/jobs/JobList";
import { getAllJobs } from "../services/jobServices";

// ─── Jobs Found Counter ───────────────────────────────────────────────────────

const JobsFoundHeader = ({ count, loading }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-white font-bold text-xl sm:text-2xl">
        {loading ? (
          <span className="inline-block w-40 h-6 bg-white/[0.06] rounded-lg animate-pulse" />
        ) : (
          <>
            {count.toLocaleString()}{" "}
            <span className="text-slate-400 font-normal text-lg">jobs available</span>
          </>
        )}
      </h2>
      <p className="text-slate-500 text-sm mt-1">
        Showing all matched opportunities
      </p>
    </div>

    {/* Sort indicator — placeholder for future sort dropdown */}
    <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="14" y2="12" />
        <line x1="4" y1="18" x2="10" y2="18" />
      </svg>
      Most Relevant
    </div>
  </div>
);

// ─── Pagination Placeholder ───────────────────────────────────────────────────

const PaginationPlaceholder = ({ total }) => {
  if (!total || total === 0) return null;
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {[1, 2, 3, "...", 8].map((page, i) => (
        <button
          key={i}
          className={`
            w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200
            ${page === 1
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_16px_-4px_rgba(99,102,241,0.5)]"
              : "bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08]"}
          `}
        >
          {page}
        </button>
      ))}
      <button className="
        h-9 px-4 rounded-xl text-sm font-medium
        bg-white/[0.04] border border-white/[0.08] text-slate-400
        hover:text-white hover:bg-white/[0.08]
        transition-all duration-200
        flex items-center gap-1.5
      ">
        Next
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [jobs,    setJobs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // Exact naming convention from spec
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobsData = await getAllJobs();
      setJobs(jobsData.jobs);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setError("Unable to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">

      {/* ── Ambient background ── */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-950/40 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-950/40 blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/2 w-[800px] h-[400px] rounded-full bg-blue-950/20 blur-[120px] -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Search Section ── */}
      <SearchBar
        jobCount={loading ? 0 : jobs.length}
        onSearch={({ query, filters }) => {
          // Future: wire to filtered fetch or local filter
          console.log("Search:", query, filters);
        }}
      />

      {/* ── Main Content ── */}
      <main className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">

        {/* Error Banner */}
        {error && (
          <div className="
            mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl
            bg-red-500/10 border border-red-500/20 text-red-300 text-sm
          ">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
            <button
              onClick={fetchJobs}
              className="ml-auto text-xs font-semibold underline hover:text-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Jobs Found Count ── */}
        <JobsFoundHeader count={jobs.length} loading={loading} />

        {/* ── Job List ── */}
        <JobList jobs={jobs} loading={loading} />

        {/* ── Pagination Placeholder ── */}
        <PaginationPlaceholder total={jobs.length} />
      </main>
    </div>
  );
}