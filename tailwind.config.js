/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#020202',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#2b2b2b',
          950: '#020202'
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
          DEFAULT: '#cc281c',
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#ffcdc9',
          300: '#fdaaa4',
          400: '#fa786f',
          500: '#f14e42',
          600: '#df3023',
          700: '#cc281c',
          800: '#9b2219',
          900: '#80231c',
          950: '#460d09'
        }
      }
    }
  },
  plugins: []
}
