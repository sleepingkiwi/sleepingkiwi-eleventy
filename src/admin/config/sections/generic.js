/** generic repeatable content using blocks
 *  ------------------------------------------------------------------------------------------------
**/

const contentBlockOptions = [
  {
    label: 'Alternative Background Colour?',
    name: 'backgroundColour',
    widget: 'boolean',
    default: false,
    hint: 'Uses the secondary background colour for this block. It can be nice to alternate for contrast.',
  },
  {
    label: 'Background Image',
    name: 'backgroundImage',
    widget: 'extraImage',
    showDetails: true,
    required: false,
    hint: 'centrally cropped full bleed image. Optional.',
  },
];

const contentBlockContentTypes = {
  label: 'Content Types',
  name: 'content',
  widget: 'list',
  types: [
    {
      label: 'Header',
      name: 'header',
      widget: 'object',
      fields: [
        {
          label: 'Text alignment',
          name: 'textAlign',
          widget: 'select',
          options: ['left', 'center', 'right'],
          default: 'left',
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
      label: 'Text',
      name: 'text',
      widget: 'object',
      fields: [
        {
          label: 'Text alignment',
          name: 'textAlign',
          widget: 'select',
          options: ['left', 'center', 'right'],
          default: 'left',
        },
        {
          label: 'Text Content',
          name: 'text',
          widget: 'markdown',
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
      ],
    },
    {
      label: 'Image',
      name: 'image',
      widget: 'object',
      fields: [
        {
          label: 'Image',
          name: 'image',
          widget: 'extraImage',
          showDetails: true,
        },
      ],
    },
    {
      label: 'CTA',
      name: 'cta',
      widget: 'object',
      fields: [
        {
          label: 'CTA Text',
          name: 'cta',
          widget: 'string',
          required: false,
          hint: 'If you include CTA Text and CTA Link we will render a button under all of the other content in this column.',
        },
        {
          label: 'CTA Link',
          name: 'ctaURL',
          widget: 'string',
          required: false,
          hint: 'If you include CTA Text and CTA Link we will render a button under all of the other content in this column.',
        },
      ],
    },
  ],
};

const genericContentBlocks = [
  {
    label: 'Repeatable content blocks',
    name: 'genericInstructions',
    widget: 'instructions',
    flavour: 'divider',
    instructions: 'Add content in configurable blocks, either one or two columns wide. You can add as many blocks as you\'d like in this section.',
    required: false,
  },
  {
    label: 'Content Blocks',
    name: 'genericContentBlocks',
    widget: 'list',
    types: [
      {
        label: 'One Column',
        name: 'oneColumn',
        widget: 'object',
        fields: [
          ...contentBlockOptions,
          contentBlockContentTypes,
        ],
      },
      {
        label: 'Two Columns',
        name: 'twoColumns',
        widget: 'object',
        fields: [
          ...contentBlockOptions,
          {
            ...contentBlockContentTypes,
            label: 'Left Column Content',
            name: 'leftColumnContent',
          },
          {
            ...contentBlockContentTypes,
            label: 'Right Column Content',
            name: 'rightColumnContent',
          },
        ],
      },
    ],
  },
];

export default genericContentBlocks;
