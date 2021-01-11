module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        bg: '30rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
