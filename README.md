# SvelteKit TypeScript ESLint TailwindCSS

### Changes & current state

Status as of 2022-07-02
- Replaced Jest with SvelteKit's choice of Playwright to reduce configuration.
- Uses @ota-meshi's alternative ESLint plugins and `eslint-plugin-prettier`.
- TS support in .svelte files: `@typescript-eslint` and Prettier understand TS syntax, type checking in `.svelte` files is not available with standard TS tooling but only through `svelte-check`.
- Tailwind CSS JIT is enabled.
- Sorts Tailwind class strings with Prettier.

### Usage

```
npx degit toerndev/svelte-ts-eslint-tailwind my-app
cd my-app
npm install
npm run dev
```

### Recreate from scratch

```
npm create svelte my-app
# Choose to generate a skeleton app with TypeScript, ESLint and Playwright
cd my-app && npm i

# ESLint
npm i -D @ota-meshi/eslint-plugin-svelte svelte-eslint-parser eslint-plugin-prettier eslint-config-prettier prettier
npm un eslint-plugin-svelte3
# Disable 'no-inner-declarations' and 'no-unused-vars' for .svelte files because they don't work.
# Change the default lint and format scripts if you like eslint-plugin-prettier.

npx svelte-add tailwindcss
npm i -D prettier-plugin-tailwindcss
# This installs postcss, postcss-load-config, autoprefixer, cssnano and tailwindcss
# Try building and linting the app here to see any Tailwind warnings about changed config format.
# This repo puts the global style under src/style, so remove SvelteKit's src/*.css.
```

### Why the alternative ESLint plugins?

Svelte's recommended way to use ESLint and TypeScript sometimes seems non-standard to me.
@ota-meshi's solution follows the same structure as `vue-eslint-parser`, which is developed by ESLint maintainers.

### What's the point of this repo?

Not sure! The ecosystem has come a long way, this used to be much trickier.
I might stop using `eslint-plugin-prettier` soon and format files separately, making this template _even less_ special. :-)
