/** @type {import('tailwindcss').Config} */
export default {
  future: {
    disableExperimentalOptimizer: true, // Forces JS version of Tailwind
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0066cc",
        secondary: "#4b5563",
        accent: "#f59e0b",
        background: "#ffffff",
        text: "#1f2937",
      },
    },
  },
  plugins: [],
};
