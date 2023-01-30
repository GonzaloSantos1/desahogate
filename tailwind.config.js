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
        primary: '#ECEDEE',
        secondary: '#9ca3af',
        action: '#FF4ECD',
        'action-blue': '#3694FF',
        'action-yellow': '#F6AD37',
        'action-green': '#41EC8B',
        'action-red': '#F4256D',
        'action-purple': '#9750DD',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border|shadow|hover:bg|hover:text|hover:border|hover:shadow)-action-(blue|yellow|green|red|purple)/,
    },
  ],
};
