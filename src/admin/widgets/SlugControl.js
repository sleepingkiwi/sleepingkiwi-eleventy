/** slug control
 *  ------------------------------------------------------------------------------------------------
 *  Allows us to set a custom slug for posts/pages if we want, or to update the existing slug,
 *  without having it explicitly tied to the title.
 *  -
 *  If nothing is entered manually this will default to the regular slug (based on title)
 *  -
 *  In 11ty we use these slugs to generate the permalinks for pages so they will also change URLs
 * -
 * Reference: https://github.com/netlify/netlify-cms/issues/445#issuecomment-824499171
**/

/** Disabling object shorthand:
 *  ------------------------------------------------------------------------------------------------
 *  we have to use function instead of arrows because `this` is lexically scoped in arrow funcs
 *  and comes out as undefined in our bundled code if we don't...
**/
/* eslint-disable object-shorthand */

const SlugControl = window.createClass({

  getInitialState: function getInitialState() {
    return { touched: false };
  },

  handleChange: function handleChange(e) {
    this.props.onChange(e.target.value);
    if (!this.state.touched) {
      this.state.touched = true;
    }
  },

  render: function render() {
    console.log(this.props);
    return window.h('input', {
      id: this.props.forID,
      className: this.props.classNameWrapper,
      type: 'text',
      value: this.state.touched ? this.props.value : this.props.entry.get('slug'),
      onChange: this.handleChange,
    });
  },
});

export default SlugControl;
