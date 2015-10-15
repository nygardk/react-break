# react-break

> Responsive breakpoints in React.

A utility React component based on
[BreakJS](https://github.com/nygardk/BreakJS/). Create declarative
breakpoint components for your React apps.


## Install

```shell
npm install react-brake --save
```

## Usage example

```js
import React from 'react';
import Break from 'react-break';

const UIBreakpoints = {
  mobile: 0,
  phablet: 550,
  tablet: 768,
  desktop: 992
};

const myApp = React.createClass({
  render() {
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
See also demos/demo0.

------------------

A new, even more declarative approach in version 0.2.x:
```js
import React from 'react';
import { breakComponentGenerator } from 'react-break';

const generator = breakComponentGenerator({
  mobile: 0,
  phablet: 550,
  tablet: 768,
  desktop: 992
});

const OnMobile = generator('is', 'mobile');
const OnAtLeastTablet = generator('atLeast', 'tablet');
const OnAtMostPhablet = generator('atMost', 'phablet');
const OnDesktop = generator('is', 'desktop');

const myApp = React.createClass({
  render() {
    return (
      <div>
        <OnMobile>
           Displayed on mobile layout only
         </OnMobile>

         <OnAtLeastTablet>
           Displayed on tablet and desktop layouts
         </OnAtLeastTablet>

         <OnAtMostPhablet>
           Displayed on mobile and phablet layouts
         </OnAtMostPhablet>

         <OnDesktop>
           Displayed on desktop layout only
         </OnDesktop>
      </div>
    );
  }
});
```
See also demos/demo1.

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

### breakComponentGenerator(String [layout method], String [layout name]) -> Component

`breakComponentGenerator` is a utility function that allows you to
create custom components for breaking the layout, with declarative names.

First you constructing the generator by calling it with the breakpoints
object (key-value pairs of breakpoint name and the pixel value). It returns a
function that takes two parameters, layout method and a breakpoint name.

## License

MIT
