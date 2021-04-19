const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      teal: colors.teal,
      gray: colors.coolGray,
      red: colors.red,
    },
    fontFamily: {
      title: [
        'Fira Sans', 'Open Sans', 'Nunito Sans'
      ],
      display: [
        'Karla', 'Nunito',' Halant', 'PT Serif'
      ]
    },
    extend:{
      screens:{
        '3xl':'2000px'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
