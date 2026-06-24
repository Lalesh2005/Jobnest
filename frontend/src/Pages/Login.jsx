import {useState} from "react";
import {loginUser} from "../services/authServices";


function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit =async  (e)=>{
        e.preventDefault();
        try{
            const userData = await loginUser({
                email,
                password
            })
            localStorage.setItem(
            "token",
            userData.token
    );
            console.log("Token Saved");
            console.log("SUCCESS");
            console.log(data);
        }
        catch(error){
            console.log(error.response?.data);
        }
    }
    return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
 
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-950 opacity-60 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-indigo-950 opacity-70 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-[380px] h-[380px] rounded-full bg-blue-900 opacity-30 blur-3xl" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
 
      {/* Main layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row items-center justify-between gap-12">
 
        {/* ── LEFT SECTION ── */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg">
 
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Job<span className="text-blue-400">Nest</span>
            </span>
          </div>
 
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.12] tracking-tight mb-5">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Dream Job
            </span>
            <br />Faster
          </h1>
 
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-sm mb-10">
            Discover thousands of curated opportunities from top startups, remote-first teams, and Fortune 500 companies — all in one place.
          </p>
 
          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
            {[
              { icon: "🎯", label: "AI-matched roles" },
              { icon: "🌍", label: "Remote & hybrid" },
              { icon: "⚡", label: "1-click apply" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium backdrop-blur-sm"
              >
                <span>{icon}</span>{label}
              </span>
            ))}
          </div>
 
          {/* Social proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {["bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-emerald-500"].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-slate-950 flex items-center justify-center text-xs text-white font-bold`}>
                  {["A","J","M","S"][i]}
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm">
              <span className="text-white font-semibold">50,000+</span> professionals hired this year
            </p>
          </div>
        </div>
 
        {/* ── RIGHT SECTION — Login Card ── */}
        <div className="w-full max-w-md flex-shrink-0">
          {/* Glassmorphism card */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-2xl shadow-black/60 p-8 sm:p-10">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
 
            {/* Card header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-1.5">Welcome back</h2>
              <p className="text-slate-400 text-sm">Sign in to continue your job search</p>
            </div>
 
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
 
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.07] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/40 transition-all duration-200"
                    required
                  />
                </div>
              </div>
 
              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/[0.07] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/40 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
 
              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border transition-all duration-150 flex items-center justify-center ${rememberMe ? "bg-blue-600 border-blue-600" : "border-white/20 bg-white/[0.07]"}`}>
                      {rememberMe && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
 
              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/40 transition-all duration-200 hover:shadow-blue-800/50 hover:-translate-y-0.5 active:translate-y-0 mt-1"
              >
                Sign in
              </button>
            </form>
 
            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
 
            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.09] text-slate-300 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
 
            {/* Register */}
            <p className="text-center text-slate-500 text-sm mt-7">
              Don't have an account?{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Create one free
              </a>
            </p>
          </div>
 
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 mt-6">
            {[
              { icon: "🔒", label: "256-bit SSL" },
              { icon: "✓", label: "SOC 2 compliant" },
              { icon: "🛡️", label: "GDPR ready" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-600 text-xs">
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
