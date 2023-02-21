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
        primary: '#FFFF',
        secondary: '#9ca3af',
        action: '#FF4ECD',
        'action-blue': '#008FF6',
        'action-yellow': '#F6AD37',
        'action-green': '#41EC8B',
        'action-red': '#F4256D',
        'action-purple': '#9e69ff',
        'palette-blue': '#008FF6',
        'palette-purple': '#9e69ff',
        'palette-gray': '#25282c',
        'palette-black': '#141617',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border|shadow|hover:bg|hover:text|hover:border|hover:shadow)-(action|palette)-(blue|yellow|green|red|purple|black|gray)/,
    },
  ],
};
