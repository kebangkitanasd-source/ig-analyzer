const s = {
  wrapper: { overflowX: "auto", marginTop: 12 },
  table:   { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th:      { padding: "10px 14px", textAlign: "left", color: "var(--text-muted)",
              borderBottom: "1px solid var(--border)", fontWeight: 600 },
  td:      { padding: "10px 14px", borderBottom: "1px solid var(--border)" },
  link:    { color: "var(--accent)", textDecoration: "none", fontWeight: 600 },
  empty:   { padding: 24, textAlign: "center", color: "var(--text-muted)" },
};

export default function UserTable({ rows = [] }) {
  if (!rows.length) return <p style={s.empty}>Tidak ada data.</p>;

  return (
    <div style={s.wrapper}>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>#</th>
            <th style={s.th}>Username</th>
            <th style={s.th}>Tanggal Follow</th>
            <th style={s.th}>Profil</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.username}>
              <td style={{ ...s.td, color: "var(--text-muted)" }}>{String(i + 1).padStart(3, "0")}</td>
              <td style={s.td}>@{r.username}</td>
              <td style={{ ...s.td, color: "var(--text-muted)" }}>{r.date}</td>
              <td style={s.td}>
                {r.url
                  ? <a style={s.link} href={r.url} target="_blank" rel="noopener noreferrer">Buka ↗</a>
                  : <span style={{ color: "var(--text-muted)" }}>—</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
