module.exports = (eleventyConfig) => {
  // eleventyConfig.addPassthroughCopy('src/images')

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
    ],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
