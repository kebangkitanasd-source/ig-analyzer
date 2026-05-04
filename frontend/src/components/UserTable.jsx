export default function UserTable({ rows = [] }) {
  if (!rows.length) return (
    <p className="py-6 text-center text-[var(--text-muted)]">Tidak ada data.</p>
  );

  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="px-3.5 py-2.5 text-left text-[var(--text-muted)] border-b border-[var(--border)] font-semibold">#</th>
            <th className="px-3.5 py-2.5 text-left text-[var(--text-muted)] border-b border-[var(--border)] font-semibold">Username</th>
            <th className="px-3.5 py-2.5 text-left text-[var(--text-muted)] border-b border-[var(--border)] font-semibold">Tanggal Follow</th>
            <th className="px-3.5 py-2.5 text-left text-[var(--text-muted)] border-b border-[var(--border)] font-semibold">Profil</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.username}>
              <td className="px-3.5 py-2.5 border-b border-[var(--border)] text-[var(--text-muted)]">
                {String(i + 1).padStart(3, "0")}
              </td>
              <td className="px-3.5 py-2.5 border-b border-[var(--border)]">
                @{r.username}
              </td>
              <td className="px-3.5 py-2.5 border-b border-[var(--border)] text-[var(--text-muted)]">
                {r.date}
              </td>
              <td className="px-3.5 py-2.5 border-b border-[var(--border)]">
                {r.url
                  ? <a className="text-[var(--accent)] font-semibold no-underline hover:underline" href={r.url} target="_blank" rel="noopener noreferrer">Buka ↗</a>
                  : <span className="text-[var(--text-muted)]">—</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}