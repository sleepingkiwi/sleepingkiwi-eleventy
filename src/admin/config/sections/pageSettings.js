/** page settings - things that appear on pretty much every page!
 *  ------------------------------------------------------------------------------------------------
**/

import { metaConfigPage } from './meta';

const pageSettings = [
  {
    label: 'Page Settings & SEO',
    name: 'genericPageSettingsInstructions',
    widget: 'instructions',
    flavour: 'divider',
    instructions: 'Settings for this page that affect the overall appearence or overwrite global defaults.',
    required: false,
  },
  {
    label: 'Transparent Header?',
    name: 'transparentHeader',
    widget: 'boolean',
    default: true,
    hint: 'Set to false if you would like a solid background behind the header on this page.',
  },
  // include all of the social & meta options at the end
  ...metaConfigPage,
];

export default pageSettings;
