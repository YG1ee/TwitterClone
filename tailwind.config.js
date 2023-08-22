/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#f8f8f2",
        comment: "#6272a4",
        "current-line": "#44475a",
        "d-pink": "#ff79c6",
        "d-red": "#ff5555",
        "d-orange": "#ffb86c",
        "d-yellow": "#f1fa8c",
        "d-green": "#50fa7b",
        "d-cyan": "#8be9fd",
        "d-purple": "#bd93f9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
