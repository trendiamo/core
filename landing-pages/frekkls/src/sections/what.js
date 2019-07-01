import React from 'react'
import styled from 'styled-components'

import Section from '../components/section'
import WhatLeftImg from '../images/what-left'
import WhatRightImg from '../images/what-right'

const What = styled(({ className }) => (
  <Section className={className}>
    <h3>{'What you get'}</h3>
    <div className="what-content">
      <div>
        <WhatLeftImg />
      </div>
      <div>
        <WhatRightImg />
      </div>
    </div>
  </Section>
))`
  .what-content {
    flex: 1;
    width: 100vw;
    display: flex;
    align-items: center;
    background: linear-gradient(to right, #f07643 0%, #f07643 50%, #fff 50%, #fff 100%);
  }

  .what-content > div {
    flex: 1;
  }
`

export default What
