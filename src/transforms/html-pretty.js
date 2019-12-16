// eslint-disable-next-line import/no-extraneous-dependencies
const pretty = require('pretty');

module.exports = function htmlPrettyTransform(value, outputPath) {
  if (outputPath.endsWith('.html')) {
    const prettified = pretty(value, { ocd: true });
    return prettified;
  }
  return value;
};
