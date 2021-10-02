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
    instructions: 'The slug is used as this page\'s URL \nIt defaults to the title of the page but you can change it to whatever you want.\n- \n`admin` and `index` cannot be used as slugs. \nThis field only allows alphanumeric characters and hyphens.',
    required: false,
  },
  {
    label: 'Slug',
    name: 'slug',
    widget: 'slug',
    hint: '⚠ Changing this field will change the URL for this page. Any existing links to the old URL will 404.',
    // eslint-disable-next-line no-useless-escape
    pattern: ['^(?!admin$)(?!index$)(?!Admin$)(?!Index$)[A-Za-z-d]+', 'Please only use alphanumeric characters and hyphens. `admin` and `index` are forbidden'],
  },
];

export default slugConfig;
