/** ExtraImage control component - like a normal image but extra...
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
 *  eventually these widgets should live in their own repo with a proper React dependency
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

  handleChange: function handleChange(src) {
    console.log('changed image');
    const value = this.props.value && typeof this.props.value.toJS === 'function'
      ? this.props.value.toJS()
      : this.props.value || {};

    this.props.onChange({
      src,
      alt: value.alt || '',
    });

    if (src === '') {
      this.imageLoadPromise = false;
      return;
    }

    this.imageLoadPromise = new Promise((resolve, reject) => {
      const img = new Image();

      /** splitting the full url into pieces.
       *  ------------------------------------------------------------------------------------------
       *  ref: https://cloudinary.com/documentation/image_transformations#transforming_media_assets_using_dynamic_urls
       *  -
       *  base:
       *    - this might be naive but I'm assuming we always get /image/upload/ in the src...
       *    - includes trailing slash
       *  version:
       *    - pretty sure this is always included in a default setup...
       *    - cloudinary doesn't mind if you ommit it
       *      ref: https://cloudinary.com/documentation/advanced_url_delivery_options#asset_versions
       *    - however we add our own version if we don't get one from Cloudinary for any reason
       *    - version is always v[0-9] and you cannot name a folder in a similar way
       *      so this check should always work?
       *    - we return the first capture group because we don't want slashes
       *      ref: https://javascript.info/regexp-groups#parentheses-contents-in-the-match
       *  filename:
       *    - includes the folder (if there is one) but no preceding slash
      **/
      const base = (src.match(/https:\/\/res.cloudinary.com\/.+\/image\/upload\//) || [''])[0];
      const version = (src.match(/\/(v[0-9]+)\//) || ['', ''])[1];
      const filename = (version === '' ? src.split(base) : src.split(`${version}/`))[1] || '';
      img.onload = () => {
        this.props.onChange({
          src,
          base,
          version: version === '' ? `v${Date.now()}` : version, // fallback if we didn't get v
          filename,
          width: img.width,
          height: img.height,
          dominant: colorThief.getColor(img),
          alt: value.alt || '',
        });
        resolve(true);
        this.imageLoaded = true;
      };
      img.onerror = () => {
        this.props.onChange({ src: '' });
        reject(Error('could not load image'));
      };
      img.crossOrigin = 'Anonymous'; // needed for colour thief to work on images from cloudinary
      // ref:  https://lokeshdhakar.com/projects/color-thief/
      img.src = src;
    });
  },


  handleAlt: function handleAlt(e) {
    const value = this.props.value && typeof this.props.value.toJS === 'function'
      ? this.props.value.toJS()
      : this.props.value || {};
    this.props.onChange({
      ...value,
      alt: e.target.value,
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
    // value is sometimes passed as an immutable map - in that case we want to convert it to
    // a regular object before we use it...
    // ref: https://github.com/netlify/netlify-cms/issues/2150
    const value = this.props.value && typeof this.props.value.toJS === 'function'
      ? this.props.value.toJS()
      : this.props.value;

    if (value && value.src) {
      // we have a saved value and src! This happens on every change
      if (value.width) {
        // we only get width after the promise has returned so in this case we have a full field
        return true;
      }

      if (value.src === '') {
        // the field is empty. it's only valid if it isn't required.
        return !this.props.field.get('required');
      }

      // we don't have a width saved and the src isn't '' so we should be loading!
      return this.imageLoadPromise;
    }

    // there's no value or src - the field has never been interacted with.
    // it's valid if it's not required.
    return !this.props.field.get('required');
  },

  render: function render() {
    console.log(this.props);
    // console.log(window.CMS);

    // value is sometimes passed as an immutable map - in that case we want to convert it to
    // a regular object before we use it...
    // ref: https://github.com/netlify/netlify-cms/issues/2150
    const value = this.props.value && typeof this.props.value.toJS === 'function'
      ? this.props.value.toJS()
      : this.props.value;


    const showDeets = this.props.field.get('showDetails') !== false;


    // is this... css in js? 💁‍♂️🦋
    const styles = {
      details: {
        display: value && value.src !== '' ? 'block' : 'none',
        padding: '8px 0 0',
        margin: '0',
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
      altWrapper: {
        padding: '16px 0',
      },
      pathWrapper: {
        padding: '0 2px',
        fontSize: '0.9em',
      },
      path: {
        display: 'inline-block',
        verticalAlign: 'baseline',
        padding: '3px 4px',
        backgroundColor: '#ddd',
        // borderTop: '1px solid',
      },
      pathBase: {
        backgroundColor: 'rgba(255,0,0,0.05)',
      },
      pathVersion: {
        backgroundColor: 'rgba(0,255,0,0.05)',
      },
      pathFilename: {
        backgroundColor: 'rgba(0,0,255,0.05)',
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
            field: this.props.field.set('allow_multiple', true),
            // we handle styling higher up
            classNameWrapper: '',
            // we use the image component almost as is, but capture it's onChange value
            onChange: this.handleChange,
            // because we hijacked onChange and our value contains too much info
            // we also need to update the value ourselves!
            value: value ? value.src || '' : '',
          },
        ),
        window.h(
          'div',
          {
            style: styles.altWrapper,
          },
          [
            window.h(
              'label',
              {
                htmlFor: `${this.props.forID}__alt`,
                className: [
                  this.props.classNameLabel,
                  this.props.hasActiveStyle ? this.props.classNameLabelActive : null,
                ].filter((maybeNull) => maybeNull !== null).join(' '),
              },
              'Alt text',
            ),
            window.h(
              'input',
              {
                id: `${this.props.forID}__alt`,
                type: 'text',
                value: value ? value.alt || '' : '',
                onChange: this.handleAlt,
                onFocus: this.props.setActiveStyle,
                onBlur: this.props.setInactiveStyle,
                className: this.props.classNameWrapper,
              },
            ),
          ],
        ),
        value && value.src && showDeets && window.h(
          'div',
          {
            style: { ...styles.details, paddingTop: '0' },
          },
          [
            window.h(
              'span',
              {
                style: styles.pathWrapper,
              },
              [
                window.h(
                  'span',
                  {
                    style: { ...styles.path, ...styles.pathBase },
                    title: 'base',
                  },
                  value.base,
                ),
              ],
            ),
            window.h(
              'span',
              {
                style: styles.pathWrapper,
              },
              [
                window.h(
                  'span',
                  {
                    style: { ...styles.path, ...styles.pathVersion },
                    title: 'version',
                  },
                  value.version,
                ),
              ],
            ),
            window.h(
              'span',
              {
                style: styles.pathWrapper,
              },
              [
                window.h(
                  'span',
                  {
                    style: styles.path,
                  },
                  '/',
                ),
              ],
            ),
            window.h(
              'span',
              {
                style: styles.pathWrapper,
              },
              [
                window.h(
                  'span',
                  {
                    style: { ...styles.path, ...styles.pathFilename },
                    title: 'filename',
                  },
                  value.filename,
                ),
              ],
            ),
          ],
        ),
        value && value.src && showDeets && window.h(
          'div',
          {
            style: styles.details,
          },
          [
            window.h('strong', {}, 'Dimensions: '),
            window.h(
              'span',
              {},
              value ? `${value.width || '0'}px by ${value.height || '0'}px` : '',
            ),
            window.h('br'),
            window.h('strong', {}, 'Dominant Colour: '),
            window.h('span', { style: styles.dominant }, ''),
            window.h(
              'small',
              {},
              value && value.dominant
                ? ` rgb(${value.dominant[0]}, ${value.dominant[1]}, ${value.dominant[2]})`
                : '',
            ),
          ],
        ),
      ],
    );
  },
});


export default ExtraImageControl;
