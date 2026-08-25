/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        editorial: ['Fraunces', 'Georgia', 'serif'],
        handwritten: ['Cedarville Cursive', 'Kalam', 'cursive'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'editorial': '0px',
        'subtle': '3px',
        'interactive': '6px',
      },
      maxWidth: {
        'reading': '640px',
        'content': '820px',
        'wide': '1080px',
      },
    },
  },
  plugins: [],
}
