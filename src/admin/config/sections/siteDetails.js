/** site details - name, logo, copyright etc.
 *  ------------------------------------------------------------------------------------------------
**/

const siteDetailsConfig = [
  {
    label: 'Global Site Details',
    name: 'socialInstructions',
    widget: 'instructions',
    instructions: 'Global info about the site, logo, copyright notice etc.',
    flavour: 'header',
    required: false,
  },
  {
    label: 'Site name',
    name: 'name',
    widget: 'string',
    required: true,
  },
  {
    label: 'Site Logo',
    name: 'logo',
    widget: 'object',
    fields: [
      {
        label: 'Changing the site logo.',
        name: 'logoInstructions',
        widget: 'instructions',
        instructions: 'If you have the site logo as an SVG made up of paths you can directly add the SVG data here. If you have provided SVG data any image will be used as a fallback so should be proportionally the same as your SVG. \nAlternatively you can leave the SVG field blank and just upload an image.',
        flavour: 'vanilla',
        required: false,
      },
      {
        label: 'SVG Logo',
        name: 'svg',
        widget: 'object',
        fields: [
          {
            label: 'Width',
            name: 'width',
            widget: 'string',
            required: true,
          },
          {
            label: 'Height',
            name: 'height',
            widget: 'string',
            required: true,
          },
          {
            label: 'View Box',
            name: 'viewBox',
            widget: 'string',
            required: true,
          },
          {
            label: 'Paths',
            name: 'paths',
            widget: 'list',
            fields: [
              {
                label: 'Path',
                name: 'path',
                widget: 'text',
                required: true,
                hint: 'full text from d="". no quotes needed',
              },
              {
                label: 'Fill Colour',
                name: 'fill',
                widget: 'string',
                required: false,
                hint: 'valid fill colour for this path',
              },
              {
                label: 'Additional Attributes',
                name: 'attr',
                widget: 'string',
                required: false,
                hint: 'any other attributes you want to appear on this path. i.e. stroke="black" stroke-linecap="round" stroke-dasharray="5,10,5"',
              },
            ],
          },
        ],
      },
      {
        label: 'Image/Fallback Logo',
        name: 'fallback',
        widget: 'extraImage',
        showDetails: true,
        hint: 'If you provide an SVG this is an optional fallback. It should match dimensions. If you do not provide an SVG we willjust use the image.',
      },
    ],
  },
  {
    label: 'Copyright Text',
    name: 'copyright',
    widget: 'markdown',
    required: true,
    hint: 'shown on the footer of every page.',
    default: '© Copyright. All Rights Reserved.',
  },
];

export default siteDetailsConfig;
