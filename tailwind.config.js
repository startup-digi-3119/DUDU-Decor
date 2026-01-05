/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37', // Gold
          hover: '#C5A028',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#0F172A', // Deep Navy
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#FDFBF7', // Soft Cream
          foreground: '#0F172A',
        },
        background: '#FDFBF7', // Soft Cream
        foreground: '#0F172A', // Deep Navy
        muted: '#94A3B8', // Slate 400
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
        script: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}
