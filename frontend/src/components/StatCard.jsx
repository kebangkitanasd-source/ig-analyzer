const PALETTE = [
  { accent: "#00CFFF", glow: "rgba(0,207,255,0.3)",   bg: "rgba(0,207,255,0.05)",  border: "rgba(0,207,255,0.2)"  },
  { accent: "#7B2CFF", glow: "rgba(123,44,255,0.3)",  bg: "rgba(123,44,255,0.06)", border: "rgba(123,44,255,0.25)" },
  { accent: "#38B6FF", glow: "rgba(56,182,255,0.3)",  bg: "rgba(56,182,255,0.05)", border: "rgba(56,182,255,0.2)"  },
  { accent: "#00FF8C", glow: "rgba(0,255,140,0.3)",   bg: "rgba(0,255,140,0.05)",  border: "rgba(0,255,140,0.2)"  },
  { accent: "#7B2CFF", glow: "rgba(123,44,255,0.25)", bg: "rgba(123,44,255,0.05)", border: "rgba(123,44,255,0.2)"  },
  { accent: "#00CFFF", glow: "rgba(0,207,255,0.25)",  bg: "rgba(0,207,255,0.04)",  border: "rgba(0,207,255,0.15)" },
];

const colorMap = new Map();
let idx = 0;
function getColor(label) {
  if (!colorMap.has(label)) colorMap.set(label, PALETTE[idx++ % PALETTE.length]);
  return colorMap.get(label);
}

export default function StatCard({ label, value }) {
  const c = getColor(label);
  return (
    <div
      className="flex-1 min-w-[130px] rounded-xl px-4 py-3.5 relative overflow-hidden transition-all duration-300"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 20px ${c.glow}, inset 0 0 30px rgba(0,0,0,0.3)`,
      }}
    >
      {/* corner decoration */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${c.glow}, transparent 70%)` }} />

      {/* top bracket */}
      <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none"
        style={{ borderTop: `1px solid ${c.accent}`, borderLeft: `1px solid ${c.accent}`, opacity: 0.6 }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none"
        style={{ borderBottom: `1px solid ${c.accent}`, borderRight: `1px solid ${c.accent}`, opacity: 0.6 }} />

      <p
        className="text-[9px] font-bold uppercase tracking-widest mb-2"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: c.accent,
          textShadow: `0 0 8px ${c.glow}`,
        }}
      >
        {label}
      </p>
      <p
        className="text-3xl font-black leading-none"
        style={{
          fontFamily: "'Orbitron', monospace",
          color: c.accent,
          textShadow: `0 0 12px ${c.glow}, 0 0 24px ${c.glow}`,
        }}
      >
        {value?.toLocaleString("id-ID") ?? "—"}
      </p>
    </div>
  );
}
