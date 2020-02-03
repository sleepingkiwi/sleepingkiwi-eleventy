/** Home page config
 *  ------------------------------------------------------------------------------------------------
**/
import pageSettings from './pageSettings';
import genericContentBlocks from './generic';

const homeConfig = {
  name: 'index',
  label: 'Homepage',
  delete: false,
  file: 'src/index.md',
  slug: 'index',
  create: false,
  fields: [
    {
      label: 'Home Page',
      name: 'homePageInstructions',
      widget: 'instructions',
      flavour: 'header',
      instructions: 'The home page has an example of fixed structure but you can customise the content in each block here.',
      required: false,
    },
    {
      label: 'Layout',
      name: 'layout',
      widget: 'hidden',
      default: 'layouts/home',
    },
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
      default: 'Home',
    },
    {
      label: 'Hero Image and Page Title',
      name: 'hero',
      widget: 'object',
      fields: [
        {
          label: 'Hero Image',
          name: 'hero',
          widget: 'extraImage',
          showDetails: true,
          required: true,
          hint: 'Minimum width of 1,920px recommended. Anything above 3,000px will be cropped to 3,000px',
        },
        {
          label: 'Pre-Header',
          name: 'preHeader',
          widget: 'string',
          required: false,
          hint: 'smaller text that appears above the header',
        },
        {
          label: 'Header',
          name: 'header',
          widget: 'string',
          required: false,
        },
      ],
    },
    {
      label: 'Home Page Content: One',
      name: 'homePageInstructionsOne',
      widget: 'instructions',
      flavour: 'divider',
      instructions: 'First content block that is displayed on the home page.',
      required: false,
    },
    {
      label: 'First content area',
      name: 'firstContentArea',
      widget: 'object',
      fields: [
        {
          label: 'Pre-Header',
          name: 'preHeader',
          widget: 'string',
          required: false,
          hint: 'smaller text that appears above the header',
        },
        {
          label: 'Header',
          name: 'header',
          widget: 'string',
          required: false,
        },
        {
          label: 'Text Content',
          name: 'text',
          widget: 'markdown',
          required: false,
          buttons: [
            'bold',
            'italic',
            'code',
            'link',
            'heading-one',
            'heading-two',
            'heading-three',
            'heading-four',
            'heading-five',
            'heading-six',
            'quote',
            'code-block',
            'bulleted-list',
            'numbered-list',
          ],
        },
        {
          label: 'CTA Text',
          name: 'cta',
          widget: 'string',
          required: false,
          hint: 'CTA is optional, but recommended.',
        },
        {
          label: 'CTA Link',
          name: 'ctaURL',
          widget: 'string',
          required: false,
          hint: 'CTA is optional, but recommended. If you leave this field blank but provide CTA text the button will open a popup to the CTA/Brochure popup configured in the Fixed Pages menu.',
        },
        {
          label: 'Image',
          name: 'image',
          widget: 'extraImage',
          showDetails: true,
          hint: 'Right aligned image. Designs are portrait in 4:5 ratio',
        },
      ],
    },
    // we can add generic content here too
    ...genericContentBlocks,
    // we also include all of the regular page settings!
    ...pageSettings,
  ], // fields
};

export default homeConfig;
