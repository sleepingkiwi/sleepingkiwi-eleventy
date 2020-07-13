/** Config for Netlify CMS
 *  ------------------------------------------------------------------------------------------------
 *  this file is broken into a series of smaller imports so that it's not just one huge object.
 *  we import the config directly in /admin/admin.js
 *  by using this technique we can use javascript objects rather than the default YAML which gives
 *  greater potential for us to re-use things like the generic content blocks or the page settings
 *  which we ant to appear on every page.
**/


import { metaConfigGlobal } from './sections/meta';
import homeConfig from './sections/home';
import contactConfig from './sections/contact';
import siteDetailsConfig from './sections/siteDetails';
import socialAccountsConfig from './sections/socialAccounts';
import { genericPageConfig } from './sections/generic';

const config = {
  // ref https://www.netlifycms.org/docs/beta-features/#manual-initialization
  load_config_file: false,
  // refs: https://www.netlifycms.org/docs/configuration-options/
  // https://github.com/netlify/netlify-cms/blob/master/example/config.yml
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },

  // logo_url: https://your-site.com/images/logo.svg,

  site_url: 'https://sleepity.netlify.app/',
  display_url: 'https://sleepity.netlify.app/',

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
      preview_path: '{{slug}}',
      files: [
        // Home Page
        homeConfig,
        contactConfig,
      ], // files
    }, // END FIXED PAGES


    /** Custom Pages
     *  --------------------------------------------------------------------------------------------
     *  These are generic pages that can be added by CMS users
    **/
    {
      name: 'generic_page',
      label: 'Custom Page',
      folder: 'src/page',
      slug: '{{slug}}',
      preview_path: '{{slug}}',
      create: true,
      description: 'Empty pages with no fixed content. You can add whatever you want by stacking content blocks.',
      fields: [
        ...genericPageConfig,
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
            ...siteDetailsConfig,
          ], // fields
        }, // END SOCIAL


        /** Meta Data, SEO, Social defaults
         *  ----------------------------------------------------------------------------------------
         *  some of these are required. All can be overwritten by individual templates
        **/
        {
          label: 'Site meta, SEO, Social sharing defaults',
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
            ...socialAccountsConfig,
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


        /** Footer Sub Nav
         *  ----------------------------------------------------------------------------------------
         *  add content links to the footer.
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
