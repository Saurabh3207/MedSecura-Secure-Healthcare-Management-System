const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'violet': '0 0 10px rgba(128, 0, 128, 0.5)', // violet shadow for buttons and inputs focus state
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}