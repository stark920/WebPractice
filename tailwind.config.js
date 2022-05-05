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
        primary: '#03438D',
        black: '#000400',
        warn: '#EEC32A',
        alert: '#F57375',
        'bg-light': '#efece7',
        'bg-dark': '#111827',
        'apple-red': '#DE4B63',
        'apple-yellow': '#FAA722',
        'apple-green': '#83C51D',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};