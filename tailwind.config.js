/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#19171A',
          50: '#f6f6f6',
          950: '#19171A'
        },
        gray: {
          DEFAULT: '#aeaca5',
          50: '#f6f6f6',
          100: '#ebebe9',
          200: '#d6d5d2',
          300: '#bcbbb5',
          400: '#aeaca5',
          500: '#8e8a81',
          600: '#817d75',
          700: '#6c6862',
          800: '#5a5752',
          900: '#4a4844',
          950: '#272523'
        },
        red: {
          DEFAULT: '#E9322E'
        }
      }
    }
  },
  plugins: []
}
