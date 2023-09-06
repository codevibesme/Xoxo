/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'confetti': "url('../public/assets/confetti.gif')",
      },
      rotate: {
        '270': '270deg',
        '360': '360deg',
      }
    },
  },
  plugins: [],
}

