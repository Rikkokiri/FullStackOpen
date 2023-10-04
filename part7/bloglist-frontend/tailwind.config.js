const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultTheme: 'light', // default theme from the themes object
      themes: {
        light: {
          colors: {
            foreground: '#000',
            primary: {
              DEFAULT: '#4B3795',
            },
            default: {
              400: '#18181b',
            },
          },
        },
        dark: {
          colors: {
            background: '#0F0B1E',
            foreground: '#ffffff',
            primary: {
              DEFAULT: '#DDA0DD',
              foreground: '#000000',
            },
            default: {
              400: '#fafafa',
            },
            focus: '#BEF264',
          },
        },
      },
    }),
  ],
}

// Colors:
// error red: #B81365 or #C1292E
// Potential primary colors (for dark mode)
// #50B181
// ##DDA0DD (plum)
// #007C8F

// Light theme toggle color maybe: #F2E12C

// Light theme:
// header etc. maybe: #d0d7de (rgba 0.24), rgba(208, 215, 222, 0.24)
