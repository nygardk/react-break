import React from 'react';
import breakjs from 'breakjs';


const Break = React.createClass({
  propTypes: {
    breakpoints: React.PropTypes.object.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    query: React.PropTypes.shape({
      method: React.PropTypes.string.isRequired,
      breakpoint: React.PropTypes.string.isRequired
    })
  },

  getInitialState() {
    return {layout: breakjs(this.props.breakpoints)};
  },

  componentWillMount() {
    this.onBreakpointsChange();
  },

  componentWillUnmount() {
    this.state.layout.removeChangeListener(this.onLayoutChange);
  },

  onBreakpointsChange() {
    this.setState({layout: breakjs(this.props.breakpoints)});
    this.state.layout.removeChangeListener(this.onLayoutChange);
    this.state.layout.addChangeListener(this.onLayoutChange);
  },

  onLayoutChange() {
    if (this.isMounted()) {
      this.forceUpdate();
    }
  },

  render() {
    const {
      children,
      query
    } = this.props;

    const {
      layout
    } = this.state;

    const method = layout[query.method];
    const breakpoint = query.breakpoint;

    const renderChildren =
      (React.Children.count(children) > 1 || typeof children === 'string')
      ? <div>{children}</div>
      : children;

    return method(breakpoint) ? renderChildren : null;
  }
});

const breakComponentGenerator = function generator(breakpoints) {
  return function createComponent(method, breakpoint) {
    return React.createClass({
      propTypes: {
        children: React.PropTypes.oneOfType([
          React.PropTypes.arrayOf(React.PropTypes.node),
          React.PropTypes.node
        ])
      },

      render() {
        const {
          children
        } = this.props;

        return children ? (
          <Break breakpoints={breakpoints} query={{method, breakpoint}}>
            {children}
          </Break>
        ) : null;
      }
    });
  };
};

export { breakComponentGenerator };
export default Break;
