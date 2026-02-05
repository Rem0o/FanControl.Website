const colors = require("tailwindcss/colors");

/**
 * ═══════════════════════════════════════════════════════════
 * FANCONTROL WEBSITE - TAILWIND CONFIG
 * ═══════════════════════════════════════════════════════════
 * 
 * Color System:
 * ─────────────────────────────────────────────────────────
 * - PRIMARY (toryBlue): Main brand color, used for buttons,
 *   links, and accents. Range: 50-900 with DEFAULT at 600.
 * 
 * - ACCENT (yellow): Call-to-action and highlight color.
 *   Used sparingly for emphasis. DEFAULT is 400.
 * 
 * - BODY (slate): Text and background colors across the site.
 *   Provides full light/dark mode support (50-950).
 * 
 * Design System:
 * ─────────────────────────────────────────────────────────
 * - Glassmorphism: backdrop-blur-md/lg/xl with semi-transparent
 *   backgrounds. See global.css .glass utilities.
 * 
 * - Shadows: Custom glow effects using primary color
 *   (shadow-glow, shadow-glow-lg) and accent (shadow-glow-accent).
 * 
 * - Animations: Smooth transitions with fade-in, scale-in,
 *   and slide variants. Physics-based logo rotation in JS.
 * 
 * Reusable Components:
 * ─────────────────────────────────────────────────────────
 * - <FeatureCard>: Glass card with hover animations
 * - <GradientButton>: Primary/accent gradient buttons
 * - <Card>: Base card with backdrop blur
 * - See src/reactComponents/ for all components
 */

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
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        wiggle: "wiggle 1.5s ease-in",
        "scroll-in": "scroll-in 0.5s ease-in",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite",
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
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" }
        }
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(12, 71, 173, 0.3)',
        'glow': '0 0 20px rgba(12, 71, 173, 0.4)',
        'glow-lg': '0 0 30px rgba(12, 71, 173, 0.5)',
        'glow-accent': '0 0 20px rgba(240, 207, 65, 0.4)',
      }
    }
  }
};
