import { useRef, useState } from "react";

export default function FileDropZone({ label, onFile, file }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className="relative cursor-pointer rounded-xl border-2 border-dashed px-5 py-7 text-center transition-all duration-300 overflow-hidden select-none bracket-box"
      style={{
        borderColor: dragging
          ? "rgba(0,207,255,0.8)"
          : file
          ? "rgba(123,44,255,0.6)"
          : "rgba(0,207,255,0.18)",
        background: dragging
          ? "rgba(0,207,255,0.06)"
          : file
          ? "rgba(123,44,255,0.06)"
          : "rgba(5,8,31,0.6)",
        boxShadow: dragging
          ? "0 0 24px rgba(0,207,255,0.2), inset 0 0 40px rgba(0,207,255,0.04)"
          : file
          ? "0 0 20px rgba(123,44,255,0.2), inset 0 0 40px rgba(123,44,255,0.03)"
          : "none",
      }}
    >
      {/* scan line effect on drag */}
      {dragging && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: "absolute",
            left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(0,207,255,0.6), transparent)",
            animation: "scanline 1s linear infinite",
          }} />
        </div>
      )}

      {/* glow blob when file loaded */}
      {file && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(123,44,255,0.15), transparent 70%)" }} />
      )}

      {/* icon */}
      <div
        className="w-11 h-11 mx-auto mb-3 rounded-lg flex items-center justify-center text-xl transition-all duration-300"
        style={{
          background: file
            ? "linear-gradient(135deg, rgba(123,44,255,0.3), rgba(0,207,255,0.15))"
            : "rgba(0,207,255,0.06)",
          border: `1px solid ${file ? "rgba(123,44,255,0.4)" : "rgba(0,207,255,0.15)"}`,
          boxShadow: file ? "0 0 14px rgba(123,44,255,0.3)" : "none",
        }}
      >
        {file ? (
          <span style={{ color: "#00FF8C", filter: "drop-shadow(0 0 6px rgba(0,255,140,0.8))" }}>✓</span>
        ) : (
          <span style={{ filter: "drop-shadow(0 0 4px rgba(0,207,255,0.4))" }}>📂</span>
        )}
      </div>

      {/* label */}
      <p className="text-xs font-bold uppercase tracking-widest mb-1"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text-muted)" }}>
        {label}
      </p>

      {file ? (
        <span
          className="inline-block text-[11px] font-bold px-3 py-0.5 rounded-full mt-1 truncate max-w-full"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#00FF8C",
            background: "rgba(0,255,140,0.08)",
            border: "1px solid rgba(0,255,140,0.2)",
            boxShadow: "0 0 8px rgba(0,255,140,0.15)",
          }}
        >
          {file.name}
        </span>
      ) : (
        <p className="text-[11px] mt-1" style={{ color: "rgba(154,164,199,0.5)" }}>
          Klik atau drag &amp; drop
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])}
      />
    </div>
  );
}
