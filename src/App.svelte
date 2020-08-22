<style>
  main {
    @apply p-4;
  }
  h1,
  p {
    @apply text-gray-600;
  }
</style>

<script>
  import TailwindCSS from './style/TailwindCSS.svelte';

  export let name;
</script>

<TailwindCSS />
<main>
  <h1 class="text-3xl font-bold">Hello {name}!</h1>
  <p>
    Visit the
    <a class="text-blue-600" href="https://svelte.dev/tutorial">
      Svelte tutorial
    </a>
    to learn how to build Svelte apps.
  </p>
</main>
