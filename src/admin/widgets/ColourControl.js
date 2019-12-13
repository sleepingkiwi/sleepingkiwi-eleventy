/** Colour control component - just an input with a type
 *  ------------------------------------------------------------------------------------------------
**/


/** Disabling object shorthand:
 *  ------------------------------------------------------------------------------------------------
 *  we have to use function instead of arrows because `this` is lexically scoped in arrow funcs
 *  and comes out as undefined in our bundled code if we don't...
**/
/* eslint-disable object-shorthand */


const ColourControl = window.createClass({

  handleChange: function handleChange(e) {
    this.props.onChange(e.target.value);
  },

  render: function render() {
    return window.h(
      'div',
      {
        className: this.props.classNameWrapper,
        style: {
          display: 'flex',
          alignItems: 'center',
        },
      },
      [
        window.h(
          'input',
          {
            type: 'color',
            value: this.props.value,
            onChange: this.handleChange,
            style: {
              border: '0',
              background: 'transparent',
              width: '48px',
              height: '48px',
              outline: '0',
              padding: '0',
            },
          },
        ),
        this.props.value && window.h(
          'p',
          {
            style: {
              margin: '0',
              fontWeight: 'bold',
              paddingLeft: '6px',
            },
          },
          this.props.value,
        ),
      ],
    );
  },
});


export default ColourControl;
