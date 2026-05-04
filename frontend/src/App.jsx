import { useState } from "react";
import { analyzeFiles } from "./api/analyzeApi";
import FileDropZone from "./components/FileDropZone";
import StatCard from "./components/StatCard";
import UserTable from "./components/UserTable";

const TABS = [
  { key: "tidak_folbek",             label: "Tidak Folbek" },
  { key: "mutualan",                 label: "Mutualan" },
  { key: "follow_6bln",              label: "Follow 6 Bulan" },
  { key: "follow_6bln_tidak_folbek", label: "6 Bln & Tdk Folbek" },
];

const s = {
  app:     { maxWidth: 900, margin: "0 auto", padding: "40px 20px" },
  heading: { fontSize: 28, fontWeight: 800, marginBottom: 6,
             background: "linear-gradient(90deg,#e1306c,#833ab4)",
             WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  sub:     { color: "var(--text-muted)", marginBottom: 36, fontSize: 14 },
  grid:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 },
  btn:     { background: "linear-gradient(135deg,#e1306c,#833ab4)",
             color: "#fff", width: "100%", padding: "14px", fontSize: 15,
             marginTop: 8 },
  error:   { background: "#3a1020", border: "1px solid #e1306c",
             borderRadius: 8, padding: "12px 16px", color: "#f88",
             marginTop: 12, fontSize: 14 },
  stats:   { display: "flex", flexWrap: "wrap", gap: 12, margin: "28px 0" },
  tabs:    { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 },
  tab:     (active) => ({
             padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
             background: active ? "linear-gradient(135deg,#e1306c,#833ab4)" : "var(--surface)",
             color: active ? "#fff" : "var(--text-muted)",
             border: "1px solid var(--border)",
           }),
  section: { background: "var(--surface)", border: "1px solid var(--border)",
             borderRadius: "var(--radius)", padding: 20 },
  search:  { width: "100%", padding: "10px 14px", borderRadius: 8, fontSize: 14,
             background: "var(--bg)", border: "1px solid var(--border)",
             color: "var(--text)", outline: "none", marginBottom: 12 },
  resetBtn:{ background: "var(--surface)", color: "var(--text-muted)",
             border: "1px solid var(--border)", marginTop: 24 },
};

export default function App() {
  const [followingFile, setFollowingFile] = useState(null);
  const [followersFile, setFollowersFile] = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [result,   setResult]   = useState(null);
  const [activeTab, setActiveTab] = useState("tidak_folbek");
  const [search,   setSearch]   = useState("");

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

  // Filtered rows for active tab
  const rows = result
    ? (search
        ? result[activeTab].filter(r => r.username.toLowerCase().includes(search.toLowerCase()))
        : result[activeTab])
    : [];

  return (
    <div style={s.app}>
      <h1 style={s.heading}>IG Analyzer</h1>
      <p style={s.sub}>Upload your Instagram JSON exports to analyze followers &amp; following.</p>

      {!result ? (
        /* ── Upload Section ── */
        <div>
          <div style={s.grid}>
            <FileDropZone
              label="following.json"
              file={followingFile}
              onFile={setFollowingFile}
            />
            <FileDropZone
              label="followers_1.json"
              file={followersFile}
              onFile={setFollowersFile}
            />
          </div>

          <button style={s.btn} onClick={handleAnalyze} disabled={!canAnalyze}>
            {loading ? "Menganalisis…" : "🔍 Analisis Sekarang"}
          </button>

          {error && <div style={s.error}>⚠ {error}</div>}
        </div>
      ) : (
        /* ── Results Section ── */
        <div>
          {/* Stats */}
          <div style={s.stats}>
            <StatCard label="Following"          value={result.stats.following_total} />
            <StatCard label="Followers"           value={result.stats.followers_total} />
            <StatCard label="Tidak Folbek"        value={result.stats.tidak_folbek} />
            <StatCard label="Mutualan"            value={result.stats.mutualan} />
            <StatCard label="Follow 6 Bulan"      value={result.stats.follow_6bln} />
            <StatCard label="6 Bln & Tdk Folbek"  value={result.stats.follow_6bln_tidak_folbek} />
          </div>

          {/* Tabs */}
          <div style={s.tabs}>
            {TABS.map(t => (
              <button
                key={t.key}
                style={s.tab(activeTab === t.key)}
                onClick={() => { setActiveTab(t.key); setSearch(""); }}
              >
                {t.label} ({result[t.key].length})
              </button>
            ))}
          </div>

          {/* Table with search */}
          <div style={s.section}>
            <input
              style={s.search}
              placeholder="Cari username…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <UserTable rows={rows} />
          </div>

          <button style={s.resetBtn} onClick={handleReset}>↩ Analisis Ulang</button>
        </div>
      )}
    </div>
  );
}
