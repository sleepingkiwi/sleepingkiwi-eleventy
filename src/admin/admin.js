/** importing netlify cms
 *  ------------------------------------------------------------------------------------------------
 *  we used to do this here but now are bringing through un-touched from our node_modules folder.
 *  which saves a massive amount of time in building.
 *  - see /eleventy.js and /admin.njk for implementation
**/
// import './manualCommitGlobal';
// import CMS, { init } from 'netlify-cms';


/** our custom widgets
 *  ------------------------------------------------------------------------------------------------
 *  we should move these into their own repo.
**/
import ExtraImageControl from './widgets/ExtraImageControl';
import ColourControl from './widgets/ColourControl';
import ExtraImagePreview from './widgets/ExtraImagePreview';
import InstructionsControl from './widgets/InstructionsControl';
import RelationWrappedControl from './widgets/RelationWrappedControl';

// and custom previews
import PagePreview from './previews/PagePreview';
import HomePreview from './previews/HomePreview';
import ContactPreview from './previews/ContactPreview';


/** our cms configuration as a JS object
 *  ------------------------------------------------------------------------------------------------
**/
import config from './config/config';


/** netlify cms config.
 *  ------------------------------------------------------------------------------------------------
 *  We are using manual init: https://www.netlifycms.org/docs/beta-features/#manual-initialization
 *  this means we can pass our config as a js object which is nice because we can break it down.
 *  -
 *  we set a global flag in /admin.njk before the CMS comes in to enable this
**/
const { CMS, initCMS: init } = window;


/** register our custom widget
 *  ------------------------------------------------------------------------------------------------
**/
CMS.registerWidget('extraImage', ExtraImageControl, ExtraImagePreview);
CMS.registerWidget('relationWrapped', RelationWrappedControl);
CMS.registerWidget('colour', ColourControl);
CMS.registerWidget('instructions', InstructionsControl);


/** register preview bits
 *  ------------------------------------------------------------------------------------------------
**/
CMS.registerPreviewTemplate('generic_page', PagePreview);
CMS.registerPreviewTemplate('index', HomePreview);
CMS.registerPreviewTemplate('contact', ContactPreview);


/** register styles for the preview editor
 *  ------------------------------------------------------------------------------------------------
 *  because file names are cache busted we make the file name available as a global in
 *  admin.njk
**/
// eslint-disable-next-line no-undef
CMS.registerPreviewStyle(_global_mainStylePath);

// console.log(CMS);

/** start the cms
 *  ------------------------------------------------------------------------------------------------
**/
init({ config });
