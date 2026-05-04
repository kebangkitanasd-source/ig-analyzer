import { useState } from "react";
import { analyzeFiles } from "./api/analyzeApi";
import FileDropZone from "./components/FileDropZone";
import StatCard from "./components/StatCard";
import UserTable from "./components/UserTable";
import HeroSection from "./components/HeroSection";

const TABS = [
  { key: "tidak_folbek",             label: "Tidak Folbek" },
  { key: "mutualan",                 label: "Mutualan" },
  { key: "follow_6bln",              label: "Follow 6 Bulan" },
  { key: "follow_6bln_tidak_folbek", label: "6 Bln & Tdk Folbek" },
];

const gradientStyle = { background: "linear-gradient(135deg,#e1306c,#833ab4)" };
const headingGradient = {
  background: "linear-gradient(90deg,#e1306c,#833ab4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function App() {
  const [page, setPage] = useState("hero"); // "hero" | "app"
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
    setPage("hero");
  };

  const rows = result
    ? (search
        ? result[activeTab].filter(r => r.username.toLowerCase().includes(search.toLowerCase()))
        : result[activeTab])
    : [];

  if (page === "hero") {
    return <HeroSection onGetStarted={() => setPage("app")} />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <div className="flex-1 max-w-[900px] mx-auto w-full px-5 py-10">
        <h1 className="text-[28px] font-extrabold mb-1.5" style={headingGradient}>
          IG Analyzer
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-9">
          Upload your Instagram JSON exports to analyze followers &amp; following.
        </p>

        {!result ? (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <FileDropZone label="following.json"   file={followingFile} onFile={setFollowingFile} />
              <FileDropZone label="followers_1.json" file={followersFile} onFile={setFollowersFile} />
            </div>

            <button
              className="w-full py-3.5 mt-2 text-[15px] font-semibold text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-85 transition-opacity"
              style={gradientStyle}
              onClick={handleAnalyze}
              disabled={!canAnalyze}
            >
              {loading ? "Menganalisis…" : "🔍 Analisis Sekarang"}
            </button>

            {error && (
              <div className="mt-3 px-4 py-3 rounded-lg text-sm text-[#f88] border border-[#e1306c] bg-[#3a1020]">
                ⚠ {error}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-3 my-7">
              <StatCard label="Following"          value={result.stats.following_total} />
              <StatCard label="Followers"           value={result.stats.followers_total} />
              <StatCard label="Tidak Folbek"        value={result.stats.tidak_folbek} />
              <StatCard label="Mutualan"            value={result.stats.mutualan} />
              <StatCard label="Follow 6 Bulan"      value={result.stats.follow_6bln} />
              <StatCard label="6 Bln & Tdk Folbek"  value={result.stats.follow_6bln_tidak_folbek} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {TABS.map(t => {
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    className="px-4 py-2 rounded-lg text-[13px] font-semibold border border-[var(--border)] transition-opacity hover:opacity-85"
                    style={active ? { ...gradientStyle, color: "#fff" } : { background: "var(--surface)", color: "var(--text-muted)" }}
                    onClick={() => { setActiveTab(t.key); setSearch(""); }}
                  >
                    {t.label} ({result[t.key].length})
                  </button>
                );
              })}
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-5">
              <input
                className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none mb-3"
                placeholder="Cari username…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <UserTable rows={rows} />
            </div>

            <button
              className="mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:opacity-85 transition-opacity"
              onClick={handleReset}
            >
              ↩ Kembali ke Halaman Utama
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="py-3 text-center text-[11px]" style={{ background: "#0a000f", color: "#4a3560" }}>
        © 2026 <span style={{ color: "#6a4590" }}>ptrgama_</span> — All rights reserved
      </div>
    </div>
  );
}