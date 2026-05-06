export default function UserTable({ rows = [] }) {
  if (!rows.length) return (
    <div className="py-16 text-center">
      <div
        className="w-12 h-12 mx-auto mb-4 rounded-2xl flex items-center justify-center"
        style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="10" cy="10" r="7" stroke="var(--text-tertiary)" strokeWidth="1.5"/>
          <path d="M15.5 15.5L19 19" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
        Tidak ada data ditemukan
      </p>
      <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
        Coba ubah kata kunci pencarian
      </p>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {["#", "Username", "Tanggal Follow", "Profil"].map(h => (
              <th
                key={h}
                className="px-5 py-2.5 text-left"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  color: "var(--text-tertiary)",
                  borderBottom: "1px solid var(--border)",
                  userSelect: "none",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.username}
              className="group transition-colors duration-100"
              style={{ borderBottom: "1px solid var(--border)" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg-input)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* # */}
              <td className="px-5 py-3">
                <span style={{ fontSize: "12px", color: "var(--text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
                  {i + 1}
                </span>
              </td>

              {/* username */}
              <td className="px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                    style={{
                      background: `hsl(${(r.username.charCodeAt(0) * 37) % 360}, 55%, 92%)`,
                      color: `hsl(${(r.username.charCodeAt(0) * 37) % 360}, 55%, 35%)`,
                    }}
                  >
                    {r.username[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
                    @{r.username}
                  </span>
                </div>
              </td>

              {/* date */}
              <td className="px-5 py-3">
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>
                  {r.date ?? "—"}
                </span>
              </td>

              {/* profile link */}
              <td className="px-5 py-3">
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-medium px-3 py-1 rounded-lg transition-all duration-150"
                    style={{
                      color: "var(--accent)",
                      background: "var(--accent-muted)",
                      border: "1px solid var(--accent-border)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.8"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  >
                    Lihat
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ) : (
                  <span style={{ color: "var(--text-tertiary)", fontSize: "12px" }}>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
