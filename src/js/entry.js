/** imports
 *  ------------------------------------------------------------------------------------------------
**/
import { init as formsInit } from './forms';
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
