/** meta/seo/social sharing config
 *  ------------------------------------------------------------------------------------------------
 *  this is included on every page and also in the global site options.
 *  on pages all fields are optional but in the global settings some fields are required.
 *  we export two configs for this reason.
**/

const metaConfig = (forGlobal) => [
  {
    label: '',
    name: 'metaInstructions',
    widget: 'instructions',
    instructions: forGlobal ? 'These are the default settings which will be used on every page that does not set it\'s own values for these fields.' : 'These fields are all optional but it is recommended that you fill them in where possible. Any field you leave blank will fallback to the values set in the Global Settings',
    required: false,
  },
  {
    label: `${forGlobal ? 'site' : 'page'} title`,
    name: 'title',
    widget: 'string',
    hint: `The title of this ${forGlobal ? 'site' : 'page'}, shown in search engines and when shared to social media.`,
    required: forGlobal,
  },
  {
    label: `${forGlobal ? 'site' : 'page'} description`,
    name: 'description',
    widget: 'text',
    hint: `A description of this ${forGlobal ? 'site' : 'page'}, shown in search engines and when shared to social media. Be descriptive but try to stay between 50-160 characters.`,
    required: forGlobal,
  },
  {
    label: 'Social Image',
    name: 'socialImage',
    widget: 'extraImage',
    hint: `Image that is used when this ${forGlobal ? 'site' : 'page'} is shared on social media. It should ideally be 1200 x 630px.`,
    required: false,
  },
  {
    label: `${forGlobal ? 'site' : 'page'} title`,
    name: 'canonical',
    widget: 'string',
    hint: '🛑 You probably don\'t need to set this. You should only set this if the canonical URL of this page is different to it\'s permalink.',
    required: false,
  },
];

export const metaConfigPage = [
  {
    label: 'Page details, SEO, Social sharing',
    name: 'meta',
    widget: 'object',
    fields: metaConfig(false),
    required: false,
  },
];

export const metaConfigGlobal = metaConfig(true);
