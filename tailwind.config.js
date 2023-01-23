/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        //Bounces 5 times 1s equals 5s
        'bounce-short': 'bounce 1s ease-in-out 3',
      },
      colors: {
        background: '#171717',
        primary: '#e5e7eb',
        secondary: '#9ca3af',
        'action-2': '#0ea5e9',
        action: '#ec4899',
        'action-3': '#eab308',
        'action-4': '#14b8a6',
        'action-5': '#f43f5e',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border|hover:bg|hover:text|hover:border)-action-(2|3|4|5)/,
    },
  ],
};
