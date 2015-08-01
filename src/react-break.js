import React from 'react';
import breakjs from 'breakjs';


let Break = React.createClass({
  propTypes: {
    breakpoints: React.PropTypes.object.isRequired,
    query: React.PropTypes.shape({
      method: React.PropTypes.string.isRequired,
      breakpoint: React.PropTypes.string.isRequired
    })
  },

  getInitialState: function() {
    return {layout: breakjs(this.props.breakpoints)};
  },

  componentWillMount: function() {
    this.onBreakpointsChange();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.query.breakpoints !== this.props.query.breakpoints) {
      this.onBreakpointsChange();
    }
  },

  componentWillUnmount: function() {
    this.state.layout.removeChangeListener(this.onLayoutChange);
  },

  onBreakpointsChange: function() {
    this.setState({layout: breakjs(this.props.breakpoints)});
    this.state.layout.removeChangeListener(this.onLayoutChange);
    this.state.layout.addChangeListener(this.onLayoutChange);
  },

  onLayoutChange: function() {
    if (this.isMounted()) {
      this.forceUpdate();
    }
  },

  render: function() {
    let method = this.state.layout[this.props.query.method];
    let breakpoint = this.props.query.breakpoint;

    if (method(breakpoint)) {
      return this.props.children;
    } else {
      return null;
    }
  }
});

export default Break;
