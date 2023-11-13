import { nextui } from "@nextui-org/react";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#FCFCFC",
        dark: "#141414",
        opacity: "rgba(0, 0, 0, 0.89)",
        lightblue: "#04b290",
        green: "#bbff15",
        pink: "#e206f4",
        orange: "#f9700b",
      },
      backdropFilter: {
        blur: "blur(5px)",
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
  darkMode: "class",
  plugins: [nextui(), daisyui],
};

export default config;
