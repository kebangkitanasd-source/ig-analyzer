import { useRef, useState } from "react";

const styles = {
  zone: {
    border: "2px dashed var(--border)",
    borderRadius: "var(--radius)",
    padding: "28px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color .2s, background .2s",
    background: "var(--surface)",
  },
  zoneActive: { borderColor: "var(--accent)", background: "#1f1820" },
  label:  { fontSize: 13, color: "var(--text-muted)", marginTop: 6, display: "block" },
  chosen: { fontSize: 13, color: "#7cfc8a", marginTop: 8 },
};

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
      style={{ ...styles.zone, ...(dragging ? styles.zoneActive : {}) }}
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <span style={{ fontSize: 28 }}>📂</span>
      <span style={styles.label}>{label}</span>
      {file
        ? <span style={styles.chosen}>✓ {file.name}</span>
        : <span style={styles.label}>Click or drag &amp; drop</span>
      }
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])}
      />
    </div>
  );
}
