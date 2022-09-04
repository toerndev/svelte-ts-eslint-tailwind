# SvelteKit TypeScript ESLint TailwindCSS

### News

Updated on 2022-09-04

- Caught up with SvelteKit's big August update with the changes to `load` and how filenames affect routing
- Removed `eslint-plugin-prettier` (since I now run ESLint and Prettier through LSP)
- Uses @ota-meshi's alternative ESLint plugins
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

# Choose to generate a skeleton app with TypeScript, ESLint and Playwright.
# Don't add Prettier here because `prettier-plugin-tailwindcss` conflicts with the Svelte plugin.
# The former bundles the latter to make up for this!

cd my-app && npm i

# ESLint
npm i -D @ota-meshi/eslint-plugin-svelte svelte-eslint-parser eslint-config-prettier prettier
npm un eslint-plugin-svelte3
# Disable 'no-inner-declarations' and 'no-self-assign' for .svelte files because they don't work.
# Get .eslint* and .prettierrc* from this repo.
# Prettier might not work yet, see above.

npx svelte-add tailwindcss
npm i -D prettier-plugin-tailwindcss

# This installs postcss, postcss-load-config, autoprefixer, tailwindcss
# cssnano is not (no longer?) installed by this tool, and didn't make any difference in my tests.
# The Tailwind CSS documentation still recommends it though.
```
