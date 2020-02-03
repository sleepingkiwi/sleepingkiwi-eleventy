// we can require markdown-it from 11ty
// eslint-disable-next-line import/no-extraneous-dependencies
const markdownIt = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
});

module.exports = (value) => markdownIt.render(value);
