export default function UserTable({ rows = [] }) {
  if (!rows.length) return (
    <div className="py-14 text-center">
      <div className="text-4xl mb-3" style={{ filter: "drop-shadow(0 0 8px rgba(0,207,255,0.4))" }}>🔍</div>
      <p className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
        // tidak ada data ditemukan
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
                className="px-4 py-3 text-left"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(0,207,255,0.5)",
                  borderBottom: "1px solid rgba(0,207,255,0.1)",
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
              className="group transition-all duration-150"
              style={{ borderBottom: "1px solid rgba(0,207,255,0.04)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,207,255,0.03)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* # */}
              <td className="px-4 py-2.5">
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  color: "rgba(123,44,255,0.6)",
                }}>
                  {String(i + 1).padStart(3, "0")}
                </span>
              </td>

              {/* username */}
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(123,44,255,0.4), rgba(0,207,255,0.3))",
                      border: "1px solid rgba(0,207,255,0.2)",
                      color: "#fff",
                      fontFamily: "'Orbitron', monospace",
                      boxShadow: "0 0 8px rgba(0,207,255,0.15)",
                    }}
                  >
                    {r.username[0].toUpperCase()}
                  </div>
                  <span style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "#fff",
                  }}>
                    @{r.username}
                  </span>
                </div>
              </td>

              {/* date */}
              <td className="px-4 py-2.5">
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                }}>
                  {r.date ?? "—"}
                </span>
              </td>

              {/* profile link */}
              <td className="px-4 py-2.5">
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] font-bold px-3 py-1 rounded-lg transition-all duration-150"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "var(--neon-cyan)",
                      background: "rgba(0,207,255,0.06)",
                      border: "1px solid rgba(0,207,255,0.2)",
                      letterSpacing: "0.06em",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(0,207,255,0.12)";
                      e.currentTarget.style.borderColor = "rgba(0,207,255,0.5)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(0,207,255,0.2)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(0,207,255,0.06)";
                      e.currentTarget.style.borderColor = "rgba(0,207,255,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    VIEW ↗
                  </a>
                ) : (
                  <span style={{ color: "rgba(154,164,199,0.3)", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
