const prod = !process.env.ROLLUP_WATCH;

module.exports = {
  darkMode: false, // or 'media' or 'class'
  plugins: [],
  purge: { content: ['./src/**/*.svelte'], enabled: prod },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
};
