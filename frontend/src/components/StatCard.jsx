const s = {
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "20px 24px",
    minWidth: 140,
    textAlign: "center",
  },
  value: { fontSize: 32, fontWeight: 700, color: "var(--accent)" },
  label: { fontSize: 12, color: "var(--text-muted)", marginTop: 4 },
};

export default function StatCard({ label, value }) {
  return (
    <div style={s.card}>
      <div style={s.value}>{value?.toLocaleString("id-ID") ?? "—"}</div>
      <div style={s.label}>{label}</div>
    </div>
  );
}
