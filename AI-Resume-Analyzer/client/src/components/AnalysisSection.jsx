function AnalysisSection({ title, items, color }) {
  const colorStyles = {
    green: {
      border: "border-emerald-200",
      bg: "bg-emerald-50",
      text: "text-emerald-800 font-medium",
      heading: "text-emerald-700",
      indicator: "bg-emerald-500",
    },
    yellow: {
      border: "border-amber-200",
      bg: "bg-amber-50",
      text: "text-amber-800 font-medium",
      heading: "text-amber-700",
      indicator: "bg-amber-500",
    },
    blue: {
      border: "border-blue-200",
      bg: "bg-blue-50",
      text: "text-blue-800 font-medium",
      heading: "text-blue-700",
      indicator: "bg-blue-500",
    },
  };

  const styles = colorStyles[color];

  return (
    <div>
      {/* 🔥 IMPROVED HEADING */}
      <div className="mb-4 flex items-center gap-2">
        <div className={`h-2.5 w-2.5 rounded-full ${styles.indicator}`}></div>

        <h3
          className={`text-sm font-extrabold uppercase tracking-[0.2em] ${styles.heading}`}
        >
          {title}
        </h3>
      </div>

      {/* LIST */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className={`rounded-[20px] border p-4 text-sm leading-7 shadow-sm transition-all hover:shadow-md ${styles.border} ${styles.bg} ${styles.text}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisSection;