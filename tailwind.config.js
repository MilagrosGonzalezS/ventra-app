import { nextui } from "@nextui-org/react";

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
  darkmode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};

export default config;
