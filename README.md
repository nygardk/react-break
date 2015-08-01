# react-break

> Responsive breakpoints in React.

A utility React component based on
[BreakJS](https://github.com/nygardk/BreakJS/).


## Install

```shell
npm install react-brake --save
```

## Usage example

```js

var React = require('React');
var Break = require('react-break');

var UIBreakpoints = {
  mobile: 0,
  phablet: 550,
  tablet: 768,
  desktop: 992
};

var myApp = React.createClass({
  render: function() {
    return (
      <div>
        <Break breakpoints={UIBreakpoints}
          query={{method: 'is', breakpoint: 'mobile'}}>
          <div>Displayed on mobile layout only</div>
        </Break>

        <Break breakpoints={UIBreakpoints}
          query={{method: 'atLeast', breakpoint: 'tablet'}}>
          <div>Displayed on tablet and desktop layouts</div>
        </Break>

        <Break breakpoints={UIBreakpoints}
          query={{method: 'atMost', breakpoint: 'phablet'}}>
          <div>Displayed on mobile and phablet layouts</div>
        </Break>
      </div>
    );
  }
});


```

## Options

`Break` component takes two attributes, `breakpoints` and `query`.
Breakpoints are key-value pairs of arbitrary names and values for
layout breakpoints of your choice. Query has two properties:
`method` and `breakpoint`. The breakpoint-property must be one of the
options you defined for the breakpoints attribute. The method-property
has three choices: `is`, `atLeast` and `atMost`, which are described below.

### Methods

__`is`__ matches exactly the given breakpoint, e.g. in the example
above is('mobile') matches window sizes from 0px to 549px.

__`atLeast`__ matches the given and any larger breakpoint, e.g.
in the example above atLeast('tablet') matches window sizes above 768px.

__`atMost`__ matches the given and any smaller breakpoint, e.g.
in the example above atMost('tablet') matches window size below 767px.


## License

MIT
