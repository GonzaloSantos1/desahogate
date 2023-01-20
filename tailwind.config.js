/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#171717',
        primary: '#e5e7eb',
        secondary: '#9ca3af',
        'action-2': '#0ea5e9',
        action: '#ec4899',
      },
    },
  },
  plugins: [],
};
