export default function StatCard({ label, value }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] px-6 py-5 min-w-[140px] text-center">
      <div className="text-[32px] font-bold text-[var(--accent)]">
        {value?.toLocaleString("id-ID") ?? "—"}
      </div>
      <div className="text-[12px] text-[var(--text-muted)] mt-1">
        {label}
      </div>
    </div>
  );
}