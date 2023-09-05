/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'confetti': "url('../public/assets/confetti.gif')",
      }
    },
  },
  plugins: [],
}

