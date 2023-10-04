/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-400": "#6f7075",
        "primary-500": "#101a3e",
        "gray-light-400": "#f8f8f8",
        "gray-light-500": "#fcfcfc"
      },
      fontFamily: {
        roboto: ["Roboto", "san-serif"]
      },
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px",
      }
    },
  },
  plugins: [],
}

