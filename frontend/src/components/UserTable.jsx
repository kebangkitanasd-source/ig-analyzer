export default function UserTable({ rows = [] }) {
  if (!rows.length) return (
    <div className="py-12 text-center text-[#606080]">
      <div className="text-4xl mb-3">🔍</div>
      <p className="text-sm">Tidak ada data ditemukan.</p>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {["#", "Username", "Tanggal Follow", "Profil"].map(h => (
              <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-[#606080] border-b border-white/[0.06]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.username} className="group transition-colors duration-150 hover:bg-white/[0.03]">
              <td className="px-4 py-2.5 text-[11px] font-mono text-[#606080] border-b border-white/[0.04]">
                {String(i + 1).padStart(3, "0")}
              </td>
              <td className="px-4 py-2.5 border-b border-white/[0.04]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full ig-grad flex items-center justify-center text-[11px] font-extrabold text-white shrink-0">
                    {r.username[0].toUpperCase()}
                  </div>
                  <span className="font-semibold text-[#f0f0f8]">@{r.username}</span>
                </div>
              </td>
              <td className="px-4 py-2.5 text-[#606080] text-xs border-b border-white/[0.04]">
                {r.date ?? "—"}
              </td>
              <td className="px-4 py-2.5 border-b border-white/[0.04]">
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] font-bold text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/20 px-3 py-1 rounded-full hover:bg-[#a855f7]/20 hover:border-[#a855f7]/40 transition-all duration-150"
                  >
                    Buka ↗
                  </a>
                ) : (
                  <span className="text-[#606080]">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
