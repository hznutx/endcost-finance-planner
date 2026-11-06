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
        primary: '#12c2c9',
        warning: '#F2AEBB',
        secondary: '#DBDFEA',
        error: '#C8B6E2',
        default: '#EEE',
        db: {
          blue: '#0b5ed7',
          'blue-2': '#1a7fe0',
          teal: '#12c2c9',
        },
      },
      keyframes: {
        'db-rise': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'spin-y': {
          to: { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        'db-rise': 'db-rise 0.5s ease both',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
