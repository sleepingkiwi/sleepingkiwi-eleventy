module.exports = (eleventyConfig) => {
  // eleventyConfig.addPassthroughCopy('src/admin/config.yml');
  eleventyConfig.addPassthroughCopy('src/images');

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
