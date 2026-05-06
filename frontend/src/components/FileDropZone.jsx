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
      className="relative cursor-pointer rounded-2xl border-2 border-dashed px-5 py-7 text-center transition-all duration-200 select-none overflow-hidden"
      style={{
        borderColor: dragging
          ? "var(--accent)"
          : file
          ? "rgba(52,199,89,0.5)"
          : "var(--border-strong)",
        background: dragging
          ? "var(--accent-muted)"
          : file
          ? "rgba(52,199,89,0.06)"
          : "var(--bg-input)",
        boxShadow: dragging ? "0 0 0 4px var(--accent-muted)" : "none",
      }}
    >
      {/* icon */}
      <div
        className="w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center text-xl transition-all duration-200"
        style={{
          background: file
            ? "rgba(52,199,89,0.12)"
            : dragging
            ? "var(--accent-muted)"
            : "var(--bg-tertiary)",
          border: "1px solid var(--border)",
        }}
      >
        {file ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10.5l4.5 4.5 8-9" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 13V7M10 7l-2.5 2.5M10 7l2.5 2.5" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 13.5A3.5 3.5 0 0 0 6.5 17h7a3.5 3.5 0 0 0 0-7H13a4 4 0 1 0-7.87 1" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </div>

      {/* label */}
      <p className="text-[12px] font-semibold mb-1 tracking-tight" style={{ color: "var(--text-primary)" }}>
        {label}
      </p>

      {file ? (
        <span
          className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mt-1 truncate max-w-full"
          style={{
            color: "#34c759",
            background: "rgba(52,199,89,0.1)",
            border: "1px solid rgba(52,199,89,0.2)",
          }}
        >
          {file.name}
        </span>
      ) : (
        <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
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
