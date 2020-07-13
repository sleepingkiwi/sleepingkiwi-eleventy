const rssPlugin = require('@11ty/eleventy-plugin-rss');

const htmlMinTransform = require('./src/transforms/html-min.js');
const htmlPrettyTransform = require('./src/transforms/html-pretty.js');
const markdownFilter = require('./src/filters/markdown.js');

module.exports = (eleventyConfig) => {
  // copy these things to dist even though they are not templates!
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/fonts');

  /** Pass through a couple of scripts from node_modules directly
   *  ----------------------------------------------------------------------------------------------
  **/
  // nunjucks for use in our previews.
  // uses the same version as eleventy. Maybe a bit fragile...
  // method from: https://github.com/hankchizljaw/hylia
  eleventyConfig.addPassthroughCopy({
    'node_modules/nunjucks/browser/nunjucks-slim.js': 'vendors/nunjucks/browser/nunjucks-slim.js',
  });

  // netlify-cms
  // so that it skips our webpack build process and we can use directly
  eleventyConfig.addPassthroughCopy({
    'node_modules/netlify-cms/dist/netlify-cms.js': 'vendors/netlify-cms/dist/netlify-cms.js',
  });

  // transforms modify a template’s output
  // https://www.11ty.dev/docs/config/#transforms
  // choose whether to minify html output or make it pretty
  // Minify
//eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  // or
  // Prettify
  eleventyConfig.addTransform('htmlpretty', htmlPrettyTransform);


  /** Filters
   *  ----------------------------------------------------------------------------------------------
   *  ref: https://www.11ty.dev/docs/filters/
  **/
  // adding a markdown filter to transform markdown in templates:
  eleventyConfig.addFilter('markdownify', markdownFilter);


  /** Plugins
   *  ----------------------------------------------------------------------------------------------
  **/
  // https://www.11ty.dev/docs/plugins/rss/
  // used primarily to add dates in the rss feed for the moment
  eleventyConfig.addPlugin(rssPlugin);


  // enable deep merging of data
  // allows overriding individual properties of an object
  // for example overwrite meta.title but keep the default meta.image
  // opt out with override: i.e. override:meta{title:'example'} would not get default meta.image
  // ref: https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);


  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: '_data',
    },
    passthroughFileCopy: true,
    templateFormats: [
      '11ty.js',
      'njk',
      'md',
    ],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
