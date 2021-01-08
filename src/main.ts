import App from './App.svelte';

const app = new App({
  target: document.body,

  props: {
    name: 'Svelte with TypeScript, ESLint, Tailwind CSS and Jest',
  },
});

export default app;
