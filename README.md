# Svelte TypeScript Rollup ESLint TailwindCSS Jest

Last updated 2021-01-08.

### Limitations

- We need to choose between TypeScript and ESLint for .svelte files, because `@typescript-eslint/parser` and `eslint-plugin-svelte3` work independently.
Personally I find ESLint more valuable since I prefer lightweight view files with as little to type check as possible.
- This starter doesn't configure Jest with Svelte support, again because logic should be separate from views anyway.
- `eslint-plugin-svelte3` and `prettier-plugin-svelte` only work separately, not via `eslint-plugin-prettier`.
- This has been tested with neovim + w0rp/ale, not with vscode or other editors.

### Usage

```
npx degit toerndev/svelte-ts-eslint-tailwind my-app
cd my-app
yarn
yarn dev
```

# _Or_ recreate this starter from scratch like this:

### Copy the official template

```
npx degit sveltejs/template svelte-typescript-app
cd svelte-typescript-app
node scripts/setupTypescript.js
```

### Add ESLint

- `yarn add -D eslint eslint-plugin-svelte3 @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier prettier-plugin-svelte eslint-config-prettier eslint-plugin-prettier`
- Add `eslintrc.js` and `prettier.config.js` (see repo files).
- Remove TypeScript syntax from `src/App.svelte`.
- Add script in `package.json`: `"lint": "eslint 'src/**/*.{ts,svelte}'"`.

Svelte's ESLint plugin won't accept TypeScript syntax.

### Add Jest

- `yarn add -D jest @types/jest`
- `package.json` script: `"test": "jest"`
- In `tsconfig.json` add `compilerOptions: { types: [ "jest" ] }` so tsc understands Jest.
- But overriding `compilerOptions.types` breaks the app build, change to `[ "svelte", "jest" ]` to fix it.
- Set `env: { jest: true }` for relevant files in `.eslintrc.js` so ESLint understands Jest.

Jest will also need Babel to run tests written in TypeScript, so

- `yarn add -D @babel/core @babel/preset-env @babel/preset-typescript babel-jest`
- Add `babel.config.js`.

### Tailwind CSS

This gets interesting because one can either generate and process Tailwind's CSS separately
from Rollup (`npm-run-all` + `postcss-cli`), or have Rollup run PostCSS... which can also act as a preprocessor with `postcss-import`!

This choice affects build/dev performance. I've gone with the Rollup-integrated approach which is
probably slower but seemed cleaner. It lets us use Tailwind's `@apply` directive inside `<style>` tags in .svelte files.
I also use `postcss-import` because it's recommended in the Tailwind CSS docs.

- Remove `public/global.css` and the link to it in `public/index.html`.
- Create `postcss.config.js` as in the repo.
- `yarn add -D tailwindcss postcss postcss-import autoprefixer cssnano`.
- `rollup.config.js`: Change `sveltePreprocess()` to `sveltePreprocess({ postcss: true })`. Setting `true` instead of an inline config makes it look for a PostCSS config file to load.
- However it will require `postcss-load-config` to do so, so install that. If there are errors in the PostCSS config Rollup will keep saying that `postcss-load-config` isn't installed... :-)
- `npx tailwindcss init` and set `purge.content` paths in `tailwind.config.js`.
- By default Tailwind CSS looks at `NODE_ENV` to control PurgeCSS, so to improve dev performance either
  - append `--environment NODE_ENV:production` in `package.json scripts.build`, or
  - set `purge.enabled` to `!process.env.ROLLUP_WATCH` (same as the Rollup and PostCSS configs).
- Wrap the `@tailwind base;` stuff in a Svelte component with `<style global lang="postcss">` and import in `App.svelte`. If using `postcss-import` change the syntax to `@import 'tailwindcss/base'`.

_(Note to self: when debugging Rollup/PostCSS we can add console prints in `postcss.config.js` by returning a function or wrapping values in lambdas, but `tailwind.config.js` seems to silently ignore the config file if you try this.)_

### Other

- The template has an annoying source map warning because Rollup's setting conflicts with that of the TypeScript plugin in `rollup.config.js`.
`typescript({ sourceMap: !production })` overrides `tsconfig.json`, but when this is `false` and `output.sourcemap` is still true it shows the error.
Change to `{ sourcemap: !production }` for `output` too to fix this.
- To prevent sirv from clearing the terminal in dev mode (before you can see any messages), launch it with `--no-clear`.

### Todo

- Transpiling output with Babel before/after Rollup, polyfills, browserlist

