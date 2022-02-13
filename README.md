# SvelteKit TypeScript ESLint TailwindCSS Jest

### Changes & current state

Updated on 2022-02-13
- Still uses @ota-meshi's alternative ESLint plugins and eslint-plugin-prettier.
  Type-checking doesn't work in .svelte files, same as with the SvelteKit setup. But it accepts TS syntax and it's not a big loss.
- Tailwind CSS can now be added with `svelte-add` which makes things easier.
- The JIT feature in Tailwind CSS is enabled.

### Usage

```
npx degit toerndev/svelte-ts-eslint-tailwind my-app
cd my-app
npm install
npm run dev
```

### Recreate from scratch

```
npm init svelte@next my-app
# Skeleton app with TypeScript and ESLint
cd my-app && npm i

# ESLint
npm i -D @ota-meshi/eslint-plugin-svelte svelte-eslint-parser eslint-plugin-prettier
npm un eslint-plugin-svelte3
# Disable the rule 'no-inner-declarations' for .svelte files because it makes no sense

npx svelte-add tailwindcss
# This installs postcss, postcss-load-config, autoprefixer, cssnano and tailwindcss
# When I run Vite, it tells me that Tailwind's config syntax has changed, so change 'purge'
# to 'content' and remove 'darkMode' or whatever it tells you to do.
# Tailwind CSS has instructions for Svelte so check those if necessary.

# Jest
npm i -D jest @types/jest
# Jest needs Babel to run tests with TypeScript
npm i -D @babel/core @babel/preset-env @babel/preset-typescript babel-jest

# In package.json, add script: "test": "jest"
# In tsconfig.json, add compilerOptions.types: ["svelte", "jest"]
# Make sure .eslintrc sets env.jest = true for test files
# Add babel.config.cjs
```

### Why the alternative ESLint plugins?

The interaction between syntaxes and tools like Svelte, ESLint, TypeScript, Prettier and Jest is
pretty delicate.
I believe that there is a right way to do it, which can be found by looking at `vue-eslint-parser`
which seems to be largely written by ESLint maintainers. That project is a work of art!
Svelte has kind of been going it's own way with svelte-checks and workarounds in the linting
plugins. I'm voting for the standard ESLint way. @ota-meshi's repo is it.
