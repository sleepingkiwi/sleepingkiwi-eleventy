/** Reference store
 *  ------------------------------------------------------------------------------------------------
 *  For some good advice on best practices see:
 *  https://svelte.dev/tutorial/custom-stores
 *  https://medium.com/better-programming/build-better-svelte-stores-8c70db038dd2
 *  -
 *  localstorage ref:
 *  https://stackoverflow.com/questions/56488202/how-to-persist-svelte-store
 *  -
 *  to update for handling async look at implementation of:
 *  https://github.com/n0n3br/svelte-createstore
 *  and at the async derived methods:
 *  https://svelte.dev/docs#derived
 *  particularly: https://github.com/sveltejs/svelte/issues/2118#issuecomment-492537687
**/
import { writable } from 'svelte/store';

const store = writable(
  parseInt(localStorage.getItem('store--counter') || 0, 10),
);
store.subscribe((state) => localStorage.setItem('store--counter', state));

const reset = () => store.set(0);
const increment = () => store.update((state) => state + 1);

// we export our own object
// which allows us to control store business logic away from our components
// it also means we can exclude `set` and `update` methods - we never want them called directly
const counterStore = {
  subscribe: store.subscribe,
  reset,
  increment,
};
export default counterStore;
