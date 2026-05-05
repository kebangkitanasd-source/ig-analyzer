const PALETTE = [
  { bg: "bg-[#f7406e]/10", border: "border-[#f7406e]/20", text: "text-[#f7406e]" },
  { bg: "bg-[#a855f7]/10", border: "border-[#a855f7]/20", text: "text-[#a855f7]" },
  { bg: "bg-[#3b82f6]/10", border: "border-[#3b82f6]/20", text: "text-[#3b82f6]" },
  { bg: "bg-[#22c55e]/10", border: "border-[#22c55e]/20", text: "text-[#22c55e]" },
  { bg: "bg-[#f97316]/10", border: "border-[#f97316]/20", text: "text-[#f97316]" },
  { bg: "bg-[#ec4899]/10", border: "border-[#ec4899]/20", text: "text-[#ec4899]" },
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
    <div className={`flex-1 min-w-[130px] rounded-xl border px-4 py-3.5 relative overflow-hidden ${c.bg} ${c.border}`}>
      <div className={`absolute -top-4 -right-4 w-14 h-14 rounded-full opacity-40 ${c.bg}`} />
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${c.text}`}>{label}</p>
      <p className={`text-3xl font-extrabold leading-none ${c.text}`}>{value?.toLocaleString("id-ID") ?? "—"}</p>
    </div>
  );
}
