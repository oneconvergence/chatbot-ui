/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(14,18,22,.35) 0px 10px 38px -10px,rgba(14,18,22,.2) 0px 10px 20px -15px,0 0 0 1px rgba(14,18,22,.08)',
      }
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
