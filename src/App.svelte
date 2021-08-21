<script lang="ts">
  import TailwindCSS from './style/TailwindCSS.svelte';
  export let name: string;
</script>

<TailwindCSS />
<main>
  <h1 class="text-3xl font-bold">Hello {name}!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    or the <a href="https://tailwindcss.com/docs">Tailwind CSS docs</a>
    to learn how to build apps.
  </p>
</main>

<style>
  main {
    @apply p-4;
  }
  h1,
  p {
    @apply text-gray-600;
  }
  a {
    @apply text-blue-600 underline;
  }
</style>
