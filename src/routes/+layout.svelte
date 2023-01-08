<script lang="ts">
  import '../app.postcss';
</script>

<main>
  <slot />
</main>

<style lang="postcss">
  main {
    @apply p-2;
  }
</style>
