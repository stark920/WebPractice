module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      azeret: ['Azeret Mono', 'monospace'],
      baloo: ['Baloo Da 2', 'cursive'],
      sans: ['Noto Sans TC', 'sans-serif'],
      paytone: ['Paytone One', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#03438D',
          light: '#e2edfa',
        },
        black: '#000400',
        warn: '#EEC32A',
        alert: '#F57375',
        bg: {
          light: '#efece7',
          dark: '#111827',
        },
        apple: {
          red: '#DE4B63',
          yellow: '#FAA722',
          green: '#83C51D',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
