const colors = require("tailwindcss/colors");

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
  900: "#010610"
};

const yellow = {
  DEFAULT: "#F0CF41",
  50: "#FDF6E8",
  100: "#FBEED1",
  200: "#F9E5AA",
  300: "#F6DC7A",
  400: "#F0CF41",
  500: "#D8B72E",
  600: "#BF9F1F",
  700: "#A68714",
  800: "#8D6F0C",
  900: "#745707"
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: toryBlue,
        accent: yellow["400"],
        body: colors.slate,
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1.5s ease-in",
        "scroll-in": "scroll-in 0.5s ease-in"
      },
      keyframes: {
        wiggle: {
          "0%, 7%": { transform: "rotateZ(0)" },
          "15%": { transform: "rotateZ(-9deg)" },
          "20%": { transform: "rotateZ(7deg)" },
          "25%": { transform: "rotateZ(-8deg)" },
          "30%": { transform: "rotateZ(5deg)" },
          "35%": { transform: "rotateZ(-1deg)" },
          "40%, 100%": { transform: "rotateZ(0)" }
        },
        "scroll-in": {
          "0%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" }
        }
      }
    }
  }
};
