import React from 'react';
import Break from 'react-break';


const UIBreakpoints = {
  mobile: 0,
  phablet: 550,
  tablet: 768,
  desktop: 992
};

const Demo = React.createClass({
  render() {
    return (
      <div>
        <pre>
          <code>
            { 'const UIBreakpoints = {\n' +
              '  mobile: 0,\n' +
              '  phablet: 550,\n' +
              '  tablet: 768,\n' +
              '  desktop: 992\n' +
              '};'
            }
          </code>
        </pre>

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

          <Break breakpoints={UIBreakpoints}
            query={{method: 'is', breakpoint: 'desktop'}}>
            <div>Displayed on desktop layout only</div>
          </Break>
        </div>
      </div>
    );
  }
});

export default Demo;
