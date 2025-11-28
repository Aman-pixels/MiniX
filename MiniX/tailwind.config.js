/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: {
          light: "rgba(255, 255, 255, 0.25)",
          dark: "rgba(255, 255, 255, 0.06)",
          border: "rgba(255, 255, 255, 0.12)",
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
        "glass-hover": "0 12px 48px 0 rgba(31, 38, 135, 0.12)",
      },
      borderRadius: {
        "2xl-soft": "1.25rem",
      },
    },
  },
  plugins: [],
};
