import JobCard from "./JobCard";

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 px-4 text-center">
    <div className="
      w-16 h-16 rounded-2xl mb-6 flex items-center justify-center
      bg-white/[0.04] border border-white/[0.08]
    ">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-slate-600">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    </div>
    <h3 className="text-white font-bold text-xl mb-2">No jobs found</h3>
    <p className="text-slate-500 text-sm max-w-xs">
      Try adjusting your search or filters to discover more opportunities.
    </p>
  </div>
);

// ─── Skeleton Card ────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="
    rounded-3xl p-5 sm:p-6
    bg-white/[0.03] border border-white/[0.06]
    animate-pulse
  ">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/[0.06] rounded-lg w-3/4" />
        <div className="h-3 bg-white/[0.04] rounded-lg w-1/2" />
      </div>
    </div>
    <div className="flex gap-4 mb-4">
      <div className="h-3 bg-white/[0.04] rounded-lg w-20" />
      <div className="h-3 bg-white/[0.04] rounded-lg w-16" />
      <div className="h-3 bg-white/[0.04] rounded-lg w-18" />
    </div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 bg-white/[0.04] rounded-full w-16" />
      <div className="h-6 bg-white/[0.04] rounded-full w-20" />
      <div className="h-6 bg-white/[0.04] rounded-full w-14" />
    </div>
    <div className="h-px bg-white/[0.06] mb-4" />
    <div className="flex gap-2.5">
      <div className="h-10 bg-white/[0.04] rounded-xl flex-1" />
      <div className="h-10 bg-blue-600/20 rounded-xl flex-1" />
    </div>
  </div>
);

// ─── JobList ──────────────────────────────────────────────────────────────────

export default function JobList({ jobs, loading = false }) {
  // Show skeletons while loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {(!jobs || jobs.length === 0)
        ? <EmptyState />
        : jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
      }
    </div>
  );
}