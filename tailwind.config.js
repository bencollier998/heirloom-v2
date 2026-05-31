module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#e07a2f',
        'brand-brown': '#3b1f0e',
        'brand-cream': '#fdf6ec',
        'brand-cream-light': '#fefaf4',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
