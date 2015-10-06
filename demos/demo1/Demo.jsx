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

        <OnMobile>
          <div>Displayed on mobile layout only</div>
        </OnMobile>

        <OnAtLeastTablet>
          <div>Displayed on tablet and desktop layouts</div>
        </OnAtLeastTablet>

        <OnAtMostPhablet>
          <div>Displayed on mobile and phablet layouts</div>
        </OnAtMostPhablet>

        <OnDesktop>
          <div>Displayed on desktop layout only</div>
        </OnDesktop>
      </div>
    );
  }
});

export default Demo;
