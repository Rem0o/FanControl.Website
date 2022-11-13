const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        body: colors.slate,
        background: colors.gray,
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
        },
      },
    },
  },
  plugins: ["gatsby-plugin-postcss"],
};
