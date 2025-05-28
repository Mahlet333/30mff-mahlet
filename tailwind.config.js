/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lexend': ['Lexend', 'sans-serif'],
        'lexend-light': ['Lexend Light', 'sans-serif'],
        'lexend-bold': ['Lexend Bold', 'sans-serif'],
      },
      colors: {
        'campus': {
          dark: '#0A0A0A',
          light: '#F5F5F5',
          accent: '#E63946',
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s ease-in-out',
        'pulse-soft': 'pulse-soft 8s ease-in-out infinite',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}