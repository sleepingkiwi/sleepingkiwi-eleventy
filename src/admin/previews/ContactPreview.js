/** Disabling object shorthand:
 *  ------------------------------------------------------------------------------------------------
 *  we have to use function instead of arrows because `this` is lexically scoped in arrow funcs
 *  and comes out as undefined in our bundled code if we don't...
**/
/* eslint-disable object-shorthand */

import markdownFilter from '../../filters/markdown';
import previewDummyContent from './dummy';

// this is brought in with a script tag in admin.njk and copied in .eleventy.js
// we could add it as a dependency if that feels too brittle...
// eslint-disable-next-line no-undef
const env = nunjucks.configure();

env.addFilter('markdownify', markdownFilter);

const ContactPreview = window.createClass({
  render: function render() {
    const { entry } = this.props;
    const context = ({
      title,
      hero,
      formContentArea,
      genericContentBlocks,
      transparentHeader,
    }) => ({
      title,
      hero,
      formContentArea,
      genericContentBlocks,
      transparentHeader,
      ...previewDummyContent,
    });
    const path = 'layouts/contact.njk';
    const data = context(entry.get('data').toJS());
    const html = env.render(path, { ...data });


    // return <div dangerouslySetInnerHTML={{ __html: html }}/>

    return window.h(
      'div',
      { dangerouslySetInnerHTML: { __html: html } },
    );
  },
});

export default ContactPreview;
