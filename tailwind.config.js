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
          DEFAULT: '#6B46C1', // Deep Purple
          hover: '#553C9A',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F3F4F6', // Warm Gray
          foreground: '#1F2937',
        },
        accent: {
          DEFAULT: '#F59E0B', // Gold
          hover: '#D97706',
          foreground: '#FFFFFF',
        },
        background: '#FFFFFF',
        foreground: '#1F2937', // Dark gray for text
        muted: '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
