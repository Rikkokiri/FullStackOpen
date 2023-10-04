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
