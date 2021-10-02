/** Configure slug for collections that allow it!
 *  ------------------------------------------------------------------------------------------------
 *  Fixed pages generally don't allow the slug to be changed.
 *  Custom pages or collections generally do!
 *  -
 *  Where relevant, our 11ty templates use this field to generate permalinks
 *  The Netlify CMS config also uses this field to generate preview links
**/

export const slugConfig = [
  // allow slug changes
  {
    label: 'Slug/URL',
    name: 'slugInstructions',
    widget: 'instructions',
    flavour: 'header',
    instructions: 'The slug is used as this page\'s URL. \nIf you leave this blank it will be generated automatically from the Title.',
    required: false,
  },
  {
    label: 'Slug',
    name: 'slug',
    widget: 'slug',
    hint: '⚠ Changing this field will change the URL for this page. Any existing links to the old URL will 404.',
    // eslint-disable-next-line no-useless-escape
    pattern: ['^(?!admin$)(?!index$)(?!Admin$)(?!Index$).*', '`admin` and `index` are forbidden'],
    required: false,
  },
];

export default slugConfig;
