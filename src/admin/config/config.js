// TODO: break this into modules...

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
              label: 'SEO Meta Title',
              name: 'metaTitle',
              widget: 'string',
              required: false,
              hint: 'Default title which shows in the browser tab/search engines. You can overwrite this individually for each page.',
            },
            {
              label: 'SEO Meta Description',
              name: 'metaDesc',
              widget: 'string',
              required: false,
            },
            {
              label: 'Post Feed Heading',
              name: 'postsHeading',
              widget: 'string',
              default: 'Latest posts',
            },
            {
              label: 'Archive Link Text',
              name: 'archiveButtonText',
              widget: 'string',
              default: 'See all posts',
            },
            {
              label: 'Social Image',
              name: 'socialImage',
              widget: 'image',
              required: false,
            },
            {
              label: 'Body',
              name: 'body',
              widget: 'markdown',
            },
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
          label: 'SEO Meta Title',
          name: 'metaTitle',
          widget: 'string',
          required: false,
        },
        {
          label: 'SEO Meta Description',
          name: 'metaDesc',
          widget: 'string',
          required: false,
        },
        {
          label: 'Social Image',
          name: 'socialImage',
          widget: 'image',
          required: false,
        },
        {
          label: 'Body',
          name: 'body',
          widget: 'markdown',
        },
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
      files: [
        /** Site Data
         *  ----------------------------------------------------------------------------------------
         *  general site info and defaults for social media info
        **/
        {
          label: 'Site Data',
          name: 'site_data',
          delete: false,
          file: 'src/_data/site.json',
          fields: [
            {
              label: 'Site Name',
              name: 'title',
              widget: 'string',
            },
            {
              label: 'Site Url',
              name: 'url',
              widget: 'string',
            },
            {
              label: 'Author Name',
              name: 'authorName',
              widget: 'string',
            },
            {
              label: 'Author Email Address',
              name: 'authorEmail',
              widget: 'string',
            },
            {
              label: 'Author Twitter Handle',
              name: 'authorHandle',
              widget: 'string',
              required: false,
            },
            {
              label: 'Footer Short Description',
              name: 'shortDesc',
              widget: 'string',
            },
            {
              label: 'Maximum Posts Per Page',
              name: 'maxPostsPerPage',
              widget: 'number',
              default: 5,
            },
            {
              label: 'Show Theme Credit',
              name: 'showThemeCredit',
              widget: 'boolean',
              default: true,
            },
            {
              label: 'Enable Third Party Comments Area',
              name: 'enableThirdPartyComments',
              widget: 'boolean',
              default: false,
            },
            {
              label: 'Payment Pointer (Web Monetization: https://bit.ly/2kTRI1b)',
              name: 'paymentPointer',
              widget: 'string',
            },
            {
              label: 'Favicon path (EG: /images/favicon.png)',
              name: 'faviconPath',
              widget: 'string',
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
