# SvelteKit TypeScript ESLint TailwindCSS Jest

### Changes & current state

Updated on 2022-02-13
- Still uses @ota-meshi's alternative ESLint plugins, and eslint-plugin-prettier.
  Type-checking doesn't work in .svelte files, same as with the default setup. But it accepts TS syntax and it's not a big loss.
- Tailwind CSS can now be added with `svelte-add` which makes things easier. (Well done!)
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

The interaction between syntaxes and tools like Svelte, ESLint, TypeScript, Prettier and Jest is
complex. Bringing TypeScript to Svelte is not only about transpiling and bundling, but about these
things too.
I believe that there is a right way to do it, which can be found in the repo `vue-eslint-parser`
which coincidentally seems to be largely written by ESLint maintainers. @ota-meshi is one of them
so that's very promising. `vue-eslint-parser` is a work of art!
Vue and Svelte have very similar file structures, so I'm putting my vote on that. :-)
