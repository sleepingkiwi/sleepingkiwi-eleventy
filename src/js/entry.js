/** imports
 *  ------------------------------------------------------------------------------------------------
**/
import { init as formsInit } from './forms';
import { init as genericIntersectionInit } from './generic-intersection';
import { soModern, soFunctional } from './test';


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
