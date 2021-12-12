const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      
      moradoClaro: {
        light: '#D9BFC4',
        default: '#8C515C',
        dark: '#59343B',
      },

      moradoOscuro: {
        light: '#66385B',
        default: '#59314F',
        dark: '#402339',
      },
      verdeAzul: {
        light: '#D5F2F2',
        default: '#60A6A6',
        dark: '#437373',
      },
      azul: {
        light: '#6BF2E5',
        default: '#5FD9CD',
        dark: '#4FB3A9',
      },
      cafe: {
        light: '#B38062',
        default: '#A6775B',
        dark: '#664938',
      },
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [],

};