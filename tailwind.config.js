/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FDA214',
        'primary-hover': '#FF8C00',
        'dark-bg': '#1C2B3A',
      },
      fontFamily: {
        sans: ['Atkinson Hyperlegible', 'sans-serif'],
      },
    },
  },
  plugins: [],
}