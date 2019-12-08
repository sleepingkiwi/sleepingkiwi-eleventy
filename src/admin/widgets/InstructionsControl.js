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
        padding: '32px',
        top: '-23px',
        background: '#e8f5fe',
      },
      instructionsHead: {
        // fontSize: '1.2em',
        color: '#43505d',
        marginBottom: 0,
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

    // render everything
    return window.h(
      'div',
      {
        className: this.props.classNameWrapper,
        style: styles.instructions,
      },
      [
        window.h('h2', { style: styles.instructionsHead }, this.props.field.get('label')),
        window.h(
          'p',
          { style: styles.instructionsP },
          this.props.field.get('instructions').split('\n').map(
            (part) => window.h('span', { style: styles.instructionsSpan }, part)
          ),
        ),
      ],
    );
  },
});


export default InstructionsControl;
