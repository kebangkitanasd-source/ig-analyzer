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
      className={`
        relative cursor-pointer rounded-2xl border-2 border-dashed px-5 py-8 text-center
        transition-all duration-200 overflow-hidden select-none
        ${dragging
          ? "border-[#f7406e] bg-[#f7406e]/[0.06]"
          : file
          ? "border-[#a855f7]/50 bg-[#a855f7]/[0.04]"
          : "border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"}
      `}
    >
      {/* glow blob */}
      {file && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.12), transparent 70%)" }} />
      )}

      {/* icon */}
      <div className={`
        w-12 h-12 mx-auto mb-3.5 rounded-xl flex items-center justify-center text-2xl
        border transition-all duration-200
        ${file
          ? "border-[#a855f7]/30 bg-gradient-to-br from-[#a855f7]/20 to-[#f7406e]/10"
          : "border-white/[0.08] bg-white/[0.05]"}
      `}>
        {file ? "✓" : "📂"}
      </div>

      <p className="text-xs font-bold text-[#a0a0c0] mb-1">{label}</p>

      {file ? (
        <span className="inline-block text-[11px] font-bold text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/20 px-3 py-0.5 rounded-full mt-1 truncate max-w-full">
          {file.name}
        </span>
      ) : (
        <p className="text-[11px] text-[#606080] mt-1">Klik atau drag & drop</p>
      )}

      <input ref={inputRef} type="file" accept=".json" className="hidden"
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])} />
    </div>
  );
}
