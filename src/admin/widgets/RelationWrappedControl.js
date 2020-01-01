/** Wrapped relation control
 *  ------------------------------------------------------------------------------------------------
 *  There is a bug in Netlify CMS that makes the editor believe it has unsaved changes when
 *  relation widgets are used.
 *  -
 *  this widget is explicitly to work around that bug. It wraps the existing relation widget and
 *  checks whether the value has changed before updating...
 *  -
 *  ref: https://github.com/netlify/netlify-cms/issues/2211
**/

/** Disabling object shorthand:
 *  ------------------------------------------------------------------------------------------------
 *  we have to use function instead of arrows because `this` is lexically scoped in arrow funcs
 *  and comes out as undefined in our bundled code if we don't...
**/
/* eslint-disable object-shorthand */

const RelationWrappedControl = window.createClass({

  handleChange: function handleChange(newVals, metadata) {
    // const value = this.props.value && typeof this.props.value.toJS === 'function'
    //   ? this.props.value.toJS()
    //   : this.props.value || '';

    // const newValsJs = typeof newVals.toJS === 'function' ? newVals.toJS() : newVals;

    // console.log({
    //   value,
    //   newVals,
    //   newValsJs,
    //   comparison: newValsJs === value,
    //   metadata,
    // });

    if (newVals !== this.props.value) {
      // console.log('changed item/s');
      this.props.onChange(newVals, metadata);
    }
  },


  render: function render() {
    // console.log(this.props);
    // console.log(window.CMS);

    const valuetoRender = this.props.value && typeof this.props.value.toJS === 'function'
      ? this.props.value.toJS()
      : this.props.value || '';

    // get the standard relation widget
    const relationWidget = window.CMS.getWidget('relation').control;

    // render everything
    return window.h(
      'div',
      {
        className: this.props.classNameWrapper,
      },
      [
        window.h(
          'strong',
          {},
          'Current Value/s:',
        ),
        window.h(
          'p',
          {},
          (Array.isArray(valuetoRender) && valuetoRender.join(' | ')) || valuetoRender || 'NOTHING SELECTED',
        ),
        window.h(
          relationWidget,
          {
            ...this.props,
            // we use the image component almost as is, but capture it's onChange value
            onChange: this.handleChange,
            // because we hijacked onChange and our value contains too much info
            // we also need to update the value ourselves!
            value: this.props.value || '',
          },
        ),
      ],
    );
  },
});


export default RelationWrappedControl;
