/** Home page config
 *  ------------------------------------------------------------------------------------------------
**/
import { metaConfigPage } from './meta';

const homeConfig = {
  name: 'home',
  label: 'Homepage',
  delete: false,
  file: 'src/index.md',
  slug: '{{slug}}',
  create: false,
  fields: [
    {
      label: 'Home Page',
      name: 'homePageInstructions',
      widget: 'instructions',
      instructions: 'The home page has a fixed structure but you can customise the content in each block here.',
      required: false,
    },
    {
      label: 'Layout',
      name: 'layout',
      widget: 'hidden',
      default: 'layouts/base',
    },
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
      default: 'Home',
    },
    {
      label: 'Homepage Hero image',
      name: 'hero',
      widget: 'extraImage',
      showDetails: true,
      required: true,
      hint: 'Minimum width of 1,920px recommended. Anything above 2,500px will be cropped to 2,500px'
    },
    {
      label: 'Body',
      name: 'body',
      widget: 'markdown',
    },
    // we also include all of the social & meta options at the end
    ...metaConfigPage,
  ], // fields
};

export default homeConfig;
