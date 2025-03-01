/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'poppins-black': ['Poppins-black', 'sans-serif'],
        'poppins-bold': ['Poppins-bold', 'sans-serif'],
        'poppins-light': ['Poppins-light', 'sans-serif'],
        'poppins-regular': ['Poppins-regular', 'sans-serif'],
        'poppins-semi-bold': ['Poppins-semi-bold', 'sans-serif'],
        'poppins-thin': ['Poppins-thin', 'sans-serif'],
        'poppins-light': ['Poppins-light', 'sans-serif'],
        'poppins-italic': ['Poppins-italic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}