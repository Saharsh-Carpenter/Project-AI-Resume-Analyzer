import { Link } from "react-router-dom";
import { useState } from "react";
import AnalysisCard from "../components/AnalysisCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AnalyzerWorkspace({ demoMode = false }) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resumeLabel, setResumeLabel] = useState("");
  const [jobLabel, setJobLabel] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleAnalyze = async () => {
    const trimmedResumeText = resumeText.trim();

    if (!trimmedResumeText && !resumeFile) {
      setError("Please paste resume or upload PDF.");
      setAnalysis(null);
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("resumeText", trimmedResumeText);
      formData.append("jobDescription", jobDescription.trim());
      formData.append("resumeLabel", resumeLabel.trim());
      formData.append("jobLabel", jobLabel.trim());

      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      }

      const token = localStorage.getItem("token");

      const headers = demoMode
        ? {}
        : {
            Authorization: `Bearer ${token}`,
          };

      const response = await fetch(`${API_BASE_URL}/api/analyzer`, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setAnalysis({
        analysisResult: data.analysis,
        resumeText: data.resumeText,
        jobDescription: data.jobDescription,
        resumeLabel: data.resumeLabel,
        jobLabel: data.jobLabel,
        originalFileName: data.originalFileName,
      });

      setSaved(false);
    } catch (err) {
      setError(err.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnalysis = async () => {
    if (!analysis || demoMode) return;

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/analyzer/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeText: analysis.resumeText,
          jobDescription: analysis.jobDescription,
          analysisResult: analysis.analysisResult,
          resumeLabel: analysis.resumeLabel,
          jobLabel: analysis.jobLabel,
          originalFileName: analysis.originalFileName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save analysis.");
      }

      setSaved(true);
    } catch (err) {
      console.error("Save error:", err);
      alert(err.message || "Failed to save analysis.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-900">
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur sticky top-0 z-50">
        <div className="w-full px-6 py-5 sm:px-8 xl:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700">
                {demoMode ? "Public Demo Mode" : "AI-Powered Resume Review"}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                AI Resume Analyzer
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base font-medium">
                {demoMode
                  ? "Try the analyzer instantly without creating an account. Saving and history are available in full account mode."
                  : "Structured feedback, clearer strengths and weaknesses, and recruiter-style suggestions."}
              </p>
            </div>

            <div className="flex gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Mode
                </p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {demoMode ? "Demo" : "AI Analysis"}
                </p>
              </div>

              {demoMode ? (
                <>
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                  >
                    Back Home
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 shadow-md"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                  >
                    Home
                  </Link>

                  <Link
                    to="/history"
                    className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                  >
                    View History
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center rounded-xl border border-amber-300 bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 shadow-md"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-6 sm:px-8 xl:px-10">
        <div className="grid items-start gap-6 2xl:grid-cols-[1.03fr_0.97fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white shadow-xl 2xl:sticky 2xl:top-28 2xl:h-[calc(100vh-160px)]">
            <div className="flex h-full flex-col p-5 sm:p-6 xl:p-7">
              <div className="mb-5 flex-shrink-0">
                <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
                      Resume Input
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                      Analyze your resume draft
                    </h2>
                    <p className="mt-3 text-base leading-7 text-slate-600 font-medium">
                      Paste your resume below to receive structured feedback. You
                      can also upload a PDF and add a job description for ATS
                      matching.
                    </p>
                  </div>

                  <div className="w-fit rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      Current Mode
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-800">
                      Manual Paste + PDF
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                <div className="mb-5 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <label className="mb-3 block text-sm font-bold text-slate-700">
                      Resume Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={resumeLabel}
                      onChange={(e) => setResumeLabel(e.target.value)}
                      placeholder="Example: SWE Resume v2"
                      className="w-full rounded-[18px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                    />
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <label className="mb-3 block text-sm font-bold text-slate-700">
                      Job Label (Optional)
                    </label>
                    <input
                      type="text"
                      value={jobLabel}
                      onChange={(e) => setJobLabel(e.target.value)}
                      placeholder="Example: Software Developer Intern"
                      className="w-full rounded-[18px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                    />
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume here..."
                    className="min-h-[220px] w-full resize-none rounded-[22px] border border-slate-300 bg-white px-5 py-5 text-[15px] leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm lg:min-h-[240px]"
                  />
                </div>

                <div className="mt-5 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                  <label className="mb-3 block text-sm font-bold text-slate-700">
                    Upload Resume PDF (Optional)
                  </label>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResumeFile(e.target.files[0] || null)}
                    className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 shadow-sm"
                  />

                  {resumeFile && (
                    <p className="mt-3 text-sm text-slate-500 font-medium">
                      Selected file: {resumeFile.name}
                    </p>
                  )}
                </div>

                <div className="mt-5 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                  <label className="mb-3 block text-sm font-bold text-slate-700">
                    Job Description (Optional)
                  </label>

                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here for ATS matching..."
                    className="min-h-[130px] w-full resize-none rounded-[22px] border border-slate-300 bg-white px-5 py-5 text-[15px] leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  />
                </div>

                {error && (
                  <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
                    {error}
                  </div>
                )}
              </div>

              <div className="mt-4 flex-shrink-0 border-t border-slate-200 pt-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-bold text-slate-700">
                      Best results come from resumes that include projects,
                      technical skills, experience, and measurable impact.
                    </p>
                    <p className="mt-1 text-sm text-slate-500 font-medium">
                      Example: technologies used, your contributions, and
                      quantified outcomes.
                    </p>
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={loading || (!resumeText.trim() && !resumeFile)}
                    className="inline-flex min-w-[190px] items-center justify-center rounded-2xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
                  >
                    {loading ? "Analyzing Resume..." : "Analyze Resume"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[28px] border border-blue-200 bg-blue-50 shadow-xl 2xl:sticky 2xl:top-28 2xl:h-[calc(100vh-160px)]">
            <div className="flex h-full flex-col p-5 sm:p-6 xl:p-7">
              <div className="mb-5 flex-shrink-0">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
                  Analysis Result
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                  Resume evaluation output
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600 font-medium">
                  Review the generated feedback to understand how your resume is
                  currently positioned and where it can be improved.
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <AnalysisCard
                  analysis={analysis?.analysisResult || null}
                  loading={loading}
                />
              </div>

              {analysis && (
                <div className="mt-4 flex-shrink-0 border-t border-slate-200 pt-4">
                  {demoMode ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-amber-500" />

                        <div className="flex-1">
                          <p className="text-sm font-bold text-amber-800">
                            Demo Mode
                          </p>

                          <p className="mt-1 text-sm leading-6 text-slate-700 font-medium">
                            Save, history, and deletion are available in full account mode.
                            Create an account to unlock the full experience.
                          </p>

                          <div className="mt-3">
                            <Link
                              to="/signup"
                              className="inline-flex items-center rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-amber-600 shadow-sm"
                            >
                              Create Account
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleSaveAnalysis}
                      disabled={saving || saved}
                      className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
                    >
                      {saved ? "Saved ✔" : saving ? "Saving..." : "Save Analysis"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default AnalyzerWorkspace;