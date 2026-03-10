import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '2560px',
    },
    extend: {
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'],
      },
      colors: {
        common: {
          black: '#000',
          white: '#fff',
        },
        primary: '#43cea2',
        warning: '#F2AEBB',
        secondary: '#DBDFEA',
        error: '#C8B6E2',
        default: '#EEE',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
