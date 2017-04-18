import React, { Component } from 'react';
import { layoutGenerator } from 'react-break';

const layout = layoutGenerator({
  mobile: 0,
  phablet: 550,
  tablet: 768,
  desktop: 992,
});

const OnMobile = layout.is('mobile');
const OnAtLeastTablet = layout.isAtLeast('tablet');
const OnAtMostPhablet = layout.isAtMost('phablet');
const OnDesktop = layout.is('desktop');

class Demo extends Component {
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
}

export default Demo;
