import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  safelist: ["dark", "light"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      blue: {
        50: "#EBF2FA",
        100: "#D0E2F2",
        200: "#A4C9E9",
        300: "#74AAD9",
        400: "#4D8EC6",
        500: "#2563EB",
        600: "#1D4FCC",
        700: "#15379D",
        800: "#0E246E",
        900: "#08133F",
      },
      navy: {
        DEFAULT: "#202938",
        50: "#F5F7FA",
        100: "#E8EDF3",
        200: "#C5D1E2",
        300: "#9CB4D0",
        400: "#708DB7",
        500: "#3F5E8F",
        600: "#2F4872",
        700: "#1F3255",
        800: "#0F1D38",
        900: "#080F1F",
      },
      gray: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#252336",
        900: "#1C1B2E",
      },
      orange: {
        400: "#F97316",
        500: "#EA580C",
      },
    },
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1500px",
      "2xl": "1800px",
    },
    fontSize: {
      xs: ".875rem",
      sm: "1rem",
      base: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "1.75rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3.25rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
    },
    extend: {
      opacity: {
        7: ".075",
        15: ".15",
      },
      maxWidth: {
        "8xl": "86rem",
      },
      spacing: {
        128: "32rem",
      },
      zIndex: {
        "-1": "-1",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        nunito: ["var(--font-nunito)", ...fontFamily.sans],
        lato: ["var(--font-lato)", ...fontFamily.sans],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "600px",
          md: "900px",
          lg: "1024px",
          xl: "1200px",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "inherit",
            a: {
              color: "inherit",
              "&:hover": {
                color: "inherit",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
