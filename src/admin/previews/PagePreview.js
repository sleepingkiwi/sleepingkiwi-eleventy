/** Disabling object shorthand:
 *  ------------------------------------------------------------------------------------------------
 *  we have to use function instead of arrows because `this` is lexically scoped in arrow funcs
 *  and comes out as undefined in our bundled code if we don't...
**/
/* eslint-disable object-shorthand */

// this feels a bit brittle maybe...
// we just want to be able to use the built in 11ty slug filter in our previews
// could optionally bring in slugify as dependancy and make our own filter
// https://github.com/11ty/eleventy/blob/master/src/Filters/Slug.js
import slugFilter from '@11ty/eleventy/src/Filters/Slug';

import markdownFilter from '../../filters/markdown';
import previewDummyContent from './dummy';

// this is brought in with a script tag in admin.njk and copied in .eleventy.js
// we could add it as a dependency if that feels too brittle...
// eslint-disable-next-line no-undef
const env = nunjucks.configure();

env.addFilter('markdownify', markdownFilter);
env.addFilter('slug', slugFilter);

const PagePreview = window.createClass({
  render: function render() {
    const { entry } = this.props;
    const context = ({
      title,
      permalink,
      hero,
      genericContentBlocks,
      transparentHeader,
      footerPartners,
      footerCTA,
    }) => ({
      title,
      permalink,
      hero,
      genericContentBlocks,
      transparentHeader,
      footerPartners,
      footerCTA,
      ...previewDummyContent,
    });
    const path = 'layouts/page.njk';
    const data = context(entry.get('data').toJS());
    const html = env.render(path, { ...data });


    // return <div dangerouslySetInnerHTML={{ __html: html }}/>

    return window.h(
      'div',
      { dangerouslySetInnerHTML: { __html: html } },
    );
  },
});

export default PagePreview;
