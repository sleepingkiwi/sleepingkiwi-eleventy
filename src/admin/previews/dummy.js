/** Dummy content
 *  ------------------------------------------------------------------------------------------------
 *  to give some structure in the preview renderings which cannot otherwise access global data
 *  that 11ty uses when building templates...
**/

const previewDummyContent = {
  site: {
    name: 'LOGO',
    copyright: 'Copyright text here...',
  },
  navigation: {
    items: [
      {
        url: '#',
        text: 'Example',
      },
      {
        url: '#',
        text: 'Nav',
      },
      {
        url: '#',
        text: 'Links',
      },
    ],
  },
  subnavigation: {
    items: [
      {
        url: '#',
        text: 'Example',
      },
      {
        url: '#',
        text: 'Links',
      },
    ],
  },
};

export default previewDummyContent;
