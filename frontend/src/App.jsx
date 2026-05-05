import { useState } from "react";
import { analyzeFiles } from "./api/analyzeApi";
import FileDropZone from "./components/FileDropZone";
import StatCard from "./components/StatCard";
import UserTable from "./components/UserTable";

// ─── GANTI FOTO PROFIL HP ───────────────────────────────────────────────────
// Letakkan file di: frontend/public/avatar.jpg  (atau .png)
// Ganti null di bawah jadi: "/avatar.jpg"
const PROFILE_IMAGE = "/avatar.jpg";
const IG_LINK = "https://www.instagram.com/ptrgama_/";
// ───────────────────────────────────────────────────────────────────────────

const TABS = [
  { key: "tidak_folbek",             label: "Tidak Folbek",       emoji: "👻" },
  { key: "mutualan",                 label: "Mutualan",           emoji: "🤝" },
  { key: "follow_6bln",              label: "Follow 6 Bulan",     emoji: "📅" },
  { key: "follow_6bln_tidak_folbek", label: "6 Bln & Tdk Folbek", emoji: "⚠️" },
];

/* ──────────────────── SVG LOGO / ICON ──────────────────── */
function IDALogo({ size = 32, className = "" }) {
  // Instagram Dashboard Analyzer icon — camera lens with grid overlay
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#0A0A0A" />
      {/* Outer ring */}
      <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.5" opacity="0.9" />
      {/* Inner circle (lens) */}
      <circle cx="16" cy="16" r="6" stroke="white" strokeWidth="1.2" opacity="0.6" />
      {/* Center dot */}
      <circle cx="16" cy="16" r="2" fill="white" opacity="0.9" />
      {/* Grid lines */}
      <line x1="16" y1="6" x2="16" y2="10" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="16" y1="22" x2="16" y2="26" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="6" y1="16" x2="10" y2="16" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="22" y1="16" x2="26" y2="16" stroke="white" strokeWidth="1" opacity="0.35" />
      {/* Top-right flash dot */}
      <circle cx="24" cy="8" r="1.5" fill="white" opacity="0.7" />
    </svg>
  );
}

/* ──────────────────── MODAL ──────────────────── */
function Modal({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        background: "rgba(0,0,0,0.85)",
      }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}

function ContactModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="relative p-6" style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.9)",
      }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all text-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>✕</button>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 mb-5">Contact Admin</p>
        <a
          href={IG_LINK}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.15)" }}>
            {PROFILE_IMAGE
              ? <img src={PROFILE_IMAGE} alt="admin" className="w-full h-full object-cover" />
              : <span className="text-xl">👤</span>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm">@ptrgama_</p>
            <p className="text-[11px] text-white/35 mt-0.5">Instagram · DM untuk pertanyaan</p>
          </div>
          <span className="text-white/40 text-sm group-hover:text-white transition-colors">↗</span>
        </a>
      </div>
    </Modal>
  );
}

function AboutModal({ onClose }) {
  const stack = [
    { label: "Flask", sub: "Python · Backend & logic" },
    { label: "React + Vite", sub: "Frontend · Fast & modern" },
    { label: "Tailwind CSS", sub: "UI · Responsive & structured" },
  ];
  return (
    <Modal onClose={onClose}>
      <div className="relative p-6" style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.9)",
      }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all text-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>✕</button>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 mb-1">About</p>
        <div className="flex items-center gap-2.5 mb-1">
          <IDALogo size={28} />
          <h2 className="text-xl font-black text-white tracking-tight">Instagram Dashboard Analyzer</h2>
        </div>
        <p className="text-[11px] text-white/30 mb-5">v1.0 · by @ptrgama_</p>
        <p className="text-sm text-white/45 leading-relaxed mb-5">
          Dashboard berbasis <span className="text-white/80 font-semibold">Flask (Python)</span> untuk backend logika & pemrosesan data,
          dengan <span className="text-white/80 font-semibold">React + Vite</span> di frontend untuk performa cepat dan modern,
          serta <span className="text-white/80 font-semibold">Tailwind CSS</span> untuk UI yang responsif dan terstruktur.
        </p>
        <div className="space-y-2">
          {stack.map(s => (
            <div key={s.label} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50 shrink-0" />
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
      <div className="relative p-6" style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.9)",
      }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all text-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>✕</button>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 mb-1">Next Update</p>
        <h2 className="text-xl font-black text-white mb-1 tracking-tight">Coming Soon</h2>
        <p className="text-[11px] text-white/35 mb-5">Fitur yang akan hadir di versi berikutnya</p>
        <div className="space-y-1.5">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="w-1 h-1 rounded-full bg-white opacity-40" />
              </div>
              <p className="text-xs text-white/45">{f}</p>
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
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
          aria-label="Menu"
        >
          <span className={`block h-[1.5px] bg-white/60 rounded-full transition-all duration-250 ${open ? "w-4 rotate-45 translate-y-[6.5px]" : "w-4"}`} />
          <span className={`block h-[1.5px] bg-white/60 rounded-full transition-all duration-250 ${open ? "w-0 opacity-0" : "w-3"}`} />
          <span className={`block h-[1.5px] bg-white/60 rounded-full transition-all duration-250 ${open ? "w-4 -rotate-45 -translate-y-[6.5px]" : "w-4"}`} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-11 z-40 w-44 py-1.5 overflow-hidden"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.8)" }}>
              {items.map((item) => (
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

/* ──────────────────── IG ICONS ──────────────────── */
const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconComment = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconShare = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconBookmark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
const IconGrid = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconReels = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);
const IconTag = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconMore = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
  </svg>
);
const IconNew = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const IconDM = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconSearch = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconPlus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 8v8M8 12h8" />
  </svg>
);
const IconReelNav = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M10 9l6 3-6 3V9z" />
  </svg>
);
const IconProfile = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

/* ──────────────────── IPHONE 17 PRO MAX MOCKUP ──────────────────── */
function PhoneMockup() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("grid"); // grid | reels | tagged

  // Story highlights
  const highlights = [
    { label: "Trip", color: "#1a1a1a" },
    { label: "Food", color: "#1a1a1a" },
    { label: "Code", color: "#1a1a1a" },
    { label: "Misc", color: "#1a1a1a" },
  ];

  // Grid post placeholders
  const gridColors = [
    "#1c1c1e","#161618","#1a1a1c","#141416","#181818","#1e1e20",
    "#131315","#1c1c1e","#161618",
  ];

  return (
    <div className="relative flex-shrink-0" style={{ width: 220 }}>
      {/* ambient glow */}
      <div className="absolute pointer-events-none"
        style={{
          inset: "-30px",
          background: "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.04), transparent 70%)",
        }} />

      {/* titanium frame — iPhone 17 Pro Max proportions */}
      <div style={{
        width: 220,
        height: 476,
        borderRadius: 52,
        background: "linear-gradient(150deg, #3a3a3c 0%, #2c2c2e 30%, #1c1c1e 60%, #111 100%)",
        padding: "3px",
        boxShadow: `
          0 0 0 0.5px rgba(255,255,255,0.04),
          0 2px 0 0 rgba(255,255,255,0.07),
          0 40px 80px rgba(0,0,0,0.95),
          0 16px 32px rgba(0,0,0,0.7),
          inset 0 1px 0 rgba(255,255,255,0.1),
          inset 0 -1px 0 rgba(0,0,0,0.5)
        `,
        position: "relative",
      }}>
        {/* Action button */}
        <div style={{ position:"absolute", left:-3.5, top:100, width:3.5, height:28, borderRadius:"4px 0 0 4px", background:"linear-gradient(to bottom,#3a3a3c,#2a2a2c)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08)" }} />
        {/* Volume up */}
        <div style={{ position:"absolute", left:-3.5, top:144, width:3.5, height:44, borderRadius:"4px 0 0 4px", background:"linear-gradient(to bottom,#3a3a3c,#2a2a2c)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08)" }} />
        {/* Volume down */}
        <div style={{ position:"absolute", left:-3.5, top:196, width:3.5, height:44, borderRadius:"4px 0 0 4px", background:"linear-gradient(to bottom,#3a3a3c,#2a2a2c)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08)" }} />
        {/* Power */}
        <div style={{ position:"absolute", right:-3.5, top:152, width:3.5, height:60, borderRadius:"0 4px 4px 0", background:"linear-gradient(to bottom,#3a3a3c,#2a2a2c)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08)" }} />

        {/* screen */}
        <div style={{
          width:"100%", height:"100%",
          borderRadius: 50,
          background:"#000",
          overflow:"hidden",
          display:"flex",
          flexDirection:"column",
        }}>
          {/* Status bar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px 4px", flexShrink:0 }}>
            <span style={{ fontSize:9, fontWeight:700, color:"#fff", letterSpacing:"0.02em" }}>9:41</span>
            {/* Dynamic Island */}
            <div style={{
              width:108,
              height:28,
              borderRadius:20,
              background:"#000",
              border:"1px solid rgba(255,255,255,0.05)",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              gap:6,
              boxShadow:"0 0 0 4px #000",
              position:"absolute",
              left:"50%",
              transform:"translateX(-50%)",
              top:10,
            }}>
              {/* camera */}
              <div style={{ width:9, height:9, borderRadius:"50%", background:"#0a0a0a", border:"0.5px solid rgba(255,255,255,0.05)" }} />
              {/* Face ID sensor */}
              <div style={{ width:5, height:5, borderRadius:"50%", background:"#150020", border:"0.5px solid rgba(150,80,255,0.3)", boxShadow:"0 0 6px rgba(120,60,255,0.5)" }} />
              {/* speaker */}
              <div style={{ width:24, height:5, borderRadius:3, background:"#0a0a0a", border:"0.5px solid rgba(255,255,255,0.04)" }} />
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              {/* signal */}
              <div style={{ display:"flex", alignItems:"flex-end", gap:1 }}>
                {[5,7,9,11].map((h,i) => (
                  <div key={i} style={{ width:2, height:h, borderRadius:1, background: i<3 ? "white" : "rgba(255,255,255,0.3)" }} />
                ))}
              </div>
              {/* wifi */}
              <svg width="10" height="8" viewBox="0 0 12 9" fill="none">
                <path d="M1 3.5C2.8 1.7 4.8 0.8 6 0.8S9.2 1.7 11 3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M2.8 5.2C3.9 4.1 4.95 3.6 6 3.6s2.1.5 3.2 1.6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="6" cy="7.5" r="1" fill="white"/>
              </svg>
              {/* battery */}
              <div style={{ display:"flex", alignItems:"center", gap:1 }}>
                <div style={{ width:18, height:9, borderRadius:2.5, border:"1px solid rgba(255,255,255,0.5)", padding:1.5, display:"flex", alignItems:"center" }}>
                  <div style={{ width:"80%", height:"100%", borderRadius:1, background:"white" }} />
                </div>
                <div style={{ width:1.5, height:4, borderRadius:1, background:"rgba(255,255,255,0.4)" }} />
              </div>
            </div>
          </div>

          {/* IG Topbar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"4px 14px 6px", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:3 }}>
              {/* IG wordmark style */}
              <span style={{ fontSize:14, fontWeight:900, color:"#fff", letterSpacing:"-0.5px", fontStyle:"italic" }}>ptrgama_</span>
              <div style={{ width:10, height:10, borderRadius:"50%", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:4, height:4, borderRadius:"50%", background:"rgba(255,255,255,0.5)" }} />
              </div>
            </div>
            <div style={{ display:"flex", gap:14, alignItems:"center" }}>
              <div style={{ opacity:0.7 }}><IconNew /></div>
              <div style={{ opacity:0.7 }}><IconDM /></div>
            </div>
          </div>

          {/* Scroll area */}
          <div style={{ flex:1, overflowY:"hidden", display:"flex", flexDirection:"column" }}>

            {/* Stories row */}
            <div style={{ display:"flex", gap:8, padding:"4px 12px 10px", overflowX:"hidden", flexShrink:0 }}>
              {/* Your story */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, flexShrink:0 }}>
                <div style={{
                  width:44, height:44, borderRadius:"50%",
                  background:"rgba(255,255,255,0.06)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  position:"relative",
                }}>
                  {PROFILE_IMAGE
                    ? <img src={PROFILE_IMAGE} alt="me" style={{ width:40, height:40, borderRadius:"50%", objectFit:"cover" }} />
                    : <span style={{ fontSize:14 }}>👤</span>}
                  <div style={{ position:"absolute", bottom:-1, right:-1, width:14, height:14, borderRadius:"50%", background:"#3897f0", border:"1.5px solid #000", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ color:"#fff", fontSize:9, fontWeight:900, lineHeight:1 }}>+</span>
                  </div>
                </div>
                <span style={{ fontSize:7, color:"rgba(255,255,255,0.5)", maxWidth:44, textAlign:"center", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Your story</span>
              </div>
              {/* Other stories with gradient ring */}
              {["alex","reza","nina","dito"].map((name, i) => (
                <div key={name} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, flexShrink:0 }}>
                  <div style={{
                    width:44, height:44, borderRadius:"50%",
                    padding:2,
                    background: i%2===0
                      ? "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)"
                      : "linear-gradient(45deg,#405de6,#5851db,#833ab4,#c13584,#e1306c)",
                  }}>
                    <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:`hsl(${i*60+200},15%,12%)`, border:"2px solid #000" }} />
                  </div>
                  <span style={{ fontSize:7, color:"rgba(255,255,255,0.5)", maxWidth:44, textAlign:"center", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{name}</span>
                </div>
              ))}
            </div>

            {/* Post feed */}
            <div style={{ flexShrink:0 }}>
              {/* Post header */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 12px", marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{
                    width:28, height:28, borderRadius:"50%",
                    padding:1.5,
                    background:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366)",
                  }}>
                    <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#111", overflow:"hidden", border:"1.5px solid #000" }}>
                      {PROFILE_IMAGE
                        ? <img src={PROFILE_IMAGE} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                        : <div style={{ width:"100%", height:"100%", background:"#222" }} />}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize:8, fontWeight:700, color:"#fff", letterSpacing:"0.01em" }}>ptrgama_</p>
                    <p style={{ fontSize:6.5, color:"rgba(255,255,255,0.35)" }}>Jakarta, Indonesia</p>
                  </div>
                </div>
                <div style={{ opacity:0.5, color:"white" }}><IconMore /></div>
              </div>

              {/* Post image */}
              <div style={{
                width:"100%",
                height:180,
                background:"linear-gradient(145deg,#1a1a2e 0%,#0f0f1a 40%,#0a0a0f 100%)",
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative",
                overflow:"hidden",
              }}>
                {/* decorative grid lines */}
                <div style={{ position:"absolute", inset:0, opacity:0.06 }}>
                  {[...Array(6)].map((_,i) => (
                    <div key={i} style={{ position:"absolute", left:0, right:0, top:`${(i+1)*14.28}%`, height:"0.5px", background:"white" }} />
                  ))}
                  {[...Array(4)].map((_,i) => (
                    <div key={i} style={{ position:"absolute", top:0, bottom:0, left:`${(i+1)*20}%`, width:"0.5px", background:"white" }} />
                  ))}
                </div>
                <IDALogo size={48} />
                <p style={{ position:"absolute", bottom:8, right:8, fontSize:7, color:"rgba(255,255,255,0.2)", fontWeight:600 }}>IG Analyzer</p>
              </div>

              {/* Action bar */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"7px 12px 4px" }}>
                <div style={{ display:"flex", gap:10, color:"white", opacity:0.8 }}>
                  <button onClick={() => setLiked(l => !l)} style={{ background:"none", border:"none", padding:0, cursor:"pointer", color: liked ? "#ed4956" : "white", opacity: liked ? 1 : 0.8 }}>
                    <IconHeart />
                  </button>
                  <IconComment />
                  <IconShare />
                </div>
                <button onClick={() => setSaved(s => !s)} style={{ background:"none", border:"none", padding:0, cursor:"pointer", color: saved ? "white" : "white", opacity: saved ? 1 : 0.7 }}>
                  <IconBookmark />
                </button>
              </div>

              {/* Likes + caption */}
              <div style={{ padding:"0 12px 8px" }}>
                <p style={{ fontSize:8, fontWeight:700, color:"#fff", marginBottom:2 }}>{liked ? "1,234" : "1,233"} likes</p>
                <p style={{ fontSize:7.5, color:"rgba(255,255,255,0.7)", lineHeight:1.5 }}>
                  <span style={{ fontWeight:700, color:"white" }}>ptrgama_ </span>
                  IG Analyzer creator ✦ check bio
                </p>
                <p style={{ fontSize:7, color:"rgba(255,255,255,0.25)", marginTop:2 }}>View all 48 comments</p>
              </div>
            </div>

            {/* Profile section */}
            <div style={{ flexShrink:0, borderTop:"0.5px solid rgba(255,255,255,0.07)", padding:"10px 14px 0" }}>
              {/* Avatar + stats */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{
                  width:64, height:64, borderRadius:"50%",
                  padding:2.5,
                  background:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                  flexShrink:0,
                }}>
                  <div style={{ width:"100%", height:"100%", borderRadius:"50%", border:"2px solid #000", overflow:"hidden", background:"#1a1a1a" }}>
                    {PROFILE_IMAGE
                      ? <img src={PROFILE_IMAGE} alt="profile" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      : <span style={{ fontSize:22, display:"flex", alignItems:"center", justifyContent:"center", height:"100%" }}>👤</span>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:12, flex:1, justifyContent:"space-around" }}>
                  {[["0","Posts"],["666","Followers"],["1","Following"]].map(([v,l]) => (
                    <div key={l} style={{ textAlign:"center" }}>
                      <div style={{ fontSize:11, fontWeight:800, color:"#fff" }}>{v}</div>
                      <div style={{ fontSize:7.5, color:"rgba(255,255,255,0.35)", marginTop:1 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Name + bio */}
              <div style={{ marginBottom:8 }}>
                <p style={{ fontSize:9, fontWeight:800, color:"#fff", marginBottom:1.5 }}>Putra Gama</p>
                <p style={{ fontSize:7.5, color:"rgba(255,255,255,0.35)", lineHeight:1.5 }}>IG Analyzer creator ✦</p>
              </div>

              {/* CTA Buttons — Follow links to IG */}
              <div style={{ display:"flex", gap:5, marginBottom:10 }}>
                <a
                  href={IG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex:1, height:24, borderRadius:8,
                    background:"#fff",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:8.5, fontWeight:700, color:"#000",
                    textDecoration:"none",
                  }}
                >
                  Follow
                </a>
                <a
                  href={IG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex:1, height:24, borderRadius:8,
                    border:"0.5px solid rgba(255,255,255,0.15)",
                    background:"rgba(255,255,255,0.05)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:8.5, color:"rgba(255,255,255,0.6)",
                    textDecoration:"none",
                  }}
                >
                  Message
                </a>
                <div style={{
                  width:24, height:24, borderRadius:8,
                  border:"0.5px solid rgba(255,255,255,0.15)",
                  background:"rgba(255,255,255,0.05)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:8, color:"rgba(255,255,255,0.5)",
                }}>▾</div>
              </div>

              {/* Story highlights */}
              <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                {highlights.map(h => (
                  <div key={h.label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                    <div style={{
                      width:36, height:36, borderRadius:"50%",
                      border:"1px solid rgba(255,255,255,0.15)",
                      background:"rgba(255,255,255,0.04)",
                    }} />
                    <span style={{ fontSize:6.5, color:"rgba(255,255,255,0.4)", textAlign:"center" }}>{h.label}</span>
                  </div>
                ))}
              </div>

              {/* Tab icons */}
              <div style={{ display:"flex", borderTop:"0.5px solid rgba(255,255,255,0.08)" }}>
                {[
                  { id:"grid", Icon:IconGrid },
                  { id:"reels", Icon:IconReels },
                  { id:"tagged", Icon:IconTag },
                ].map(({ id, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    style={{
                      flex:1, paddingTop:8, paddingBottom:6,
                      display:"flex", justifyContent:"center",
                      background:"none", border:"none", cursor:"pointer",
                      color: tab===id ? "#fff" : "rgba(255,255,255,0.3)",
                      borderTop: tab===id ? "1px solid white" : "1px solid transparent",
                    }}
                  >
                    <Icon />
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1 }}>
                {gridColors.slice(0,6).map((bg, i) => (
                  <div key={i} style={{ aspectRatio:"1", background:bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {i===0 && <IDALogo size={20} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom nav bar */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-around",
              padding:"8px 0 16px",
              background:"#000",
              borderTop:"0.5px solid rgba(255,255,255,0.07)",
              color:"rgba(255,255,255,0.7)",
              flexShrink:0,
              marginTop:"auto",
            }}>
              {[IconHome, IconSearch, IconPlus, IconReelNav].map((Icon, i) => (
                <div key={i} style={{ opacity: i===0 ? 1 : 0.45 }}>
                  <Icon />
                </div>
              ))}
              {/* Profile nav */}
              <div style={{ width:22, height:22, borderRadius:"50%", border:"1.5px solid rgba(255,255,255,0.4)", overflow:"hidden" }}>
                {PROFILE_IMAGE
                  ? <img src={PROFILE_IMAGE} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <div style={{ width:"100%", height:"100%", background:"#333" }} />}
              </div>
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
      <div className="flex items-center justify-center gap-2 text-[11px] text-white/20 mb-1">
        <IDALogo size={16} />
        <span>© 2026</span>
        <a
          href={IG_LINK}
          target="_blank" rel="noopener noreferrer"
          className="font-bold text-white/40 hover:text-white transition-colors duration-150"
        >
          @ptrgama_
        </a>
      </div>
      <p className="text-[10px] text-white/12">Instagram Dashboard Analyzer · All Rights Reserved.</p>
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
            <IDALogo size={32} />
            <div>
              <span className="text-base font-black text-white tracking-tight">Instagram Dashboard</span>
              <span className="text-base font-black text-white/40 tracking-tight"> Analyzer</span>
            </div>
          </div>
          <HamburgerMenu />
        </nav>

        {!result ? (
          /* ── UPLOAD VIEW ── */
          <div className="flex gap-12 items-start">

            {/* LEFT — iPhone mockup */}
            <PhoneMockup />

            {/* RIGHT — upload form */}
            <div className="flex-1 min-w-0 pt-2">
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Instagram Dashboard Analyzer</p>
                <h1 className="text-[40px] font-black leading-[1.05] tracking-tight text-white mb-3">
                  Siapa yang<br />
                  tidak<br />
                  <span style={{ color:"rgba(255,255,255,0.5)" }}>follow back?</span>
                </h1>
                <p className="text-sm text-white/35 leading-relaxed">
                  Upload file JSON ekspor Instagram untuk melihat siapa yang tidak follow back, mutualan, dan lainnya.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <FileDropZone label="following.json"   file={followingFile} onFile={setFollowingFile} />
                <FileDropZone label="followers_1.json" file={followersFile} onFile={setFollowersFile} />
              </div>

              <button
                className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 mb-4"
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                style={{
                  background: canAnalyze ? "#fff" : "rgba(255,255,255,0.06)",
                  color: canAnalyze ? "#000" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: canAnalyze ? "pointer" : "not-allowed",
                  letterSpacing:"0.08em",
                }}
              >
                {loading ? "MENGANALISIS…" : "ANALISIS SEKARANG"}
              </button>

              <div className="px-4 py-3 text-xs text-white/30 rounded-xl leading-relaxed" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-white/60 font-bold">Cara download:</span>{" "}
                Instagram → Pengaturan → Aktivitas → Download info → Format JSON
              </div>

              {error && (
                <div className="mt-3 px-4 py-3 text-xs text-red-400/80 rounded-xl" style={{ background:"rgba(239,68,68,0.05)", border:"1px solid rgba(239,68,68,0.12)" }}>
                  ⚠ {error}
                </div>
              )}
            </div>
          </div>

        ) : (
          /* ── RESULTS VIEW ── */
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
                    className="px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-200"
                    style={{
                      background: active ? "#fff" : "rgba(255,255,255,0.05)",
                      color: active ? "#000" : "rgba(255,255,255,0.45)",
                      border: active ? "none" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {t.emoji} {t.label}
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold" style={{
                      background: active ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.06)",
                    }}>
                      {result[t.key].length}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="overflow-hidden flex flex-col" style={{
              height:460,
              background:"rgba(255,255,255,0.02)",
              border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:16,
            }}>
              <div className="px-5 py-3.5 shrink-0" style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
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
              <div className="px-5 py-2 text-[10px] text-white/25 shrink-0 font-mono uppercase tracking-widest" style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                {rows.length} akun
              </div>
              <div className="overflow-y-auto flex-1">
                <UserTable rows={rows} />
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.08)" }}
            >
              ↩ Analisis Ulang
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
