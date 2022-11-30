import colors from "tailwindcss/colors";

const toryBlue = {
  DEFAULT: "#0C47AD",
  50: "#A1C1F8",
  100: "#8EB4F7",
  200: "#689BF5",
  300: "#4282F2",
  400: "#1B69EF",
  500: "#0F57D3",
  600: "#0C47AD",
  700: "#083179",
  800: "#051C44",
  900: "#010610",
};

const chartreuse = {
  DEFAULT: "#89EA00",
  50: "#D9FFA3",
  100: "#D0FF8E",
  200: "#BFFF65",
  300: "#AEFF3D",
  400: "#9EFF14",
  500: "#89EA00",
  600: "#68B200",
  700: "#477A00",
  800: "#264200",
  900: "#060A00",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: toryBlue,
        accent: chartreuse["500"],
        body: colors.zinc,
        "tory-blue": toryBlue,
        chartreuse: chartreuse
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1.5s ease-in",
        "scroll-in": "scroll-in 0.5s ease-in",
      },
      keyframes: {
        wiggle: {
          "0%, 7%": { transform: "rotateZ(0)" },
          "15%": { transform: "rotateZ(-9deg)" },
          "20%": { transform: "rotateZ(7deg)" },
          "25%": { transform: "rotateZ(-8deg)" },
          "30%": { transform: "rotateZ(5deg)" },
          "35%": { transform: "rotateZ(-1deg)" },
          "40%, 100%": { transform: "rotateZ(0)" },
        },
        "scroll-in": {
          "0%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" },
        }
      },
    },
  },
};
