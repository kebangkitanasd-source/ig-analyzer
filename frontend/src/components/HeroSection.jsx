export default function HeroSection({ onGetStarted }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-16"
        style={{ background: "linear-gradient(135deg, #0f0014 0%, #1a0533 40%, #2d0a5e 70%, #1a0533 100%)" }}
      >
        <div className="max-w-[900px] w-full flex flex-col md:flex-row items-center gap-12">

          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ background: "rgba(225,48,108,0.12)", borderColor: "rgba(225,48,108,0.3)", color: "#e1306c" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e1306c] inline-block"></span>
              Instagram Analytics Tool
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-white">
              Tau Siapa yang{" "}
              <span style={{
                background: "linear-gradient(90deg,#e1306c,#833ab4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Nggak Folbek
              </span>{" "}
              Kamu?
            </h1>

            <p className="text-[15px] mb-8 leading-relaxed" style={{ color: "#a78cc0" }}>
              Upload file JSON dari Instagram kamu dan langsung tau siapa yang kamu follow tapi nggak follow balik, siapa yang mutualan, dan lebih banyak lagi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={onGetStarted}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg,#e1306c,#833ab4)" }}
              >
                🔍 Mulai Analisis
              </button>
              <a
                href="https://www.instagram.com/download/request/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 text-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#d4b8e8"
                }}
              >
                📥 Cara Download Data IG
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 mt-10 justify-center md:justify-start">
              {[["100%", "Gratis"], ["Privat", "No Upload Server"], ["Cepat", "Instan"]].map(([val, lbl]) => (
                <div key={lbl} className="text-center md:text-left">
                  <div className="text-lg font-bold text-white">{val}</div>
                  <div className="text-[11px]" style={{ color: "#7a6090" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div
              className="relative w-[220px] h-[420px] rounded-[36px] p-[3px] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(145deg,#e1306c,#833ab4,#405de6)",
                boxShadow: "0 25px 60px rgba(131,58,180,0.4)"
              }}
            >
              {/* Phone body */}
              <div className="w-full h-full rounded-[34px] overflow-hidden flex flex-col"
                style={{ background: "#0f0014" }}>
                {/* Notch */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-16 h-1.5 rounded-full" style={{ background: "#2a1a3e" }}></div>
                </div>

                {/* Screen content */}
                <div className="flex-1 px-3 py-2 flex flex-col gap-2">
                  {/* App header */}
                  <div className="text-center py-2">
                    <div className="text-xs font-bold" style={{
                      background: "linear-gradient(90deg,#e1306c,#833ab4)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                    }}>IG Analyzer</div>
                  </div>

                  {/* Stat cards */}
                  {[["Following", "284"], ["Tidak Folbek", "112"], ["Mutualan", "97"]].map(([lbl, val]) => (
                    <div key={lbl} className="rounded-xl px-3 py-2.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="text-[9px] mb-0.5" style={{ color: "#7a6090" }}>{lbl}</div>
                      <div className="text-base font-bold" style={{ color: "#e1306c" }}>{val}</div>
                    </div>
                  ))}

                  {/* User list */}
                  <div className="rounded-xl px-3 py-2 mt-1"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {["@user_satu", "@user_dua", "@user_tiga"].map((u, i) => (
                      <div key={u} className="flex items-center gap-2 py-1.5"
                        style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                        <div className="w-5 h-5 rounded-full flex-shrink-0"
                          style={{ background: `linear-gradient(135deg,#e1306c,#833ab4)`, opacity: 0.7 + i * 0.1 }}></div>
                        <span className="text-[9px]" style={{ color: "#c8a8e0" }}>{u}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="flex justify-center pb-3 pt-1">
                  <div className="w-20 h-1 rounded-full" style={{ background: "#2a1a3e" }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <div
        className="py-3 text-center text-[11px]"
        style={{ background: "#0a000f", color: "#4a3560" }}
      >
        © 2026 <span style={{ color: "#6a4590" }}>ptrgama_</span> — All rights reserved
      </div>
    </div>
  );
}