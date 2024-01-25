/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      visbility:("group-hover"),
      transitionDuration: {
        '5000': '5000ms',
      }
    },
  },
  plugins: [],
}

