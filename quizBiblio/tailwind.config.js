const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled:true,
    preserveHtmlElements: false,
    content: ['./quizApps/templates/quizApps/*.html']
  },
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
        '3xl':'2500px'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
