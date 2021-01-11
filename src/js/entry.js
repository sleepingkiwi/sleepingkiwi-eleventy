/** imports
 *  ------------------------------------------------------------------------------------------------
**/
import { init as formsInit } from './forms';
import { init as genericIntersectionInit } from './generic-intersection';
import { soModern, soFunctional } from './test';
import CounterOne from './svelte/CounterOne.svelte';
import CounterTwo from './svelte/CounterTwo.svelte';


/** babel transpiles things...
 *  ------------------------------------------------------------------------------------------------
**/
console.log(`Oh. ${soModern()}`);
soFunctional().forEach((l) => console.log(l));


/** Init everything
 *  ------------------------------------------------------------------------------------------------
**/
// validation listeners for forms
formsInit();
// allowing elements to opt in to generic interesection observation by adding .js--wants-interestion
genericIntersectionInit();


/** Svelte
 *  ------------------------------------------------------------------------------------------------
 *  basic svelte integration
**/
const sOne = document.querySelector('.js--CounterOne');
const sTwo = document.querySelector('.js--CounterTwo');

if (sOne) {
  // eslint-disable-next-line no-unused-vars
  const one = new CounterOne({
    target: sOne,
  });
}

if (sTwo) {
  // eslint-disable-next-line no-unused-vars
  const two = new CounterTwo({
    target: sTwo,
  });
}
