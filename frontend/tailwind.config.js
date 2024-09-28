/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "rgba": "rgba(185, 15, 185, 1)",
      },
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"],
        "raleway": ["Raleway", "sans-serif"],
        "jost":    ["Jost", "sans-serif"],
       
      },
      backgroundImage: {
        "hero-pattern": "url('assets/aboutus/aboutbg.svg')",
     
      }
    },
  },
  plugins: [],
}