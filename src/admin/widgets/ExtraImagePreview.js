/** ExtraImage preview component
 *  ------------------------------------------------------------------------------------------------
 *  we're using the global createClass exposed by netlify-cms so we don't have to import our
 *  own version of React...
 *  -
 *  Disabling object shorthand:
 *  we have to use function istead of arrows because `this` is lexically scoped in arrows
 *  and comes out as undefined in our bundled code if we don't...
 *  eventually thesewidgets can live in their own repo with a proper React dependency
**/

const ExtraImagePreview = window.createClass({
  // eslint-disable-next-line object-shorthand
  render: function () {
    const { value } = this.props;
    return window.h('p', {}, value);
  },
});

export default ExtraImagePreview;
