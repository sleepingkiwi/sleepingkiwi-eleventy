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
  onDestroy(() => unsubscribe());
</script>

<header
  class="HeaderText
    HeaderText--align-center
    HeaderText--colour-dark
    use-colour--foreground"
>
  <h4>
    {`current count is: ${currentCount}`}
  </h4>
</header>
