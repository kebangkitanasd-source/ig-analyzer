import { useState } from "react";
import { analyzeFiles } from "./api/analyzeApi";
import FileDropZone from "./components/FileDropZone";
import StatCard from "./components/StatCard";
import UserTable from "./components/UserTable";

const PROFILE_IMAGE = "/avatar.jpg";
const IG_LINK = "https://www.instagram.com/ptrgama_/";

const TABS = [
  { key: "tidak_folbek",             label: "Tidak Folbek",       emoji: "👻" },
  { key: "mutualan",                 label: "Mutualan",           emoji: "🤝" },
  { key: "follow_6bln",              label: "Follow 6 Bulan",     emoji: "📅" },
  { key: "follow_6bln_tidak_folbek", label: "6 Bln & Tdk Folbek", emoji: "⚠️" },
];

/* ── LOGO ── */
function IDALogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill="#05081F" stroke="rgba(0,207,255,0.4)" strokeWidth="1"/>
      <circle cx="14" cy="14" r="8" stroke="#00CFFF" strokeWidth="1.2" opacity="0.7"/>
      <circle cx="14" cy="14" r="4" stroke="#7B2CFF" strokeWidth="1" opacity="0.8"/>
      <circle cx="14" cy="14" r="1.5" fill="#00CFFF" style={{ filter: "drop-shadow(0 0 4px #00CFFF)" }}/>
      <line x1="14" y1="6" x2="14" y2="9" stroke="#00CFFF" strokeWidth="0.8" opacity="0.4"/>
      <line x1="14" y1="19" x2="14" y2="22" stroke="#00CFFF" strokeWidth="0.8" opacity="0.4"/>
      <line x1="6" y1="14" x2="9" y2="14" stroke="#00CFFF" strokeWidth="0.8" opacity="0.4"/>
      <line x1="19" y1="14" x2="22" y2="14" stroke="#00CFFF" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="22" cy="6" r="1.2" fill="#00FF8C" style={{ filter: "drop-shadow(0 0 4px #00FF8C)" }}/>
    </svg>
  );
}

/* ── MODAL ── */
function Modal({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(5,8,31,0.85)",
      }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}

function ModalShell({ onClose, eyebrow, children }) {
  return (
    <Modal onClose={onClose}>
      <div
        className="relative p-6"
        style={{
          background: "rgba(8,13,42,0.97)",
          border: "1px solid rgba(0,207,255,0.2)",
          borderRadius: 18,
          boxShadow: "0 0 40px rgba(0,207,255,0.08), 0 32px 80px rgba(0,0,0,0.8)",
        }}
      >
        {/* corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: "1.5px solid #00CFFF", borderLeft: "1.5px solid #00CFFF", borderRadius: "18px 0 0 0" }} />
        <div className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: "1.5px solid #7B2CFF", borderRight: "1.5px solid #7B2CFF", borderRadius: "0 18px 0 0" }} />
        <div className="absolute bottom-0 left-0 w-4 h-4" style={{ borderBottom: "1.5px solid #7B2CFF", borderLeft: "1.5px solid #7B2CFF", borderRadius: "0 0 0 18px" }} />
        <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: "1.5px solid #00CFFF", borderRight: "1.5px solid #00CFFF", borderRadius: "0 0 18px 0" }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all"
          style={{
            background: "rgba(0,207,255,0.06)",
            border: "1px solid rgba(0,207,255,0.15)",
            color: "var(--text-muted)",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#00CFFF"; e.currentTarget.style.boxShadow = "0 0 10px rgba(0,207,255,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          ✕
        </button>

        <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-4"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,207,255,0.4)" }}>
          {eyebrow}
        </p>
        {children}
      </div>
    </Modal>
  );
}

function ContactModal({ onClose }) {
  return (
    <ModalShell onClose={onClose} eyebrow="// contact admin">
      <a
        href={IG_LINK}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
        style={{
          background: "rgba(0,207,255,0.03)",
          border: "1px solid rgba(0,207,255,0.12)",
          textDecoration: "none",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,207,255,0.35)"; e.currentTarget.style.background = "rgba(0,207,255,0.06)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,207,255,0.12)"; e.currentTarget.style.background = "rgba(0,207,255,0.03)"; }}
      >
        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
          style={{ background: "rgba(0,207,255,0.08)", border: "1px solid rgba(0,207,255,0.25)", boxShadow: "0 0 16px rgba(0,207,255,0.15)" }}>
          {PROFILE_IMAGE
            ? <img src={PROFILE_IMAGE} alt="admin" className="w-full h-full object-cover" />
            : <span className="text-xl">👤</span>}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm" style={{ color: "#fff", fontFamily: "'Rajdhani', sans-serif" }}>@ptrgama_</p>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>Instagram · DM untuk pertanyaan</p>
        </div>
        <span style={{ color: "var(--neon-cyan)", fontSize: 14, opacity: 0.6 }}>↗</span>
      </a>
    </ModalShell>
  );
}

function AboutModal({ onClose }) {
  const stack = [
    { label: "Flask", sub: "Python · Backend & logic", color: "#00CFFF" },
    { label: "React + Vite", sub: "Frontend · Fast & modern", color: "#7B2CFF" },
    { label: "Tailwind CSS", sub: "UI · Responsive & structured", color: "#38B6FF" },
  ];
  return (
    <ModalShell onClose={onClose} eyebrow="// about">
      <div className="flex items-center gap-2.5 mb-1">
        <IDALogo size={24} />
        <h2 className="text-lg font-black brand-text" style={{ fontFamily: "'Orbitron', monospace" }}>IG ANALYZER</h2>
      </div>
      <p className="text-[11px] mb-4" style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(154,164,199,0.5)" }}>
        v1.0 · @ptrgama_
      </p>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
        Dashboard berbasis <span className="text-white font-semibold">Flask (Python)</span> untuk backend,
        dengan <span className="text-white font-semibold">React + Vite</span> di frontend,
        dan <span className="text-white font-semibold">Tailwind CSS</span> untuk UI responsif.
      </p>
      <div className="space-y-2">
        {stack.map(s => (
          <div key={s.label} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
            style={{ background: "rgba(0,207,255,0.02)", border: "1px solid rgba(0,207,255,0.07)" }}>
            <div className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
            <div>
              <p className="text-xs font-bold" style={{ color: s.color, fontFamily: "'Rajdhani', sans-serif" }}>{s.label}</p>
              <p className="text-[10px]" style={{ color: "rgba(154,164,199,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>{s.sub}</p>
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
    <ModalShell onClose={onClose} eyebrow="// next update">
      <h2 className="text-xl font-black mb-1" style={{ fontFamily: "'Orbitron', monospace", color: "#fff" }}>
        COMING SOON
      </h2>
      <p className="text-[11px] mb-5" style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(154,164,199,0.4)" }}>
        fitur versi berikutnya
      </p>
      <div className="space-y-1.5">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
            style={{ background: "rgba(0,207,255,0.02)", border: "1px solid rgba(0,207,255,0.07)" }}>
            <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
              style={{ border: "1px solid rgba(123,44,255,0.3)", background: "rgba(123,44,255,0.08)" }}>
              <div className="w-1 h-1 rounded-full" style={{ background: "#7B2CFF", boxShadow: "0 0 4px #7B2CFF" }} />
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}>{f}</p>
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
          className="w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-[5px] transition-all duration-200"
          style={{
            background: "rgba(0,207,255,0.05)",
            border: "1px solid rgba(0,207,255,0.15)",
          }}
          aria-label="Menu"
        >
          <span className={`block h-[1.5px] rounded-full transition-all duration-200 ${open ? "w-4 rotate-45 translate-y-[6.5px]" : "w-4"}`}
            style={{ background: "rgba(0,207,255,0.7)" }} />
          <span className={`block h-[1.5px] rounded-full transition-all duration-200 ${open ? "w-0 opacity-0" : "w-3"}`}
            style={{ background: "rgba(0,207,255,0.7)" }} />
          <span className={`block h-[1.5px] rounded-full transition-all duration-200 ${open ? "w-4 -rotate-45 -translate-y-[6.5px]" : "w-4"}`}
            style={{ background: "rgba(0,207,255,0.7)" }} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-11 z-40 w-44 py-1.5 overflow-hidden"
              style={{
                background: "rgba(8,13,42,0.98)",
                border: "1px solid rgba(0,207,255,0.15)",
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(0,207,255,0.05)",
                backdropFilter: "blur(16px)",
              }}>
              {[
                { label: "Contact Admin", key: "contact" },
                { label: "About",         key: "about"   },
                { label: "Coming Soon",   key: "soon"    },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => openModal(item.key)}
                  className="w-full text-left px-4 py-2.5 text-[12px] transition-all duration-150"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#00CFFF"; e.currentTarget.style.background = "rgba(0,207,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
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
function PhoneMockup() {
  const [liked,  setLiked]  = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [tab,    setTab]    = useState("grid");

  const gridColors = [
    "linear-gradient(135deg,rgba(0,207,255,0.25),rgba(11,30,91,0.8))",
    "rgba(11,30,91,0.7)",
    "linear-gradient(135deg,rgba(123,44,255,0.2),rgba(5,8,31,0.9))",
    "rgba(8,13,42,0.8)",
    "linear-gradient(135deg,rgba(0,207,255,0.15),rgba(5,8,31,0.9))",
    "rgba(11,30,91,0.6)",
    "linear-gradient(135deg,rgba(123,44,255,0.15),rgba(11,30,91,0.7))",
    "rgba(5,8,31,0.9)",
    "rgba(8,13,42,0.7)",
  ];

  return (
    <div className="relative flex-shrink-0" style={{ width: 220 }}>
      {/* ambient glow */}
      <div className="absolute pointer-events-none" style={{
        inset: "-40px",
        background: "radial-gradient(ellipse at 50% 40%, rgba(0,207,255,0.07), transparent 65%)",
      }} />

      {/* frame */}
      <div style={{
        width: 220,
        height: 476,
        borderRadius: 52,
        background: "linear-gradient(160deg, #1a2040 0%, #0d1530 40%, #060a1e 100%)",
        padding: 3,
        boxShadow: `
          0 0 0 1px rgba(0,207,255,0.12),
          0 0 40px rgba(0,207,255,0.06),
          0 40px 80px rgba(0,0,0,0.9),
          inset 0 1px 0 rgba(0,207,255,0.1)
        `,
        position: "relative",
      }}>
        {/* buttons */}
        {[
          { side:"left",  top:100, h:28 },
          { side:"left",  top:144, h:44 },
          { side:"left",  top:196, h:44 },
          { side:"right", top:152, h:60 },
        ].map((b,i) => (
          <div key={i} style={{
            position:"absolute",
            [b.side]: -3.5,
            top: b.top,
            width: 3.5,
            height: b.h,
            borderRadius: b.side === "left" ? "4px 0 0 4px" : "0 4px 4px 0",
            background: "linear-gradient(to bottom, #1a2040, #0d1530)",
            boxShadow: "inset 0 1px 0 rgba(0,207,255,0.08)",
          }} />
        ))}

        {/* screen */}
        <div style={{
          width:"100%", height:"100%",
          borderRadius: 50,
          background:"#000510",
          overflow:"hidden",
          display:"flex",
          flexDirection:"column",
        }}>
          {/* status bar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px 4px", flexShrink:0 }}>
            <span style={{ fontSize:9, fontWeight:700, color:"rgba(0,207,255,0.8)", fontFamily:"'JetBrains Mono', monospace" }}>9:41</span>
            {/* dynamic island */}
            <div style={{
              width:108, height:28, borderRadius:20,
              background:"#000",
              border:"1px solid rgba(0,207,255,0.08)",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              boxShadow:"0 0 0 4px #000510",
              position:"absolute", left:"50%", transform:"translateX(-50%)", top:10,
            }}>
              <div style={{ width:9, height:9, borderRadius:"50%", background:"#0a0a0a", border:"0.5px solid rgba(0,207,255,0.1)" }} />
              <div style={{ width:5, height:5, borderRadius:"50%", background:"#05081F", border:"0.5px solid rgba(0,207,255,0.4)", boxShadow:"0 0 6px rgba(0,207,255,0.5)" }} />
              <div style={{ width:24, height:5, borderRadius:3, background:"#0a0a0a" }} />
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              {/* signal */}
              <div style={{ display:"flex", alignItems:"flex-end", gap:1 }}>
                {[5,7,9,11].map((h,i) => (
                  <div key={i} style={{ width:2, height:h, borderRadius:1, background: i<3 ? "rgba(0,207,255,0.8)" : "rgba(0,207,255,0.2)" }} />
                ))}
              </div>
              {/* battery */}
              <div style={{ display:"flex", alignItems:"center", gap:1 }}>
                <div style={{ width:18, height:9, borderRadius:2.5, border:"1px solid rgba(0,207,255,0.4)", padding:1.5, display:"flex", alignItems:"center" }}>
                  <div style={{ width:"80%", height:"100%", borderRadius:1, background:"rgba(0,207,255,0.8)" }} />
                </div>
                <div style={{ width:1.5, height:4, borderRadius:1, background:"rgba(0,207,255,0.4)" }} />
              </div>
            </div>
          </div>

          {/* IG topbar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"4px 14px 6px", flexShrink:0 }}>
            <span style={{ fontSize:13, fontWeight:900, color:"#fff", letterSpacing:"-0.3px", fontFamily:"'Orbitron', monospace", fontSize:10 }}>ptrgama_</span>
            <div style={{ display:"flex", gap:12 }}>
              {["⊕","✉"].map((ic,i) => (
                <span key={i} style={{ fontSize:12, color:"rgba(0,207,255,0.6)" }}>{ic}</span>
              ))}
            </div>
          </div>

          {/* scroll area */}
          <div style={{ flex:1, overflowY:"hidden", display:"flex", flexDirection:"column" }}>

            {/* stories */}
            <div style={{ display:"flex", gap:8, padding:"4px 12px 10px", overflowX:"hidden", flexShrink:0 }}>
              {/* your story */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, flexShrink:0 }}>
                <div style={{
                  width:44, height:44, borderRadius:"50%",
                  background:"rgba(0,207,255,0.06)",
                  border:"1px solid rgba(0,207,255,0.2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  position:"relative",
                  boxShadow:"0 0 10px rgba(0,207,255,0.1)",
                }}>
                  {PROFILE_IMAGE
                    ? <img src={PROFILE_IMAGE} alt="me" style={{ width:40, height:40, borderRadius:"50%", objectFit:"cover" }} />
                    : <span style={{ fontSize:14 }}>👤</span>}
                  <div style={{ position:"absolute", bottom:-1, right:-1, width:14, height:14, borderRadius:"50%", background:"#00CFFF", border:"1.5px solid #000510", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 6px rgba(0,207,255,0.6)" }}>
                    <span style={{ color:"#000", fontSize:9, fontWeight:900, lineHeight:1 }}>+</span>
                  </div>
                </div>
                <span style={{ fontSize:7, color:"rgba(0,207,255,0.4)", fontFamily:"'JetBrains Mono', monospace" }}>you</span>
              </div>
              {/* other stories */}
              {["ax","rz","ni","dt"].map((name, i) => (
                <div key={name} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, flexShrink:0 }}>
                  <div style={{
                    width:44, height:44, borderRadius:"50%", padding:2,
                    background: i%2===0
                      ? "linear-gradient(45deg,#00CFFF,#7B2CFF)"
                      : "linear-gradient(45deg,#7B2CFF,#38B6FF)",
                    boxShadow: i%2===0 ? "0 0 8px rgba(0,207,255,0.3)" : "0 0 8px rgba(123,44,255,0.3)",
                  }}>
                    <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:`hsl(${i*40+220},40%,8%)`, border:"1.5px solid #000" }} />
                  </div>
                  <span style={{ fontSize:7, color:"rgba(154,164,199,0.4)", fontFamily:"'JetBrains Mono', monospace" }}>{name}</span>
                </div>
              ))}
            </div>

            {/* post header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 12px", marginBottom:8, flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <div style={{
                  width:28, height:28, borderRadius:"50%", padding:1.5,
                  background:"linear-gradient(45deg,#00CFFF,#7B2CFF)",
                  boxShadow:"0 0 10px rgba(0,207,255,0.3)",
                }}>
                  <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#0a0f20", overflow:"hidden", border:"1.5px solid #000" }}>
                    {PROFILE_IMAGE
                      ? <img src={PROFILE_IMAGE} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      : <div style={{ width:"100%", height:"100%", background:"#1a2040" }} />}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize:8, fontWeight:700, color:"#fff", fontFamily:"'Orbitron', monospace" }}>ptrgama_</p>
                  <p style={{ fontSize:6.5, color:"rgba(0,207,255,0.4)", fontFamily:"'JetBrains Mono', monospace" }}>Jakarta, ID</p>
                </div>
              </div>
              <span style={{ color:"rgba(0,207,255,0.4)", fontSize:14 }}>···</span>
            </div>

            {/* post image */}
            <div style={{
              width:"100%", height:160, flexShrink:0,
              background:"linear-gradient(145deg, #05081F 0%, #0B1E5B 50%, #05081F 100%)",
              display:"flex", alignItems:"center", justifyContent:"center",
              position:"relative", overflow:"hidden",
            }}>
              {/* grid lines */}
              <div style={{ position:"absolute", inset:0, opacity:0.08,
                backgroundImage:"linear-gradient(rgba(0,207,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,207,255,1) 1px, transparent 1px)",
                backgroundSize:"16px 16px" }} />
              <IDALogo size={40} />
            </div>

            {/* actions */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"7px 12px 4px", flexShrink:0 }}>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={() => setLiked(l=>!l)} style={{ background:"none", border:"none", padding:0, cursor:"pointer", fontSize:16, filter: liked ? "drop-shadow(0 0 4px #00CFFF)" : "none" }}>
                  {liked ? "💙" : "🤍"}
                </button>
                <span style={{ fontSize:14, color:"rgba(0,207,255,0.5)" }}>💬</span>
                <span style={{ fontSize:14, color:"rgba(0,207,255,0.5)" }}>📤</span>
              </div>
              <button onClick={() => setSaved(s=>!s)} style={{ background:"none", border:"none", padding:0, cursor:"pointer", fontSize:14, filter: saved ? "drop-shadow(0 0 4px #7B2CFF)" : "none" }}>
                {saved ? "🔖" : "🏷️"}
              </button>
            </div>

            {/* caption */}
            <div style={{ padding:"0 12px 6px", flexShrink:0 }}>
              <p style={{ fontSize:8, fontWeight:700, color:"rgba(0,207,255,0.8)", marginBottom:1, fontFamily:"'JetBrains Mono', monospace" }}>
                {liked ? "1,234" : "1,233"} likes
              </p>
              <p style={{ fontSize:7.5, color:"rgba(154,164,199,0.6)", lineHeight:1.5, fontFamily:"'Rajdhani', sans-serif" }}>
                <span style={{ fontWeight:700, color:"#fff" }}>ptrgama_ </span>
                IG Analyzer creator ✦
              </p>
            </div>

            {/* profile section */}
            <div style={{ flexShrink:0, borderTop:"0.5px solid rgba(0,207,255,0.08)", padding:"10px 14px 0" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <div style={{
                  width:56, height:56, borderRadius:"50%", padding:2.5,
                  background:"linear-gradient(45deg,#00CFFF,#7B2CFF)",
                  flexShrink:0,
                  boxShadow:"0 0 14px rgba(0,207,255,0.3)",
                }}>
                  <div style={{ width:"100%", height:"100%", borderRadius:"50%", border:"2px solid #000510", overflow:"hidden", background:"#0a0f20" }}>
                    {PROFILE_IMAGE
                      ? <img src={PROFILE_IMAGE} alt="profile" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      : <span style={{ fontSize:20, display:"flex", alignItems:"center", justifyContent:"center", height:"100%" }}>👤</span>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:10, flex:1, justifyContent:"space-around" }}>
                  {[["0","Posts"],["666","Followers"],["1","Following"]].map(([v,l]) => (
                    <div key={l} style={{ textAlign:"center" }}>
                      <div style={{ fontSize:11, fontWeight:800, color:"#00CFFF", fontFamily:"'Orbitron', monospace", textShadow:"0 0 8px rgba(0,207,255,0.6)" }}>{v}</div>
                      <div style={{ fontSize:6.5, color:"rgba(154,164,199,0.35)", marginTop:1, fontFamily:"'JetBrains Mono', monospace" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ display:"flex", gap:4, marginBottom:8 }}>
                <a href={IG_LINK} target="_blank" rel="noopener noreferrer" style={{
                  flex:1, height:22, borderRadius:6,
                  background:"linear-gradient(90deg, #00CFFF, #7B2CFF)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:7.5, fontWeight:800, color:"#fff",
                  textDecoration:"none", fontFamily:"'Orbitron', monospace",
                  boxShadow:"0 0 10px rgba(0,207,255,0.3)",
                }}>FOLLOW</a>
                <a href={IG_LINK} target="_blank" rel="noopener noreferrer" style={{
                  flex:1, height:22, borderRadius:6,
                  border:"0.5px solid rgba(0,207,255,0.25)",
                  background:"rgba(0,207,255,0.04)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:7.5, color:"rgba(0,207,255,0.6)",
                  textDecoration:"none", fontFamily:"'Rajdhani', sans-serif",
                }}>Message</a>
              </div>

              {/* tab icons */}
              <div style={{ display:"flex", borderTop:"0.5px solid rgba(0,207,255,0.08)", marginBottom:4 }}>
                {["⊞","▷","🏷"].map((ic, i) => (
                  <button key={i} onClick={() => setTab(["grid","reels","tagged"][i])}
                    style={{
                      flex:1, padding:"6px 0",
                      display:"flex", justifyContent:"center",
                      background:"none", border:"none", cursor:"pointer", fontSize:11,
                      color: tab===["grid","reels","tagged"][i] ? "#00CFFF" : "rgba(154,164,199,0.25)",
                      borderTop: tab===["grid","reels","tagged"][i] ? "1px solid #00CFFF" : "1px solid transparent",
                      filter: tab===["grid","reels","tagged"][i] ? "drop-shadow(0 0 3px rgba(0,207,255,0.6))" : "none",
                    }}>
                    {ic}
                  </button>
                ))}
              </div>

              {/* grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1.5, marginBottom:4 }}>
                {gridColors.slice(0,6).map((bg, i) => (
                  <div key={i} style={{ aspectRatio:"1", borderRadius:2, background:bg }} />
                ))}
              </div>
            </div>

            {/* bottom nav */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-around",
              padding:"8px 0 14px",
              background:"rgba(5,8,31,0.95)",
              borderTop:"0.5px solid rgba(0,207,255,0.1)",
              flexShrink:0, marginTop:"auto",
            }}>
              {["🏠","🔍","⊕","▷"].map((ic,i) => (
                <span key={i} style={{ fontSize:14, color: i===0 ? "#00CFFF" : "rgba(154,164,199,0.3)", filter: i===0 ? "drop-shadow(0 0 4px rgba(0,207,255,0.7))" : "none" }}>{ic}</span>
              ))}
              <div style={{ width:22, height:22, borderRadius:"50%", border:"1.5px solid rgba(0,207,255,0.4)", overflow:"hidden", boxShadow:"0 0 6px rgba(0,207,255,0.2)" }}>
                {PROFILE_IMAGE
                  ? <img src={PROFILE_IMAGE} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <div style={{ width:"100%", height:"100%", background:"#0B1E5B" }} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="py-8 text-center" style={{ borderTop:"1px solid rgba(0,207,255,0.07)" }}>
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <IDALogo size={14} />
        <span style={{ fontSize:11, color:"rgba(154,164,199,0.25)", fontFamily:"'JetBrains Mono', monospace" }}>© 2026</span>
        <a
          href={IG_LINK}
          target="_blank" rel="noopener noreferrer"
          className="transition-all duration-150"
          style={{
            fontSize:11, fontWeight:700,
            fontFamily:"'JetBrains Mono', monospace",
            color:"rgba(0,207,255,0.4)",
            textDecoration:"none",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#00CFFF"; e.currentTarget.style.textShadow = "0 0 8px rgba(0,207,255,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(0,207,255,0.4)"; e.currentTarget.style.textShadow = "none"; }}
        >
          @ptrgama_
        </a>
      </div>
      <p style={{ fontSize:10, color:"rgba(154,164,199,0.12)", fontFamily:"'JetBrains Mono', monospace" }}>
        Instagram Dashboard Analyzer · All Rights Reserved.
      </p>
    </footer>
  );
}

/* ══ MAIN APP ══ */
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
    <div className="min-h-screen flex flex-col grid-bg">
      {/* top edge glow */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-px"
        style={{ background:"linear-gradient(90deg, transparent, rgba(0,207,255,0.6), rgba(123,44,255,0.6), transparent)" }} />

      <div className="w-full max-w-[1100px] mx-auto px-8 pt-10 pb-6 flex-1">

        {/* ── NAVBAR ── */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <IDALogo size={32} />
            <div className="flex flex-col">
              <span
                className="font-display text-base font-black brand-text leading-none tracking-wider"
                style={{ fontFamily:"'Orbitron', monospace", letterSpacing:"0.1em" }}
              >
                IG ANALYZER
              </span>
              <span style={{ fontSize:8, color:"rgba(0,207,255,0.3)", fontFamily:"'JetBrains Mono', monospace", letterSpacing:"0.2em" }}>
                DASHBOARD v1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="live-badge animate-pulse-glow">
              <div className="live-dot" />
              LIVE
            </div>
            <HamburgerMenu />
          </div>
        </nav>

        {!result ? (
          /* ── UPLOAD VIEW ── */
          <div className="flex gap-12 items-start">

            {/* LEFT — phone */}
            <PhoneMockup />

            {/* RIGHT — form */}
            <div className="flex-1 min-w-0 pt-2">
              <div className="mb-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] mb-3"
                  style={{ fontFamily:"'JetBrains Mono', monospace", color:"rgba(0,207,255,0.4)" }}>
                  // instagram dashboard analyzer
                </p>
                <h1
                  className="font-black leading-[1.05] tracking-tight text-white mb-4"
                  style={{ fontSize:42, fontFamily:"'Orbitron', monospace", lineHeight:1.1 }}
                >
                  Siapa yang<br />
                  tidak<br />
                  <span className="brand-text">follow back?</span>
                </h1>
                <p className="text-sm leading-relaxed" style={{ color:"var(--text-muted)", fontFamily:"'Rajdhani', sans-serif", fontWeight:500 }}>
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

              {/* info box */}
              <div className="px-4 py-3 rounded-xl text-xs leading-relaxed"
                style={{
                  background:"rgba(0,207,255,0.03)",
                  border:"1px solid rgba(0,207,255,0.1)",
                  fontFamily:"'Rajdhani', sans-serif",
                  color:"var(--text-muted)",
                  fontWeight:500,
                }}>
                <span style={{ color:"#00CFFF", fontWeight:700 }}>Cara download: </span>
                Instagram → Pengaturan → Aktivitas → Download info → Format JSON
              </div>

              {error && (
                <div className="mt-3 px-4 py-3 text-xs rounded-xl"
                  style={{
                    background:"rgba(239,68,68,0.05)",
                    border:"1px solid rgba(239,68,68,0.2)",
                    color:"rgba(239,68,68,0.8)",
                    fontFamily:"'JetBrains Mono', monospace",
                  }}>
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
                    className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-200 ${active ? "tab-active" : "tab-idle"}`}
                    style={{ fontFamily:"'Rajdhani', sans-serif", letterSpacing:"0.06em" }}
                  >
                    {t.emoji} {t.label}
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-lg text-[10px] font-semibold ${active ? "bg-black/20" : "bg-white/[0.04]"}`}
                      style={{ fontFamily:"'JetBrains Mono', monospace" }}>
                      {result[t.key].length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* table card */}
            <div className="panel overflow-hidden flex flex-col" style={{ height:460 }}>
              {/* search */}
              <div className="px-5 py-3.5 shrink-0" style={{ borderBottom:"1px solid rgba(0,207,255,0.07)" }}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{ color:"rgba(0,207,255,0.3)" }}>⌕</span>
                  <input
                    className="w-full text-sm outline-none rounded-lg pl-8 pr-4 py-2.5"
                    style={{
                      background:"rgba(0,207,255,0.03)",
                      border:"1px solid rgba(0,207,255,0.1)",
                      color:"#fff",
                      fontFamily:"'Rajdhani', sans-serif",
                      fontWeight:500,
                    }}
                    placeholder="Cari username…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(0,207,255,0.3)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,207,255,0.08)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(0,207,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              {/* count */}
              <div className="px-5 py-2 shrink-0" style={{
                borderBottom:"1px solid rgba(0,207,255,0.05)",
                fontFamily:"'JetBrains Mono', monospace",
                fontSize:9,
                color:"rgba(0,207,255,0.3)",
                letterSpacing:"0.15em",
                textTransform:"uppercase",
              }}>
                {rows.length} akun ditemukan
              </div>

              <div className="overflow-y-auto flex-1">
                <UserTable rows={rows} />
              </div>
            </div>

            <button className="btn-ghost" onClick={handleReset}>
              ↩ Analisis Ulang
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
