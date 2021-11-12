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
    instructions: 'The slug is used as this page\'s URL. \nWhen you first save a post this will be generated automatically from the Title, however you can manually update it later. \nThese should be unique for each piece of content.',
    required: false,
  },
  {
    label: 'Slug',
    name: 'slug',
    widget: 'slug',
    hint: '⚠ Changing this field will change the URL for this page. Any existing links to the old URL will 404.',
    required: false,
    pattern: ['^(?!admin$)(?!bespoke$)(?!brochure$)(?!contact$)(?!index$)(?!style$)(?!Admin$)(?!Bespoke$)(?!Brochure$)(?!Contact$)(?!Index$)(?!Style$).*', 'The following slugs are not allowed: admin, bespoke, brochure, contact, index, style'],
  },
  /* {
    label: 'Unique ID',
    name: 'uidInstructions',
    widget: 'instructions',
    flavour: 'header',
    instructions: '🔥 You should not normally set or change this field',
    required: false,
  },
  {
    label: 'Unique ID',
    name: 'uid',
    widget: 'string',
    required: false,
  }, */
];

export default slugConfig;
