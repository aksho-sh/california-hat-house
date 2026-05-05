/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F2EB', // Sand
        primary: '#0F3D4C',   // Ocean
        accent: '#F26B38',    // Sunset
        text: '#222222',      // Asphalt
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        drama: ['Oswald', 'sans-serif'],
        data: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
