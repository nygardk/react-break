'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _breakjs = require('breakjs');

var _breakjs2 = _interopRequireDefault(_breakjs);

var Break = _react2['default'].createClass({
  displayName: 'Break',

  propTypes: {
    breakpoints: _react2['default'].PropTypes.object.isRequired,
    query: _react2['default'].PropTypes.shape({
      method: _react2['default'].PropTypes.string.isRequired,
      breakpoint: _react2['default'].PropTypes.string.isRequired
    })
  },

  getInitialState: function getInitialState() {
    return { layout: (0, _breakjs2['default'])(this.props.breakpoints) };
  },

  componentWillMount: function componentWillMount() {
    this.onBreakpointsChange();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.query.breakpoints !== this.props.query.breakpoints) {
      this.onBreakpointsChange();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.state.layout.removeChangeListener(this.onLayoutChange);
  },

  onBreakpointsChange: function onBreakpointsChange() {
    this.setState({ layout: (0, _breakjs2['default'])(this.props.breakpoints) });
    this.state.layout.removeChangeListener(this.onLayoutChange);
    this.state.layout.addChangeListener(this.onLayoutChange);
  },

  onLayoutChange: function onLayoutChange() {
    if (this.isMounted()) {
      this.forceUpdate();
    }
  },

  render: function render() {
    var method = this.state.layout[this.props.query.method];
    var breakpoint = this.props.query.breakpoint;

    if (method(breakpoint)) {
      return this.props.children;
    } else {
      return null;
    }
  }
});

exports['default'] = Break;
module.exports = exports['default'];