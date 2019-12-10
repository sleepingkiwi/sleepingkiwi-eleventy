const SimpleFileControl = window.createClass({

  isValid: function isValid() {
    const { value, getAsset } = this.props;
    console.log(getAsset(value));
    return { error: { message: `Your value was ${value}` } };
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return (
      this.props.value !== nextProps.value
      || this.props.classNameWrapper !== nextProps.classNameWrapper
      || this.props.hasActiveStyle !== nextProps.hasActiveStyle
      || this.props.mediaPaths !== nextProps.mediaPaths
    );
  },

  render: function render() {
    // get the standard file widget
    const fileWidget = window.CMS.getWidget('file').control;

    // render it
    return window.h(
      fileWidget,
      {
        ...this.props,
      },
    );
  },
});

export default SimpleFileControl;
