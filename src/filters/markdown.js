// we can require markdown-it from 11ty
// eslint-disable-next-line import/no-extraneous-dependencies
const markdownIt = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
});

// rel noopener on all links
// TODO - check own URL and only apply to external?
// https://github.com/markdown-it/markdown-it/issues/46
const fallbackFunc = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
const oldRender = markdownIt.renderer.rules.link_open || fallbackFunc;

markdownIt.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(['rel', 'noopener']);
  return oldRender(tokens, idx, options, env, self);
};


module.exports = (value) => markdownIt.render(value);
