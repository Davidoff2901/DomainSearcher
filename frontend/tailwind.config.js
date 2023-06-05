/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      'phoneS': { 'max': '399px' },
      'phone': { 'min': '400px', 'max': '639px' },
      'tablet': { 'min': '640px', 'max': '1080px' },
      'mobileDevices': { 'max': '1080px' },
      'desktop': '1081px',
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
