const data = {
  someContent: 'Joe',
  layout: 'layouts/base',
};

module.exports = ({ site, page }) => `<p>Content is ${data.someContent} for site: ${site.title}</p><p>file slug is ${page.fileSlug}</p>`;
