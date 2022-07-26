/** imports
 *  ------------------------------------------------------------------------------------------------
**/
import { init as formsInit } from './forms';
import { init as genericIntersectionInit } from './generic-intersection';
import { soModern, soFunctional } from './test';
import CounterOne from './svelte/CounterOne.svelte';
import CounterTwo from './svelte/CounterTwo.svelte';

/** Init everything that interacts with DOM (after dom is ready)
 *  ------------------------------------------------------------------------------------------------
**/
const init = () => {
  // validation listeners for forms
  formsInit();
  // allowing elements to opt in to generic interesection observation
  // by adding .js--wants-interestion
  genericIntersectionInit();

  /** babel transpiles things...
   *  ----------------------------------------------------------------------------------------------
  **/
  console.log(`Oh. ${soModern()}`);
  soFunctional().forEach((l) => console.log(l));

  /** Svelte
   *  ----------------------------------------------------------------------------------------------
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
};

if (document.readyState === 'loading') { // Loading hasn't finished yet
  // DOMContentLoaded can sometimes fire very late...
  // it fires after all defer scripts are loaded
  // however the readystatechange changes to interactive BEFORE defer scripts fire...
  // document.addEventListener('DOMContentLoaded', init, false);
  document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'interactive') {
      init();
    }
    // event.target.readyState === 'complete' is available and equivelant to DOMContentLoaded
  });
} else { // readystate is already past loading
  init();
}
