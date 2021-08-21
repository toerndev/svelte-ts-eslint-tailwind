# Svelte TypeScript Rollup ESLint TailwindCSS Jest

### Changes & current state

- Updated on 2021-08-21
- Thanks to [@ota-meshi](https://github.com/ota-meshi)'s ESLint plugin the setup has become simpler and we get to have TypeScript, linting and prettier at the same time in .svelte files.
- Type checking doesn't seem to work in .svelte files, only parsing. Probably a configuration error on my part.
- This has still only been tested with **neovim** and **w0rp/ale**. Feel free to PR if something is needed for **vscode**.

### Usage

```
npx degit toerndev/svelte-ts-eslint-tailwind my-app
cd my-app
npm install
npm run dev
```

# How to recreate

### Copy the official template

```
npx degit sveltejs/template svelte-typescript-app
cd svelte-typescript-app
node scripts/setupTypescript.js
npm install
```

### ESLint and Prettier

- `npm i -D eslint prettier eslint-config-prettier eslint-plugin-prettier @ota-meshi/eslint-plugin-svelte svelte-eslint-parser prettier-plugin-svelte @typescript-eslint/eslint-plugin @typescript-eslint/parser`

*Note:* this isn't the official Svelte plugin for ESLint.

I'm not sure what the state of the official ESLint plugin is nowadays, but it used to be fundamentally incompatible with TypeScript.
Great news - the people behind the *beautiful* `vue-eslint-parser` who are also ESLint maintainers are creating a similar solution for Svelte,
i.e. an AST-based approach.
This plugin lets us configure it to use `@typescript-eslint` as parser.

- Add `eslintrc.js` and `prettier.config.js` (see repo files).
- Add script in `package.json`: `"lint": "eslint 'src/**/*.{ts,svelte}'"`.

### Tailwind CSS

This supports using `@apply` directives in Svelte `<style>` tags.

- Remove `public/global.css` and the link to it in `public/index.html`.
- Create `postcss.config.js` as in the repo.
- `npm i -D tailwindcss postcss postcss-import autoprefixer cssnano`.
- `rollup.config.js`: In the `sveltePreprocess()` args, add `{ postcss: true }`. Using `true` instead of an inline config makes it load an external config file.
- `npm i -D postcss-load-config` in order to support the above config loading. If Rollup keeps saying that this isn't installed, check the PostCSS config for errors! :-)
- `npx tailwindcss init` and set `purge.content` paths in `tailwind.config.js`.
- Rollup setups use `!process.env.ROLLUP_WATCH` but Tailwind normally looks as `NODE_ENV` to control PurgeCSS. Do one of:
  - pass `--environment NODE_ENV:production` from the build script
  - set `purge.enabled` to `!process.env.ROLLUP_WATCH` (same as the Rollup and PostCSS configs).
- Wrap the `@tailwind base;` stuff in a Svelte component with `<style global lang="postcss">` and import in `App.svelte`. If using `postcss-import` change the syntax to `@import 'tailwindcss/base'`.

_(Note: when debugging Rollup/PostCSS we can add console prints in `postcss.config.js` by returning a function or wrapping values in lambdas. But `tailwind.config.js` silently ignores the config file if we do this.)_

### Add Jest

- `npm i -D jest @types/jest`
- `package.json` script: `"test": "jest"`
- In `tsconfig.json` add `compilerOptions: { types: [ "jest" ] }` so tsc understands Jest.
- But overriding `compilerOptions.types` breaks the app build! Change to `[ "svelte", "jest" ]` to fix it.
- Set `env: { jest: true }` for relevant files in `.eslintrc.js` so ESLint understands Jest.

Jest will also need Babel to run tests written in TypeScript, so

- `npm i -D @babel/core @babel/preset-env @babel/preset-typescript babel-jest`
- Add `babel.config.js`.


### Other

- Annoying source map warning: In `rollup.config.js` there's a conflict between `output.sourcemap` and `plugins.typescript.sourceMap` when in dev mode.
Change the former to `!production` too to get rid of it.

### Todo

- Warning about modules not being bundles
- Transpiling output with Babel before/after Rollup, polyfills, browserlist

