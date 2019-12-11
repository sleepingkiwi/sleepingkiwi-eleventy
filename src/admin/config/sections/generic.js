/** generic repeatable content using blocks
 *  ------------------------------------------------------------------------------------------------
**/

const genericContentBlocks = [
  {
    label: 'Repeatable content blocks',
    name: 'genericInstructions',
    widget: 'instructions',
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
            label: 'Image',
            name: 'image',
            widget: 'extraImage',
            showDetails: true,
            required: false,
          },
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
          {
            label: 'Text alignment',
            name: 'textAlign',
            widget: 'select',
            options: ['left', 'center', 'right'],
            required: false,
          },
          {
            label: 'Background Colour',
            name: 'backgroundColour',
            widget: 'colour',
            required: false,
          },
          {
            label: 'Background Image',
            name: 'backgroundImage',
            widget: 'extraImage',
            showDetails: true,
            required: false,
            hint: 'centrally cropped full bleed image. Optional.'
          },
        ]
      },
    ],
  },
];

export default genericContentBlocks;
