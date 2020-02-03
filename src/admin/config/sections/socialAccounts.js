/** adding social accounts
 *  ------------------------------------------------------------------------------------------------
**/

const socialAccountsConfig = [
  {
    label: 'Details of your social media accounts',
    name: 'socialInstructions',
    widget: 'instructions',
    instructions: 'These are all optional. \nIncluding your details for a service will enable the social icon for that service in the site footer.',
    flavour: 'header',
    required: false,
  },
  {
    label: 'Your Twitter Handle',
    name: 'twitter',
    widget: 'string',
    required: false,
    hint: 'handle ony (not URL) - does not need to include the @ symbol',
    pattern: ['^[^@].+', 'please do not include the preceding @ symbol'],
  },
  {
    label: 'Your Instagram Handle',
    name: 'instagram',
    widget: 'string',
    required: false,
    hint: 'handle ony (not URL) - does not need to include the @ symbol',
    pattern: ['^[^@].+', 'please do not include the preceding @ symbol'],
  },
  {
    label: 'Full Facebook URL',
    name: 'facebook',
    widget: 'string',
    required: false,
    hint: 'should be the full URL to the Facebook profile/page you want to share',
  },
  {
    label: 'Full LinkedIn URL',
    name: 'linkedin',
    widget: 'string',
    required: false,
    hint: 'should be the full URL to the LinkedIn profile/page you want to share',
  },
  {
    label: 'Full Youtube URL',
    name: 'youtube',
    widget: 'string',
    required: false,
    hint: 'should be the full URL to the Youtube profile/page you want to share',
  },
];

export default socialAccountsConfig;
