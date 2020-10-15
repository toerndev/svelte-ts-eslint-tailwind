# Svelte TypeScript Rollup ESLint TailwindCSS Jest

Last updated 2020-10-15.

### Limitations

- While Svelte now has TS support, `@typescript-eslint` can't read Svelte so we still need to choose between TS and ESLint for those files.
Personally I prefer lightweight view files without much logic to type check, so ESLint seems more valuable.
- This repo also doesn't bother to configure Jest with Svelte support, same reason as above.
- `eslint-plugin-svelte3` and `prettier-plugin-svelte` only work separately, not via `eslint-plugin-prettier`.
- This has only been tested with neovim + w0rp/ale, not with vscode.

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
- (Later: Run `eslint --fix` on files in `src/` and `.js` configs.)

`@typescript-eslint/parser` works for `.svelte` files, just not with TS syntax. Or maybe the Svelte plugin overrides it...

### Add Jest

- `yarn add -D jest @types/jest`
- In `tsconfig.json` add `compilerOptions: { types: [ "jest" ] }`.
- Set `env: { jest: true }` for relevant files in `.eslintrc.js`.

ESLint now understands the Jest syntax, but Jest will need Babel to run tests written in TypeScript:

- `yarn add -D @babel/core @babel/preset-env @babel/preset-typescript babel-jest`
- Add `babel.config.js`.

Now the tests should run, *but the app won't build anymore* unless we set `compilerOptions.types` to `[ "svelte", "jest" ]`.

### Tailwind CSS

Interesting choice here between:
1. Use `npm-run-all` and `postcss-cli` to generate and minify CSS separately from Rollup.
2. Have Rollup run `postcss`, requiring only one process and generating a single CSS bundle including component styles.

**(2)** feels cleaner and it also lets us use `@apply` in `<style>` tags, not sure if **(1)** can do this? However regeneration of styles seems to take longer with **(2)**.

- Remove `public/global.css` and the link to it in `public/index.html`.
- Create `postcss.config.js` as in the repo.
- `yarn add -D tailwindcss postcss` (and `autoprefixer` and `cssnano` if you need them, otherwise remove from the PostCSS config)
- `rollup.config.js`: Change `css.write` to `public/build/bundle.css`, and `sveltePreprocess()` to `sveltePreprocess({ postcss: true })`. Setting `true` makes it use `postcss.config.js` instead of an inline config object.
- Rollup will now require `postcss-load-config` to load the config so install that too.
- `npx tailwindcss init` and set `purge` paths in `tailwind.config.js`.
- In `package.json scripts.build` append `--environment NODE_ENV:production`. *Note*: Rollup and PostCSS configs look at `ROLLUP_WATCH`, but the Tailwind CSS plugin uses `NODE_ENV` to control PurgeCSS!
- Wrap the `@tailwind base;` stuff in a Svelte component with `<style global>` and import in `App.svelte`.

_(Note to self: when debugging Rollup/PostCSS we can add console prints in `postcss.config.js` by returning a function or wrapping values in lambdas, but `tailwind.config.js` seems to silently ignore the config file if you try this.)_

### Todo

- Source map warning
- transpiling output with Babel, polyfills, browserlist

--------------------------------
#### Everything below is from the original README
--------------------------------

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.
By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
