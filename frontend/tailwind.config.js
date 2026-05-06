/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'SF Pro Display'", "sans-serif"],
      },
      colors: {
        apple: {
          blue:   "#0071e3",
          green:  "#34c759",
          red:    "#ff3b30",
          orange: "#ff9500",
          purple: "#af52de",
          pink:   "#ff2d55",
          teal:   "#5ac8fa",
          gray1:  "#8e8e93",
          gray2:  "#aeaeb2",
          gray3:  "#c7c7cc",
          gray4:  "#d1d1d6",
          gray5:  "#e5e5ea",
          gray6:  "#f2f2f7",
        },
      },
      borderRadius: {
        'apple-sm': '8px',
        'apple-md': '12px',
        'apple-lg': '18px',
        'apple-xl': '22px',
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease forwards',
        'fade-in': 'fade-in 0.3s ease forwards',
      },
      backdropBlur: {
        'apple': '20px',
      },
    },
  },
  plugins: [],
};
