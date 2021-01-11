<script>
  import { onDestroy, onMount } from 'svelte';

  import counterStore from './store--counter';

  let currentCount = 0;
  let unsubscribe;

  onMount(
    () => {
      unsubscribe = counterStore.subscribe(
        (state) => {
          currentCount = state;
        },
      );
    },
  );
  onDestroy(
    () => {
      unsubscribe();
    },
  );

  const reset = () => counterStore.reset();
  const increment = () => counterStore.increment();
</script>

<div
  class="CTA CTA--align-center"
>
  <button
    class="CTA__a use-background--foreground use-colour--foreground"
    on:click={increment}
  >
    <span class="CTA__text use-colour--background">
      {`clicked ${currentCount} time${currentCount === 1 ? '' : 's'}`}
    </span>
  </button>

  <button
    class="CTA__a use-background--foreground use-colour--foreground"
    on:click={reset}
  >
    <span class="CTA__text use-colour--background">
      {'reset'}
    </span>
  </button>
</div>
