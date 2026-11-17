/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        burnt: {
          DEFAULT: '#C65D32',
          50: '#FBEEEA',
          100: '#F6DDD2',
          200: '#EDBBA4',
          300: '#E29977',
          400: '#D98B45',
          500: '#C65D32',
          600: '#A94A26',
          700: '#86391F',
          800: '#5E2715',
        },
        charcoal: {
          DEFAULT: '#191919',
          800: '#1f1f1f',
          700: '#262626',
          600: '#2e2e2e',
        },
        cream: '#F4EBDD',
        sand: '#D8C2A5',
      },
      fontFamily: {
        display: ['"Clash Display"', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.4em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.5rem', sm: '2rem', lg: '4rem' },
      },
    },
  },
  plugins: [],
};
