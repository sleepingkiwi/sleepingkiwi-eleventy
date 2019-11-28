class Test {
  // or `async data() {`
  // or `get data() {`
  data() {
    return {
      someContent: 'Joe',
      layout: 'layouts/base',
    };
  }

  render({ someContent, site }) {
    // will always be "Ted"
    return `<p>Content is ${someContent} for site: ${site.title}</p>`;
  }
}

module.exports = Test;
