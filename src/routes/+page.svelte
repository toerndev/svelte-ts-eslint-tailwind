<script lang="ts">
  import Counter from '$lib/Counter.svelte';
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>
    <span class="welcome">
      <picture>
        <source srcset="svelte-welcome.webp" type="image/webp" />
        <img src="svelte-welcome.png" alt="Welcome" />
      </picture>
    </span>

    to your new<br />SvelteKit app
  </h1>

  <h2>
    try editing <strong>src/routes/+page.svelte</strong>
  </h2>

  <Counter />
</section>

<style lang="postcss">
  section {
    @apply flex flex-1 flex-col items-center justify-center;
  }

  h1 {
    @apply w-full;
  }

  .welcome {
    @apply relative block h-0 w-full;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    @apply absolute top-0 block h-full w-full;
  }
</style>
