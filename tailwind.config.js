/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#FCFCFC",
        dark: "#141414",
        opacity: "rgba(48, 48, 48, 0.80)",
        lightblue: "#04b290",
        green: "#bbff15",
        pink: "#e206f4",
        orange: "#f9700b",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        accent: ["Prompt", "sans-serif"],
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1700px",
      },
    },
  },
  plugins: [],
};
