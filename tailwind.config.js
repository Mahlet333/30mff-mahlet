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
        'background': '#18181b',
        'surface': '#23272f',
        'primary': '#f59e42', // gold accent
        'accent-red': '#E63946', // old accent, optional
        'text-main': '#f3f4f6',
        'text-secondary': '#a1a1aa',
        'campus': {
          dark: '#0A0A0A',
          light: '#F5F5F5',
          accent: '#f59e42', // update campus accent to gold
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
      fontSize: {
        'base': '1.125rem', // 18px
        'lg': '1.25rem',    // 20px
        'xl': '1.5rem',     // 24px
        '2xl': '1.875rem',  // 30px
        '3xl': '2.25rem',   // 36px
        '4xl': '3rem',      // 48px
        '5xl': '3.75rem',   // 60px
        '6xl': '4.5rem',    // 72px
      },
    },
  },
  plugins: [],
}