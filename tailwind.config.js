const prod = !process.env.ROLLUP_WATCH;

module.exports = {
  purge: { content: ['./src/**/*.svelte'], enabled: prod },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
