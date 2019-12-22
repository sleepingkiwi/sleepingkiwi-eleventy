
const htmlMinTransform = require('./src/transforms/html-min.js');
const htmlPrettyTransform = require('./src/transforms/html-pretty.js');

module.exports = (eleventyConfig) => {
  // copy these things to dist even though they are not templates!
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/fonts');

  // transforms modify a template’s output
  // https://www.11ty.dev/docs/config/#transforms
  // choose whether to minify html output or make it pretty
  // Minify
//eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  // or
  // Prettify
  eleventyConfig.addTransform('htmlpretty', htmlPrettyTransform);

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
