/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#0e1c39',
        secondary:'#939497' ,
      },
    },
  },
  plugins: [],
}