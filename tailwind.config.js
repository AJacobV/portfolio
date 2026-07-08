/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#050505',
        'bg-soft': '#101010',
        'panel': 'rgba(14,14,14,0.88)',
        'panel-strong': 'rgba(18,18,18,0.98)',
        'red-brand': '#e10600',
        'red-soft': 'rgba(225,6,0,0.18)',
        'red-glow': 'rgba(225,6,0,0.45)',
        'text-main': '#f7f7f7',
        'text-muted': '#b2b2b2',
      },
      fontFamily: {
        sans: ['"Trebuchet MS"', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        'panel': '0 24px 90px rgba(0,0,0,0.6)',
        'btn-primary': '0 18px 50px rgba(225,6,0,0.28)',
      },
      borderRadius: {
        'brand': '18px',
        'brand-sm': '12px',
      },
      backgroundImage: {
        'btn-primary': 'linear-gradient(135deg, #ff1818 0%, #8f0404 100%)',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
};
