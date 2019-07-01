import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import FutureImg from '../images/future'
import Section from '../components/section'

const Future = styled(({ className }) => (
  <Section className={className}>
    <div>
      <div className="left-future-pad">
        <h3>{'Future of e-commerce'}</h3>
        <p className="h4">{'Next Generation Sales Channel.'}</p>
        <p className="h5">{'Learn how we turn Influencer Marketing into Influencer Sales.'}</p>
        <Button className="js-request-demo" color="#000">
          {'Read our magazine'}
        </Button>
      </div>
    </div>
    <div>
      <FutureImg />
    </div>
  </Section>
))`
  flex-direction: row;
  background: linear-gradient(to right, #fff 0%, #fff 50%, #8cd0e2 50%, #8cd0e2 100%);

  & > div {
    flex: 1;
  }

  .left-future-pad {
    padding-left: 4vw;
    padding-right 4vw;
  }

  .h4 {
    width: 100%;
    font-size: 4vw;
    font-weight: bold;
    line-height: 1.25;
    margin-bottom: 1.5vh;
  }

  .h5 {
    font-size: 2.1vw;
    line-height: 1.25;
  }
`

export default Future
