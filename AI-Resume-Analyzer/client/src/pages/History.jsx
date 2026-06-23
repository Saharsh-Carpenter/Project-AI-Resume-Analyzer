import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/api/analyzer/history`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch history.");
        }

        setAnalyses(data);
      } catch (err) {
        console.error("History fetch error:", err);
        setError(err.message || "Failed to load analysis history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getFallbackResumeTitle = (analysis, index) => {
    const resumeText = analysis.resumeText || "";

    const lines = resumeText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return (
      analysis.resumeLabel ||
      analysis.originalFileName ||
      lines[0] ||
      `Resume Analysis #${analyses.length - index}`
    );
  };

  const getFallbackJobTitle = (analysis) => {
    const jobDescription = analysis.jobDescription || "";

    const lines = jobDescription
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return analysis.jobLabel || lines[0] || "No Job Label";
  };

  const getResumePreview = (resumeText) => {
    if (!resumeText || typeof resumeText !== "string") {
      return "No resume preview available.";
    }

    const cleaned = resumeText.replace(/\s+/g, " ").trim();

    if (!cleaned) {
      return "No resume preview available.";
    }

    if (cleaned.length > 160) {
      return `${cleaned.slice(0, 160)}...`;
    }

    return cleaned;
  };

  const getJobDescriptionPreview = (jobDescription) => {
    if (!jobDescription || typeof jobDescription !== "string") {
      return "";
    }

    const cleaned = jobDescription.replace(/\s+/g, " ").trim();

    if (!cleaned) {
      return "";
    }

    if (cleaned.length > 140) {
      return `${cleaned.slice(0, 140)}...`;
    }

    return cleaned;
  };
  
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setModalTitle("");
  };

  const openDeleteModal = (analysisId) => {
    setDeleteTargetId(analysisId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteTargetId("");
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAnalysis = async (analysisId) => {
    try {
      setDeletingId(analysisId);
      closeDeleteModal();

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/analyzer/${analysisId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete analysis.");
      }

      setAnalyses((prev) => prev.filter((analysis) => analysis._id !== analysisId));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete analysis.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="min-h-screen text-slate-900 bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="w-full px-6 py-5 sm:px-8 xl:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700">
                Saved Resume Analyses
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Analysis History
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base font-medium">
                Review previous resume evaluations, compare ATS results, and
                track how your resume improves over time.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-center shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Records
                </p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {analyses.length}
                </p>
              </div>

              <Link
                to="/dashboard"
                className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-6 sm:px-8 xl:px-10">
        {loading && (
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-slate-600 shadow-xl">
            Loading your saved analyses...
          </div>
        )}

        {error && (
          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-red-700 shadow-xl font-medium">
            {error}
          </div>
        )}

        {!loading && !error && analyses.length === 0 && (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
            <p className="text-lg font-bold text-slate-900">
              No analysis history yet
            </p>
            <p className="mt-2 text-slate-600 font-medium">
              Once you analyze a resume, your saved results will appear here.
            </p>

            <Link
              to="/dashboard"
              className="mt-5 inline-flex rounded-2xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800 shadow-md"
            >
              Analyze a Resume
            </Link>
          </div>
        )}

        {!loading && !error && analyses.length > 0 && (
          <div className="grid gap-6">
            {analyses.map((analysis, index) => {
              const overallScore =
                analysis.analysisResult?.overallScore ??
                analysis.analysisResult?.score ??
                null;

              const atsScore =
                analysis.analysisResult?.atsMatchScore ??
                analysis.analysisResult?.atsScore ??
                null;

              const matchedKeywords =
                analysis.analysisResult?.matchedKeywords ??
                analysis.analysisResult?.keywordMatches ??
                analysis.analysisResult?.matched_terms ??
                [];

              const missingKeywords =
                analysis.analysisResult?.missingKeywords ??
                analysis.analysisResult?.keywordGaps ??
                analysis.analysisResult?.missing_terms ??
                [];

              const atsSuggestions =
                analysis.analysisResult?.atsSuggestions ??
                analysis.analysisResult?.keywordSuggestions ??
                analysis.analysisResult?.atsImprovements ??
                [];

              const resumeTitle = getFallbackResumeTitle(analysis, index);
              const jobTitle = getFallbackJobTitle(analysis);
              const resumePreview = getResumePreview(analysis.resumeText);
              const jobPreview = getJobDescriptionPreview(
                analysis.jobDescription
              );

              return (
                <section
                  key={analysis._id}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
                >
                  <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-4xl">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
                        Saved Analysis #{analyses.length - index}
                      </p>

                      <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                        {resumeTitle}
                      </h2>

                      <p className="mt-2 text-sm text-slate-500 font-medium">
                        {new Date(analysis.createdAt).toLocaleString()}
                      </p>

                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                            Resume Identifier
                          </p>
                          <p className="mt-2 text-sm font-bold text-slate-800">
                            {resumeTitle}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {resumePreview}
                          </p>
                          <button
                            onClick={() => openModal("Full Resume", analysis.resumeText)}
                            className="mt-3 text-xs font-bold text-blue-600 transition hover:text-blue-800"
                          >
                            View Full Resume
                          </button>
                        </div>

                        <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                            Job Identifier
                          </p>
                          <p className="mt-2 text-sm font-bold text-slate-800">
                            {jobTitle}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {jobPreview || "No job description was used."}
                          </p>
                          {analysis.jobDescription && (
                            <button
                              onClick={() => openModal("Full Job Description", analysis.jobDescription)}
                              className="mt-3 text-xs font-bold text-blue-600 transition hover:text-blue-800"
                            >
                              View Full Job Description
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-start gap-3">
                      <div className="w-fit rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                          Overall Score
                        </p>
                        <p className="mt-1 text-lg font-bold text-blue-700">
                          {overallScore !== null ? `${overallScore}/10` : "N/A"}
                        </p>
                      </div>

                      {atsScore !== null && atsScore !== undefined && (
                        <div className="w-fit rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-sm">
                          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                            ATS Match
                          </p>
                          <p className="mt-1 text-lg font-bold text-emerald-800">
                            {atsScore}/10
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => openDeleteModal(analysis._id)}
                        disabled={deletingId === analysis._id}
                        className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
                      >
                        {deletingId === analysis._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>

                  {analysis.analysisResult?.summary && (
                    <div className="mb-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
                        Summary
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-700 font-medium">
                        {analysis.analysisResult.summary}
                      </p>
                    </div>
                  )}

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                        Strengths
                      </p>

                      {analysis.analysisResult?.strengths?.length > 0 ? (
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-900 font-medium">
                          {analysis.analysisResult.strengths.map((item, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-sm text-slate-500 font-medium">
                          No strengths recorded.
                        </p>
                      )}
                    </div>

                    <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                        Weaknesses
                      </p>

                      {analysis.analysisResult?.weaknesses?.length > 0 ? (
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-amber-900 font-medium">
                          {analysis.analysisResult.weaknesses.map((item, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-sm text-slate-500 font-medium">
                          No weaknesses recorded.
                        </p>
                      )}
                    </div>
                  </div>

                  {analysis.analysisResult?.suggestions?.length > 0 && (
                    <div className="mt-6 rounded-[24px] border border-blue-200 bg-blue-50 p-5 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
                        Suggestions
                      </p>

                      <ul className="mt-4 space-y-3 text-sm leading-6 text-blue-900 font-medium">
                        {analysis.analysisResult.suggestions.map((item, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(atsScore !== null ||
                    matchedKeywords.length > 0 ||
                    missingKeywords.length > 0 ||
                    atsSuggestions.length > 0) && (
                    <div className="mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                        ATS Details
                      </p>

                      {atsScore !== null && atsScore !== undefined && (
                        <div className="mt-4 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                            ATS Match Score
                          </p>
                          <p className="mt-1 text-base font-bold text-emerald-700">
                            {atsScore}/10
                          </p>
                        </div>
                      )}

                      <div className="mt-4 grid gap-5 lg:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                            Matched Keywords
                          </p>

                          {matchedKeywords.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {matchedKeywords.map((keyword, i) => (
                                <span
                                  key={i}
                                  className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-3 text-sm text-slate-500 font-medium">
                              No matched keywords were saved for this analysis.
                            </p>
                          )}
                        </div>

                        <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                            Missing Keywords
                          </p>

                          {missingKeywords.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {missingKeywords.map((keyword, i) => (
                                <span
                                  key={i}
                                  className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-3 text-sm text-slate-500 font-medium">
                              No missing keywords were saved for this analysis.
                            </p>
                          )}
                        </div>
                      </div>

                      {atsSuggestions.length > 0 && (
                        <div className="mt-5 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                            ATS Improvement Notes
                          </p>

                          <ul className="mt-3 space-y-3 text-sm leading-6 text-emerald-900 font-medium">
                            {atsSuggestions.map((item, i) => (
                              <li key={i} className="flex gap-3">
                                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                {modalTitle}
              </h2>
              <button
                onClick={closeModal}
                className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
              >
                Close
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto whitespace-pre-wrap text-sm text-slate-700 leading-6 pr-2 font-medium">
              {modalContent}
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900">
              Delete saved analysis?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600 font-medium">
              This action cannot be undone. The selected analysis will be permanently
              removed from your history.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDeleteAnalysis(deleteTargetId)}
                disabled={deletingId === deleteTargetId}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
              >
                {deletingId === deleteTargetId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;