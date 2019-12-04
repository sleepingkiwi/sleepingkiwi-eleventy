/** polyfills
 *  ------------------------------------------------------------------------------------------------
 *  if you don't need this, then delete it!
 *  -
 *  Most other required polyfills are bundled with our code by Core JS
 *  thanks to the Babel `preset-env`
 *  but fetch isn't polyfilled by Core JS: https://github.com/zloirock/core-js#missing-polyfills
 *  -
 *  we use the same fetch polyfill as https://github.com/preactjs/preact-cli
 *  preact-cli also polyfills promise but we let babel/core-js do that for us...
 *  -
 *  ref: https://github.com/developit/unfetch#usage-as-a-polyfill
 *  -
 *  Targetting /index:
 *  we are specifically pointing to /index below because we don't transpile code in node_modules
 *  as per this issue: https://github.com/developit/unfetch/issues/101 the module otherwise needs
 *  transpiling which it shouldn't!
**/
import 'unfetch/polyfill/index';
