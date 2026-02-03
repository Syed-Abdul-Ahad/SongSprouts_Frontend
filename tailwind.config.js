export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        'grift': ['Grift', 'system-ui', 'sans-serif'],
        'sans': ['Grift', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
