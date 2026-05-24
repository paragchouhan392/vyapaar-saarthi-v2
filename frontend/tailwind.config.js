/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        midnight: {
          950: "#020617",
          900: "#0f172a",
          800: "#111827",
        },
        surface: {
          900: "#0b1120",
          800: "#111827",
          700: "#1f2937",
        },
        success: {
          400: "#34d399",
          500: "#10b981",
        },
        warning: {
          400: "#f59e0b",
          500: "#d97706",
        },
        danger: {
          400: "#fb7185",
          500: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        fintech: "0 20px 60px rgba(59, 130, 246, 0.18)",
        glow: "0 0 30px rgba(96, 165, 250, 0.18)",
      },
      backgroundImage: {
        "fintech-grid": "linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)",
        "fintech-radial": "radial-gradient(circle at top left, rgba(59, 130, 246, 0.2), transparent 28%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.18), transparent 24%)",
      },
    },
  },
  plugins: [],
}