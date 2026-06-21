import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "Inter",
          "sans-serif",
        ],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        ink: {
          950: "#05060a",
          900: "#0a0b10",
          800: "#101218",
          700: "#1a1d26",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        "apple": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        floaty: "floaty 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
