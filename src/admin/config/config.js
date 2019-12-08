// TODO: break this into modules...

import { metaConfigPage, metaConfigGlobal } from './sections/meta';

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
  media_folder: 'src/images',
  // the built site has an uploads directory at root
  public_folder: 'images',

  // media_library:
  //   name: cloudinary
  //   output_filename_only: false // we actually want this to be true but it breaks previews.
  //   // see: https://github.com/netlify/netlify-cms/issues/1934
  //   // our workaround: we split the string in preact.
  //   config:
  //     cloud_name: sleepingkiwi
  //     api_key: 673936733892368

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
        /** Home Page
         *  ----------------------------------------------------------------------------------------
        **/
        {
          name: 'home',
          label: 'Homepage',
          delete: false,
          file: 'src/index.md',
          slug: '{{slug}}',
          create: false,
          fields: [
            {
              label: 'Layout',
              name: 'layout',
              widget: 'hidden',
              default: 'layouts/base',
            },
            {
              label: 'Title',
              name: 'title',
              widget: 'string',
            },
            {
              label: 'Advanced image test',
              name: 'advancedImage',
              widget: 'extraImage',
              hint: 'testing functionality...',
              required: true,
            },
            {
              label: 'Body',
              name: 'body',
              widget: 'markdown',
            },
            // include all of the social & meta options at the end
            ...metaConfigPage,
          ], // fields
        }, // END HOME PAGE
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
      fields: [
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
          label: 'Body',
          name: 'body',
          widget: 'markdown',
        },
        // include all of the social & meta options at the end
        ...metaConfigPage,
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
      files: [
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
              label: 'Your Twitter Handle',
              name: 'twitter',
              widget: 'string',
              required: false,
              hint: 'does not need to include the @ symbol',
              pattern: ['^[^@].+', 'please do not include the preceding @ symbol'],
            },
          ], // fields
        }, // END SITE DATA


        /** Header Nav
         *  ----------------------------------------------------------------------------------------
         *  add content links to the header.
        **/
        {
          label: 'Header Navigation',
          name: 'nav',
          delete: false,
          file: 'src/_data/navigation--primary.json',
          fields: [
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
