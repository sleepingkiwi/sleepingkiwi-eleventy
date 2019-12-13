/** Instructions widget
 *  ------------------------------------------------------------------------------------------------
 *  this is very hacky but I wanted a nice way to inject styled instructions into the editor!
 *  -
 *  currently I'm just overlaying/hiding all of the default styling...
**/

/** Disabling object shorthand:
 *  ------------------------------------------------------------------------------------------------
 *  we have to use function instead of arrows because `this` is lexically scoped in arrow funcs
 *  and comes out as undefined in our bundled code if we don't...
**/
/* eslint-disable object-shorthand */


const InstructionsControl = window.createClass({
  render: function render() {
    const styles = {
      instructions: {
        color: '#43505d',
        border: '0',
        padding: '32px 32px 0',
        top: '-23px',
        // background: '#e8f5fe',
        background: 'white',
      },
      instructions_header: {
        // background: 'white',
        // paddingBottom: '0',
      },
      instructions_divider: {
        // background: 'white',
        // padding: '32px 32px 0',
      },
      instructionsH2: {
        // fontSize: '1.2em',
        color: '#43505d',
        marginBottom: 0,
      },
      instructionsH2_header: {
        fontSize: '2rem',
      },
      instructionsH2_divider: {
        fontSize: '1.5rem',
      },
      instructionsP: {
        // fontSize: '1.2em',
        color: '#43505d',
        fontStyle: 'italic',
        marginBottom: 0,
        paddingTop: '6px',
      },
      instructionsSpan: {
        display: 'block',
        paddingTop: '6px',
        // marginBottom: '6px',
      },
    };

    let instructionStyles = styles.instructions;
    let headerStyles = styles.instructionsH2;
    if (this.props.field.get('flavour') === 'header') {
      instructionStyles = {
        ...styles.instructions,
        ...styles.instructions_header,
      };
      headerStyles = {
        ...styles.instructionsH2,
        ...styles.instructionsH2_header,
      };
    } else if (this.props.field.get('flavour') === 'divider') {
      instructionStyles = {
        ...styles.instructions,
        ...styles.instructions_divider,
      };
      headerStyles = {
        ...styles.instructionsH2,
        ...styles.instructionsH2_divider,
      };
    }

    // render everything
    return window.h(
      'div',
      {
        className: this.props.classNameWrapper,
        style: instructionStyles,
      },
      [
        window.h('h2', { style: headerStyles }, this.props.field.get('label')),
        window.h(
          'p',
          { style: styles.instructionsP },
          this.props.field.get('instructions').split('\n').map(
            (part) => window.h('span', { style: styles.instructionsSpan }, part),
          ),
        ),
      ],
    );
  },
});


export default InstructionsControl;
