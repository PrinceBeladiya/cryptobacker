/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial-gradient': 'radial-gradient(circle at 50% 50%, transparent 10%, rgba(0, 0, 0, 0.95) 20%)',
      },
    },
  },
  plugins: [],
}