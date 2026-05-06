/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["'Rajdhani'", "system-ui", "sans-serif"],
        display: ["'Orbitron'", "monospace"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        cyber: {
          deep:    "#05081F",
          navy:    "#0B1E5B",
          cyan:    "#00CFFF",
          blue:    "#38B6FF",
          purple:  "#7B2CFF",
          white:   "#FFFFFF",
          muted:   "#9AA4C7",
          green:   "#00FF8C",
          panel:   "#080D2A",
        },
      },
      boxShadow: {
        "neon-cyan":   "0 0 20px rgba(0,207,255,0.5), 0 0 40px rgba(0,207,255,0.2)",
        "neon-purple": "0 0 20px rgba(123,44,255,0.5), 0 0 40px rgba(123,44,255,0.2)",
        "neon-green":  "0 0 12px rgba(0,255,140,0.5)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "neon-border": "neon-border 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
