/** Home page config
 *  ------------------------------------------------------------------------------------------------
**/
import pageSettings from './pageSettings';
import genericContentBlocks from './generic';

const contactConfig = {
  name: 'contact',
  label: 'Contact',
  delete: false,
  file: 'src/contact.md',
  slug: '{{slug}}',
  create: false,
  fields: [
    {
      label: 'Contact Page',
      name: 'contactPageInstructions',
      widget: 'instructions',
      flavour: 'header',
      instructions: 'Content for the contact page....',
      required: false,
    },
    {
      label: 'Layout',
      name: 'layout',
      widget: 'hidden',
      default: 'layouts/contact',
    },
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
      default: 'Contact',
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
      label: 'Contact Form Block',
      name: 'contactInstructionsOne',
      widget: 'instructions',
      flavour: 'divider',
      instructions: 'You cannot customise the form functionality itself from here but can change the text, labels and images surrounding it.',
      required: false,
    },
    {
      label: 'Form content area',
      name: 'formContentArea',
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
            'bulleted-list',
            'numbered-list',
          ],
          editorComponents: [
            'code-block',
          ],
        },
        {
          label: 'Form Field Labels',
          name: 'labels',
          widget: 'object',
          required: false,
          fields: [
            {
              label: 'Customise Form Labels',
              name: 'contactInstructionsLabels',
              widget: 'instructions',
              flavour: 'vanilla',
              instructions: 'Completely optional, but you can overwrite the labels given to each form field here.',
              required: false,
            },
            {
              label: 'Name',
              name: 'name',
              default: 'Name',
              widget: 'string',
              required: false,
            },
            {
              label: 'Email',
              name: 'email',
              default: 'Email',
              widget: 'string',
              required: false,
            },
            {
              label: 'Subject',
              name: 'subject',
              default: 'Subject',
              widget: 'string',
              required: false,
            },
            {
              label: 'Message',
              name: 'message',
              default: 'Message',
              widget: 'string',
              required: false,
            },
            {
              label: 'Send Message',
              name: 'sendMessage',
              default: 'Send Message',
              widget: 'string',
              required: false,
            },
          ],
        },
      ],
    },
    ...genericContentBlocks,
    // we also include all of the regular page settings!
    ...pageSettings,
  ], // fields
};

export default contactConfig;
