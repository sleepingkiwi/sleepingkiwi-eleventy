/** ExtraImage control component - like a normal image but so extra!
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


import ColorThief from 'colorthief/dist/color-thief.umd';

const colorThief = new ColorThief();


const ExtraImageControl = window.createClass({
  imageLoadPromise: false,
  imageLoaded: false,

  handleChange: function handleChange(src) {
    if (src === '') {
      this.props.onChange({
        src,
        width: null,
        height: null,
        dominant: null,
      });
      this.imageLoadPromise = false;
      this.imageLoaded = false;
      return;
    }

    this.imageLoaded = false;
    this.imageLoadPromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.props.onChange({
          src,
          width: img.width,
          height: img.height,
          dominant: colorThief.getColor(img),
        });
        resolve(true);
        this.imageLoaded = true;
      };
      img.onerror = () => reject(Error('could not load image'));
      img.src = src;
    });
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
    return this.imageLoaded || imageLoadPromise;
  },

  render: function render() {
    // value is sometimes passed as an immutable map - in that case we want to convert it to
    // a regular object before we use it...
    const value = typeof this.props.value.toJS === 'function'
      ? this.props.value.toJS()
      : this.props.value;
    const styles = {
      details: {
        display: value && value.src !== '' ? 'block' : 'none',
        padding: '16px 16px 0',
        margin: '0',
        // backgroundColor: 'rgb(223, 223, 227)',
        borderRadius: '5px',
        fontSize: '0.8rem',
        lineHeight: 1.5,
        color: '#888',
      },
      dominant: {
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '0.8rem',
        width: '0.8rem',
        padding: '0.2rem',
        borderRadius: '100px',
        backgroundColor: value && value.dominant ? `rgb(${value.dominant[0]}, ${value.dominant[1]}, ${value.dominant[2]})` : '#f7f7f7',
      },
    };

    // get the standard image widget
    const imageWidget = window.CMS.getWidget('image').control;

    // render everything
    return window.h(
      'div',
      {
        className: this.props.classNameWrapper,
      },
      [
        window.h(
          imageWidget,
          {
            ...this.props,
            // we only allow single image uploads for this component currently
            field: this.props.field.set('allow_multiple', false),
            // we use the image component almost as is, but capture it's onChange value
            onChange: this.handleChange,
            // because we hijacked onChange and our value contains too much info
            // we also need to update the value ourselves!
            value: value ? value.src || '' : '',
          },
        ),
        window.h(
          'p',
          {
            style: styles.details,
          },
          [
            window.h('strong', {}, 'Dimensions: '),
            window.h('span', {}, value ? `${value.width || '0'}px by ${value.height || '0'}px` : ''),
            window.h('br'),
            window.h('strong', {}, 'Dominant Colour: '),
            window.h('span', { style: styles.dominant }, ''),
            window.h('small', {}, value && value.dominant ? ` rgb(${value.dominant[0]}, ${value.dominant[1]}, ${value.dominant[2]})` : ''),
          ],
        ),
      ],
    );
  },
});


export default ExtraImageControl;
