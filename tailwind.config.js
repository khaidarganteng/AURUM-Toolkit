/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: { 100: '#f8ecc9', 200: '#f5e0a3', 300: '#f0d58a', 400: '#e2bb5b', 500: '#c9a14a', 600: '#a37e2f', 700: '#7a5b1f' },
        ink: { 950: '#070708', 900: '#0b0b0d', 800: '#121215', 700: '#1a1a1f', 600: '#26262d' },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        rise: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: { shimmer: 'shimmer 6s linear infinite', rise: 'rise .5s ease both' },
    },
  },
  plugins: [],
};
