import { useState } from "react";
import { analyzeFiles } from "./api/analyzeApi";
import FileDropZone from "./components/FileDropZone";
import StatCard from "./components/StatCard";
import UserTable from "./components/UserTable";

const TABS = [
  { key: "tidak_folbek",             label: "Tidak Folbek",        emoji: "👻" },
  { key: "mutualan",                 label: "Mutualan",            emoji: "🤝" },
  { key: "follow_6bln",              label: "Follow 6 Bulan",      emoji: "📅" },
  { key: "follow_6bln_tidak_folbek", label: "6 Bln & Tdk Folbek",  emoji: "⚠️" },
];

export default function App() {
  const [followingFile, setFollowingFile] = useState(null);
  const [followersFile, setFollowersFile] = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [result,    setResult]    = useState(null);
  const [activeTab, setActiveTab] = useState("tidak_folbek");
  const [search,    setSearch]    = useState("");

  const canAnalyze = followingFile && followersFile && !loading;

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await analyzeFiles(followingFile, followersFile);
      setResult(data);
      setActiveTab("tidak_folbek");
      setSearch("");
    } catch (err) {
      const msg = err.response?.data?.error ?? err.message ?? "Terjadi kesalahan.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFollowingFile(null);
    setFollowersFile(null);
    setResult(null);
    setError("");
    setSearch("");
  };

  const rows = result
    ? (search
        ? result[activeTab].filter(r => r.username.toLowerCase().includes(search.toLowerCase()))
        : result[activeTab])
    : [];

  return (
    <div className="max-w-[860px] mx-auto px-6 py-14">

      {/* ── Header ── */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl ig-grad flex items-center justify-center text-xl"
            style={{ boxShadow: "0 0 22px rgba(247,64,110,0.4)" }}>
            📊
          </div>
          <h1 className="text-3xl font-extrabold leading-none ig-grad-text">IG Analyzer</h1>
        </div>
        <p className="text-sm text-[#a0a0c0] max-w-md">
          Upload file JSON ekspor Instagram kamu untuk menganalisis followers & following.
        </p>
      </div>

      {!result ? (
        /* ── Upload ── */
        <div className="space-y-4">
          <div className="surface p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#606080] mb-4">
              Upload File
            </p>
            <div className="grid grid-cols-2 gap-3">
              <FileDropZone label="following.json"   file={followingFile} onFile={setFollowingFile} />
              <FileDropZone label="followers_1.json" file={followersFile} onFile={setFollowersFile} />
            </div>
          </div>

          <button className="btn-primary" onClick={handleAnalyze} disabled={!canAnalyze}>
            {loading ? "⏳ Menganalisis…" : "🔍 Analisis Sekarang"}
          </button>

          <div className="rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-4 py-3 text-sm text-[#a0a0c0]">
            💡 <span className="font-bold text-[#3b82f6]">Cara download:</span>{" "}
            Instagram → Pengaturan → Aktivitas → Download info → Format JSON.
          </div>

          {error && (
            <div className="rounded-xl border border-[#f7406e]/25 bg-[#f7406e]/[0.07] px-4 py-3 text-sm text-[#f7406e]">
              ⚠ {error}
            </div>
          )}
        </div>

      ) : (
        /* ── Results ── */
        <div className="space-y-5">

          {/* Stat cards */}
          <div className="flex flex-wrap gap-3">
            <StatCard label="Following"           value={result.stats.following_total} />
            <StatCard label="Followers"           value={result.stats.followers_total} />
            <StatCard label="Tidak Folbek"        value={result.stats.tidak_folbek} />
            <StatCard label="Mutualan"            value={result.stats.mutualan} />
            <StatCard label="Follow 6 Bulan"      value={result.stats.follow_6bln} />
            <StatCard label="6 Bln & Tdk Folbek"  value={result.stats.follow_6bln_tidak_folbek} />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {TABS.map(t => {
              const active = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => { setActiveTab(t.key); setSearch(""); }}
                  className={`
                    px-4 py-2 rounded-full text-[13px] font-bold border transition-all duration-200
                    ${active
                      ? "text-white border-transparent"
                      : "bg-white/[0.04] border-white/[0.08] text-[#a0a0c0] hover:bg-white/[0.07] hover:border-white/20"}
                  `}
                  style={active ? {
                    background: "linear-gradient(135deg,#f7406e,#a855f7)",
                    boxShadow: "0 0 16px rgba(247,64,110,0.3)",
                  } : {}}
                >
                  {t.emoji} {t.label}
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${active ? "bg-white/20" : "bg-white/[0.07]"}`}>
                    {result[t.key].length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table card */}
          <div className="surface overflow-hidden">
            {/* Search */}
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#606080]">🔍</span>
                <input
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#f0f0f8] placeholder-[#606080] outline-none focus:border-[#a855f7]/40 transition-colors duration-150"
                  placeholder="Cari username…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Count */}
            <div className="px-5 py-2 border-b border-white/[0.04] text-[11px] text-[#606080]">
              Menampilkan <span className="font-bold text-[#a0a0c0]">{rows.length}</span> akun
            </div>

            <UserTable rows={rows} />
          </div>

          <button className="btn-ghost" onClick={handleReset}>↩ Analisis Ulang</button>
        </div>
      )}
    </div>
  );
}
