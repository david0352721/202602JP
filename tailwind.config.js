/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'system-ui', 'sans-serif'],
      },
      colors: {
        travel: {
          navy: '#1e3a5f',
          coral: '#e07a5f',
          sand: '#f4f1de',
          mint: '#81b29a',
        },
      },
    },
  },
  plugins: [],
}
