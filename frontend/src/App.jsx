import { useState } from "react";
import { analyzeFiles } from "./api/analyzeApi";
import FileDropZone from "./components/FileDropZone";
import StatCard from "./components/StatCard";
import UserTable from "./components/UserTable";

// ─── GANTI FOTO PROFIL HP ───────────────────────────────────────────────────
// Letakkan file di: frontend/public/avatar.jpg  (atau .png)
// Ganti null di bawah jadi: "/avatar.jpg"
const PROFILE_IMAGE = null;
// ───────────────────────────────────────────────────────────────────────────

const TABS = [
  { key: "tidak_folbek",             label: "Tidak Folbek",       emoji: "👻" },
  { key: "mutualan",                 label: "Mutualan",           emoji: "🤝" },
  { key: "follow_6bln",              label: "Follow 6 Bulan",     emoji: "📅" },
  { key: "follow_6bln_tidak_folbek", label: "6 Bln & Tdk Folbek", emoji: "⚠️" },
];

/* ──────────────────── MODAL ──────────────────── */
function Modal({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", background: "rgba(8,9,12,0.8)" }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} className="w-full max-w-sm animate-none">
        {children}
      </div>
    </div>
  );
}

function ContactModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="surface p-6 relative" style={{ borderRadius: 20 }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-sm">✕</button>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-5">Contact Admin</p>
        <a
          href="https://www.instagram.com/ptrgama_/"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.04] transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#00d4ff]/30 flex items-center justify-center bg-white/[0.05]"
            style={{ boxShadow: "0 0 14px rgba(0,212,255,0.2)" }}>
            {PROFILE_IMAGE
              ? <img src={PROFILE_IMAGE} alt="admin" className="w-full h-full object-cover" />
              : <span className="text-xl">👤</span>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm">@ptrgama_</p>
            <p className="text-[11px] text-white/35 mt-0.5">Instagram · DM untuk pertanyaan</p>
          </div>
          <span className="text-[#00d4ff] text-sm opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
        </a>
      </div>
    </Modal>
  );
}

function AboutModal({ onClose }) {
  const stack = [
    { label: "Flask", sub: "Python · Backend & logic", dot: "#00d4ff" },
    { label: "React + Vite", sub: "Frontend · Fast & modern", dot: "#ffffff" },
    { label: "Tailwind CSS", sub: "UI · Responsive & structured", dot: "#00d4ff" },
  ];
  return (
    <Modal onClose={onClose}>
      <div className="surface p-6 relative" style={{ borderRadius: 20 }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-sm">✕</button>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">About</p>
        <h2 className="text-xl font-black brand-text mb-0.5">IG Analyzer v1.0</h2>
        <p className="text-[11px] text-white/30 mb-5">by @ptrgama_</p>
        <p className="text-sm text-white/50 leading-relaxed mb-5">
          Dashboard berbasis <span className="text-white font-semibold">Flask (Python)</span> untuk backend logika & pemrosesan data,
          dengan <span className="text-white font-semibold">React + Vite</span> di frontend untuk performa cepat dan modern,
          serta <span className="text-white font-semibold">Tailwind CSS</span> untuk UI yang responsif dan terstruktur.
        </p>
        <div className="space-y-2">
          {stack.map(s => (
            <div key={s.label} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot, boxShadow: `0 0 6px ${s.dot}` }} />
              <div>
                <p className="text-xs font-bold text-white">{s.label}</p>
                <p className="text-[10px] text-white/35">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

function ComingSoonModal({ onClose }) {
  const features = [
    "Analisis story viewers",
    "Export hasil ke PDF / CSV",
    "Deteksi akun fake / bot",
    "Grafik pertumbuhan followers",
    "Multi-akun dalam satu dashboard",
  ];
  return (
    <Modal onClose={onClose}>
      <div className="surface p-6 relative" style={{ borderRadius: 20 }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-sm">✕</button>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">Next Update</p>
        <h2 className="text-xl font-black text-white mb-1">Coming Soon</h2>
        <p className="text-[11px] text-white/35 mb-5">Fitur yang akan hadir di versi berikutnya</p>
        <div className="space-y-1.5">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="w-5 h-5 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/[0.07] flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] opacity-50" />
              </div>
              <p className="text-xs text-white/50">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

/* ──────────────────── HAMBURGER ──────────────────── */
function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const openModal = (m) => { setModal(m); setOpen(false); };

  const items = [
    { label: "Contact Admin", key: "contact" },
    { label: "About",         key: "about"   },
    { label: "Coming Soon",   key: "soon"    },
  ];

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-[5px] transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          aria-label="Menu"
        >
          <span className={`block h-[1.5px] bg-white/50 rounded-full transition-all duration-250 ${open ? "w-4 rotate-45 translate-y-[6.5px]" : "w-4"}`} />
          <span className={`block h-[1.5px] bg-white/50 rounded-full transition-all duration-250 ${open ? "w-0 opacity-0" : "w-3"}`} />
          <span className={`block h-[1.5px] bg-white/50 rounded-full transition-all duration-250 ${open ? "w-4 -rotate-45 -translate-y-[6.5px]" : "w-4"}`} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-11 z-40 w-40 py-1.5 overflow-hidden"
              style={{ background: "#0e1014", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }}>
              {items.map((item, i) => (
                <button
                  key={item.key}
                  onClick={() => openModal(item.key)}
                  className="w-full text-left px-4 py-2.5 text-[13px] text-white/50 hover:text-white hover:bg-white/[0.04] transition-all duration-150"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {modal === "contact" && <ContactModal onClose={() => setModal(null)} />}
      {modal === "about"   && <AboutModal   onClose={() => setModal(null)} />}
      {modal === "soon"    && <ComingSoonModal onClose={() => setModal(null)} />}
    </>
  );
}

/* ──────────────────── IPHONE 17 PRO MAX MOCKUP ──────────────────── */
function PhoneMockup() {
  return (
    <div className="relative flex-shrink-0" style={{ width: 168 }}>
      {/* ambient glow */}
      <div className="absolute -inset-6 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(0,212,255,0.08), transparent 70%)" }} />

      {/* titanium frame */}
      <div
        style={{
          width: 168,
          height: 344,
          borderRadius: 44,
          background: "linear-gradient(160deg, #2a2a2e 0%, #1a1a1e 40%, #111114 100%)",
          padding: 3,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 64px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
          position: "relative",
        }}
      >
        {/* side buttons */}
        <div style={{ position:"absolute", right:-3, top:88, width:3, height:32, borderRadius:"0 3px 3px 0", background:"rgba(255,255,255,0.1)" }} />
        <div style={{ position:"absolute", left:-3, top:72, width:3, height:24, borderRadius:"3px 0 0 3px", background:"rgba(255,255,255,0.08)" }} />
        <div style={{ position:"absolute", left:-3, top:104, width:3, height:24, borderRadius:"3px 0 0 3px", background:"rgba(255,255,255,0.08)" }} />
        <div style={{ position:"absolute", left:-3, top:56, width:3, height:12, borderRadius:"3px 0 0 3px", background:"rgba(255,255,255,0.06)" }} />

        {/* screen */}
        <div style={{
          width: "100%", height: "100%",
          borderRadius: 42,
          background: "#000000",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          {/* Dynamic Island */}
          <div style={{
            marginTop: 12,
            width: 88,
            height: 28,
            borderRadius: 20,
            background: "#000",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}>
            {/* camera */}
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#111", border:"1px solid rgba(255,255,255,0.06)" }} />
            {/* Face ID dot */}
            <div style={{ width:4, height:4, borderRadius:"50%", background:"#1a1a2e", border:"0.5px solid rgba(0,212,255,0.3)", boxShadow:"0 0 4px rgba(0,212,255,0.4)" }} />
            {/* speaker */}
            <div style={{ width:20, height:4, borderRadius:2, background:"#111", border:"0.5px solid rgba(255,255,255,0.05)" }} />
          </div>

          {/* IG screen */}
          <div style={{ flex:1, width:"100%", display:"flex", flexDirection:"column", padding:"10px 12px 8px", background:"#000", overflowY:"hidden" }}>

            {/* IG topbar */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ fontSize:9, fontWeight:900, color:"#fff", letterSpacing:"-0.3px" }}>ptrgama_</span>
              <div style={{ display:"flex", gap:8 }}>
                {["+","|"].map((s,i) => (
                  <div key={i} style={{ width:10, height:10, background:"rgba(255,255,255,0.12)", borderRadius:2 }} />
                ))}
              </div>
            </div>

            {/* avatar + stats */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              {/* avatar with ring */}
              <div style={{
                width:52, height:52,
                borderRadius:"50%",
                padding:2,
                background:"linear-gradient(135deg,#00d4ff,#0088cc)",
                flexShrink:0,
              }}>
                <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#111", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                  {PROFILE_IMAGE
                    ? <img src={PROFILE_IMAGE} alt="profile" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    : <span style={{ fontSize:20 }}>👤</span>}
                </div>
              </div>
              {/* stats */}
              <div style={{ display:"flex", gap:10, flex:1, justifyContent:"space-around" }}>
                {[["0","Posts"],["666","Followers"],["1","Following"]].map(([v,l]) => (
                  <div key={l} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:9, fontWeight:800, color:"#fff" }}>{v}</div>
                    <div style={{ fontSize:6, color:"rgba(255,255,255,0.35)", marginTop:1 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* name + bio */}
            <div style={{ marginBottom:8 }}>
              <p style={{ fontSize:8, fontWeight:800, color:"#fff", marginBottom:1 }}>Putra Gama</p>
              <p style={{ fontSize:6.5, color:"rgba(255,255,255,0.35)" }}>IG Analyzer creator ✦</p>
            </div>

            {/* follow / message */}
            <div style={{ display:"flex", gap:4, marginBottom:10 }}>
              <div style={{ flex:1, height:20, borderRadius:6, background:"#00d4ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:7, fontWeight:800, color:"#000" }}>Follow</div>
              <div style={{ flex:1, height:20, borderRadius:6, border:"0.5px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.04)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:7, color:"rgba(255,255,255,0.5)" }}>Message</div>
            </div>

            {/* divider */}
            <div style={{ display:"flex", borderBottom:"0.5px solid rgba(255,255,255,0.08)", marginBottom:8 }}>
              <div style={{ flex:1, paddingBottom:6, display:"flex", justifyContent:"center", borderBottom:"1px solid #00d4ff" }}>
                <div style={{ width:10, height:10, background:"rgba(255,255,255,0.5)", borderRadius:1 }} />
              </div>
              {[1,2].map(i => (
                <div key={i} style={{ flex:1, paddingBottom:6, display:"flex", justifyContent:"center" }}>
                  <div style={{ width:10, height:10, background:"rgba(255,255,255,0.15)", borderRadius:1 }} />
                </div>
              ))}
            </div>

            {/* posts grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1.5 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{
                  aspectRatio:"1",
                  borderRadius:2,
                  background: i===0 ? "linear-gradient(135deg,#00d4ff44,#006688aa)"
                    : i===3 ? "linear-gradient(135deg,#00aacc33,#004466aa)"
                    : i===6 ? "linear-gradient(135deg,#00d4ff22,#003355aa)"
                    : `rgba(255,255,255,${0.05 + i*0.012})`,
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── FOOTER ──────────────────── */
function Footer() {
  return (
    <footer className="py-8 text-center" style={{ borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/20 mb-0.5">
        <span>© 2026</span>
        <a
          href="https://www.instagram.com/ptrgama_/"
          target="_blank" rel="noopener noreferrer"
          className="font-bold text-[#00d4ff] hover:text-white transition-colors duration-150 opacity-60 hover:opacity-100"
        >
          @ptrgama_
        </a>
      </div>
      <p className="text-[10px] text-white/15">All Rights Reserved.</p>
    </footer>
  );
}

/* ══════════════════ MAIN APP ══════════════════ */
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
      setError(err.response?.data?.error ?? err.message ?? "Terjadi kesalahan.");
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
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1100px] mx-auto px-8 pt-10 pb-6 flex-1">

        {/* ── NAVBAR ── */}
        <nav className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
              style={{ background:"#00d4ff", color:"#08090c", boxShadow:"0 0 18px rgba(0,212,255,0.35)" }}>
              IG
            </div>
            <span className="text-lg font-black brand-text tracking-tight">IG Analyzer</span>
          </div>
          <HamburgerMenu />
        </nav>

        {!result ? (
          /* ── UPLOAD VIEW: 2-column ── */
          <div className="flex gap-10 items-start">

            {/* LEFT — iPhone */}
            <PhoneMockup />

            {/* RIGHT — upload form */}
            <div className="flex-1 min-w-0">
              {/* headline */}
              <div className="mb-7">
                <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white mb-2">
                  Analisis<br />
                  <span className="brand-text">Instagram</span><br />
                  kamu.
                </h1>
                <p className="text-sm text-white/35 mt-3">
                  Upload file JSON ekspor Instagram untuk melihat siapa yang tidak follow back, mutualan, dan lainnya.
                </p>
              </div>

              {/* dropzones */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <FileDropZone label="following.json"   file={followingFile} onFile={setFollowingFile} />
                <FileDropZone label="followers_1.json" file={followersFile} onFile={setFollowersFile} />
              </div>

              <button className="btn-primary mb-4" onClick={handleAnalyze} disabled={!canAnalyze}>
                {loading ? "MENGANALISIS…" : "ANALISIS SEKARANG"}
              </button>

              <div className="px-4 py-3 text-xs text-white/35 rounded-xl" style={{ background:"rgba(0,212,255,0.04)", border:"1px solid rgba(0,212,255,0.1)" }}>
                <span className="text-[#00d4ff] font-bold">Cara download:</span>{" "}
                Instagram → Pengaturan → Aktivitas → Download info → Format JSON
              </div>

              {error && (
                <div className="mt-3 px-4 py-3 text-xs text-red-400 rounded-xl" style={{ background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.15)" }}>
                  ⚠ {error}
                </div>
              )}
            </div>
          </div>

        ) : (
          /* ── RESULTS VIEW ── */
          <div className="space-y-5">
            {/* stat cards */}
            <div className="flex flex-wrap gap-3">
              <StatCard label="Following"          value={result.stats.following_total} />
              <StatCard label="Followers"          value={result.stats.followers_total} />
              <StatCard label="Tidak Folbek"       value={result.stats.tidak_folbek} />
              <StatCard label="Mutualan"           value={result.stats.mutualan} />
              <StatCard label="Follow 6 Bulan"     value={result.stats.follow_6bln} />
              <StatCard label="6 Bln & Tdk Folbek" value={result.stats.follow_6bln_tidak_folbek} />
            </div>

            {/* tabs */}
            <div className="flex gap-2 flex-wrap">
              {TABS.map(t => {
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => { setActiveTab(t.key); setSearch(""); }}
                    className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-200 ${active ? "tab-active" : "tab-idle"}`}
                  >
                    {t.emoji} {t.label}
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${active ? "bg-black/20" : "bg-white/[0.06]"}`}>
                      {result[t.key].length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* table card */}
            <div className="surface overflow-hidden flex flex-col" style={{ height: 460 }}>
              <div className="px-5 py-3.5 border-b border-white/[0.05] shrink-0">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/25">🔍</span>
                  <input
                    className="w-full text-sm text-white placeholder-white/20 outline-none rounded-lg pl-8 pr-4 py-2.5"
                    style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}
                    placeholder="Cari username…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="px-5 py-2 border-b border-white/[0.04] text-[10px] text-white/25 shrink-0 font-mono uppercase tracking-widest">
                {rows.length} akun
              </div>
              <div className="overflow-y-auto flex-1">
                <UserTable rows={rows} />
              </div>
            </div>

            <button className="btn-ghost" onClick={handleReset}>↩ Analisis Ulang</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
