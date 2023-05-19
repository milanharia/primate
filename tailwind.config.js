/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#55ffa3",
        secondary: "#0e0f11",
        tertiary: "#3e4248",
      },
    },
  },
  plugins: [],
};
