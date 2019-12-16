// TODO: break this into modules...

import { metaConfigGlobal } from './sections/meta';
import pageSettings from './sections/pageSettings';
import homeConfig from './sections/home';
import genericContentBlocks from './sections/generic';

const config = {
  // ref https://www.netlifycms.org/docs/beta-features/#manual-initialization
  load_config_file: false,
  // refs: https://www.netlifycms.org/docs/configuration-options/
  // https://github.com/netlify/netlify-cms/blob/master/example/config.yml
  backend: {
    name: 'git-gateway',
    branch: 'master',
  },

  // logo_url: https://your-site.com/images/logo.svg,

  site_url: 'https://sleeping.kiwi/sleepingkiwi-eleventy',
  display_url: 'https://sleeping.kiwi/sleepingkiwi-eleventy',

  // Media files will be stored in the repo under this dir
  // however because we use cloudinary currently this is ignored
  media_folder: 'src/images',
  // the built site has an uploads directory at root
  public_folder: 'images',

  // comment this out to upload images directly to github
  media_library: {
    name: 'cloudinary',
    output_filename_only: false,
    config: {
      cloud_name: 'sleepingkiwi',
      api_key: '673936733892368',
    },
  },

  // optional, enables publishing workflow
  publish_mode: 'editorial_workflow',

  // All of our site content!
  collections: [
    /** Fixed Pages
     *  --------------------------------------------------------------------------------------------
     *  These are the pages required by the site that require config
     *  they cannot be deleted in the CMS
    **/
    {
      name: 'pages',
      label: 'Fixed Pages',
      description: 'These are the pages required by the site that you can configure',
      files: [
        // Home Page
        homeConfig,
      ], // files
    }, // END FIXED PAGES


    /** Custom Pages
     *  --------------------------------------------------------------------------------------------
     *  These are generic pages that can be added by CMS users
    **/
    {
      name: 'generic_pages',
      label: 'Custom Pages',
      folder: 'src/pages',
      slug: '{{slug}}',
      preview_path: 'pages/{{slug}}',
      create: true,
      description: 'Empty pages with no fixed content. You can add whatever you want by stacking content blocks.',
      fields: [
        {
          label: 'Custom Page',
          name: 'genericPageInstructions',
          widget: 'instructions',
          instructions: 'This page can contain whatever you want!',
          flavour: 'header',
          required: false,
        },
        {
          label: 'Layout',
          name: 'layout',
          widget: 'hidden',
          default: 'layouts/base.njk',
        },
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Permalink Override (Pattern: /your-slug/index.html)',
          name: 'permalink',
          widget: 'string',
          required: false,
        },
        {
          label: 'Hero image',
          name: 'hero',
          widget: 'extraImage',
          showDetails: true,
          required: true,
          hint: 'Minimum width of 1,920px recommended. Anything above 2,500px will be cropped to 2,500px',
        },
        ...genericContentBlocks,
        // include general page settings
        ...pageSettings,
      ], // fields
    }, // END CUSTOM PAGES


    /** Global Settings
     *  --------------------------------------------------------------------------------------------
     *  settings that apply globally or to large areas of the site.
     *  usually these are written as json to the _data dir
    **/
    {
      label: 'Global Settings',
      name: 'globals',
      description: 'Settings that apply globally or that do not belong to individual pages',
      editor: {
        preview: false,
      },
      files: [
        /** Site details
         *  ----------------------------------------------------------------------------------------
         *  Global info about the site, logo, copyright notice etc.
        **/
        {
          label: 'Site Details',
          name: 'site_details',
          delete: false,
          file: 'src/_data/site.json',
          fields: [
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
              label: 'Copyright Text',
              name: 'copyright',
              widget: 'markdown',
              required: true,
              hint: 'shown on the footer of every page.',
              default: '© Copyright. All Rights Reserved.',
            },
          ], // fields
        }, // END SOCIAL


        /** Meta Data, SEO, Social defaults
         *  ----------------------------------------------------------------------------------------
         *  some of these are required. All can be overwritten by individual templates
        **/
        {
          label: 'Site details, SEO, Social sharing defaults',
          name: 'meta',
          delete: false,
          file: 'src/_data/meta.json',
          fields: [
            ...metaConfigGlobal,
          ],
        },


        /** Social Accounts
         *  ----------------------------------------------------------------------------------------
         *  For using wherever we end up using them
        **/
        {
          label: 'Social Media',
          name: 'social_media',
          delete: false,
          file: 'src/_data/social.json',
          fields: [
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
          ], // fields
        }, // END SOCIAL


        /** Primary Nav
         *  ----------------------------------------------------------------------------------------
         *  add content links to the header and footer nav.
        **/
        {
          label: 'Primary Navigation',
          name: 'nav',
          delete: false,
          file: 'src/_data/navigation.json',
          fields: [
            {
              label: 'Links for the primary navigation',
              name: 'navInstructions',
              widget: 'instructions',
              instructions: 'Add links for site navigation.',
              flavour: 'header',
              required: false,
            },
            {
              label: 'Items',
              name: 'items',
              widget: 'list',
              fields: [
                {
                  label: 'Text',
                  name: 'text',
                  widget: 'string',
                },
                {
                  label: 'Url',
                  name: 'url',
                  widget: 'string',
                },
                {
                  label: 'Is url to external site?',
                  name: 'external',
                  widget: 'boolean',
                  required: false,
                },
              ], // fields
            },
          ], // fields
        }, // END PRIMARY NAV


        /** Header Nav
         *  ----------------------------------------------------------------------------------------
         *  add content links to the header.
        **/
        {
          label: 'Footer Sub Navigation',
          name: 'footer_nav',
          delete: false,
          file: 'src/_data/subnavigation.json',
          fields: [
            {
              label: 'Links for the sub navigation',
              name: 'navInstructions',
              widget: 'instructions',
              instructions: 'This nav block appears right at the bottom of the site, under the copyright notice. It is intended for links to privacy policies, t&c\'s etc.',
              flavour: 'header',
              required: false,
            },
            {
              label: 'Items',
              name: 'items',
              widget: 'list',
              fields: [
                {
                  label: 'Text',
                  name: 'text',
                  widget: 'string',
                },
                {
                  label: 'Url',
                  name: 'url',
                  widget: 'string',
                },
                {
                  label: 'Is url to external site?',
                  name: 'external',
                  widget: 'boolean',
                  required: false,
                },
              ], // fields
            },
          ], // fields
        }, // END HEADER NAV
      ], // files
    }, // END GLOBAL SETTINGS
  ], // collections
};

export default config;
