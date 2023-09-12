/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{html,jsx}'],
  theme: {
    extend: {
      colors: {
        lightGray: '#f1f5f9',
        darkTheme: '#000',
        lightTheme: '#fff',
        lightText: '#A8A8A8',
        whiteText: '#f5f5f5',
        redText: '#ed4956',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        comment: '32px 1fr 12px',
      },
      spacing: {
        608: '38rem',
      },
    },
  },
  plugins: [],
};
