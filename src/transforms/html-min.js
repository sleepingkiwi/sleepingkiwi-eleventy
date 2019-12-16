// eslint-disable-next-line import/no-extraneous-dependencies
const htmlmin = require('html-minifier');

module.exports = function htmlMinTransform(value, outputPath) {
  if (outputPath.endsWith('.html')) {
    const minified = htmlmin.minify(value, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: true,
    });
    return minified;
  }
  return value;
};
