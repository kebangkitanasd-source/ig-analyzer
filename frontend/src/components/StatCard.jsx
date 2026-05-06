const ACCENTS = [
  { color: "#0071e3", bg: "rgba(0,113,227,0.08)",   border: "rgba(0,113,227,0.15)"   },
  { color: "#34c759", bg: "rgba(52,199,89,0.08)",   border: "rgba(52,199,89,0.15)"   },
  { color: "#ff9500", bg: "rgba(255,149,0,0.08)",   border: "rgba(255,149,0,0.15)"   },
  { color: "#af52de", bg: "rgba(175,82,222,0.08)",  border: "rgba(175,82,222,0.15)"  },
  { color: "#ff2d55", bg: "rgba(255,45,85,0.08)",   border: "rgba(255,45,85,0.15)"   },
  { color: "#5ac8fa", bg: "rgba(90,200,250,0.08)",  border: "rgba(90,200,250,0.15)"  },
];

const colorMap = new Map();
let idx = 0;
function getAccent(label) {
  if (!colorMap.has(label)) colorMap.set(label, ACCENTS[idx++ % ACCENTS.length]);
  return colorMap.get(label);
}

export default function StatCard({ label, value }) {
  const a = getAccent(label);
  return (
    <div
      className="flex-1 min-w-[130px] rounded-2xl px-4 py-4 transition-all duration-200 cursor-default"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        backdropFilter: "var(--blur)",
        WebkitBackdropFilter: "var(--blur)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      {/* colored dot indicator */}
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: a.color }}
        />
        <p
          className="text-[11px] font-semibold uppercase tracking-wider truncate"
          style={{ color: "var(--text-secondary)", letterSpacing: "0.05em" }}
        >
          {label}
        </p>
      </div>

      <p
        className="text-3xl font-bold leading-none tracking-tight"
        style={{ color: a.color }}
      >
        {value?.toLocaleString("id-ID") ?? "—"}
      </p>
    </div>
  );
}
