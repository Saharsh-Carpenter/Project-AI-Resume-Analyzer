import AnalysisSection from "./AnalysisSection";

function AnalysisCard({ analysis, loading }) {
  if (!analysis && !loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-dashed border-gray-300 bg-gray-50 px-6 text-center text-sm leading-6 text-gray-500">
        No analysis yet. Submit resume text to generate structured feedback.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-gray-200 bg-white shadow-sm text-sm text-gray-500">
        Generating analysis...
      </div>
    );
  }

  const showAtsSection =
    analysis.atsMatchScore !== null &&
    analysis.atsMatchScore !== undefined;

  return (
    <div className="space-y-6">
      <div className={`grid gap-4 ${showAtsSection ? "md:grid-cols-2" : ""}`}>
        <div className="rounded-[24px] border border-blue-200 bg-blue-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Resume Score
          </p>

          <div className="mt-3 flex items-end gap-3">
            <h3 className="text-5xl font-semibold text-blue-900">
              {analysis.overallScore}
            </h3>
            <span className="pb-2 text-sm text-blue-700">/ 10</span>
          </div>
        </div>

        {showAtsSection && (
          <div className="rounded-[24px] border border-indigo-200 bg-indigo-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
              ATS Match Score
            </p>

            <div className="mt-3 flex items-end gap-3">
              <h3 className="text-5xl font-semibold text-indigo-900">
                {analysis.atsMatchScore}
              </h3>
              <span className="pb-2 text-sm text-indigo-700">/ 10</span>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Summary
        </h3>
        <p className="text-sm leading-7 text-gray-700">{analysis.summary}</p>
      </div>

      {showAtsSection && analysis.matchedKeywords?.length > 0 && (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.matchedKeywords.map((word, index) => (
              <span
                key={index}
                className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {showAtsSection && analysis.missingKeywords?.length > 0 && (
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((word, index) => (
              <span
                key={index}
                className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-sm text-amber-800"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      <AnalysisSection
        title="Key Strengths"
        items={analysis.strengths}
        color="green"
      />

      <AnalysisSection
        title="Areas for Improvement"
        items={analysis.weaknesses}
        color="yellow"
      />

      <AnalysisSection
        title="Actionable Suggestions"
        items={analysis.suggestions}
        color="blue"
      />
    </div>
  );
}

export default AnalysisCard;