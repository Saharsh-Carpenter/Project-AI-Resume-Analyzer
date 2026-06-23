import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
  return (
    <div className="min-h-screen text-slate-900">
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700">
              AI-Powered Resume Review
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              AI Resume Analyzer
            </h1>
          </div>

          <div className="flex gap-3">
            {!token ? (
              <>
                <Link
                  to="/demo"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                >
                  Try Demo
                </Link>

                <Link
                  to="/login"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 shadow-md"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 shadow-md"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                  className="rounded-xl border border-amber-300 bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 shadow-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                Resume feedback built for real job applications
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                Analyze your resume, improve ATS match, and save tailored reviews in one place.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg font-medium">
                AI Resume Analyzer helps students and job seekers review resume
                quality, compare against job descriptions, identify missing
                keywords, and keep a history of saved analyses for future
                improvement.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/demo"
                  className="rounded-2xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 shadow-md"
                >
                  Try Demo
                </Link>

                {!token ? (
                  <Link
                    to="/signup"
                    className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                  >
                    Create Account
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                  >
                    Dashboard
                  </Link>
                )}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-2xl font-bold text-blue-900">AI</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Structured resume feedback powered by intelligent analysis.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-2xl font-bold text-blue-900">ATS</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Compare against job descriptions and surface missing keywords.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-2xl font-bold text-blue-900">History</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Save, review, and manage previous analyses in one dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-blue-200 bg-blue-50 p-6 shadow-xl sm:p-8">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      Sample Analysis
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Software Developer Resume
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                      ATS Match
                    </p>
                    <p className="mt-1 text-sm font-bold text-emerald-800">
                      8/10
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                      Strengths
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-900 font-medium">
                      <li>Strong project relevance</li>
                      <li>Good React and Node.js alignment</li>
                      <li>Clear technical stack</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700">
                      Missing Keywords
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-900 font-medium">
                      <li>AWS</li>
                      <li>CI/CD</li>
                      <li>Scalability</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Summary
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700 font-medium">
                    This resume shows solid full-stack fundamentals and relevant
                    project work, but could improve ATS alignment by including
                    missing cloud and deployment-related keywords.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                Features
              </p>
              <h3 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Built like a modern career tool, not a class demo
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600 font-medium">
                Designed to simulate a real-world product experience with resume
                review, ATS matching, user history, labels, and analysis
                management workflows.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-lg font-bold text-slate-900">
                  AI Resume Review
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Receive structured feedback with strengths, weaknesses,
                  summaries, and actionable suggestions.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-lg font-bold text-slate-900">
                  ATS Keyword Matching
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Compare resumes against job descriptions and identify matched
                  and missing keywords.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-lg font-bold text-slate-900">
                  Saved Analysis History
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Keep track of previous analyses with custom labels, timestamps,
                  previews, and history management.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-lg font-bold text-slate-900">
                  Explore the demo
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Public demo mode allows quick product exploration without
                  requiring account setup.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                How it works
              </p>
              <h3 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Simple flow, practical results
              </h3>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                  Step 1
                </p>
                <p className="mt-3 text-xl font-bold text-slate-900">
                  Paste or upload your resume
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Provide resume text directly or upload a PDF for parsing and
                  analysis.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                  Step 2
                </p>
                <p className="mt-3 text-xl font-bold text-slate-900">
                  Add a target job description
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Improve ATS alignment by matching your resume against a real
                  job posting.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                  Step 3
                </p>
                <p className="mt-3 text-xl font-bold text-slate-900">
                  Review, improve, and save
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Analyze the results, refine your resume, and save important
                  versions in your account history.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
            <div className="rounded-[32px] border border-blue-200 bg-blue-50 p-8 text-center sm:p-10 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                Get started
              </p>
              <h3 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Try the product instantly or create your account
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-700 font-medium">
                Explore the analyzer in demo mode, or sign up to unlock saved
                history, labels, and account-based resume management.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/demo"
                  className="rounded-2xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 shadow-md"
                >
                  Try Demo
                </Link>

                {!token ? (
                  <Link
                    to="/signup"
                    className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                  >
                    Create Account
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between font-medium">
          <div>
            <p className="font-bold text-slate-800">AI Resume Analyzer</p>
            <p className="mt-1">
              Built as a modern SaaS-style resume and ATS optimization platform.
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="font-bold text-slate-800">Built by Saharsh Carpenter</p>
            <p className="mt-1">
              Master of Computer Applications Student, Indian Institute of Information Technology Bhopal
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;