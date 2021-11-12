/** importing netlify cms
 *  ------------------------------------------------------------------------------------------------
 *  we used to do this here but now are bringing through un-touched from our node_modules folder.
 *  which saves a massive amount of time in building.
 *  - see /eleventy.js and /admin.njk for implementation
**/
// import './manualCommitGlobal';
// import CMS, { init } from 'netlify-cms';

import slugify from 'slugify';

/** our custom widgets
 *  ------------------------------------------------------------------------------------------------
 *  we should move these into their own repo.
**/
import ExtraImageControl from './widgets/ExtraImageControl';
import ColourControl from './widgets/ColourControl';
import ExtraImagePreview from './widgets/ExtraImagePreview';
import InstructionsControl from './widgets/InstructionsControl';
import RelationWrappedControl from './widgets/RelationWrappedControl';
import SlugControl from './widgets/SlugControl';

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
CMS.registerWidget('slug', SlugControl);


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


/** Hook in to the preSave event to pre-fill slugs and uids
 *  ------------------------------------------------------------------------------------------------
 *  We automatically generate slug and UID fields for entries that don't have them
 *  We ALSO automatically generate them the first time an entry is saved REGARDLESS of whether there
 *  is information in the CMS. This helps prevent duplicate UIDs when an entry is duplicated in CMS
**/
CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry }) => {
    // path is blank for brand new entries
    const path = entry.get('path');
    /** Pre fill empty slugs or first time saves
     *  --------------------------------------------------------------------------------------------
     *  use either the existing slug (for old pages)
     *  or slugify the title if there is one.
     *  -
     *  THIS IGNORES USER INPUT THE FIRST TIME A PAGE IS SAVED AND SLUGIFIES THE TITLE INSTEAD
     *  - helps to avoid duplicate slugs with page duplication...
    **/
    let slug = entry.get('data').get('slug');
    if ((!slug || !path) && (entry.get('slug') || entry.get('data').get('title'))) {
      slug = entry.get('slug') || slugify(entry.get('data').get('title'), { lower: true });
    }

    /** Generate unique IDs on first save
     *  --------------------------------------------------------------------------------------------
     *  used behind the scenes for relationship management
     *  - for duplicate pages a new uid is generated even though one already exists
    **/
    let uid = entry.get('data').get('uid');
    if (!uid || !path) {
      uid = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}-${slugify(entry.get('data').get('title') || Math.random().toString(36).substring(2), { lower: true, strict: true })}`;
    }

    return entry.get('data').set('slug', slug).set('uid', uid);
  },
});

/** start the cms
 *  ------------------------------------------------------------------------------------------------
**/
init({ config });
