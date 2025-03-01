/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#282828",
        onPrimary: "#FFFFFF",
        secondary: "#C3B212",
        onSecondary: "#000000",
        background: "#FEFEFE",
        backgroundVariant: "#F4F4F4",
        outline: "#A0A0A0",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        prosto: ["Prosto One", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      padding: {
        padding: "4rem 4rem 12rem 0",
      },
    },
  },
  plugins: [],
};
