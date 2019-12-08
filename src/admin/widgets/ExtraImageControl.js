/** ExtraImage control component
 *  ------------------------------------------------------------------------------------------------
 *  we're using the global createClass exposed by netlify-cms so we don't have to import our
 *  own version of React...
 *  -
 *  lots of details are not mentioned in the docs at:
 *  https://www.netlifycms.org/docs/custom-widgets/
 *  console.log(this.props); is useful
 *  There's more detail in the starter at:
 *  https://github.com/netlify/netlify-cms-widget-starter/blob/master/src/Control.js
 *  and more detail at:
 *  https://www.netlify.com/blog/2017/06/20/extending-netlify-cms-part-one-custom-widgets/
 *  further ref:
 *  https://www.softwire.com/insights/implementing-a-custom-netlify-cms-widget/
 *  -
 *  eventually these widgets can live in their own repo with a proper React dependency
**/


/** Disabling object shorthand:
 *  ------------------------------------------------------------------------------------------------
 *  we have to use function instead of arrows because `this` is lexically scoped in arrow funcs
 *  and comes out as undefined in our bundled code if we don't...
**/
/* eslint-disable object-shorthand */


const ExtraImageControl = window.createClass({
  handleChange: function handleChange(src) {
    console.log('got a change');
    console.log(src);
    this.props.onChange(src);
  },

  // we need to provide our own shouldComponentUpdate because the default Widget one does
  // not include this.props.mediaPaths which is required by the image widget to update.
  // ref: https://github.com/netlify/netlify-cms/issues/2955#issuecomment-562900518
  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return (
      this.props.value !== nextProps.value
      || this.props.classNameWrapper !== nextProps.classNameWrapper
      || this.props.hasActiveStyle !== nextProps.hasActiveStyle
      || this.props.mediaPaths !== nextProps.mediaPaths
    );
  },

  isValid: function isValid() {
    // Do internal validation
    console.log('validating');
    console.log(this.props);
    return { error: { message: 'Your error message.' } };
  },

  render: function render() {
    const imageWidget = window.CMS.getWidget('image').control;
    return window.h(
      'div',
      {
        className: 'joke-div',
      },
      [
        window.h(
          imageWidget,
          {
            ...this.props,
            // we use the image component almost as is, but capture it's onChange value
            onChange: this.handleChange,
            // because we hijacked onChange and our value contains too much info
            // we also need to update the value ourselves!
            value: this.props.value,
          },
        ),
        window.h(
          'p',
          {},
          this.props.value ? this.props.value.length : 'unset',
        ),
      ],
    );
  },
});


export default ExtraImageControl;
