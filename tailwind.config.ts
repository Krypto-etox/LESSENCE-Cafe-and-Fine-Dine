import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          950: "#070708",
          900: "#0C0C0E", // Signature deep background
          850: "#0F0F12",
          800: "#141418",
          700: "#1A1A22",
          600: "#272732",
          500: "#3B3B4A",
        },
        champagne: {
          100: "#FDFBF7",
          200: "#F7EEDC",
          300: "#ECDDBE",
          400: "#E3C77E",
          500: "#D4AF37", // Signature aged champagne / warm gold
          600: "#B89222",
          700: "#8C6E14",
          800: "#604B0C",
        },
        silk: {
          50: "#FCFCFA",
          100: "#F5F5F0", // Primary off-white text
          200: "#E6E6DF",
          300: "#CBCBC2",
          400: "#9E9E94",
          500: "#707068",
        },
        espresso: {
          950: "#0E0908",
          900: "#16100E",
          800: "#221714",
          700: "#32231F",
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.35em",
        "widest-luxury": "0.25em",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "grain": "noise 0.2s steps(4) infinite",
        "marquee": "marquee 32s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        noise: {
          "0%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -5%)" },
          "20%": { transform: "translate(-10%, 5%)" },
          "30%": { transform: "translate(5%, -10%)" },
          "40%": { transform: "translate(-5%, 15%)" },
          "50%": { transform: "translate(-10%, 5%)" },
          "60%": { transform: "translate(15%, 0)" },
          "70%": { transform: "translate(0, 10%)" },
          "80%": { transform: "translate(-15%, 0)" },
          "90%": { transform: "translate(10%, 5%)" },
          "100%": { transform: "translate(5%, 0)" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
