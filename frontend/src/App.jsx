import { useState, useEffect } from "react";
import { analyzeFiles } from "./api/analyzeApi";
import FileDropZone from "./components/FileDropZone";
import StatCard from "./components/StatCard";
import UserTable from "./components/UserTable";

const PROFILE_IMAGE = "/avatar.jpg";
const IG_LINK = "https://www.instagram.com/ptrgama_/";

const TABS = [
  { key: "tidak_folbek",             label: "Tidak Folbek",       count_key: "tidak_folbek" },
  { key: "mutualan",                 label: "Mutualan",           count_key: "mutualan" },
  { key: "follow_6bln",              label: "Follow 6 Bulan",     count_key: "follow_6bln" },
  { key: "follow_6bln_tidak_folbek", label: "6 Bln & Tdk Folbek", count_key: "follow_6bln_tidak_folbek" },
];

/* ── DARK MODE HOOK ── */
function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("ida-dark");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("ida-dark", dark);
  }, [dark]);

  return [dark, setDark];
}

/* ── LOGO ── */
function IDALogo({ size = 28 }) {
  return (
    <img
      src="/favicon.png"
      alt="IG Analyzer"
      style={{ width: size, height: size, objectFit: "contain", flexShrink: 0, display: "block" }}
    />
  );
}

/* ── DARK TOGGLE ── */
function DarkToggle({ dark, setDark }) {
  return (
    <button
      className="dark-toggle"
      onClick={() => setDark(d => !d)}
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle dark mode"
    >
      {dark ? (
        /* sun */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3" stroke="var(--text-primary)" strokeWidth="1.5"/>
          <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="var(--text-primary)" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      ) : (
        /* moon */
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M13 9.5A6.5 6.5 0 0 1 5.5 2c0-.34.03-.67.08-1A6.5 6.5 0 1 0 14 10.92 6.47 6.47 0 0 1 13 9.5z" stroke="var(--text-primary)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

/* ── MODAL ── */
function Modal({ onClose, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        background: "var(--bg-overlay)",
        animation: "fade-in 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-sm"
        style={{ animation: "fade-up 0.25s ease" }}
      >
        {children}
      </div>
    </div>
  );
}

function ModalShell({ onClose, title, children }) {
  return (
    <Modal onClose={onClose}>
      <div
        className="relative p-6 rounded-3xl"
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ background: "var(--bg-tertiary)", color: "var(--text-secondary)", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--border-strong)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--bg-tertiary)"}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
}

function ContactModal({ onClose }) {
  return (
    <ModalShell onClose={onClose} title="Hubungi Admin">
      <a
        href={IG_LINK}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-150"
        style={{
          background: "var(--bg-tertiary)",
          border: "1px solid var(--border)",
          textDecoration: "none",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-card)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-tertiary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
      >
        <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0"
          style={{ background: "var(--accent-muted)", border: "1px solid var(--accent-border)" }}>
          {PROFILE_IMAGE
            ? <img src={PROFILE_IMAGE} alt="admin" className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>@ptrgama_</p>
          <p className="text-[12px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Instagram · DM untuk pertanyaan</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--text-tertiary)", flexShrink: 0 }}>
          <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </ModalShell>
  );
}

function AboutModal({ onClose }) {
  const stack = [
    { label: "Flask",        sub: "Python · Backend & logic",       color: "var(--apple-orange, #ff9500)" },
    { label: "React + Vite", sub: "Frontend · Fast & modern",       color: "var(--accent)" },
    { label: "Tailwind CSS", sub: "UI · Responsive & structured",   color: "var(--apple-teal, #5ac8fa)" },
  ];
  return (
    <ModalShell onClose={onClose} title="Tentang Aplikasi">
      <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <IDALogo size={36} />
        <div>
          <p className="font-bold text-base tracking-tight" style={{ color: "var(--text-primary)" }}>IG Analyzer</p>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>v1.0 · @ptrgama_</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
        Dashboard untuk menganalisis data Instagram — siapa yang tidak follow back, mutualan, dan lainnya.
      </p>
      <div className="space-y-1.5">
        {stack.map(s => (
          <div key={s.label} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
            style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}>
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{s.label}</p>
              <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
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
    <ModalShell onClose={onClose} title="Segera Hadir">
      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>Fitur yang akan datang di versi berikutnya:</p>
      <div className="space-y-1.5">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
            style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}>
            <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
              style={{ background: "var(--accent-muted)", border: "1px solid var(--accent-border)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            </div>
            <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{f}</p>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}

/* ── HAMBURGER ── */
function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const openModal = (m) => { setModal(m); setOpen(false); };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-[5px] transition-all duration-150"
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border)",
            cursor: "pointer",
          }}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} className="block rounded-full transition-all duration-200"
              style={{
                height: "1.5px",
                background: "var(--text-secondary)",
                width: open ? (i === 1 ? 0 : 16) : (i === 1 ? 12 : 16),
                transform: open ? (i === 0 ? "rotate(45deg) translateY(6.5px)" : i === 2 ? "rotate(-45deg) translateY(-6.5px)" : "none") : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <div
              className="absolute right-0 top-11 z-40 w-44 py-1.5 overflow-hidden rounded-2xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                backdropFilter: "var(--blur)",
                WebkitBackdropFilter: "var(--blur)",
                animation: "fade-up 0.15s ease",
              }}
            >
              {[
                { label: "Hubungi Admin", key: "contact" },
                { label: "Tentang",       key: "about"   },
                { label: "Segera Hadir",  key: "soon"    },
              ].map((item, i, arr) => (
                <button
                  key={item.key}
                  onClick={() => openModal(item.key)}
                  className="w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors duration-100"
                  style={{
                    color: "var(--text-primary)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-input)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
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

/* ── PHONE MOCKUP ── */
function PhoneMockup({ dark }) {
  const [tab, setTab] = useState("grid");

  const phoneBg  = dark ? "#1c1c1e" : "#e8e8ed";
  const screenBg = dark ? "#000000" : "#ffffff";
  const textMain = dark ? "#f5f5f7" : "#1d1d1f";
  const textSub  = dark ? "#636366" : "#8e8e93";
  const divider  = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const igGrad   = "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)";

  const gridTiles = [
    { bg: dark?"#1a2535":"#dbeafe" },
    { bg: dark?"#1e1a2e":"#ede9fe" },
    { bg: dark?"#1e2a1e":"#dcfce7" },
    { bg: dark?"#2a1a1a":"#fee2e2" },
    { bg: dark?"#2a2018":"#fef3c7" },
    { bg: dark?"#1a2a2a":"#cffafe" },
    { bg: dark?"#221a2a":"#fce7f3" },
    { bg: dark?"#1a1e2a":"#e0e7ff" },
    { bg: dark?"#1e251e":"#d1fae5" },
  ];

  // SVG navbar icons (Instagram-accurate outlines)
  const NavIcon = ({ type, active }) => {
    const c = active ? textMain : textSub;
    const sw = active ? 2 : 1.5;
    if (type === "home") return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active?"currentColor":"none"} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/>
        <path d="M9 21V12h6v9" fill="none" stroke="currentColor" strokeWidth={sw}/>
      </svg>
    );
    if (type === "search") return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" style={{ color: c }}>
        <circle cx="11" cy="11" r="7"/>
        <path d="M16.5 16.5L21 21"/>
      </svg>
    );
    if (type === "plus") return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
        <rect x="3" y="3" width="18" height="18" rx="4"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    );
    if (type === "reels") return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active?"currentColor":"none"} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
        <rect x="2" y="2" width="20" height="20" rx="4"/>
        <circle cx="12" cy="12" r="3.5" fill={active?"white":"none"} stroke={active?"white":c} strokeWidth={active?0:sw}/>
        <path d="M2 8h20M2 16h20M8 2v5M16 2v5M8 17v5M16 17v5" strokeWidth="1"/>
      </svg>
    );
    if (type === "profile") return (
      <div style={{ width: 20, height: 20, borderRadius: "50%", border: active ? `2px solid ${textMain}` : `1.5px solid ${textSub}`, overflow: "hidden", flexShrink: 0 }}>
        {PROFILE_IMAGE
          ? <img src={PROFILE_IMAGE} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ width: "100%", height: "100%", background: dark ? "#2c2c2e" : "#e5e5ea" }} />}
      </div>
    );
    return null;
  };

  // Profile content tab icons
  const TabIcon = ({ type, active }) => {
    const c = active ? textMain : textSub;
    if (type === "grid") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill={active?"currentColor":"none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    );
    if (type === "reels") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: c }}>
        <rect x="2" y="2" width="20" height="20" rx="4"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M2 8h20M8 2v5M16 2v5" strokeWidth="1.5"/>
      </svg>
    );
    if (type === "tagged") return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: c }}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
      </svg>
    );
    return null;
  };

  return (
    <div className="relative flex-shrink-0" style={{ width: 240 }}>
      {/* ambient glow */}
      <div className="absolute pointer-events-none" style={{
        inset: "-30px",
        background: dark
          ? "radial-gradient(ellipse at 50% 40%, rgba(41,151,255,0.05), transparent 65%)"
          : "radial-gradient(ellipse at 50% 40%, rgba(0,113,227,0.05), transparent 65%)",
      }} />

      {/* phone frame */}
      <div style={{
        width: 240, height: 520,
        borderRadius: 50,
        background: phoneBg,
        padding: 3,
        boxShadow: dark
          ? "0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 0 0 1px rgba(0,0,0,0.12), 0 32px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
        position: "relative",
      }}>
        {/* side buttons */}
        {[
          { side:"left",  top:90,  h:24 },
          { side:"left",  top:128, h:40 },
          { side:"left",  top:176, h:40 },
          { side:"right", top:138, h:56 },
        ].map((b, i) => (
          <div key={i} style={{
            position:"absolute", [b.side]:-3.5, top:b.top,
            width:3.5, height:b.h,
            borderRadius: b.side==="left" ? "4px 0 0 4px" : "0 4px 4px 0",
            background: phoneBg,
          }} />
        ))}

        {/* screen */}
        <div style={{
          width:"100%", height:"100%",
          borderRadius:48, background:screenBg,
          overflow:"hidden", display:"flex", flexDirection:"column",
        }}>

          {/* ── STATUS BAR ── */}
          <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px 2px", flexShrink:0 }}>
            <span style={{ fontSize:8.5, fontWeight:700, color:textMain }}>9:41</span>
            {/* dynamic island */}
            <div style={{
              position:"absolute", left:"50%", top:9, transform:"translateX(-50%)",
              width:90, height:24, borderRadius:20,
              background: dark?"#000":"#1d1d1f",
              boxShadow:`0 0 0 3px ${screenBg}`,
            }}/>
            <div style={{ display:"flex", alignItems:"center", gap:3.5 }}>
              {/* signal bars */}
              <div style={{ display:"flex", alignItems:"flex-end", gap:1 }}>
                {[4,6,8,10].map((h,i)=>(
                  <div key={i} style={{ width:1.8, height:h, borderRadius:1, background: i<3?textMain:textSub }}/>
                ))}
              </div>
              {/* wifi */}
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ color:textMain }}>
                <path d="M1 3a5.5 5.5 0 0 1 8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M2.5 4.8a3 3 0 0 1 5 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="5" cy="7" r="0.8" fill="currentColor"/>
              </svg>
              {/* battery */}
              <div style={{ display:"flex", alignItems:"center", gap:1 }}>
                <div style={{ width:16, height:8, borderRadius:2.5, border:`1px solid ${textSub}`, padding:1.2, display:"flex", alignItems:"center" }}>
                  <div style={{ width:"78%", height:"100%", borderRadius:1, background:textMain }}/>
                </div>
                <div style={{ width:1.5, height:3.5, borderRadius:1, background:textSub }}/>
              </div>
            </div>
          </div>

          {/* ── IG TOPBAR ── */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"2px 14px 8px", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              {/* lock icon */}
              <svg width="8" height="9" viewBox="0 0 8 9" fill="none" style={{ color:textMain }}>
                <rect x="1" y="4" width="6" height="5" rx="1" fill="currentColor"/>
                <path d="M2.5 4V2.8a1.5 1.5 0 0 1 3 0V4" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
              <span style={{ fontSize:11.5, fontWeight:700, color:textMain, letterSpacing:"-0.3px" }}>ptrgama_</span>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ color:textSub }}>
                <path d="M2 3l2 2 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ display:"flex", gap:13, alignItems:"center" }}>
              {/* add person */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={textMain} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3"/><path d="M19 17c0-2-1.34-3-3-3"/>
                <circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.69-5 6-5s6 2 6 5"/>
                <path d="M20 12v6M17 15h6" strokeWidth="1.8"/>
              </svg>
              {/* menu lines */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={textMain} strokeWidth="2" strokeLinecap="round">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            </div>
          </div>

          {/* ── PROFILE HEADER ── */}
          <div style={{ padding:"0 14px 8px", flexShrink:0 }}>
            {/* avatar + stats row */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9 }}>
              {/* avatar */}
              <div style={{
                width:60, height:60, borderRadius:"50%", padding:2.5,
                background: igGrad, flexShrink:0,
              }}>
                <div style={{ width:"100%", height:"100%", borderRadius:"50%", border:`2px solid ${screenBg}`, overflow:"hidden" }}>
                  {PROFILE_IMAGE
                    ? <img src={PROFILE_IMAGE} alt="profile" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                    : <div style={{ width:"100%", height:"100%", background: dark?"#2c2c2e":"#e5e5ea", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>👤</div>}
                </div>
              </div>
              {/* stats */}
              <div style={{ display:"flex", flex:1, justifyContent:"space-around" }}>
                {[["0","Postingan"],["666","Pengikut"],["1","Mengikuti"]].map(([v,l])=>(
                  <div key={l} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:12, fontWeight:700, color:textMain, letterSpacing:"-0.5px" }}>{v}</div>
                    <div style={{ fontSize:6.5, color:textSub, marginTop:1, whiteSpace:"nowrap" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* bio */}
            <div style={{ marginBottom:8 }}>
              <p style={{ fontSize:8.5, fontWeight:700, color:textMain, marginBottom:1 }}>ptrgama_</p>
              <p style={{ fontSize:7.5, color:textSub, lineHeight:1.45 }}>IG Analyzer creator ✦</p>
              <p style={{ fontSize:7.5, color:textSub, lineHeight:1.45 }}>Jakarta, Indonesia 🇮🇩</p>
            </div>

            {/* action buttons */}
            <div style={{ display:"flex", gap:4, marginBottom:9 }}>
              {[
                { label:"Edit Profil", flex:2, accent:false },
                { label:"Bagikan",     flex:2, accent:false },
                { label:"＋",          flex:1, accent:false },
              ].map(btn=>(
                <button key={btn.label} style={{
                  flex:btn.flex, height:22, borderRadius:6,
                  background: dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.06)",
                  border:`1px solid ${divider}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:7.5, fontWeight:600, color:textMain, cursor:"pointer",
                }}>{btn.label}</button>
              ))}
            </div>

            {/* highlights */}
            <div style={{ display:"flex", gap:10, overflowX:"hidden" }}>
              {[
                { label:"Rekomendasi", color:"#3b82f6" },
                { label:"Tutorial",   color:"#8b5cf6" },
                { label:"Update",     color:"#ec4899" },
              ].map((h,i)=>(
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, flexShrink:0 }}>
                  <div style={{
                    width:36, height:36, borderRadius:"50%", padding:2,
                    background:`linear-gradient(135deg, ${h.color}, ${h.color}88)`,
                  }}>
                    <div style={{ width:"100%", height:"100%", borderRadius:"50%", background: dark?"#1c1c1e":"#f2f2f7", border:`1.5px solid ${screenBg}` }}/>
                  </div>
                  <span style={{ fontSize:6.5, color:textSub, whiteSpace:"nowrap" }}>{h.label}</span>
                </div>
              ))}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, flexShrink:0 }}>
                <div style={{
                  width:36, height:36, borderRadius:"50%",
                  border:`1px dashed ${divider}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <span style={{ fontSize:14, color:textSub, lineHeight:1 }}>+</span>
                </div>
                <span style={{ fontSize:6.5, color:textSub }}>Baru</span>
              </div>
            </div>
          </div>

          {/* ── CONTENT TABS ── */}
          <div style={{ display:"flex", borderTop:`0.5px solid ${divider}`, borderBottom:`0.5px solid ${divider}`, flexShrink:0 }}>
            {["grid","reels","tagged"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{
                flex:1, padding:"7px 0", display:"flex", justifyContent:"center", alignItems:"center",
                background:"none", border:"none", cursor:"pointer",
                borderTop: tab===t ? `1.5px solid ${textMain}` : "1.5px solid transparent",
              }}>
                <TabIcon type={t} active={tab===t}/>
              </button>
            ))}
          </div>

          {/* ── PHOTO GRID ── */}
          <div style={{ flex:1, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1.5, padding:0, overflow:"hidden", alignContent:"start" }}>
            {gridTiles.map((tile,i)=>(
              <div key={i} style={{
                aspectRatio:"1", background:tile.bg,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                {i===0 && (
                  <div style={{ width:18, height:18, borderRadius:4, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <IDALogo size={12}/>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── BOTTOM NAV ── */}
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-around",
            padding:"8px 12px 14px",
            background: screenBg,
            borderTop:`0.5px solid ${divider}`,
            flexShrink:0,
          }}>
            {[
              { type:"home",    active:false },
              { type:"search",  active:false },
              { type:"plus",    active:false },
              { type:"reels",   active:false },
              { type:"profile", active:true  },
            ].map((item,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:28, height:28 }}>
                <NavIcon type={item.type} active={item.active}/>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="py-8 text-center" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="flex items-center justify-center gap-2 mb-1">
        <IDALogo size={14} />
        <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>© 2026</span>
        <a
          href={IG_LINK}
          target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}
        >
          @ptrgama_
        </a>
      </div>
      <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
        Instagram Dashboard Analyzer · All Rights Reserved.
      </p>
    </footer>
  );
}

/* ══ MAIN APP ══ */
export default function App() {
  const [dark, setDark] = useDarkMode();

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

      <div className="w-full px-10 pt-8 pb-6 flex-1" style={{ maxWidth: "100%" }}>

        {/* ── NAVBAR ── */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2.5">
            <IDALogo size={30} />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight leading-none" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Your Instagram
              </span>
              <span style={{ fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.02em" }}>
                Account Analyzer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="live-badge">
              <div className="live-dot" />
              Live
            </div>
            <DarkToggle dark={dark} setDark={setDark} />
            <HamburgerMenu />
          </div>
        </nav>

        {!result ? (
          /* ── UPLOAD VIEW ── */
          <div className="flex gap-16 items-start">

            {/* LEFT — phone */}
            <PhoneMockup dark={dark} />

            {/* RIGHT — form */}
            <div className="flex-1 min-w-0 pt-2">
              <div className="mb-8">
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    color: "var(--accent)",
                    background: "var(--accent-muted)",
                    border: "1px solid var(--accent-border)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Instagram Analyzer
                </p>
                <h1
                  className="font-black leading-[1.05] tracking-tight mb-4"
                  style={{
                    fontSize: 52,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.08,
                  }}
                >
                  Siapa yang tidak<br />
                  <span style={{ color: "var(--accent)" }}>follow back?</span>
                </h1>
                <p className="text-[15px] leading-relaxed font-normal" style={{ color: "var(--text-secondary)" }}>
                  Upload file JSON ekspor Instagram untuk melihat siapa yang tidak follow back, mutualan, dan lainnya.
                </p>
              </div>

              {/* dropzones */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <FileDropZone label="following.json"   file={followingFile} onFile={setFollowingFile} />
                <FileDropZone label="followers_1.json" file={followersFile} onFile={setFollowersFile} />
              </div>

              <button className="btn-primary mb-4" onClick={handleAnalyze} disabled={!canAnalyze}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" style={{ animation: "spin-subtle 1s linear infinite" }}>
                      <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
                      <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    </svg>
                    Menganalisis…
                  </span>
                ) : "Analisis Sekarang"}
              </button>

              {/* info box */}
              <div
                className="px-4 py-3 rounded-2xl text-[13px] leading-relaxed flex items-start gap-3"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1, color: "var(--accent)" }}>
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span>
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Cara download: </span>
                  Instagram → Pengaturan → Aktivitas → Download info → Format JSON
                </span>
              </div>

              {error && (
                <div className="mt-3 px-4 py-3 text-[13px] rounded-2xl flex items-center gap-2"
                  style={{
                    background: "rgba(255,59,48,0.06)",
                    border: "1px solid rgba(255,59,48,0.2)",
                    color: "#ff3b30",
                  }}>
                  <span>⚠</span> {error}
                </div>
              )}
            </div>
          </div>

        ) : (
          /* ── RESULTS VIEW ── */
          <div className="space-y-4">
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
            <div className="flex gap-1.5 flex-wrap">
              {TABS.map(t => {
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => { setActiveTab(t.key); setSearch(""); }}
                    className={`px-4 py-2 rounded-xl text-[13px] transition-all duration-150 ${active ? "tab-active" : "tab-idle"}`}
                  >
                    {t.label}
                    <span
                      className="ml-2 px-1.5 py-0.5 rounded-md text-[11px] font-semibold"
                      style={{
                        background: active ? "var(--accent-muted)" : "var(--bg-input)",
                        color: active ? "var(--accent)" : "var(--text-tertiary)",
                      }}
                    >
                      {result[t.key].length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* table card */}
            <div className="panel overflow-hidden flex flex-col" style={{ height: 460 }}>
              {/* search */}
              <div className="px-5 py-3.5 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="relative">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "var(--text-tertiary)" }}>
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <input
                    className="w-full text-sm outline-none rounded-xl pl-9 pr-4 py-2.5"
                    style={{
                      background: "var(--bg-input)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                    placeholder="Cari username…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-muted)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              {/* count */}
              <div className="px-5 py-2 shrink-0 text-[11px] font-medium"
                style={{ borderBottom: "1px solid var(--border)", color: "var(--text-tertiary)" }}>
                {rows.length} akun ditemukan
              </div>

              <div className="overflow-y-auto flex-1">
                <UserTable rows={rows} />
              </div>
            </div>

            <button className="btn-ghost" onClick={handleReset}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5A4.5 4.5 0 0 1 6.5 2a4.5 4.5 0 0 1 3.5 1.65M11 6.5A4.5 4.5 0 0 1 6.5 11a4.5 4.5 0 0 1-3.5-1.65" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M9.5 1.5v2.5H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 11.5V9H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Analisis Ulang
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
