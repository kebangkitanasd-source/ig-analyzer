import { useState } from "react";
import { analyzeFiles } from "./api/analyzeApi";
import FileDropZone from "./components/FileDropZone";
import StatCard from "./components/StatCard";
import UserTable from "./components/UserTable";

// ─── GANTI GAMBAR PROFIL DI SINI ───────────────────────────────────────────
// Taruh file gambar kamu di: frontend/public/avatar.jpg  (atau .png)
// lalu ganti nilai di bawah dengan nama filenya, contoh: "/avatar.png"
const PROFILE_IMAGE = null; // null = pakai emoji default 👤
// ───────────────────────────────────────────────────────────────────────────

const TABS = [
  { key: "tidak_folbek",             label: "Tidak Folbek",       emoji: "👻" },
  { key: "mutualan",                 label: "Mutualan",           emoji: "🤝" },
  { key: "follow_6bln",              label: "Follow 6 Bulan",     emoji: "📅" },
  { key: "follow_6bln_tidak_folbek", label: "6 Bln & Tdk Folbek", emoji: "⚠️" },
];

/* ── Modal backdrop ── */
function Modal({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(16px)", background: "rgba(8,8,16,0.75)" }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}

/* ── Contact Admin modal ── */
function ContactModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="surface p-6 relative">
        <button onClick={onClose}
          className="absolute top-4 right-4 text-[#606080] hover:text-white transition-colors text-lg leading-none">✕</button>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#606080] mb-5">Contact Admin</p>

        {/* IG Card */}
        <a
          href="https://www.instagram.com/ptrgama_/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#a855f7]/30 transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-full ig-grad flex items-center justify-center text-xl shrink-0"
            style={{ boxShadow: "0 0 16px rgba(247,64,110,0.4)" }}>
            {PROFILE_IMAGE
              ? <img src={PROFILE_IMAGE} alt="admin" className="w-full h-full rounded-full object-cover" />
              : "👤"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#f0f0f8] text-sm group-hover:ig-grad-text transition-all">@ptrgama_</p>
            <p className="text-[11px] text-[#606080] truncate">Instagram · DM untuk pertanyaan</p>
          </div>
          <span className="text-[#a855f7] text-sm">↗</span>
        </a>
      </div>
    </Modal>
  );
}

/* ── About modal ── */
function AboutModal({ onClose }) {
  const stack = [
    { icon: "🐍", name: "Flask (Python)", desc: "Backend · logika & pemrosesan data" },
    { icon: "⚛️", name: "React + Vite",   desc: "Frontend · performa cepat & modern" },
    { icon: "🎨", name: "Tailwind CSS",   desc: "UI · responsif & terstruktur" },
  ];
  return (
    <Modal onClose={onClose}>
      <div className="surface p-6 relative">
        <button onClick={onClose}
          className="absolute top-4 right-4 text-[#606080] hover:text-white transition-colors text-lg leading-none">✕</button>

        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg ig-grad flex items-center justify-center text-base"
            style={{ boxShadow: "0 0 14px rgba(247,64,110,0.4)" }}>📊</div>
          <h2 className="font-extrabold text-lg ig-grad-text leading-none">IG Analyzer v1.0</h2>
        </div>
        <p className="text-[11px] text-[#606080] mb-5">About this project</p>

        <p className="text-sm text-[#a0a0c0] leading-relaxed mb-5">
          Dashboard ini dibuat berbasis <span className="text-white font-semibold">Flask (Python)</span> sebagai
          backend untuk menangani logika sistem dan pemrosesan data, serta menggunakan{" "}
          <span className="text-white font-semibold">React dengan Vite</span> pada sisi frontend untuk performa
          yang cepat dan pengembangan modern, dengan tampilan antarmuka (UI) yang dirancang menggunakan{" "}
          <span className="text-white font-semibold">Tailwind CSS</span> agar responsif, terstruktur, dan mudah digunakan.
        </p>

        <div className="space-y-2">
          {stack.map(s => (
            <div key={s.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-lg">{s.icon}</span>
              <div>
                <p className="text-xs font-bold text-[#f0f0f8]">{s.name}</p>
                <p className="text-[10px] text-[#606080]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

/* ── Coming Soon modal ── */
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
      <div className="surface p-6 relative">
        <button onClick={onClose}
          className="absolute top-4 right-4 text-[#606080] hover:text-white transition-colors text-lg leading-none">✕</button>

        <div className="text-3xl mb-3">🚀</div>
        <h2 className="font-extrabold text-lg text-white mb-1">Coming Soon</h2>
        <p className="text-[11px] text-[#606080] mb-5">Akan ada beberapa menu update next version</p>

        <div className="space-y-2">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-5 h-5 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] opacity-60" />
              </div>
              <p className="text-xs text-[#a0a0c0]">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

/* ── Hamburger Menu ── */
function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null); // 'contact' | 'about' | 'soon'

  const openModal = (m) => { setModal(m); setOpen(false); };
  const closeModal = () => setModal(null);

  const items = [
    { label: "Contact Admin", key: "contact", icon: "✉️" },
    { label: "About",         key: "about",   icon: "ℹ️" },
    { label: "Coming Soon",   key: "soon",    icon: "🚀" },
  ];

  return (
    <>
      {/* Hamburger button */}
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex flex-col justify-center gap-[5px] w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-200 items-center"
          aria-label="Menu"
        >
          <span className={`block h-[1.5px] w-4 rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""} bg-[#a0a0c0]`} />
          <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${open ? "opacity-0 w-0" : "w-4"} bg-[#a0a0c0]`} />
          <span className={`block h-[1.5px] w-4 rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""} bg-[#a0a0c0]`} />
        </button>

        {/* Dropdown */}
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-11 z-40 w-44 surface py-1.5 shadow-2xl"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
              {items.map(item => (
                <button
                  key={item.key}
                  onClick={() => openModal(item.key)}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#a0a0c0] hover:text-white hover:bg-white/[0.05] transition-all duration-150 flex items-center gap-2.5"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {modal === "contact" && <ContactModal onClose={closeModal} />}
      {modal === "about"   && <AboutModal   onClose={closeModal} />}
      {modal === "soon"    && <ComingSoonModal onClose={closeModal} />}
    </>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="mt-16 pb-8 text-center text-[11px] text-[#606080] space-y-1">
      <div className="flex items-center justify-center gap-1.5">
        <span>©</span>
        <span>2026</span>
        <a
          href="https://www.instagram.com/ptrgama_/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#a855f7] hover:text-[#f7406e] transition-colors duration-150"
        >
          @ptrgama_
        </a>
      </div>
      <p className="text-[#404060]">All Rights Reserved.</p>
    </footer>
  );
}

/* ── Phone Mockup ── */
function PhoneMockup() {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        {/* outer glow */}
        <div className="absolute -inset-4 rounded-[3.5rem] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(168,85,247,0.15), transparent 70%)" }} />

        {/* phone shell */}
        <div
          className="relative w-[148px] h-[300px] rounded-[2.8rem] bg-[#101010] flex flex-col items-center overflow-hidden"
          style={{
            border: "2px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 24px 48px rgba(0,0,0,0.6)",
          }}
        >
          {/* side buttons */}
          <div className="absolute -right-[3px] top-20 w-[3px] h-8 rounded-r-full bg-white/10" />
          <div className="absolute -left-[3px] top-16 w-[3px] h-6 rounded-l-full bg-white/10" />
          <div className="absolute -left-[3px] top-24 w-[3px] h-6 rounded-l-full bg-white/10" />

          {/* Dynamic Island */}
          <div className="mt-3 w-[52px] h-[18px] rounded-full bg-black border border-white/[0.08] z-10 flex items-center justify-center gap-1.5 shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-white/10" />
            <div className="w-1 h-1 rounded-full bg-[#1a1a1a] border border-white/[0.08]" />
          </div>

          {/* Screen content */}
          <div className="w-full flex-1 flex flex-col items-center pt-3 px-3 bg-[#0a0a0a] overflow-hidden">
            {/* IG top bar */}
            <div className="w-full flex items-center justify-between mb-3 px-0.5">
              <span className="text-[8px] font-extrabold text-white">ptrgama_</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-white/10" />
                <div className="w-3 h-3 rounded-sm bg-white/10" />
              </div>
            </div>

            {/* Avatar + stats row */}
            <div className="w-full flex items-center gap-2 mb-2.5">
              {/* avatar ring */}
              <div className="w-[46px] h-[46px] rounded-full p-[2px] shrink-0"
                style={{ background: "linear-gradient(135deg,#f7406e,#a855f7,#3b82f6)" }}>
                <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                  {/* ─── GANTI GAMBAR PROFIL DI SINI ───────────────────── */}
                  {/* Taruh file di: frontend/public/avatar.jpg              */}
                  {/* Ganti PROFILE_IMAGE di atas menjadi: "/avatar.jpg"     */}
                  {PROFILE_IMAGE
                    ? <img src={PROFILE_IMAGE} alt="profile" className="w-full h-full object-cover rounded-full" />
                    : <span className="text-lg">👤</span>
                  }
                </div>
              </div>
              {/* stats */}
              <div className="flex gap-2 flex-1 justify-around">
                {[["—","Posts"],["—","Followers"],["—","Following"]].map(([v,l]) => (
                  <div key={l} className="text-center">
                    <div className="text-[8px] font-bold text-white">{v}</div>
                    <div className="text-[6px] text-[#606080]">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* name + bio */}
            <div className="w-full mb-2">
              <p className="text-[8px] font-bold text-white">Putra Gama</p>
              <p className="text-[6.5px] text-[#606080]">IG Analyzer creator ✨</p>
            </div>

            {/* follow / message buttons */}
            <div className="w-full flex gap-1 mb-3">
              <div className="flex-1 h-[18px] rounded-md ig-grad flex items-center justify-center text-[7px] font-bold text-white">Follow</div>
              <div className="flex-1 h-[18px] rounded-md border border-white/10 bg-white/[0.05] flex items-center justify-center text-[7px] text-white/70">Message</div>
            </div>

            {/* posts grid */}
            <div className="grid grid-cols-3 gap-[1.5px] w-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-[2px]"
                  style={{
                    background: i % 3 === 0
                      ? "linear-gradient(135deg,rgba(247,64,110,0.5),rgba(168,85,247,0.3))"
                      : i % 3 === 1
                      ? "rgba(168,85,247,0.25)"
                      : "rgba(59,130,246,0.2)",
                  }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
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
    <div className="min-h-screen flex flex-col">
      <div className="max-w-[860px] w-full mx-auto px-6 py-14 flex-1">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl ig-grad flex items-center justify-center text-xl"
                style={{ boxShadow: "0 0 22px rgba(247,64,110,0.4)" }}
              >
                📊
              </div>
              <h1 className="text-3xl font-extrabold leading-none ig-grad-text">IG Analyzer</h1>
            </div>
            <p className="text-sm text-[#a0a0c0] max-w-md">
              Upload file JSON ekspor Instagram kamu untuk menganalisis followers & following.
            </p>
          </div>
          <HamburgerMenu />
        </div>

        {!result ? (
          /* ── Upload ── */
          <div className="space-y-4">
            <PhoneMockup />

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
            <div className="flex flex-wrap gap-3">
              <StatCard label="Following"          value={result.stats.following_total} />
              <StatCard label="Followers"          value={result.stats.followers_total} />
              <StatCard label="Tidak Folbek"       value={result.stats.tidak_folbek} />
              <StatCard label="Mutualan"           value={result.stats.mutualan} />
              <StatCard label="Follow 6 Bulan"     value={result.stats.follow_6bln} />
              <StatCard label="6 Bln & Tdk Folbek" value={result.stats.follow_6bln_tidak_folbek} />
            </div>

            <div className="flex gap-2 flex-wrap">
              {TABS.map(t => {
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => { setActiveTab(t.key); setSearch(""); }}
                    className={`px-4 py-2 rounded-full text-[13px] font-bold border transition-all duration-200 ${
                      active ? "text-white border-transparent" : "bg-white/[0.04] border-white/[0.08] text-[#a0a0c0] hover:bg-white/[0.07] hover:border-white/20"
                    }`}
                    style={active ? { background: "linear-gradient(135deg,#f7406e,#a855f7)", boxShadow: "0 0 16px rgba(247,64,110,0.3)" } : {}}
                  >
                    {t.emoji} {t.label}
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${active ? "bg-white/20" : "bg-white/[0.07]"}`}>
                      {result[t.key].length}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="surface overflow-hidden flex flex-col" style={{ height: 480 }}>
              <div className="px-5 py-4 border-b border-white/[0.06] shrink-0">
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
              <div className="px-5 py-2 border-b border-white/[0.04] text-[11px] text-[#606080] shrink-0">
                Menampilkan <span className="font-bold text-[#a0a0c0]">{rows.length}</span> akun
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
