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
      </div>
    );
  }
});

export default Demo;
