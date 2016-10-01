import React from 'react';
import breakjs from 'breakjs';

const breakJsMethodMap = {
  is: 'is',
  isAtLeast: 'atLeast',
  isAtMost: 'atMost',
};

function getMethodFromLayout(layout, methodName) {
  return layout[breakJsMethodMap[methodName]];
}

const Break = React.createClass({
  propTypes: {
    breakpoints: React.PropTypes.object.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    className: React.PropTypes.string,
    forceWrap: React.PropTypes.bool,
    query: React.PropTypes.shape({
      method: React.PropTypes.oneOf(Object.keys(breakJsMethodMap)),
      breakpoint: React.PropTypes.string.isRequired,
    }),
    style: React.PropTypes.object,
  },

  getInitialState() {
    return { layout: breakjs(this.props.breakpoints) };
  },

  componentDidMount() {
    this.onBreakpointsChange();
  },

  componentWillUnmount() {
    this.state.layout.removeChangeListener(this.onLayoutChange);
  },

  onBreakpointsChange() {
    this.setState({ layout: breakjs(this.props.breakpoints) });
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
      query,
      style,
      forceWrap,
    } = this.props;

    const {
      layout,
    } = this.state;

    const breakpoint = query.breakpoint;

    if (!getMethodFromLayout(layout, query.method)(breakpoint)) {
      return null;
    }

    const classes = `react-break react-break--${query.method}-${query.breakpoint}`;
    const shouldBeWrapped = forceWrap ||
      React.Children.count(children) > 1 ||
      typeof children !== 'object';

    return shouldBeWrapped
      ? <div className={classes} style={style}>{children}</div>
      : children;
  },
});

const layoutGenerator = function componentGenerator(breakpoints) {
  function createComponent(method, breakpoint) {
    if (!Object.keys(breakpoints).includes(breakpoint)) {
      throw new Error(`Invalid breakpoint name '${breakpoint}'` +
        '(not defined in layout).');
    }

    return React.createClass({
      propTypes: {
        children: React.PropTypes.oneOfType([
          React.PropTypes.arrayOf(React.PropTypes.node),
          React.PropTypes.node,
        ]),
      },

      render() {
        const {
          children,
        } = this.props;

        return children ? (
          <Break
            {...this.props}
            breakpoints={breakpoints}
            query={{ method, breakpoint }}>
            {children}
          </Break>
        ) : null;
      },
    });
  }

  return {
    is: breakpoint => createComponent('is', breakpoint),
    isAtLeast: breakpoint => createComponent('isAtLeast', breakpoint),
    isAtMost: breakpoint => createComponent('isAtMost', breakpoint),
  };
};

export { layoutGenerator };
export default Break;
