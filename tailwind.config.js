/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./components/**/*.html"
  ],
 theme: {
    extend: {
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        textMain: "#0f172a",
        textMuted: "#475569",
        "soft-white": "#ffffffcc",
      },
    },
  },
  plugins: [],
}
