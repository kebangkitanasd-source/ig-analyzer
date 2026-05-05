/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        ig: {
          pink:   "#f7406e",
          purple: "#a855f7",
          blue:   "#3b82f6",
        },
      },
    },
  },
  plugins: [],
};
