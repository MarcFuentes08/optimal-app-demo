/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-snap': '#E5FA76',
        'core-black': '#161616',
        'orange-fun': '#F3AF3E',
        'trust-gray': '#DBD8D2',
        'red-pulse': '#EF3E07',
        'human-gray': '#C5BDAA',
      },
      fontFamily: {
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
