# SvelteKit TypeScript ESLint TailwindCSS

### Status

Updated on 2023-05-21

- Official template uses @ota-meshi's stuff now, so less stuff to do here.
- `prettier-plugin-tailwindcss` can co-exist with the svelte plugin now, too.

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

# Choose to generate a skeleton app with TypeScript, ESLint and Prettier.

cd my-app && npm i

# ESLint
# Disable 'no-inner-declarations' and 'no-self-assign' for .svelte files because they don't make sense with Svelte.
# Get .eslint* and .prettierrc* from this repo.

npm i -D prettier-plugin-tailwindcss
npx svelte-add tailwindcss
npm i

# The docs for `prettier-plugin-tailwindcss` say that the option `pluginSearchDirs` may not be enabled together
# with `prettier-plugin-svelte`. I disable it in `.prettierrc` but the Svelte template's scripts in package.json apply it.
# And it seems to work...? But good to know.

# This installs postcss, postcss-load-config, autoprefixer, tailwindcss
# cssnano is not (no longer?) installed by this tool, and didn't make any difference in my tests.
# The Tailwind CSS documentation still recommends it though.
```
