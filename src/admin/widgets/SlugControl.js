/** slug control
 *  ------------------------------------------------------------------------------------------------
 *  Allows us to set a custom slug for posts/pages if we want, or to update the existing slug,
 *  without having it explicitly tied to the title.
 *  -
 *  If nothing is entered manually this will default to a slugified version of the title or use
 *  a historically saved slug. If these already exist they are set in componentDidMount
 *  -
 *  For fresh saves if the field is left blank, the slug is set by a listener
 *  in `src>admin>admin.js` by listening to the CMS `preSave` event.
 *  -
 *  In 11ty we use these slugs to generate the permalinks for pages so they will also change URLs
 * -
 * Reference: https://github.com/netlify/netlify-cms/issues/445#issuecomment-824499171
**/

import slugify from 'slugify';

/** Disabling object shorthand:
 *  ------------------------------------------------------------------------------------------------
 *  we have to use function instead of arrows because `this` is lexically scoped in arrow funcs
 *  and comes out as undefined in our bundled code if we don't...
**/
/* eslint-disable object-shorthand */

const SlugControl = window.createClass({
  componentDidMount: function componentDidMount() {
    const value = this.props.value || this.props.entry.get('slug') || slugify(this.props.entry.get('data').get('title') || '', { lower: true });
    this.props.onChange(value);
  },

  handleChange: function handleChange(e) {
    // slugify entry as typed - allow trailing hyphens here
    this.props.onChange(slugify(e.target.value, { trim: false, lower: true }));
  },

  render: function render() {
    // console.log(this.props);
    return window.h('input', {
      id: this.props.forID,
      className: this.props.classNameWrapper,
      type: 'text',
      value: this.props.value,
      onChange: this.handleChange,
    });
  },
});

export default SlugControl;
