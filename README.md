# SvelteKit TypeScript ESLint TailwindCSS Jest

### Changes & current state

Updated on 2022-04-21
- Still uses @ota-meshi's alternative ESLint plugins and `eslint-plugin-prettier`.
- TS support in .svelte files: `@typescript-eslint` and Prettier understand TS syntax, type checking is not available with standard TS tooling but only with `svelte-check`.
- Tailwind CSS JIT is enabled.

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
# Choose to generate a skeleton app with TypeScript and ESLint
cd my-app && npm i

# ESLint
npm i -D @ota-meshi/eslint-plugin-svelte svelte-eslint-parser eslint-plugin-prettier
npm un eslint-plugin-svelte3
# Disable 'no-inner-declarations' and 'no-unused-vars' for .svelte files because they don't work.
# Change the default lint and format scripts if you like eslint-plugin-prettier.

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

Svelte's recommended way to use ESLint and TypeScript seems non-standard.
For linting purposes, Vue is very similar to Svelte and their ecosystem has solved this problem beautifully with `vue-eslint-parser`.
Those guys also seem to be ESLint maintainers. @ota-meshi's solution for Svelte uses the same approach as that.
