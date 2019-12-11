/** ExtraImage preview component
 *  ------------------------------------------------------------------------------------------------
 *  we're using the global createClass exposed by netlify-cms so we don't have to import our
 *  own version of React...
 *  -
 *  Disabling object shorthand:
 *  we have to use function istead of arrows because `this` is lexically scoped in arrows
 *  and comes out as undefined in our bundled code if we don't...
 *  -
 *  eventually these widgets can live in their own repo with a proper React dependency
**/

const ExtraImagePreview = window.createClass({
  // eslint-disable-next-line object-shorthand
  render: function render() {
    const imageWidget = window.CMS.getWidget('image').preview;

    // custom previews with a value of object are treated weirdly
    // see: https://github.com/netlify/netlify-cms/issues/2150 for full details
    const value = this.props.value || this.props.entry.get('data').get(this.props.field.get('name')).toJS();

    if (!value.src || value.src === '') {
      return null;
    }

    return window.h(
      'img',
      {
        src: this.props.getAsset(value.src || ''),
        style: {
          maxWidth: '100%',
          display: 'block',
          marginBottom: '12px',
        },
        alt: value.alt || '',
      },
    );
  },
});

export default ExtraImagePreview;
