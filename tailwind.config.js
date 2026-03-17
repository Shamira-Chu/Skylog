/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000080",
        secondary: "#5C5CB3",
        accent: "#B8B8E6",
        background: "#F9F9F9",
      },
    },
  },
  plugins: [],
};