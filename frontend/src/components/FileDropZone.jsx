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
      className={`
        border-2 border-dashed rounded-[var(--radius)] px-5 py-7 text-center cursor-pointer
        transition-[border-color,background] duration-200
        ${dragging
          ? "border-[var(--accent)] bg-[#1f1820]"
          : "border-[var(--border)] bg-[var(--surface)]"
        }
      `}
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <span className="text-[28px]">📂</span>
      <span className="block text-[13px] text-[var(--text-muted)] mt-1.5">{label}</span>
      {file
        ? <span className="block text-[13px] text-[#7cfc8a] mt-2">✓ {file.name}</span>
        : <span className="block text-[13px] text-[var(--text-muted)] mt-2">Click or drag &amp; drop</span>
      }
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